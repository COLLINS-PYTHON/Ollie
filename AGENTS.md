<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->
- MCP server lives in src/lib/mcp (public, no auth; tools use hardcoded data only) — user explicitly chose public access; never add service-role access there.
- Design tokens (Ollie colors, radii card/control/pill, shadow-card/sheet, duration-tap/element/reveal, text-title/body/support/label/button) live in src/styles.css; components use only these. Why: every screen follows the spec from one source.
- Tab screens live under the pathless `_tabs` layout (tab bar + parent icon); `/` redirects to `/search`; onboarding screens reuse `OnboardingSkeleton` from src/routes/onboarding.tsx. Why: fixed shell and skeleton per spec.
- Daily slideshow content lives in `src/lib/slideshow/` as hand-built per-category packs (types.ts, pack-*.ts, library.ts) and is never generated at runtime; a quiz's options/hint/why may be band-keyed when its question is. Why: marginal cost per child stays near zero and answers always match the question the child actually sees.
- The slideshow takes over the screen from the `_tabs` layout until the day is marked done in `src/lib/slideshow-store.ts`; screens never render it inline. Why: the spec requires the daily lesson to be finished before anything else.
- Setup answers and parent settings persist on-device via saveProfile/loadProfile in src/lib/onboarding-store.ts, loaded only from effects. Why: survives reloads without SSR hydration mismatches until accounts exist.
- Screen time is tracked per surface (Search, Create) in src/lib/usage-store.ts; the slideshow is never counted. Why: spec excludes the lesson from the limit.
- Signed-in parents' setup and child progress sync to `accounts`/`children` via src/lib/cloud-sync.ts (pushAll from the _tabs layout, pullAll on /login); localStorage stays the working copy. Why: one simple sync path until per-feature tables are needed.
- The parent PIN is only stored as a SHA-256 hash (pinHash); check it with checkPin. Why: spec requires PINs never be stored readable.
- The one exception to hand-built lessons is the custom-topic lesson, written once by AI during the Building finale (src/lib/custom-lesson.functions.ts) and stored in src/lib/custom-lesson-store.ts; the slideshow plays it first, then returns to the library. Why: spec makes parent-typed topics real-time.
- Signed-in devices live in the `devices` table; remote log out sets `revoked`, and that device wipes itself on its next sync. Why: no server push in v1.
