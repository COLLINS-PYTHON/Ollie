CREATE TABLE public.devices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  device_key text NOT NULL,
  label text NOT NULL DEFAULT 'Device',
  revoked boolean NOT NULL DEFAULT false,
  last_seen timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (account_id, device_key)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.devices TO authenticated;
GRANT ALL ON public.devices TO service_role;
ALTER TABLE public.devices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own devices select" ON public.devices FOR SELECT TO authenticated USING (auth.uid() = account_id);
CREATE POLICY "Own devices insert" ON public.devices FOR INSERT TO authenticated WITH CHECK (auth.uid() = account_id);
CREATE POLICY "Own devices update" ON public.devices FOR UPDATE TO authenticated USING (auth.uid() = account_id) WITH CHECK (auth.uid() = account_id);
CREATE POLICY "Own devices delete" ON public.devices FOR DELETE TO authenticated USING (auth.uid() = account_id);