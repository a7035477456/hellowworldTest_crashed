DELETE FROM public.verifications
WHERE
  (
    expires_at < now() - INTERVAL '7 days'
    OR used_at < now() - INTERVAL '7 days'
  )
  -- extra safety: never touch active sessions
  AND expires_at < now();

DELETE FROM public.verifications
WHERE
  (
    expires_at < now() - INTERVAL '7 days'
    OR used_at < now() - INTERVAL '7 days'
  )
  AND expires_at < now();
