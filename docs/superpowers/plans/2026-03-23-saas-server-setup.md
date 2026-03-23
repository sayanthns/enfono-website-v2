# SaaS Server Setup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Set up a fresh Ubuntu VPS as the Fateh ERP SaaS server — Frappe bench (ERPNext v15 + ksa_compliance + enfono_saas), Caddy with wildcard SSL via Cloudflare DNS, SSH key auth from control server, and a smoke test confirming multi-site routing works.

**Architecture:** Single Frappe bench hosts all tenant sites. Caddy sits in front with one `*.fateherp.com` wildcard block — written once, never changed again. New customers get a per-subdomain DNS A record via Cloudflare API (done by fateh-admin at signup). No Caddy reloads ever needed for new tenants.

**Tech Stack:** Ubuntu 22.04, Frappe bench v5, ERPNext v15, MariaDB 10.6, Redis, Caddy v2 + caddy-dns/cloudflare module, Python 3.11, Node.js 18+

**Credentials needed before starting:**
- New Contabo VPS IP + root password
- Cloudflare API token (Zone → DNS → Edit, `fateherp.com` zone only)
- Control server SSH access (207.180.209.80)

---

### Task 1: Initial Server Hardening

**Files:** none (server config)

- [ ] **Step 1: SSH into new VPS**
```bash
ssh root@<NEW_VPS_IP>
```

- [ ] **Step 2: Update system and install essentials**
```bash
apt update && apt upgrade -y
apt install -y git curl wget vim ufw fail2ban
```

- [ ] **Step 3: Configure firewall — allow only SSH, HTTP, HTTPS**
```bash
ufw allow OpenSSH
ufw allow 80/tcp
ufw allow 443/tcp
ufw --force enable
ufw status
```
Expected: `Status: active`, ports 22, 80, 443 listed as ALLOW.

- [ ] **Step 4: Create frappe user**
```bash
adduser frappe --disabled-password --gecos ""
usermod -aG sudo frappe
```

- [ ] **Step 5: Set up SSH key from control server (207.180.209.80)**
On the **control server**, run:
```bash
# Generate key for server-manager if not already done
ls ~/.ssh/id_fateh_saas 2>/dev/null || ssh-keygen -t ed25519 -f ~/.ssh/id_fateh_saas -N "" -C "control-server-server-manager"
cat ~/.ssh/id_fateh_saas.pub
```
Copy the output, then on the **new VPS** as root:
```bash
mkdir -p /home/frappe/.ssh
echo "<PASTE_PUBLIC_KEY>" >> /home/frappe/.ssh/authorized_keys
chmod 700 /home/frappe/.ssh
chmod 600 /home/frappe/.ssh/authorized_keys
chown -R frappe:frappe /home/frappe/.ssh
```

- [ ] **Step 6: Verify key-based SSH works from control server**
On the **control server**:
```bash
ssh -i ~/.ssh/id_fateh_saas frappe@<NEW_VPS_IP> "echo OK"
```
Expected output: `OK`

- [ ] **Step 7: Commit — note server IP in fateh-admin servers table later**
No code commit — document the VPS IP for Task 8.

---

### Task 2: Install MariaDB and Redis

- [ ] **Step 1: Install MariaDB 10.6**
```bash
curl -sS https://downloads.mariadb.com/MariaDB/mariadb_repo_setup | bash
apt install -y mariadb-server mariadb-client
systemctl enable mariadb
systemctl start mariadb
```

- [ ] **Step 2: Secure MariaDB**
```bash
mysql_secure_installation
# Set root password, remove anonymous users, disallow remote root, remove test db
```

- [ ] **Step 3: Configure MariaDB for Frappe**

First check available RAM and set buffer pool to ~30% of total:
```bash
free -h
# Example: 30GB RAM → set innodb_buffer_pool_size = 8G
# Example:  8GB RAM → set innodb_buffer_pool_size = 2G
```

```bash
cat > /etc/mysql/mariadb.conf.d/frappe.cnf << 'EOF'
[mysqld]
character-set-client-handshake = FALSE
character-set-server = utf8mb4
collation-server = utf8mb4_unicode_ci
innodb_file_per_table = 1
innodb_buffer_pool_size = 8G
max_allowed_packet = 256M
EOF
systemctl restart mariadb
```
Adjust `innodb_buffer_pool_size` to match your VPS RAM — do not hardcode 1G on a 30GB server.

- [ ] **Step 4: Install Redis**
```bash
apt install -y redis-server
systemctl enable redis-server
systemctl start redis-server
redis-cli ping
```
Expected: `PONG`

