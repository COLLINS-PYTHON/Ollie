const RECOVERY_KEY = "ollie-module-recovery";
const RECOVERY_WINDOW_MS = 60_000;

export function isModuleLoadError(error: unknown): boolean {
  const message = error instanceof Error ? error.message : String(error);
  return /importing a module script failed|failed to fetch dynamically imported module|error loading dynamically imported module|failed to load module script|unable to preload css/i.test(message);
}

/** Discard stale module URLs without clearing saved family data. */
export function recoverModuleLoad(error: unknown): boolean {
  if (!isModuleLoadError(error)) return false;
  try {
    const previous = Number(window.sessionStorage.getItem(RECOVERY_KEY));
    const now = Date.now();
    if (previous && now - previous < RECOVERY_WINDOW_MS) return false;
    window.sessionStorage.setItem(RECOVERY_KEY, String(now));
    window.location.reload();
    return true;
  } catch {
    return false;
  }
}