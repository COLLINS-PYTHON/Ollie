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
- Daily slideshow content lives in `src/lib/slideshow/` as hand-built per-category packs (types.ts, pack-*.ts, library.ts) and is never generated at runtime; a quiz's options/hint/why may be band-keyed when its question is. Why: marginal cost per child stays near zero and answers always match the question the child actually sees.
- The slideshow takes over the screen from the `_tabs` layout until the day is marked done in `src/lib/slideshow-store.ts`; screens never render it inline. Why: the spec requires the daily lesson to be finished before anything else.
- Setup drafts and the resume step persist locally, excluding PIN fields; handoff marks completion and clears the draft; pricing-or-later resume goes to trust. Why: closed-app setup resumes without treating incomplete drafts as completed profiles or reopening on a price ask.
- Screen time is tracked per surface (Search, Create) in src/lib/usage-store.ts; the slideshow is never counted. Why: spec excludes the lesson from the limit.
- Signed-in parents' setup and child progress sync to `accounts`/`children` via src/lib/cloud-sync.ts (pushAll from the _tabs layout, pullAll on /login); localStorage stays the working copy. Why: one simple sync path until per-feature tables are needed.
- The parent PIN is only stored as a SHA-256 hash (pinHash); check it with checkPin. Why: spec requires PINs never be stored readable.
- The one exception to hand-built lessons is the custom-topic lesson, written once by AI during the Building finale (src/lib/custom-lesson.functions.ts) and stored in src/lib/custom-lesson-store.ts; the slideshow plays it first, then returns to the library. Why: spec makes parent-typed topics real-time.
- Signed-in devices live in the `devices` table; remote log out sets `revoked`, and that device wipes itself on its next sync. Why: no server push in v1.
- LessonArt keeps SVG playback; LessonCover uses topic covers, shared interest-art pictures, then SVG. Interests reuse category pictures. Why: matching art without generation costs.
- Prices derive from subscription-prices, yearly equivalent divides by 12. Why: consistent labels.
- Onboarding theme overrides are scoped to its parent layout, and mascot artwork preloads there with entrance motion on a separate wrapper. Why: onboarding restyling never changes chat or dashboard colors and entrance/idle transforms do not compete.
- Onboarding uses contextual poses and sparse scenery; chase uses unmasked CDN H.264 Main/yuv420p first, muted inline autoplay, readiness retry and reduced-motion pause. Why: full outlines and compatible motion without per-view costs.
- Trail scenery uses authored SVG with CSS motion and local-calendar seasonal selection; its irregular path is deterministic and separate from progress. Why: crisp instant artwork, no generation charges, and rewards never change with a theme.
- The onboarding paywall uses the shared Vaul drawer with portal, focus containment, swipe dismissal and a pinned action footer. Why: a natural interactive sheet with accessible dismissal and no simulated native purchase dialog.
- Parent setting sheets use the shared portalled Vaul drawer outside the animated page. Why: a transformed page must not trap fixed dialogs below the viewport.
- Onboarding's explicit preview search parameter is retained between its steps and bypasses the returning-family redirect without clearing saved data. Why: existing families can review setup while ordinary entry continues to skip it.
- Parent-facing safety illustrations use the shared Embla carousel in SafetyExamples, with literal locked responses and clearly labelled example flags. Why: parents can inspect multiple sensitive-topic outcomes without live searches or fabricated progress.
- Search reserves a separate navigation dock beneath its composer; the app uses dynamic viewport sizing and a wider shared tablet frame. Why: tabs never cover messages or typing, and available screen space stays useful across devices.
- Keep Search's iMessage transcript and transport when polishing layout. Why: presentation fixes must preserve conversations.
- Orbs use CrispOrb at actual size and device resolution (max 4x); pre-optimize thinking-orbs/engine in Vite. Why: crisp dots and stable React identity during lazy navigation.
- Failed module loads refresh once per cooldown; retry refreshes. Why: discard stale chunks without loops or data loss.
