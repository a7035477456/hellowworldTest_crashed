# Profile photos migration (URLs → public.photos)

## What this does

1. **Download** profile images from current external URLs (e.g. `https://i.pravatar.cc/...`) to a temp folder.
2. **Insert** each image into `public.photos` (binary + content_type).
3. **Update** `singles.profile_image_pk` to point to the new photo row.
4. The app then serves images from **GET /api/photo/:id** and the UI uses that URL when `profile_image_pk` is set.

## Steps (run once)

### 1. Run the migration script (creates table + column, then migrates data)

From the **project root** (where `be/` is):

```bash
node be/scripts/migrateProfileImagesToPhotos.js
```

Or run the SQL by hand first, then the script:

```bash
# Optional: run SQL only (e.g. if you use a different DB user)
psql -h localhost -p 50010 -U postgres -d vsingles -f be/db/migrations/001_photos_and_profile_image_pk.sql

# Then run the Node script to download and fill photos
node be/scripts/migrateProfileImagesToPhotos.js
```

Ensure `DB_*` env (e.g. in `~/.ssh/be/.env`) is set so the script and app connect to your **vsingles** database.

### 2. Restart the backend

After migration, restart the API server so **GET /api/photo/:id** is used. The frontend already uses `profile_image_pk` to build the image URL when present.

## Schema summary

- **public.photos**: `photos_id` (PK), `image_data` (bytea), `content_type`, `created_at`.
- **public.singles**: new column `profile_image_pk` (bigint, FK to `photos.photos_id`).  
  `profile_image_url` is kept for legacy/fallback (e.g. new singles with a URL until you have an upload flow).

## Temp files

The script writes downloaded images under `os.tmpdir()/vsingles-profile-photos/`. You can delete that folder after verifying the app shows photos from the DB.
