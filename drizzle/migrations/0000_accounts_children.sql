CREATE TABLE public.accounts (
  id uuid PRIMARY KEY,
  name text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  pin_hash text,
  sound_enabled boolean NOT NULL DEFAULT true,
  weekly_email_opt_in boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.accounts TO authenticated;
GRANT ALL ON public.accounts TO service_role;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own account select" ON public.accounts FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Own account insert" ON public.accounts FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);
CREATE POLICY "Own account update" ON public.accounts FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Own account delete" ON public.accounts FOR DELETE TO authenticated USING (auth.uid() = id);

CREATE TABLE public.children (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  account_id uuid NOT NULL REFERENCES public.accounts(id) ON DELETE CASCADE,
  name text NOT NULL,
  age int NOT NULL DEFAULT 7,
  reading_level text,
  interests text[] NOT NULL DEFAULT '{}',
  reply_tone text,
  screen_time_limit_minutes int NOT NULL DEFAULT 45,
  slideshow_reset_time text NOT NULL DEFAULT '07:00',
  chat_retention_setting int NOT NULL DEFAULT 30,
  setup jsonb NOT NULL DEFAULT '{}'::jsonb,
  progress jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX children_account_idx ON public.children(account_id);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.children TO authenticated;
GRANT ALL ON public.children TO service_role;
ALTER TABLE public.children ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own children select" ON public.children FOR SELECT TO authenticated USING (auth.uid() = account_id);
CREATE POLICY "Own children insert" ON public.children FOR INSERT TO authenticated WITH CHECK (auth.uid() = account_id);
CREATE POLICY "Own children update" ON public.children FOR UPDATE TO authenticated USING (auth.uid() = account_id) WITH CHECK (auth.uid() = account_id);
CREATE POLICY "Own children delete" ON public.children FOR DELETE TO authenticated USING (auth.uid() = account_id);