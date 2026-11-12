import { useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { createClientOnlyFn } from '@tanstack/react-start';
import { isNative } from '@/lib/native';
import { refreshRemindersQuietly, syncReminders } from '@/lib/notifications';
import { purchaseSDK } from '@/lib/purchases';
const appPlugin = createClientOnlyFn(async () => (await import('@capacitor/app')).App);
const notificationPlugin = createClientOnlyFn(async () => (await import('@capacitor/local-notifications')).LocalNotifications);

export function NotificationLifecycle() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isNative()) return;
    let alive = true;
    let remove: (() => void) | undefined;
    let removeTap: (() => void) | undefined;
    async function refresh() {
      try { const sdk = await purchaseSDK(); await sdk.getCustomerInfo().then(({ customerInfo: info }) => {
        // Refresh the same listener path used for purchases and cancellations.
        return import('@/lib/notifications').then(({ setNotificationTrial }) => {
          const entitlement = info.entitlements.active['premium'];
          setNotificationTrial(entitlement?.isActive && entitlement.periodType === 'TRIAL' && entitlement.expirationDate ? { endsAt: Date.parse(entitlement.expirationDate), renews: entitlement.willRenew } : null);
        });
      }); } catch { /* Keep existing confirmed schedule when offline, without inventing dates. */ }
      await syncReminders().catch(() => undefined);
    }
    void refresh();
    void notificationPlugin().then(async sdk => {
      const handle = await sdk.addListener('localNotificationActionPerformed', action => {
        const kind = action.notification.extra?.kind;
        if (kind === 'trial') void navigate({ to: '/parent' });
        if (kind === 'lesson') void navigate({ to: '/search' });
      });
      if (!alive) await handle.remove(); else removeTap = () => { void handle.remove(); };
    }).catch(() => undefined);
    void appPlugin().then(async app => {
      const handle = await app.addListener('appStateChange', state => { if (state.isActive) void refresh(); });
      if (!alive) await handle.remove(); else remove = () => { void handle.remove(); };
    }).catch(() => undefined);
    function visible() { if (document.visibilityState === 'visible') void refresh(); }
    document.addEventListener('visibilitychange', visible);
    window.addEventListener('ollie-kid-changed', refreshRemindersQuietly);
    return () => { alive = false; remove?.(); removeTap?.(); document.removeEventListener('visibilitychange', visible); window.removeEventListener('ollie-kid-changed', refreshRemindersQuietly); };
  }, [navigate]);
  return null;
}