# Fateh ERP SaaS Infrastructure v2 — Design Spec
**Date:** 2026-03-23
**Status:** Approved
**Scope:** SaaS server setup + fateh-admin complete management system

---

## 1. Problem Statement

Current setup provisions per-site Caddy blocks with HTTP-01 SSL challenges. Every new customer requires a `caddy reload` which causes brief downtime for all existing customers. Previous implementations had config bugs. Need a zero-downtime, scalable solution for 10,000 customers over 5 years.

---

## 2. Architecture Overview

```
Cloudflare DNS
  *.fateherp.com    → SaaS Server #1 IP  (wildcard A, grey cloud)
  customer.fateherp.com → SaaS Server IP  (created per-customer at signup, grey cloud)

Control Server (207.180.209.80)
  ├── fateh-admin    :4000  (complete SaaS management UI + API)
  └── server-manager :3847  (SSH executor, bench operations)

SaaS Server(s) — Contabo VPS, add as needed
  ├── Caddy          (wildcard SSL via Cloudflare DNS-01, single block FOREVER)
  ├── Frappe bench   (ERPNext v15 + ksa_compliance + enfono_saas, all tenants)
  ├── MariaDB        (one DB per tenant)
  └── Redis          (shared queue + cache)
```

**Key principle:** Caddy config on SaaS server is written once and never touched again. All routing decisions (which customer → which server) are in Cloudflare DNS, managed by fateh-admin.

---

## 3. SaaS Server Setup

### 3.1 Caddy — Wildcard SSL (written once, never changed)

```caddyfile
*.fateherp.com {
    tls {
        dns cloudflare {env.CF_API_TOKEN}
    }
    encode gzip zstd

    handle /socket.io/* {
        reverse_proxy localhost:9000 {
            header_up Host {host}
        }
    }

    handle /assets/* {
        reverse_proxy localhost:8000 {
            header_up Host {host}
        }
    }

    handle {
        reverse_proxy localhost:8000 {
            header_up Host {host}
            header_up X-Forwarded-For {remote_host}
            header_up X-Forwarded-Proto {scheme}
            transport http {
                response_header_timeout 120s
                read_timeout 120s
            }
        }
    }
}
```

**Why grey cloud (not proxied) on Cloudflare:**
Frappe uses socket.io WebSockets. Cloudflare proxy blocks WebSockets unless on Business/Enterprise plan. All DNS records must be grey cloud (DNS-only). **Trade-off accepted:** grey cloud bypasses Cloudflare DDoS protection and WAF for customer subdomains. Do not change to orange cloud — it will break real-time features for all customers.

**Why wildcard solves the crash problem:**
One `*.fateherp.com` TLS cert covers ALL subdomains. No new Caddy blocks needed per customer. No `caddy reload` needed per customer. Zero downtime.

### 3.2 Caddy Installation (with Cloudflare module)

```bash
# Install Caddy with Cloudflare DNS module via xcaddy
apt install -y debian-keyring debian-archive-keyring apt-transport-https curl golang-go
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | tee /etc/apt/sources.list.d/caddy-stable.list
apt update && apt install caddy

go install github.com/caddyserver/xcaddy/cmd/xcaddy@latest
~/go/bin/xcaddy build --with github.com/caddy-dns/cloudflare
mv caddy /usr/bin/caddy
systemctl restart caddy

# Set Cloudflare API token env (chmod 600 — token must not be world-readable)
echo 'CF_API_TOKEN=<token>' > /etc/caddy/caddy.env
chmod 600 /etc/caddy/caddy.env
chown caddy:caddy /etc/caddy/caddy.env
# Add to /lib/systemd/system/caddy.service under [Service]:
#   EnvironmentFile=/etc/caddy/caddy.env
systemctl daemon-reload && systemctl restart caddy
```

> **Note:** Go toolchain (~600MB) remains installed after build. This is intentional — needed for future Caddy rebuilds when updating the Cloudflare module. Do not remove it.

> **Cloudflare API token required permissions:** Zone → DNS → Edit, scoped to `fateherp.com` zone only. Do NOT use a global token.

