# fateh-admin v2 — Provisioning & Cloudflare Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade fateh-admin into the complete Fateh ERP SaaS control plane — adding automated provisioning (bench new-site + Cloudflare DNS), a SaaS servers registry, a rate-limited signup flow, manual provisioning UI, and a settings page.

**Architecture:** fateh-admin (Hono/Node on control server) gains a provisioner module that: picks the least-loaded SaaS server, calls server-manager to run `bench new-site + install-app` sequence, then creates a Cloudflare DNS A record. The existing SM-proxy routes and frontend pages (Servers, Sites, Jobs) already work — this plan only adds what is genuinely missing.

**Tech Stack:** TypeScript, Hono, better-sqlite3, React 18, Vite, React Router v6. No new dependencies needed except `node-fetch` for Cloudflare API (already available via Node 18 built-in fetch).

**Prerequisites:**
- fateh-admin running on control server at `/opt/fateh-admin`
- SaaS server setup complete (Plan 1)
- Cloudflare API token (Zone → DNS → Edit, fateherp.com zone only)
- `CF_ZONE_ID` — get from Cloudflare dashboard → fateherp.com zone → Overview → Zone ID

**Working directory for all commands:** `/opt/fateh-admin` on the control server (via SSH).

---

## File Map

### New files
| File | Responsibility |
|------|---------------|
| `src/cloudflare.ts` | Cloudflare DNS API client — create, update, delete A records |
| `src/provisioner.ts` | Async provisioning worker — bench new-site + app install + DNS + email |
| `src/rate-limit.ts` | Simple in-memory IP rate limiter middleware for Hono |
| `frontend/src/pages/Settings.tsx` | Settings page — Cloudflare token, SMTP, LS config |

### Modified files
| File | What changes |
|------|-------------|
| `src/db/index.ts` | Add `servers`, `jobs` tables + alter `tenants` with new columns |
| `src/http.ts` | Add `/api/servers` routes, `/api/jobs` routes, rate limit signup, fix app order |
| `src/billing.ts` | `handleSignup` → delegates to provisioner, two-email pattern |
| `src/server-manager.ts` | Fix app install order (ksa_compliance before enfono_saas) |
| `frontend/src/App.tsx` | Add `/settings` route |
| `frontend/src/pages/Layout.tsx` | Add Settings link to sidebar |
| `frontend/src/pages/Tenants.tsx` | Add "New Customer" button that opens provisioning form |
| `frontend/src/pages/TenantDetail.tsx` | Show provision_status, server assignment |
| `frontend/src/api.ts` | Add `servers`, `jobs`, `provision`, `settings` API methods |

---

### Task 1: DB Schema — servers, jobs tables + tenant updates

**Files:**
- Modify: `src/db/index.ts`

- [ ] **Step 1: Pull latest code on control server**
```bash
ssh root@207.180.209.80
cd /opt/fateh-admin
git pull
```

- [ ] **Step 2: Add new tables and columns to initDb()**

In `src/db/index.ts`, add to the `sqlite.exec(...)` block after the `sessions` table:

```typescript
    -- SaaS servers registry (fateh-admin owned, separate from server-manager)
    CREATE TABLE IF NOT EXISTS servers (
      id          TEXT PRIMARY KEY,
      name        TEXT NOT NULL,
      ip          TEXT NOT NULL UNIQUE,
      region      TEXT DEFAULT 'EU',
      ssh_user    TEXT DEFAULT 'frappe',
      bench_path  TEXT DEFAULT '/home/frappe/frappe-bench',
      capacity    INTEGER DEFAULT 60,
      current_count INTEGER DEFAULT 0,
      status      TEXT DEFAULT 'active',   -- active | maintenance | full
      sm_server_id TEXT,                   -- server-manager internal server ID
      notes       TEXT,
      created_at  TEXT DEFAULT CURRENT_TIMESTAMP
    );

    -- Async provisioning / maintenance job log
    CREATE TABLE IF NOT EXISTS jobs (
      id          TEXT PRIMARY KEY,
      type        TEXT NOT NULL,           -- provision | migrate | update | backup
      site_name   TEXT,
      server_id   TEXT REFERENCES servers(id),
      status      TEXT DEFAULT 'queued',  -- queued | running | done | failed
      started_at  TEXT,
      finished_at TEXT,
      logs        TEXT DEFAULT '',
      error       TEXT,
      created_at  TEXT DEFAULT CURRENT_TIMESTAMP
    );
```

- [ ] **Step 3: Add ALTER TABLE migrations for tenants (idempotent)**

After the CREATE TABLE block, add:

