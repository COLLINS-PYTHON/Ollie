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
