/**
 * Migrate profile images from external URLs to public.photos and point singles.profile_image_pk.
 *
 * Steps:
 * 1) Ensure public.photos exists and singles has profile_image_pk (run migration SQL).
 * 2) For each single with profile_image_url starting with http(s): download to temp, insert into photos, update singles.
 *
 * Run from repo root: node be/scripts/migrateProfileImagesToPhotos.js
 * Or from be: node scripts/migrateProfileImagesToPhotos.js
 */

import fs from 'fs';
import path from 'path';
import os from 'os';
import pool from '../db/connection.js';

const TEMP_DIR = path.join(os.tmpdir(), 'vsingles-profile-photos');

function ensureTempDir() {
  if (!fs.existsSync(TEMP_DIR)) {
    fs.mkdirSync(TEMP_DIR, { recursive: true });
    console.log('[migrate] Created temp dir:', TEMP_DIR);
  }
}

async function runMigrationSql() {
  const sql = `
    CREATE TABLE IF NOT EXISTS public.photos (
      photos_id   bigserial PRIMARY KEY,
      image_data  bytea NOT NULL,
      content_type character varying(100) DEFAULT 'image/jpeg',
      created_at  timestamp without time zone DEFAULT CURRENT_TIMESTAMP
    );
    ALTER TABLE public.photos OWNER TO postgres;

    DO $$
    BEGIN
      IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns
        WHERE table_schema = 'public' AND table_name = 'singles' AND column_name = 'profile_image_pk'
      ) THEN
        ALTER TABLE public.singles ADD COLUMN profile_image_pk bigint REFERENCES public.photos(photos_id);
      END IF;
    END $$;
  `;
  await pool.query(sql);
  console.log('[migrate] photos table and singles.profile_image_pk ensured.');
}

async function getSinglesWithUrl() {
  const result = await pool.query(
    `SELECT singles_id, profile_image_url
     FROM public.singles
     WHERE profile_image_url IS NOT NULL
       AND (profile_image_url LIKE 'http://%' OR profile_image_url LIKE 'https://%')
       AND (profile_image_pk IS NULL OR profile_image_pk = 0)`
  );
  return result.rows;
}

function contentTypeFromUrl(url) {
  try {
    const u = new URL(url);
    const p = u.pathname.toLowerCase();
    if (p.endsWith('.png')) return 'image/png';
    if (p.endsWith('.gif')) return 'image/gif';
    if (p.endsWith('.webp')) return 'image/webp';
  } catch (_) {}
  return 'image/jpeg';
}

async function downloadToTemp(url, singlesId) {
  const res = await fetch(url, { redirect: 'follow' });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const contentType = res.headers.get('content-type')?.split(';')[0]?.trim() || contentTypeFromUrl(url);
  const ext = contentType === 'image/png' ? '.png' : contentType === 'image/gif' ? '.gif' : '.jpg';
  const filePath = path.join(TEMP_DIR, `single-${singlesId}${ext}`);
  const buffer = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(filePath, buffer);
  return { buffer, contentType, filePath };
}

async function main() {
  console.log('[migrate] Starting profile image migration to public.photos');
  ensureTempDir();

  try {
    await runMigrationSql();
  } catch (err) {
    console.error('[migrate] Migration SQL failed:', err.message);
    process.exit(1);
  }

  const rows = await getSinglesWithUrl();
  console.log('[migrate] Found', rows.length, 'singles with HTTP profile_image_url to migrate');

  for (const row of rows) {
    const { singles_id, profile_image_url } = row;
    try {
      const { buffer, contentType } = await downloadToTemp(profile_image_url, singles_id);
      const insertResult = await pool.query(
        `INSERT INTO public.photos (image_data, content_type) VALUES ($1, $2) RETURNING photos_id`,
        [buffer, contentType]
      );
      const photosId = insertResult.rows[0].photos_id;
      await pool.query(
        `UPDATE public.singles SET profile_image_pk = $1 WHERE singles_id = $2`,
        [photosId, singles_id]
      );
      console.log('[migrate] OK singles_id=', singles_id, '-> photos_id=', photosId);
    } catch (err) {
      console.error('[migrate] FAIL singles_id=', singles_id, 'url=', profile_image_url, err.message);
    }
  }

  console.log('[migrate] Done. Temp files left in', TEMP_DIR, '(safe to delete after verification).');
  await pool.end();
}

main().catch((err) => {
  console.error('[migrate] Fatal:', err);
  process.exit(1);
});