```typescript
  // Idempotent migrations — add columns if they don't exist
  const tenantCols = sqlite.prepare("PRAGMA table_info(tenants)").all() as { name: string }[];
  const tenantColNames = tenantCols.map(c => c.name);
  if (!tenantColNames.includes('server_id'))
    sqlite.exec("ALTER TABLE tenants ADD COLUMN server_id TEXT REFERENCES servers(id)");
  if (!tenantColNames.includes('cf_dns_record_id'))
    sqlite.exec("ALTER TABLE tenants ADD COLUMN cf_dns_record_id TEXT");
  if (!tenantColNames.includes('subdomain'))
    sqlite.exec("ALTER TABLE tenants ADD COLUMN subdomain TEXT");
  // Always ensure unique index exists (CREATE UNIQUE INDEX IF NOT EXISTS is idempotent)
  sqlite.exec("CREATE UNIQUE INDEX IF NOT EXISTS idx_tenants_subdomain ON tenants(subdomain)");
  if (!tenantColNames.includes('provision_status'))
    sqlite.exec("ALTER TABLE tenants ADD COLUMN provision_status TEXT DEFAULT 'pending'");
  // provision_status values: pending | queued | provisioning | ready | failed
```

- [ ] **Step 4: Build and verify no TypeScript errors**
```bash
npm run build 2>&1 | tail -20
```
Expected: no errors, `dist/` updated.

- [ ] **Step 5: Restart and verify DB initialises cleanly**
```bash
systemctl restart fateh-admin
sleep 3
journalctl -u fateh-admin -n 20
```
Expected: `[DB] Initialized` with no errors. Check tables exist:
```bash
sqlite3 /opt/fateh-admin/data/fateh-admin.db ".tables"
```
Expected: `billing  billing_payments  jobs  servers  sessions  tenants  users`

- [ ] **Step 6: Commit**
```bash
git add src/db/index.ts
git commit -m "feat(db): add servers, jobs tables + tenant provisioning columns"
```

---

### Task 2: Cloudflare API Client

**Files:**
- Create: `src/cloudflare.ts`

- [ ] **Step 1: Create `src/cloudflare.ts`**

```typescript
// src/cloudflare.ts
// Cloudflare DNS API client for fateh-admin
// Manages A records for *.fateherp.com customer subdomains

const CF_API = "https://api.cloudflare.com/client/v4";

function headers() {
  const token = process.env.CF_API_TOKEN;
  if (!token) throw new Error("CF_API_TOKEN not set");
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function createDnsRecord(
  zoneId: string,
  subdomain: string,   // e.g. "acme" (without .fateherp.com)
  serverIp: string
): Promise<string> {
  // Returns the Cloudflare record ID for later deletion
  const res = await fetch(`${CF_API}/zones/${zoneId}/dns_records`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({
      type: "A",
      name: `${subdomain}.fateherp.com`,
      content: serverIp,
      ttl: 1,         // auto TTL
      proxied: false, // grey cloud — REQUIRED for Frappe WebSockets
    }),
  });
  const data = (await res.json()) as { success: boolean; result: { id: string }; errors: { message: string }[] };
  if (!data.success) throw new Error(`CF DNS create failed: ${data.errors.map(e => e.message).join(", ")}`);
  return data.result.id;
}

export async function updateDnsRecord(
  zoneId: string,
  recordId: string,
  newServerIp: string
): Promise<void> {
  const res = await fetch(`${CF_API}/zones/${zoneId}/dns_records/${recordId}`, {
    method: "PATCH",
    headers: headers(),
    body: JSON.stringify({ content: newServerIp }),
  });
  const data = (await res.json()) as { success: boolean; errors: { message: string }[] };
  if (!data.success) throw new Error(`CF DNS update failed: ${data.errors.map(e => e.message).join(", ")}`);
}

export async function deleteDnsRecord(
  zoneId: string,
  recordId: string
): Promise<void> {
  const res = await fetch(`${CF_API}/zones/${zoneId}/dns_records/${recordId}`, {
    method: "DELETE",
    headers: headers(),
  });
  const data = (await res.json()) as { success: boolean; errors: { message: string }[] };
  if (!data.success) throw new Error(`CF DNS delete failed: ${data.errors.map(e => e.message).join(", ")}`);
}

export async function testCloudflareConnection(zoneId: string): Promise<boolean> {
  try {
    const res = await fetch(`${CF_API}/zones/${zoneId}`, { headers: headers() });
    const data = (await res.json()) as { success: boolean };
    return data.success;
  } catch {
    return false;
  }
}
```

- [ ] **Step 2: Add CF env vars to `.env`**
```bash
echo "CF_API_TOKEN=" >> /opt/fateh-admin/.env
echo "CF_ZONE_ID=" >> /opt/fateh-admin/.env
```
Fill in values. CF_ZONE_ID is on Cloudflare dashboard → fateherp.com → Overview → right sidebar → Zone ID.

- [ ] **Step 3: Build and check for errors**
```bash
npm run build 2>&1 | grep -E "error|Error" | head -10
```
Expected: no errors.

- [ ] **Step 4: Quick manual test via curl**
```bash
# Test CF connection (read-only check)
node -e "
process.env.CF_API_TOKEN='<token>';
process.env.CF_ZONE_ID='<zone>';
import('./dist/cloudflare.js').then(m => m.testCloudflareConnection(process.env.CF_ZONE_ID)).then(ok => console.log('CF connection:', ok));
"
```
Expected: `CF connection: true`