---

### Task 3: Install Python, Node.js, and Bench Dependencies

- [ ] **Step 1: Install Python 3.11 and pip**
```bash
apt install -y python3.11 python3.11-dev python3-pip python3.11-venv
python3.11 --version
```
Expected: `Python 3.11.x`

- [ ] **Step 2: Install Node.js 18**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
apt install -y nodejs
node --version && npm --version
```
Expected: `v18.x.x` and `9.x.x`

- [ ] **Step 3: Install wkhtmltopdf and other Frappe dependencies**
```bash
apt install -y libssl-dev libffi-dev libpq-dev
wget https://github.com/wkhtmltopdf/packaging/releases/download/0.12.6.1-3/wkhtmltox_0.12.6.1-3.jammy_amd64.deb
apt install -y ./wkhtmltox_0.12.6.1-3.jammy_amd64.deb
wkhtmltopdf --version
```

- [ ] **Step 4: Install bench as frappe user (pin version)**
```bash
su - frappe
pip3 install frappe-bench==5.22.6
bench --version
```
Expected: `5.22.6` — pin the version to avoid silent upgrades to bench v6 which has breaking `bench init` changes.

---

### Task 4: Create Frappe Bench and Install ERPNext v15

All commands in this task run as the `frappe` user unless otherwise stated.

- [ ] **Step 1: Initialise bench**
```bash
su - frappe
bench init frappe-bench --frappe-branch version-15 --python python3.11
cd frappe-bench
```

- [ ] **Step 2: Get ERPNext v15**
```bash
bench get-app erpnext --branch version-15
```

- [ ] **Step 3: Get ksa_compliance**
```bash
bench get-app https://github.com/lavaloon-eg/ksa_compliance.git
```

- [ ] **Step 4: Get enfono_saas**
```bash
bench get-app https://github.com/sayanthns/enfono_saas.git
```

- [ ] **Step 5: Verify all apps are present**
```bash
ls apps/
```
Expected: `frappe  erpnext  ksa_compliance  enfono_saas`

---

### Task 5: Configure Frappe for Multi-Site Routing (Critical)

- [ ] **Step 1: Set multi-site config — must be done BEFORE creating any sites**
```bash
# As frappe user inside frappe-bench/
bench set-config -g serve_default_site false
bench set-config -g rebase_on_host true
```

- [ ] **Step 2: Verify settings written to common_site_config.json**
```bash
cat sites/common_site_config.json | python3 -m json.tool
```
Expected JSON must contain:
```json
{
  "serve_default_site": false,
  "rebase_on_host": true
}
```
If these keys are missing, Frappe will serve the same site for ALL subdomains, completely breaking multi-tenancy.

- [ ] **Step 3: Set up systemd (Ubuntu 22.04 — do NOT also run setup supervisor)**
```bash
# As root — use systemd ONLY. Do not also run "bench setup supervisor".
# Running both creates duplicate gunicorn workers on the same port.
sudo env PATH=$PATH:/home/frappe/.local/bin bench --user frappe setup systemd
sudo systemctl enable frappe-bench.target
sudo systemctl start frappe-bench.target
sudo systemctl status frappe-bench.target
```
Expected: `Active: active`

---

### Task 6: Install Caddy with Cloudflare DNS Module

All commands run as root.

- [ ] **Step 1: Install Go (needed to build xcaddy)**
```bash
apt install -y golang-go
go version
```
Expected: `go version go1.21.x`

- [ ] **Step 2: Install xcaddy and build Caddy with Cloudflare module**
```bash
go install github.com/caddyserver/xcaddy/cmd/xcaddy@latest
~/go/bin/xcaddy build --with github.com/caddy-dns/cloudflare
mv caddy /usr/bin/caddy
caddy version
caddy list-modules | grep cloudflare
```
Expected: `dns.providers.cloudflare` in module list

- [ ] **Step 3: Create Cloudflare env file (600 permissions)**
```bash
cat > /etc/caddy/caddy.env << 'EOF'
CF_API_TOKEN=<YOUR_CF_TOKEN_HERE>
EOF
chmod 600 /etc/caddy/caddy.env
```
Replace `<YOUR_CF_TOKEN_HERE>` with the Cloudflare token (Zone → DNS → Edit, fateherp.com zone only).

- [ ] **Step 4: Write the wildcard Caddyfile**
```bash
cat > /etc/caddy/Caddyfile << 'EOF'
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
EOF
```

- [ ] **Step 5: Add EnvironmentFile via systemd drop-in (survives apt upgrades)**
```bash
# Use a drop-in — NOT sed on /lib/systemd/system/caddy.service
# The .service file is overwritten on every apt upgrade caddy; the drop-in survives
mkdir -p /etc/systemd/system/caddy.service.d
cat > /etc/systemd/system/caddy.service.d/env.conf << 'EOF'
[Service]
EnvironmentFile=/etc/caddy/caddy.env
EOF
systemctl daemon-reload
# Verify it's applied
systemctl cat caddy | grep EnvironmentFile
```
Expected: `EnvironmentFile=/etc/caddy/caddy.env` in the output.

- [ ] **Step 6: Validate Caddyfile and start Caddy**
```bash
caddy validate --config /etc/caddy/Caddyfile
systemctl enable caddy
systemctl restart caddy
systemctl status caddy
```
Expected: `Active: active (running)`. If it fails, check `journalctl -u caddy -n 50`.

---

### Task 7: Smoke Test — Create Test Site and Verify Multi-Site Routing

This task proves the entire stack works before fateh-admin provisioning is built.

- [ ] **Step 1: Create a test site**
```bash
su - frappe
cd frappe-bench
bench new-site test.fateherp.com \
  --admin-password TestAdmin@123 \
  --db-name test_fateherp \
  --no-mariadb-socket
