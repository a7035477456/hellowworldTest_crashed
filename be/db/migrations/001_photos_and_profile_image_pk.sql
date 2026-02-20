-- Migration: add public.photos table and point singles profile image to it
-- Run once against vsingles database (e.g. psql -f 001_photos_and_profile_image_pk.sql)

-- 1) Create public.photos table (stores image binary and metadata)
CREATE TABLE IF NOT EXISTS public.photos (
  photos_id   bigserial PRIMARY KEY,
  image_data  bytea NOT NULL,
  content_type character varying(100) DEFAULT 'image/jpeg',
  created_at  timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE public.photos OWNER TO postgres;

-- 2) Add profile_image_pk to singles (FK to photos); keep profile_image_url for legacy/fallback
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_schema = 'public' AND table_name = 'singles' AND column_name = 'profile_image_pk'
  ) THEN
    ALTER TABLE public.singles
      ADD COLUMN profile_image_pk bigint REFERENCES public.photos(photos_id);
  END IF;
END $$;

-- Optional: index for lookups by singles when serving photo by id
CREATE INDEX IF NOT EXISTS idx_photos_id ON public.photos(photos_id);