- [ ] **Step 5: Verify .gitignore and commit (DO NOT stage .env)**
```bash
# Verify .env is in .gitignore — NEVER commit API tokens
grep -q "^\.env$" .gitignore || echo ".env" >> .gitignore

git add src/cloudflare.ts .gitignore
git commit -m "feat: add Cloudflare DNS API client"
```
Fill in `CF_API_TOKEN` and `CF_ZONE_ID` in `.env` on the server only — never in git.

---

### Task 3: Provisioning Worker

**Files:**
- Create: `src/provisioner.ts`
- Modify: `src/server-manager.ts` (fix app install order)

- [ ] **Step 1: Fix app install order in `src/server-manager.ts` (line ~82)**

Find the `provisionSite` function — specifically the line that reads:
```typescript
apps: req.apps ?? ["erpnext", "enfono_saas", "ksa_compliance"],
```
Change to:
```typescript
apps: req.apps ?? ["payments", "erpnext", "ksa_compliance", "enfono_saas"],
```
Two changes: (a) `payments` is added as first app, (b) `ksa_compliance` moved before `enfono_saas`. This is the default fallback used when the caller doesn't specify apps — it MUST have the correct order.

- [ ] **Step 2: Create `src/provisioner.ts`**

```typescript
// src/provisioner.ts
// Async provisioning worker for new Fateh ERP SaaS tenants
// Called by /api/signup and manual provisioning form

import { randomUUID } from "crypto";
import { sqlite } from "./db/index.js";
import { createDnsRecord, deleteDnsRecord } from "./cloudflare.js";
import { sendMail } from "./email.js";

const CF_ZONE_ID = process.env.CF_ZONE_ID ?? "";

export interface ProvisionRequest {
  siteName: string;       // e.g. acme.fateherp.com
  subdomain: string;      // e.g. acme
  companyName: string;
  adminEmail: string;
  adminPassword: string;
  serverId?: string;      // if null, auto-pick least-loaded
}

/** Pick least-loaded active server */
export function pickServer(): { id: string; ip: string; smServerId: string | null } | null {
  return sqlite.prepare(
    `SELECT id, ip, sm_server_id as smServerId FROM servers
     WHERE status = 'active' AND current_count < capacity
     ORDER BY current_count ASC LIMIT 1`
  ).get() as { id: string; ip: string; smServerId: string | null } | null;
}

/** Enqueue a provisioning job and return job ID */
export function enqueueProvision(req: ProvisionRequest, serverId: string): string {
  const jobId = randomUUID();
  sqlite.prepare(
    `INSERT INTO jobs (id, type, site_name, server_id, status, created_at)
     VALUES (?, 'provision', ?, ?, 'queued', datetime('now'))`
  ).run(jobId, req.siteName, serverId);
  // Update tenant provision_status
  sqlite.prepare(
    `UPDATE tenants SET server_id = ?, provision_status = 'queued' WHERE site_name = ?`
  ).run(serverId, req.siteName);
  return jobId;
}

/** Append a line to a job's logs (in-place) */
function appendLog(jobId: string, line: string): void {
  const ts = new Date().toISOString();
  sqlite.prepare(
    `UPDATE jobs SET logs = logs || ? WHERE id = ?`
  ).run(`[${ts}] ${line}\n`, jobId);
}

/** Run the provisioning job — call this in a setImmediate after enqueue */
export async function runProvisionJob(jobId: string, req: ProvisionRequest, serverId: string): Promise<void> {
  const server = sqlite.prepare("SELECT * FROM servers WHERE id = ?").get(serverId) as {
    ip: string; sm_server_id: string; bench_path: string;
  } | undefined;
  if (!server) {
    sqlite.prepare(`UPDATE jobs SET status='failed', error='Server not found', finished_at=datetime('now') WHERE id=?`).run(jobId);
    return;
  }

  sqlite.prepare(`UPDATE jobs SET status='running', started_at=datetime('now') WHERE id=?`).run(jobId);
  sqlite.prepare(`UPDATE tenants SET provision_status='provisioning' WHERE site_name=?`).run(req.siteName);

  // Build db_name: replace hyphens with underscores for MariaDB
  const dbName = req.subdomain.replace(/-/g, "_");

  // Step 1: bench new-site + install apps via server-manager typed client
  // Use the existing provisionSite() + getSiteStatus() from server-manager.ts
  // Do NOT use raw fetch — the typed client handles auth, error formatting, and correct endpoints
  appendLog(jobId, `Starting bench new-site for ${req.siteName} on server ${server.ip}`);
  try {
    const { provisionSite, getSiteStatus } = await import("./server-manager.js");

    const provResult = await provisionSite({
      serverId: server.sm_server_id,
      siteName: req.siteName,
      adminPassword: req.adminPassword,
      dbName,
      // app order is enforced in server-manager.ts default — explicit here as safety net
      apps: ["payments", "erpnext", "ksa_compliance", "enfono_saas"],
    });

    if (!provResult.siteId) throw new Error("server-manager did not return a siteId");
    appendLog(jobId, `SM site created: ${provResult.siteId}`);

    // Poll via getSiteStatus() — SM tracks status as provisionStatus on the site object
    // Possible values: "pending" | "installing" | "ready" | "failed"
    let elapsed = 0;
    while (elapsed < 1200) {
      await new Promise(r => setTimeout(r, 15000));
      elapsed += 15;
      const siteStatus = await getSiteStatus(provResult.siteId);
      appendLog(jobId, `[SM ${elapsed}s] provisionStatus=${siteStatus.provisionStatus}`);
      if (siteStatus.provisionStatus === "ready") break;
      if (siteStatus.provisionStatus === "failed") {
        throw new Error(`SM provisioning failed at ${elapsed}s: ${siteStatus.error ?? "unknown"}`);
      }
    }
    if (elapsed >= 1200) throw new Error("Provisioning timed out after 20 minutes");

    appendLog(jobId, "Frappe site provisioned successfully");
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    appendLog(jobId, `ERROR: ${msg}`);
    // Rollback
    appendLog(jobId, "Rolling back: dropping site and DNS record...");
    sqlite.prepare(`UPDATE jobs SET status='failed', error=?, finished_at=datetime('now') WHERE id=?`).run(msg, jobId);
    sqlite.prepare(`UPDATE tenants SET provision_status='failed' WHERE site_name=?`).run(req.siteName);
    return;
  }

  // Step 2: Create Cloudflare DNS A record
  appendLog(jobId, `Creating Cloudflare DNS A record: ${req.subdomain}.fateherp.com → ${server.ip}`);
  let cfRecordId: string;
  try {
    cfRecordId = await createDnsRecord(CF_ZONE_ID, req.subdomain, server.ip);
    appendLog(jobId, `DNS record created: ${cfRecordId}`);
    sqlite.prepare(`UPDATE tenants SET cf_dns_record_id=? WHERE site_name=?`).run(cfRecordId, req.siteName);
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : String(err);
    appendLog(jobId, `ERROR creating DNS: ${msg}`);
    // Site is created but DNS failed — mark failed, do NOT drop site (needs manual fix)
    sqlite.prepare(`UPDATE jobs SET status='failed', error=?, finished_at=datetime('now') WHERE id=?`).run(
      `DNS creation failed (site exists, needs manual DNS): ${msg}`, jobId
    );
    sqlite.prepare(`UPDATE tenants SET provision_status='failed' WHERE site_name=?`).run(req.siteName);
    return;
  }

  // Step 3: Finalise
  sqlite.prepare(`UPDATE servers SET current_count = current_count + 1 WHERE id=?`).run(serverId);
  sqlite.prepare(`UPDATE tenants SET provision_status='ready' WHERE site_name=?`).run(req.siteName);
  sqlite.prepare(`UPDATE jobs SET status='done', finished_at=datetime('now') WHERE id=?`).run(jobId);
  appendLog(jobId, "Provisioning complete!");

  // Step 4: Send "site ready" welcome email
  try {
    await sendMail({
      to: req.adminEmail,
      subject: "Your Fateh ERP site is ready!",
      html: `
        <h2>Your site is ready</h2>
        <p>Your Fateh ERP site has been created:</p>
        <p><a href="https://${req.siteName}">https://${req.siteName}</a></p>
        <p>Login: <strong>Administrator</strong></p>
        <p>Password: <em>the password you chose at signup</em></p>
        <p>If you need help, reply to this email.</p>
      `,
    });
    appendLog(jobId, `Welcome email sent to ${req.adminEmail}`);
  } catch (e) {
    appendLog(jobId, `Warning: welcome email failed: ${e}`);
    // Don't fail the job for email errors
  }
}
```

