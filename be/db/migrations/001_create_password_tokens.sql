-- Create password tokens: single-use links sent by registration email.
-- Persisting in DB so tokens work across server restarts and multiple instances.
CREATE TABLE IF NOT EXISTS public.create_password_tokens (
  token VARCHAR(64) PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_create_password_tokens_expires_at
  ON public.create_password_tokens (expires_at);
