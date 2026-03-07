# Enfono Website - Backup & Restore Guide

This document outlines the automated and manual procedures for backing up and restoring the Enfono Website v2 (CMS, Database, and Assets).

---

## 1. Backup System Overview

- **Storage**: Wasabi S3 (`s3.wasabisys.com`)
- **Bucket**: `enfono-backups`
- **Retention**: 5-Day Rolling History (Automated)
- **Local Path**: `/var/www/enfono-website-v2/backups` (Keeps only latest backup)

---

## 2. Automated Backups (Cron)

The system is scheduled to perform a full backup every day at **2:00 AM**.

- **Script Location**: `/var/www/enfono-website-v2/scripts/backup_wasabi.sh`
- **Logs**: `/var/www/enfono-website-v2/backups/backup_log.txt`

To check the automation schedule:
```bash
crontab -l
```

---

## 3. Manual Backup

To trigger an immediate backup and upload to Wasabi:
```bash
bash /var/www/enfono-website-v2/scripts/backup_wasabi.sh
```

---

## 4. Restoration Process

In the event of data loss or server migration, follow these steps:

### Step A: Download the Backup
Identify the desired backup file from the Wasabi Console or via `rclone`:
```bash
# List available backups on Wasabi
rclone ls wasabi:enfono-backups/daily/

# Download a specific backup (Replace <FILENAME> with the actual zip name)
rclone copy wasabi:enfono-backups/daily/<FILENAME> ./restoration/
```

### Step B: Unpack the Archive
```bash
cd restoration/
tar -xzf <FILENAME>
# This will extract 'db_TIMESTAMP.sql' and 'files_TIMESTAMP.tar.gz'
```

### Step C: Restore the Database (PostgreSQL)
1. Ensure the containers are running: `docker compose up -d`
2. Import the SQL dump:
```bash
# Replace <DB_FILE> with the extracted .sql file
cat <DB_FILE> | docker exec -i enfono-db-v2 psql -U enfono -d enfono_cms
```

### Step D: Restore Uploaded Files (Images/PDFs)
1. Extract the files archive:
```bash
tar -xzf files_TIMESTAMP.tar.gz
```
2. Move the `uploads` folder back to the server directory:
```bash
cp -r uploads/* /var/www/enfono-website-v2/server/uploads/
```

---

## 5. Maintenance & Troubleshooting

### Check Connection to Wasabi
```bash
rclone lsd wasabi:/
```

### View Last Backup Log
```bash
tail -n 20 /var/www/enfono-website-v2/backups/backup_log.txt
```

### Rclone Credentials
If keys change, update them using:
```bash
rclone config
```
Choose `Edit existing remote` -> `wasabi`.