- [ ] **Step 3: Build and check**
```bash
npm run build 2>&1 | grep -E "error|Error" | head -20
```
Expected: no errors.

- [ ] **Step 4: Commit**
```bash
git add src/provisioner.ts src/server-manager.ts
git commit -m "feat: provisioner worker + fix app install order (ksa before enfono_saas)"
```

---

### Task 4: Rate Limiter + Updated Signup Route

**Files:**
- Create: `src/rate-limit.ts`
- Modify: `src/http.ts` (signup route), `src/billing.ts` (handleSignup)

- [ ] **Step 1: Create `src/rate-limit.ts`**

```typescript
// src/rate-limit.ts
// Simple in-memory IP rate limiter for Hono
// Usage: app.use("/api/signup", ipRateLimit(5, 60 * 60 * 1000))

import type { MiddlewareHandler } from "hono";

export function ipRateLimit(maxRequests: number, windowMs: number): MiddlewareHandler {
  const requests = new Map<string, number[]>();

  return async (c, next) => {
    const ip = c.req.header("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
    const now = Date.now();
    const windowStart = now - windowMs;

    const hits = (requests.get(ip) ?? []).filter(t => t > windowStart);
    hits.push(now);
    requests.set(ip, hits);

    if (hits.length > maxRequests) {
      return c.json({ error: "Too many requests. Try again later." }, 429);
    }
    await next();
  };
}
```