### 3.3 Frappe Bench — Multi-site Configuration (Critical)

After bench install, set these global configs so Frappe routes requests by `Host` header:

```bash
bench set-config -g serve_default_site false
bench set-config -g rebase_on_host true
```

Without `rebase_on_host true`, ALL subdomains serve the same default site regardless of the `Host` header Caddy passes. This is the most common multi-site misconfiguration.

> **Do NOT run `bench setup nginx`.** Caddy replaces nginx entirely. If nginx is installed, keep it disabled (`systemctl disable nginx`).

### 3.3a Supervisor / Systemd Setup

```bash
bench setup supervisor
bench setup systemd
sudo systemctl enable frappe-bench.target
sudo systemctl start frappe-bench.target
```

This ensures gunicorn workers, Redis workers, and the scheduler survive server reboots.

### 3.4 Frappe Bench Setup (ERPNext v15)

Apps installed on bench (available for all sites):
1. `frappe` (core)
2. `erpnext`
3. `ksa_compliance` — `https://github.com/lavaloon-eg/ksa_compliance.git`
4. `enfono_saas` — `https://github.com/sayanthns/enfono_saas.git`

### 3.5 New Site Provisioning Sequence

```bash
# 1. Create site
# db_name: convert subdomain hyphens to underscores (e.g. al-rashid → al_rashid)
bench new-site {subdomain}.fateherp.com \
  --admin-password {password} \
  --db-name {db_name} \
  --no-mariadb-socket

# 2. Install apps — ORDER IS CRITICAL
# ksa_compliance must come before enfono_saas (dependency on ksa doctypes)
bench --site {subdomain}.fateherp.com install-app payments
bench --site {subdomain}.fateherp.com install-app erpnext
bench --site {subdomain}.fateherp.com install-app ksa_compliance
bench --site {subdomain}.fateherp.com install-app enfono_saas
# Note: install-app runs migrations automatically. The explicit migrate below is a safety net.

# 3. Run migrations (safety net — redundant but harmless)
bench --site {subdomain}.fateherp.com migrate

# 4. Enable scheduler
bench --site {subdomain}.fateherp.com enable-scheduler
```

Total provisioning time: ~10-15 minutes. Handled as async job.

**On provisioning failure — rollback sequence:**
```bash
bench drop-site {subdomain}.fateherp.com --force  # drops MariaDB DB
# fateh-admin also: delete Cloudflare DNS record if already created
# set tenant provision_status = failed, job status = failed
```

---

## 4. fateh-admin v2 — Complete SaaS Management System

### 4.1 Scope

fateh-admin becomes the **single panel** for managing all aspects of Fateh ERP SaaS:
- Customer management + billing
- Site lifecycle and operations
- Server capacity management
- Provisioning jobs and status
- Cloudflare DNS management (automatic)

The server-manager at `manager.enfonoerp.com` remains for managing **non-SaaS clients** (custom ERP, AMC). fateh-admin delegates SSH/bench operations to server-manager internally.

### 4.2 UI Sections

| Section | Features |
|---------|----------|
| **Dashboard** | MRR, active tenants, server health, pending jobs |
| **Customers** | List, search, filter by status/server. Create (manual + auto) |
| **Customer Detail** | Profile tab, Billing tab, Payments tab, Site tab |
| **Sites** | All *.fateherp.com sites, status, server, last active |
| **Site Detail** | Apps, bench actions, lifecycle, diagnose, uptime |
| **Servers** | All SaaS servers, capacity bar, health |
| **Server Detail** | Bench info, disk/CPU/RAM, sites on this server |
| **Jobs** | All async jobs (provisioning, migrations, deploys), live logs |
| **Settings** | Cloudflare token, SMTP, LS credentials, provisioning defaults |

### 4.3 Database Schema