```

- [ ] **Step 2: Install apps on test site (in correct order)**
```bash
bench --site test.fateherp.com install-app payments
bench --site test.fateherp.com install-app erpnext
bench --site test.fateherp.com install-app ksa_compliance
bench --site test.fateherp.com install-app enfono_saas
bench --site test.fateherp.com migrate
bench --site test.fateherp.com enable-scheduler
```
Each `install-app` takes 2-5 minutes. Total: ~15 minutes.

- [ ] **Step 3: Manually create DNS A record in Cloudflare**
Go to Cloudflare dashboard → fateherp.com zone → DNS:
- Type: A
- Name: test
- IPv4: `<NEW_VPS_IP>`
- Proxy: OFF (grey cloud — mandatory)
- Save

- [ ] **Step 4: Verify site loads at test.fateherp.com**
```bash
# From any machine
curl -s -o /dev/null -w "%{http_code}" https://test.fateherp.com
```
Expected: `200` or `302` (redirect to login)

Open `https://test.fateherp.com` in browser. Should show Frappe login page with Fateh ERP branding.

- [ ] **Step 5: Verify second site does NOT interfere with first**
```bash
bench new-site test2.fateherp.com --admin-password TestAdmin@123 --db-name test2_fateherp --no-mariadb-socket
# Add DNS A record for test2.fateherp.com → same VPS IP
# Verify test.fateherp.com still loads (no Caddy reload needed!)
curl -s -o /dev/null -w "%{http_code}" https://test.fateherp.com
curl -s -o /dev/null -w "%{http_code}" https://test2.fateherp.com
```
Both should return `200`/`302`. This proves zero-downtime multi-site works.

- [ ] **Step 6: Clean up test sites**
```bash
bench drop-site test.fateherp.com --force
bench drop-site test2.fateherp.com --force
```
Delete the DNS A records from Cloudflare dashboard.

---

### Task 8: Register SaaS Server in fateh-admin

- [ ] **Step 1: Update server-manager on control server to know about new SaaS server**
On the control server, add the new server to server-manager via its UI at `manager.enfonoerp.com`:
- Name: `saas-server-1`
- IP: `<NEW_VPS_IP>`
- SSH user: `frappe`
- SSH key: `/root/.ssh/id_fateh_saas`
- Bench path: `/home/frappe/frappe-bench`

- [ ] **Step 2: Verify server-manager can SSH into new SaaS server**
In the server-manager dashboard, trigger a health check on `saas-server-1`.
Expected: green / connected.

- [ ] **Step 3: Note the server-manager server ID for fateh-admin**
The server-manager assigns an internal ID (e.g., `srv_abc123`) to the new server.
This ID is what fateh-admin's `servers.sm_server_id` field will reference.

---

### ✅ Phase 1 Complete

At this point:
- SaaS server is running with Frappe bench (ERPNext v15 + ksa_compliance + enfono_saas)
- Caddy wildcard SSL is active for `*.fateherp.com`
- Multi-site routing confirmed working with zero-downtime
- SSH key auth from control server to SaaS server is working
- Server-manager knows about the new server

Proceed to: `2026-03-23-fateh-admin-v2.md`