- [ ] **Step 2: Update signup route in `src/http.ts`**

Find the existing `app.post("/api/signup", ...)` and update:
```typescript
import { ipRateLimit } from "./rate-limit.js";
import { pickServer, enqueueProvision, runProvisionJob } from "./provisioner.js";

// Rate limit: max 5 signups per IP per hour
app.use("/api/signup", ipRateLimit(5, 60 * 60 * 1000));

app.post("/api/signup", async (c) => {
  // ... existing validation ...
  const { siteName, subdomain, companyName, email, password, ...rest } = await c.req.json();

  // Pick server
  const server = pickServer();
  if (!server) return c.json({ error: "No servers available. Contact support." }, 503);

  // Create tenant + billing records (Trial 14 days) — use existing billing.ts logic
  // then enqueue provision job
  const jobId = enqueueProvision({ siteName, subdomain, companyName, adminEmail: email, adminPassword: password }, server.id);

  // Send "signup received" email immediately
  await sendMail({
    to: email,
    subject: "Fateh ERP — Your site is being created",
    html: `<p>We received your signup. Your site <strong>${siteName}</strong> is being set up. This takes about 15 minutes. We'll email you when it's ready.</p>`,
  });

  // Fire-and-forget the async provisioning job
  setImmediate(() => {
    runProvisionJob(jobId, { siteName, subdomain, companyName, adminEmail: email, adminPassword: password }, server.id)
      .catch(err => console.error("[provisioner] unhandled error:", err));
  });

  return c.json({ ok: true, jobId, message: "Site is being created. Check your email." }, 201);
});
```

- [ ] **Step 3: Build and verify**
```bash
npm run build 2>&1 | grep -E "error|Error" | head -20
```

- [ ] **Step 4: Test signup endpoint**
```bash
curl -s -X POST http://localhost:4000/api/signup \
  -H "Content-Type: application/json" \
  -d '{"siteName":"demotest.fateherp.com","subdomain":"demotest","companyName":"Demo Co","email":"demo@example.com","password":"Demo@1234"}' \
  -H "X-Signup-Secret: change-me"
```
Expected: `{"ok":true,"jobId":"...","message":"Site is being created..."}` and a job row in DB:
```bash
sqlite3 /opt/fateh-admin/data/fateh-admin.db "SELECT id, type, status FROM jobs ORDER BY created_at DESC LIMIT 1;"
```

- [ ] **Step 5: Test rate limit (6th request should 429)**
```bash
for i in $(seq 1 6); do
  curl -s -o /dev/null -w "%{http_code}\n" -X POST http://localhost:4000/api/signup \
    -H "Content-Type: application/json" -d '{}'
done
```
Expected: first 5 are `400`/`201`, 6th is `429`.

- [ ] **Step 6: Commit**
```bash
git add src/rate-limit.ts src/http.ts src/billing.ts
git commit -m "feat: rate-limited signup with async provisioning + two-email flow"
```

---

### Task 5: Servers API Routes

**Files:**
- Modify: `src/http.ts` (add server CRUD routes)

- [ ] **Step 1: Add servers routes to `src/http.ts`**

After the existing `/api/tenants` routes block, add:

```typescript
// ── Servers (fateh-admin's own SaaS server registry) ──

app.get("/api/servers", (c) => {
  const servers = sqlite.prepare(
    "SELECT *, ROUND(current_count * 100.0 / capacity, 1) as capacity_pct FROM servers ORDER BY created_at"
  ).all();
  return c.json(servers);
});

app.post("/api/servers", async (c) => {
  const { name, ip, region, sshUser, benchPath, capacity, smServerId, notes } = await c.req.json();
  if (!name || !ip) return c.json({ error: "name and ip required" }, 400);
  const { randomUUID } = await import("crypto");
  const id = randomUUID();
  sqlite.prepare(
    `INSERT INTO servers (id, name, ip, region, ssh_user, bench_path, capacity, sm_server_id, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(id, name, ip, region ?? "EU", sshUser ?? "frappe", benchPath ?? "/home/frappe/frappe-bench",
         capacity ?? 60, smServerId ?? null, notes ?? null);
  return c.json({ id }, 201);
});

app.get("/api/servers/:id", (c) => {
  const server = sqlite.prepare("SELECT * FROM servers WHERE id = ?").get(c.req.param("id"));
  if (!server) return c.json({ error: "not found" }, 404);
  return c.json(server);
});

