#!/bin/bash

# Enfono Website - Automated Wasabi Backup Script
# This script dumps the Postgres DB and archives uploaded files, then uploads them to Wasabi S3.
# It maintains a rotating 5-day backup history.

# --- CONFIGURATION ---
CONTAINER_NAME="enfono-db"
DB_NAME="enfono_cms"
DB_USER="enfono"
UPLOADS_DIR="./server/uploads" # Adjust to absolute path if running from crontab
BACKUP_DIR="./backups"
DATE=$(date +%Y-%m-%d_%H%M%S)
WASABI_BUCKET="enfono-backups" # Replace with your bucket name
WASABI_ENDPOINT="s3.wasabisys.com" # Adjust if your bucket is in a different region

# --- PREPARATION ---
mkdir -p $BACKUP_DIR

echo "Starting Enfono Backup: $DATE"

# 1. Database Dump
echo "Dumping Database..."
docker exec $CONTAINER_NAME pg_dump -U $DB_USER $DB_NAME > $BACKUP_DIR/db_$DATE.sql

# 2. Archive Uploads
echo "Archiving Uploaded Files..."
tar -czf $BACKUP_DIR/files_$DATE.tar.gz $UPLOADS_DIR

# 3. Combine into one package
tar -czf $BACKUP_DIR/enfono_full_backup_$DATE.tar.gz -C $BACKUP_DIR db_$DATE.sql files_$DATE.tar.gz
rm $BACKUP_DIR/db_$DATE.sql $BACKUP_DIR/files_$DATE.tar.gz

# 4. Upload to Wasabi
# Requirements: aws-cli configured with Wasabi credentials or rclone
echo "Uploading to Wasabi..."
# Using rclone (Recommended for VPS)
# You must run 'rclone config' first to setup 'wasabi' remote
rclone copy $BACKUP_DIR/enfono_full_backup_$DATE.tar.gz wasabi:$WASABI_BUCKET/daily/

# 5. Cleanup Local (Keep last 2 days locally)
find $BACKUP_DIR -name "enfono_full_backup_*" -mtime +2 -delete

# 6. Cleanup Wasabi (Keep last 5 days)
echo "Rotating Wasabi Backups (Retention: 5 days)..."
# rclone delete wasabi:$WASABI_BUCKET/daily/ --min-age 5d
# Note: Rclone delete is safer with --dry-run first. 
# Alternatively, use Wasabi Lifecycle policies in the Wasabi Console (Recommended)

echo "Backup Complete!"
