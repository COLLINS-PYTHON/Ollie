ALTER TABLE public.accounts ADD COLUMN IF NOT EXISTS ai_consent boolean NOT NULL DEFAULT false;
CREATE TABLE public.content_reports (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
 account_id uuid NOT NULL,
 message_id text NOT NULL CHECK (char_length(message_id) BETWEEN 1 AND 100),
 answer text NOT NULL CHECK (char_length(answer) BETWEEN 1 AND 4000),
 question text NOT NULL DEFAULT '' CHECK (char_length(question) <= 500),
 reason text NOT NULL DEFAULT 'inappropriate' CHECK (reason IN ('inappropriate','incorrect')),
 created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.content_reports TO authenticated;
GRANT ALL ON public.content_reports TO service_role;
ALTER TABLE public.content_reports ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Families submit own reports" ON public.content_reports FOR INSERT TO authenticated WITH CHECK (account_id = auth.uid());
CREATE POLICY "Families read own report receipts" ON public.content_reports FOR SELECT TO authenticated USING (account_id = auth.uid());
CREATE INDEX content_reports_account_created ON public.content_reports (account_id, created_at);
CREATE FUNCTION public.limit_content_reports() RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
 PERFORM pg_advisory_xact_lock(hashtextextended(NEW.account_id::text, 0));
 IF (SELECT count(*) FROM public.content_reports WHERE account_id = NEW.account_id AND created_at > now() - interval '1 day') >= 20 THEN
 RAISE EXCEPTION 'Daily report limit reached';
 END IF;
 NEW.created_at := now();
 RETURN NEW;
END; $$;
CREATE TRIGGER content_report_limit BEFORE INSERT ON public.content_reports FOR EACH ROW EXECUTE FUNCTION public.limit_content_reports();