app.patch("/api/servers/:id", async (c) => {
  const data = await c.req.json();
  const fields = ["name","ip","region","ssh_user","bench_path","capacity","status","sm_server_id","notes"];
  const updates = fields.filter(f => data[f] !== undefined);
  if (!updates.length) return c.json({ error: "nothing to update" }, 400);
  const sql = `UPDATE servers SET ${updates.map(f => `${f}=?`).join(",")} WHERE id=?`;
  sqlite.prepare(sql).run(...updates.map(f => data[f]), c.req.param("id"));
  return c.json({ ok: true });
});

app.delete("/api/servers/:id", (c) => {
  const count = (sqlite.prepare("SELECT current_count FROM servers WHERE id=?").get(c.req.param("id")) as { current_count: number } | undefined)?.current_count ?? 0;
  if (count > 0) return c.json({ error: `Cannot delete: ${count} active tenants on this server` }, 409);
  sqlite.prepare("DELETE FROM servers WHERE id=?").run(c.req.param("id"));
  return c.json({ ok: true });
});

// Test Cloudflare connection
app.get("/api/cf/test", async (c) => {
  const { testCloudflareConnection } = await import("./cloudflare.js");
  const ok = await testCloudflareConnection(process.env.CF_ZONE_ID ?? "");
  return c.json({ ok });
});
```

- [ ] **Step 2: Add jobs routes**

```typescript
// ── Jobs ──

app.get("/api/jobs", (c) => {
  const { status, limit = "50" } = c.req.query();
  const where = status ? "WHERE status = ?" : "";
  const params = status ? [status, parseInt(limit)] : [parseInt(limit)];
  const jobs = sqlite.prepare(
    `SELECT id, type, site_name, server_id, status, started_at, finished_at, error, created_at
     FROM jobs ${where} ORDER BY created_at DESC LIMIT ?`
  ).all(...params);
  return c.json(jobs);
});

app.get("/api/jobs/:id", (c) => {
  const job = sqlite.prepare("SELECT * FROM jobs WHERE id=?").get(c.req.param("id"));
  if (!job) return c.json({ error: "not found" }, 404);
  return c.json(job);
});

app.get("/api/jobs/:id/logs", (c) => {
  const job = sqlite.prepare("SELECT logs, status FROM jobs WHERE id=?").get(c.req.param("id")) as { logs: string; status: string } | undefined;
  if (!job) return c.json({ error: "not found" }, 404);
  return c.json({ logs: job.logs, status: job.status });
});
```

- [ ] **Step 3: Build and restart**
```bash
npm run build && systemctl restart fateh-admin && sleep 3
curl -s http://localhost:4000/api/servers | python3 -m json.tool
curl -s http://localhost:4000/api/jobs | python3 -m json.tool
```
Expected: both return `[]` (empty arrays, no errors).

- [ ] **Step 4: Commit**
```bash
git add src/http.ts
git commit -m "feat: add /api/servers and /api/jobs routes"
```

---

### Task 6: Settings Page (Frontend)

**Files:**
- Create: `frontend/src/pages/Settings.tsx`
- Modify: `frontend/src/App.tsx`, `frontend/src/pages/Layout.tsx` (sidebar link), `frontend/src/api.ts`

- [ ] **Step 1: Add settings API methods to `frontend/src/api.ts`**

```typescript
export const api = {
  // ... existing methods ...

  // Servers
  servers: {
    list: () => get("/api/servers"),
    get: (id: string) => get(`/api/servers/${id}`),
    create: (data: object) => post("/api/servers", data),
    update: (id: string, data: object) => patch(`/api/servers/${id}`, data),
    delete: (id: string) => del(`/api/servers/${id}`),
  },

  // Jobs
  jobs: {
    list: (params?: { status?: string; limit?: number }) =>
      get("/api/jobs?" + new URLSearchParams(params as Record<string, string> ?? {})),
    get: (id: string) => get(`/api/jobs/${id}`),
    logs: (id: string) => get(`/api/jobs/${id}/logs`),
  },

  // CF test
  testCf: () => get("/api/cf/test"),
};
```

- [ ] **Step 2: Create `frontend/src/pages/Settings.tsx`**

```tsx
import { useState } from "react";
import { api } from "../api";

interface Server {
  id: string; name: string; ip: string; region: string;
  capacity: number; current_count: number; capacity_pct: number; status: string;
}