```sql
-- New: SaaS servers registry
CREATE TABLE servers (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    name        TEXT NOT NULL,
    ip          TEXT NOT NULL UNIQUE,
    region      TEXT,
    ssh_user    TEXT DEFAULT 'root',
    bench_path  TEXT DEFAULT '/home/frappe/frappe-bench',
    capacity    INTEGER DEFAULT 80,       -- max tenants
    current_count INTEGER DEFAULT 0,
    status      TEXT DEFAULT 'active',    -- active | maintenance | full
    notes       TEXT,
    created_at  TEXT DEFAULT (datetime('now'))
);

-- New: Async job tracking
CREATE TABLE jobs (
    id          INTEGER PRIMARY KEY AUTOINCREMENT,
    type        TEXT NOT NULL,            -- provision | migrate | update | backup
    site_name   TEXT,
    server_id   INTEGER REFERENCES servers(id),
    status      TEXT DEFAULT 'queued',   -- queued | running | done | failed
    started_at  TEXT,
    finished_at TEXT,
    logs        TEXT,                    -- append-only log stream
    error       TEXT,
    created_at  TEXT DEFAULT (datetime('now'))
);

-- Updated: tenants
ALTER TABLE tenants ADD COLUMN server_id INTEGER REFERENCES servers(id);
ALTER TABLE tenants ADD COLUMN cf_dns_record_id TEXT;
ALTER TABLE tenants ADD COLUMN subdomain TEXT UNIQUE;
ALTER TABLE tenants ADD COLUMN provision_status TEXT DEFAULT 'pending';
-- provision_status: pending | queued | provisioning | ready | failed
```

### 4.4 Provisioning Flow (Auto — website signup)

```
POST /api/signup  (rate-limited: max 5 per IP per hour)
  1. Validate fields, check subdomain not taken
  2. Create tenant (status: pending) + billing (Trial, 14 days)
  3. Pick server: SELECT * FROM servers WHERE status='active'
                  ORDER BY current_count ASC LIMIT 1
  4. Create job (type: provision, status: queued)
  5. Send "signup received" email — site being created, ETA 15 min
  6. Return 201 immediately (async from here)

Job worker:
  7. Call server-manager: bench new-site + install apps in order (~15 min)
     On failure → bench drop-site, set provision_status=failed, job=failed, stop
  8. Cloudflare API: create A record → server.ip (grey cloud, proxied: false)
     Store record_id in tenants.cf_dns_record_id
     On failure → bench drop-site, set provision_status=failed, stop
  9. Update tenant: provision_status = ready
  10. Update server: current_count += 1
  11. Send "site ready" welcome email with login URL + credentials
  12. Job status = done
```

**Two-email pattern:** Email at step 5 (signup received) + email at step 11 (site ready). Never send the "site ready" email before the job completes.

### 4.5 Provisioning Flow (Manual — sales-led)

```
fateh-admin UI → Customers → New Customer
  → Fill: company, contact, email, subdomain, plan, server (auto or pick)
  → Click "Provision Site"
  → Same steps 3-10 above
  → Admin sees live job log in UI
```

### 4.6 Cloudflare API Integration

```typescript
// Create DNS record at provisioning
POST /zones/{zone_id}/dns_records
{
  type: "A",
  name: "{subdomain}.fateherp.com",
  content: "{server_ip}",
  ttl: 1,        // auto TTL
  proxied: false  // grey cloud — required for Frappe WebSockets
}
// Store response.result.id as cf_dns_record_id

// Update DNS record at server migration
PUT /zones/{zone_id}/dns_records/{record_id}
{ content: "{new_server_ip}" }

// Delete DNS record at cancellation
DELETE /zones/{zone_id}/dns_records/{record_id}
```

### 4.7 Site Lifecycle Actions (via server-manager)

| Action | Command |
|--------|---------|
| Suspend | `bench --site X set-maintenance-mode on` |
| Restore | `bench --site X set-maintenance-mode off` |
| Update apps | `bench --site X update --no-backup` |
| Backup | `bench --site X backup --with-files` |
| Migrate | `bench --site X migrate` |
| Enable scheduler | `bench --site X enable-scheduler` |
| Admin login | Generate one-time login URL |
| Diagnose | `bench --site X doctor` |

---

## 5. Scaling Plan

When a server reaches 80% capacity (64/80 tenants):
1. Provision a new identical SaaS server
2. Register it in fateh-admin Servers page
3. fateh-admin auto-routes new signups to the new server
4. No DNS wildcard changes — each new customer gets a per-subdomain A record anyway

