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
- Tab screens live under `_tabs`; `/` resolves completed saved/signed-in profiles to Search and unfinished setup to its resume step; onboarding redirects completed families to Search. Why: returning families never repeat setup and child screens hydrate their name before rendering.
- Slideshow packs are shared, band-keyed and never generated per viewer. Why: reusable lessons and matching quiz answers keep costs low.
- The slideshow takes over the screen from the `_tabs` layout until the day is marked done in `src/lib/slideshow-store.ts`; screens never render it inline. Why: the spec requires the daily lesson to be finished before anything else.
- Setup drafts and the resume step persist locally, excluding PIN fields; handoff marks completion and clears the draft; pricing-or-later resume goes to trust. Why: closed-app setup resumes without treating incomplete drafts as completed profiles or reopening on a price ask.
- Screen time is tracked per surface (Search, Create) in src/lib/usage-store.ts; the slideshow is never counted. Why: spec excludes the lesson from the limit.
- Signed-in parents' setup and child progress sync to `accounts`/`children` via src/lib/cloud-sync.ts (pushAll from the _tabs layout, pullAll on /login); localStorage stays the working copy. Why: one simple sync path until per-feature tables are needed.
- The parent PIN is only stored as a SHA-256 hash (pinHash); check it with checkPin. Why: spec requires PINs never be stored readable.
- Custom parent topics are generated once during Building and played before the shared library. Why: typed topics need bespoke content.
- Signed-in devices live in the `devices` table; remote log out sets `revoked`, and that device wipes itself on its next sync. Why: no server push in v1.
- LessonArt keeps SVG playback; LessonCover uses topic covers, shared interest-art pictures, then SVG. Interests reuse category pictures. Why: matching art without generation costs.
- Prices derive from subscription-prices, yearly equivalent divides by 12. Why: consistent labels.
- Onboarding theme overrides are scoped to its parent layout, and mascot artwork preloads there with entrance motion on a separate wrapper. Why: onboarding restyling never changes chat or dashboard colors and entrance/idle transforms do not compete.
- Chase uses direct H.264 src, muted/defaultMuted inline autoplay, readiness/gesture retries and reduced-motion pause. Why: reliable phone playback without controls.
- Trail scenery uses authored SVG with CSS motion and local-calendar seasonal selection; its irregular path is deterministic and separate from progress. Why: crisp instant artwork, no generation charges, and rewards never change with a theme.
- Paywall uses Vaul with pinned prices/footer and a separate outline pulse. Building requests notification permission after opt-in only; permission never implies reminder delivery. Why: visible prices and honest consent.
- Parent setting sheets use the shared portalled Vaul drawer outside the animated page. Why: a transformed page must not trap fixed dialogs below the viewport.
- Onboarding's explicit preview search parameter is retained between its steps and bypasses the returning-family redirect without clearing saved data. Why: existing families can review setup while ordinary entry continues to skip it.
- Parent-facing safety illustrations use the shared Embla carousel in SafetyExamples, with literal locked responses and clearly labelled example flags. Why: parents can inspect multiple sensitive-topic outcomes without live searches or fabricated progress.
- Search reserves a separate navigation dock beneath its composer; the app uses dynamic viewport sizing and a wider shared tablet frame. Why: tabs never cover messages or typing, and available screen space stays useful across devices.
- Keep Search's iMessage transcript and transport when polishing layout. Why: presentation fixes must preserve conversations.
- Orbs use CrispOrb at actual size and device resolution (max 4x); pre-optimize thinking-orbs/engine. Search voice reuses breathing/listening states in Button. Why: crisp, consistent artwork and unchanged speech transport.
- Failed module loads refresh once per cooldown; retry refreshes. Why: discard stale chunks without loops or data loss.

- child-interactions centralizes tested voice age and starter rules; swipes never bypass open quizzes. Why: consistent safe navigation.
- Onboarding puts worries/safety after age; Continue advances contextual carousel first. Why: each tap changes the explanation.
- Read-aloud goes through src/lib/speak.ts (/api/speech neural voice, browser voice fallback). Why: one natural voice everywhere, still works offline.