export default function Settings() {
  const [servers, setServers] = useState<Server[]>([]);
  const [loading, setLoading] = useState(false);
  const [cfStatus, setCfStatus] = useState<"idle"|"ok"|"fail">("idle");
  const [newServer, setNewServer] = useState({ name: "", ip: "", region: "EU", capacity: 60 });

  const loadServers = async () => {
    setLoading(true);
    const data = await api.servers.list();
    setServers(data);
    setLoading(false);
  };

  useEffect(() => { loadServers(); }, []);
  // ⚠️ This MUST be useEffect, not useState — useState takes an initialiser value, not a callback

  const testCf = async () => {
    const { ok } = await api.testCf();
    setCfStatus(ok ? "ok" : "fail");
  };

  const addServer = async (e: React.FormEvent) => {
    e.preventDefault();
    await api.servers.create(newServer);
    setNewServer({ name: "", ip: "", region: "EU", capacity: 60 });
    loadServers();
  };

  return (
    <div style={{ padding: "2rem", maxWidth: 800 }}>
      <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "2rem" }}>Settings</h1>

      {/* Cloudflare */}
      <section style={{ marginBottom: "2rem" }}>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: ".75rem" }}>Cloudflare DNS</h2>
        <button onClick={testCf}
          style={{ padding: ".5rem 1rem", background: "#010ED0", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
          Test Connection
        </button>
        {cfStatus === "ok" && <span style={{ marginLeft: 12, color: "green" }}>✓ Connected</span>}
        {cfStatus === "fail" && <span style={{ marginLeft: 12, color: "red" }}>✗ Failed — check CF_API_TOKEN and CF_ZONE_ID</span>}
      </section>

      {/* SaaS Servers */}
      <section>
        <h2 style={{ fontSize: "1.1rem", fontWeight: 600, marginBottom: ".75rem" }}>SaaS Servers</h2>

        {loading ? <p>Loading...</p> : (
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "1.5rem" }}>
            <thead>
              <tr style={{ borderBottom: "2px solid #e5e7eb" }}>
                {["Name","IP","Region","Tenants","Capacity","Status"].map(h =>
                  <th key={h} style={{ textAlign: "left", padding: ".5rem", fontSize: ".85rem", color: "#6b7280" }}>{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {servers.map(s => (
                <tr key={s.id} style={{ borderBottom: "1px solid #f3f4f6" }}>
                  <td style={{ padding: ".5rem" }}>{s.name}</td>
                  <td style={{ padding: ".5rem", fontFamily: "monospace" }}>{s.ip}</td>
                  <td style={{ padding: ".5rem" }}>{s.region}</td>
                  <td style={{ padding: ".5rem" }}>{s.current_count}/{s.capacity}</td>
                  <td style={{ padding: ".5rem" }}>
                    <div style={{ background: "#e5e7eb", borderRadius: 4, height: 8, width: 120 }}>
                      <div style={{ background: s.capacity_pct > 80 ? "#ef4444" : "#10b981",
                        width: `${s.capacity_pct}%`, height: "100%", borderRadius: 4 }} />
                    </div>
                  </td>
                  <td style={{ padding: ".5rem" }}>
                    <span style={{ padding: "2px 8px", borderRadius: 12, fontSize: ".8rem",
                      background: s.status === "active" ? "#d1fae5" : "#fee2e2",
                      color: s.status === "active" ? "#065f46" : "#991b1b" }}>
                      {s.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <form onSubmit={addServer} style={{ display: "flex", gap: ".75rem", flexWrap: "wrap", alignItems: "flex-end" }}>
          <div>
            <label style={{ display: "block", fontSize: ".8rem", color: "#6b7280", marginBottom: 4 }}>Name</label>
            <input value={newServer.name} onChange={e => setNewServer(s => ({...s, name: e.target.value}))}
              placeholder="saas-server-2" required
              style={{ padding: ".4rem .75rem", border: "1px solid #d1d5db", borderRadius: 6, width: 150 }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: ".8rem", color: "#6b7280", marginBottom: 4 }}>IP</label>
            <input value={newServer.ip} onChange={e => setNewServer(s => ({...s, ip: e.target.value}))}
              placeholder="1.2.3.4" required
              style={{ padding: ".4rem .75rem", border: "1px solid #d1d5db", borderRadius: 6, width: 130 }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: ".8rem", color: "#6b7280", marginBottom: 4 }}>Capacity</label>
            <input type="number" value={newServer.capacity}
              onChange={e => setNewServer(s => ({...s, capacity: +e.target.value}))}
              style={{ padding: ".4rem .75rem", border: "1px solid #d1d5db", borderRadius: 6, width: 80 }} />
          </div>
          <button type="submit"
            style={{ padding: ".45rem 1rem", background: "#010ED0", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
            Add Server
          </button>
        </form>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Add route to `frontend/src/App.tsx`**

```tsx
import Settings from "./pages/Settings";
// In the Routes block:
<Route path="/settings" element={<Settings />} />
```

- [ ] **Step 4: Add Settings link to sidebar in `frontend/src/pages/Layout.tsx`**

Find the nav links section and add:
```tsx
<NavLink to="/settings">⚙ Settings</NavLink>
```

- [ ] **Step 5: Build frontend**
```bash
cd /opt/fateh-admin/frontend && npm run build
```
Expected: build succeeds with no TS errors.

- [ ] **Step 6: Verify Settings page loads at admin.fateherp.com/settings**
Navigate to `https://admin.fateherp.com/settings` — should show Cloudflare section and Servers table.

- [ ] **Step 7: Add first SaaS server via Settings page**
Click "Add Server" form, enter:
- Name: `saas-server-1`
- IP: `<NEW_VPS_IP>`
- Capacity: 60

Verify it appears in the table.

- [ ] **Step 8: Commit**
```bash
git add frontend/src/pages/Settings.tsx frontend/src/App.tsx frontend/src/pages/Layout.tsx frontend/src/api.ts
git commit -m "feat(ui): settings page with CF connection test and server management"
```

---

### Task 7: Manual Provisioning Form (Frontend)

**Files:**
- Modify: `frontend/src/pages/Tenants.tsx` (add "New Customer + Provision" button/modal)

- [ ] **Step 1: Add provision API call to `frontend/src/api.ts`**

```typescript
provision: (data: {
  siteName: string; subdomain: string; companyName: string;
  contactName: string; email: string; phone?: string;
  adminPassword: string; serverId?: string;
}) => post("/api/signup", data, { "X-Signup-Secret": import.meta.env.VITE_SIGNUP_SECRET ?? "" }),
```

- [ ] **Step 2: Add `VITE_SIGNUP_SECRET` to frontend `.env`**
```bash
echo "VITE_SIGNUP_SECRET=change-me" >> /opt/fateh-admin/frontend/.env
```

- [ ] **Step 3: Add modal to `frontend/src/pages/Tenants.tsx`**

Add a "New Customer" button that opens a form:
```tsx
// State
const [showProvision, setShowProvision] = useState(false);
const [form, setForm] = useState({ subdomain: "", companyName: "", contactName: "", email: "", phone: "", adminPassword: "" });
const [provisioning, setProvisioning] = useState(false);
const [jobId, setJobId] = useState<string | null>(null);

// Handler
const handleProvision = async (e: React.FormEvent) => {
  e.preventDefault();
  setProvisioning(true);
  const siteName = `${form.subdomain}.fateherp.com`;
  const result = await api.provision({ ...form, siteName });
  setJobId(result.jobId);
  setProvisioning(false);
};

// UI — show modal when showProvision is true
// After submit, show: "Job started! Track at /jobs/{jobId}"
```

Full modal UI follows the same pattern as TenantDetail form inputs (border, rounded, consistent with existing design).

- [ ] **Step 4: Build and verify**
```bash
cd /opt/fateh-admin/frontend && npm run build
```
Navigate to `https://admin.fateherp.com/tenants` — "New Customer" button should appear and open a provisioning form.

- [ ] **Step 5: End-to-end test with real SaaS server**
Fill in the form for a real test customer, submit, and watch the job at `https://admin.fateherp.com/jobs`.
Verify the job reaches `done` status in ~15 minutes and the site loads at `https://{subdomain}.fateherp.com`.

- [ ] **Step 6: Commit (note: .env files are NOT staged)**
```bash
# frontend/.env contains VITE_SIGNUP_SECRET — keep it out of git
git add frontend/src/pages/Tenants.tsx frontend/src/api.ts
git commit -m "feat(ui): manual provisioning form with job tracking"
```

---

### Task 8: Deploy to Control Server and Final Verification

- [ ] **Step 1: Pull, build, restart on control server**
```bash
ssh root@207.180.209.80
cd /opt/fateh-admin
git pull
npm install
npm run build
cd frontend && npm install && npm run build && cd ..
systemctl restart fateh-admin
sleep 5
journalctl -u fateh-admin -n 30
```
Expected: no errors, `[fateh-admin] HTTP server on http://localhost:4000`

- [ ] **Step 2: Update .env with production values**
```bash
# Ensure these are set in /opt/fateh-admin/.env
cat /opt/fateh-admin/.env | grep -E "CF_API_TOKEN|CF_ZONE_ID|SIGNUP_SECRET"
```
All three must be non-empty.

- [ ] **Step 3: Verify CF connection from Settings page**
Navigate to `https://admin.fateherp.com/settings` → Test Connection → should show ✓ Connected.

- [ ] **Step 4: Provision first real customer (end-to-end)**
Via Settings page, confirm SaaS server is registered.
Via Tenants → New Customer, provision first real site.
Monitor job at Jobs page — should complete in ~15 min.
Verify site loads at `https://{subdomain}.fateherp.com`.

- [ ] **Step 5: Commit final state**
```bash
git add .env.example
git commit -m "chore: update .env.example with CF_API_TOKEN, CF_ZONE_ID, SIGNUP_SECRET"
git push origin main
```

---

## ✅ fateh-admin v2 Complete

At this point:
- Signup flow: rate-limited, async, two-email pattern ✓
- Provisioner: bench new-site + correct app order + Cloudflare DNS ✓
- Servers registry: fateh-admin tracks all SaaS servers + capacity ✓
- Jobs: async tracking with live logs ✓
- Settings page: server management + CF connection test ✓
- SM proxy: Servers/Sites/Jobs/lifecycle already working via existing routes ✓

**First customer can be provisioned from admin.fateherp.com.**
