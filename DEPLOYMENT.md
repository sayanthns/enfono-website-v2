# Enfono Website - Deployment Guide

This project uses an isolated dual-environment architecture to ensure stability.

## Environments

| Environment | Domain | Port | Path | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| **Development** | [v2.enfono.com](https://v2.enfono.com) | 3005 | `/var/www/enfono-website-v2` | Staging, Testing, Content Drafts |
| **Production** | [enfono.com](https://enfono.com) | 3006 | `/var/www/enfono-website-prod` | Live Site (Ads & Clients) |

---

## Deployment Workflow

### 1. Push Code to Dev
When you update the code on GitHub, pull it into the Dev folder:
```bash
cd /var/www/enfono-website-v2
git pull origin main
docker compose up -d --build
```

### 2. Update Content
Make your changes (Blogs, Leads, Images) via the [Admin Panel](https://v2.enfono.com/admin).

### 3. Approval
Review the changes at `v2.enfono.com`. Ensure the AI Chatbot and all links are working.

### 4. Promote to Production
Once approved, run the promotion script to sync EVERYTHING (Code, Database, and Media) to the live site:
```bash
bash /var/www/enfono-website-v2/scripts/promote_to_prod.sh
```

---

## Maintenance & Recovery

### Daily Backups
Backups run automatically at **2:00 AM** and are stored on Wasabi S3.
- Log location: `/var/www/enfono-website-v2/backups/backup_log.txt`

### Manual Backup
To run a backup manually at any time:
```bash
bash /var/www/enfono-website-v2/scripts/backup_wasabi.sh
```
