// Native helpers for the Capacitor iOS shell. Everything is a no-op in a
// normal browser, so the deployed web app behaves exactly as before.

type HapticStyle = "light" | "medium" | "heavy" | "success" | "warning";

export function isNative(): boolean {
  if (typeof window === "undefined") return false;
  const cap = (window as { Capacitor?: { isNativePlatform?: () => boolean } })
    .Capacitor;
  return typeof cap?.isNativePlatform === "function" && cap.isNativePlatform();
}

// iOS haptic feedback; silently does nothing on web or when the plugin is
// unavailable. The plugin is imported lazily so web bundles never load it.
export function haptic(style: HapticStyle = "light"): void {
  if (!isNative()) return;
  void import("@capacitor/haptics")
    .then(({ Haptics, ImpactStyle, NotificationType }) => {
      if (style === "success") return Haptics.notification({ type: NotificationType.Success });
      if (style === "warning") return Haptics.notification({ type: NotificationType.Warning });
      const impact =
        style === "heavy" ? ImpactStyle.Heavy : style === "medium" ? ImpactStyle.Medium : ImpactStyle.Light;
      return Haptics.impact({ style: impact });
    })
    .catch(() => undefined);
}

// One shared listener gives every onboarding primary action and tab tap a
// light tap-back, so new screens get haptics for free without touching each
// component.
if (typeof window !== "undefined") {
  window.addEventListener(
    "pointerdown",
    (event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      if (target.closest(".onboarding-primary-action, .app-tabbar button")) haptic("light");
    },
    { passive: true },
  );
}