**Capacity sizing:** Each ERPNext v15 + ksa_compliance + enfono_saas site uses approximately 300–500MB RAM (MariaDB + workers) and 2–5GB disk under light use. A Contabo VPS with 30GB RAM / 400GB SSD comfortably handles ~50–60 active tenants. Use 60 as the planning number. At 80% threshold, trigger new server at 48 tenants.

**At 10,000 customers (60 tenants/server average):** ~167 servers.
All servers are identical. Adding a server = 20 minutes of setup + register in fateh-admin.

---

## 6. What Gets Built (Implementation Phases)

### Phase 1 — SaaS Server Setup
- Fresh Ubuntu server + Frappe bench ERPNext v15
- Caddy with Cloudflare module + wildcard block
- `rebase_on_host true` + `serve_default_site false` set in common_site_config
- Supervisor/systemd configured for bench workers
- enfono_saas + ksa_compliance installed on bench
- SSH key auth set up: control server → SaaS server (frappe user)
- Server-manager agent installed + registered on control server
- **Smoke test:** Manually create `test.fateherp.com` site, manually add A record in Cloudflare, verify it loads at the subdomain before moving to Phase 2

### Phase 2 — fateh-admin: Servers + Jobs
- `servers` and `jobs` tables
- Servers management page (list, add, detail, health)
- Jobs page (list, live logs, retry)
- Provisioning job worker (bench new-site + app install)
- **Note:** Cloudflare DNS integration is Phase 3. Sites provisioned in Phase 2 require a manual Cloudflare A record to be accessible. This is acceptable for internal testing only.

### Phase 3 — fateh-admin: Full Provisioning
- Auto-signup flow with server selection + Cloudflare DNS
- Manual provisioning form in UI
- Provisioning status tracker (polling + live log)
- Welcome email on completion

### Phase 4 — fateh-admin: Site Management
- Sites page (all *.fateherp.com)
- Site detail: lifecycle actions, apps, diagnose, uptime
- Migrate site between servers (update bench + update DNS)

### Phase 5 — fateh-admin: Polish
- Dashboard with full stats (MRR, server health, job status)
- Billing automation (Trial → Grace → Suspended via LS webhooks)
- Settings page (Cloudflare token, SMTP, LS config)

---

## 7. Security Requirements

| Requirement | Detail |
|-------------|--------|
| SSH auth | Key-based only between control server and SaaS servers. No password SSH. Generate dedicated keypair for server-manager on control server. |
| SSH user for bench | `frappe` user (not root) owns the bench. server-manager must SSH as `frappe`. |
| Cloudflare token | Zone → DNS → Edit, `fateherp.com` zone only. Never global token. |
| caddy.env | `chmod 600`, owned by `caddy` user. CF_API_TOKEN never in Caddyfile directly. |
| Signup rate limit | Max 5 requests per IP per hour on `/api/signup`. |
| `ADMIN_SECRET` | Internal service-to-service only (server-manager calling fateh-admin). Rotate quarterly. |
| DB file | `chmod 600` on `fateh-admin.db`. |

## 8. Environment Variables (fateh-admin)

```env
PORT=4000
ADMIN_SECRET=change-me

# Cloudflare
CF_API_TOKEN=
CF_ZONE_ID=           # fateherp.com zone ID

# Lemon Squeezy
LS_WEBHOOK_SECRET=
LS_API_KEY=

# Signup
SIGNUP_SECRET=

# Server Manager
SERVER_MANAGER_URL=http://localhost:3847
SERVER_MANAGER_TOKEN=

# SMTP
SMTP_HOST=
SMTP_PORT=
SMTP_USER=
SMTP_PASS=
SMTP_FROM=

# DB
DB_PATH=./data/fateh-admin.db
```

---

## 8. Out of Scope

- Docker/Kubernetes (overkill for current scale)
- Traefik (Caddy is already working and simpler)
- NanoPress (useful reference but not needed — fateh-admin covers the same ground with SaaS-specific features)
- Multi-region load balancing (revisit at 1,000+ customers)
