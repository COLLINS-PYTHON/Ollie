import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { isNative } from '@/lib/native';
import { notificationPermission, reminderPrefs, saveReminderPrefs } from '@/lib/notifications';

export function NotificationControls({ onboarding = false, onDone }: { onboarding?: boolean; onDone?: () => void }) {
  const [settings, setSettings] = useState({ daily: onboarding, trial: onboarding, time: '16:30' });
  const [native, setNative] = useState(false);
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  useEffect(() => {
    setNative(isNative());
    if (!onboarding) setSettings(reminderPrefs());
    void notificationPermission().then(p => { if (p === 'denied') setNotice('Notifications are off in iOS Settings.'); }).catch(() => setNotice('Notification permission could not be checked.'));
  }, [onboarding]);
  async function save() {
    setBusy(true); setNotice('');
    try { await saveReminderPrefs(settings, true); setNotice('Reminder preferences saved on this device.'); onDone?.(); }
    catch (e) { setNotice(e instanceof Error ? e.message : 'Reminders could not be saved. Please retry.'); }
    finally { setBusy(false); }
  }
  return <div className="space-y-5">
    <p className="text-support text-muted-foreground">Optional, silent reminders on this device. No streak pressure or messages about your child’s questions.</p>
    {!native && <p className="text-support text-muted-foreground">Notifications are available in the iPhone and iPad app.</p>}
    <label className="flex items-center justify-between gap-4 text-body">Daily Discovery<Switch aria-label="Daily Discovery reminders" disabled={!native || busy} checked={settings.daily} onCheckedChange={daily => setSettings(s => ({ ...s, daily }))} /></label>
    <label className="flex items-center justify-between gap-4 text-body">Reminder time<input aria-label="Reminder time" type="time" className="rounded-control border border-surface-2 bg-card px-3 py-2 text-body text-foreground" disabled={!native || busy || !settings.daily} value={settings.time} onChange={e => setSettings(s => ({ ...s, time: e.target.value }))} /></label>
    <label className="flex items-center justify-between gap-4 text-body">Trial-ending notice<Switch aria-label="Trial-ending notice" disabled={!native || busy} checked={settings.trial} onCheckedChange={trial => setSettings(s => ({ ...s, trial }))} /></label>
    <p className="text-support text-muted-foreground">At most one reminder a day. The trial notice uses Apple’s confirmed trial end date, two days before renewal. iOS may delay or silence delivery. Learning reminders refresh when Ollie opens and stop after 30 days without opening the app.</p>
    {notice && <p role="status" className="text-support text-muted-foreground">{notice}</p>}
    <Button className="w-full" disabled={!native || busy} onClick={() => void save()}>{busy ? 'Saving…' : onboarding ? 'Allow selected reminders' : 'Save reminder preferences'}</Button>
    {onboarding && <Button variant="ghost" className="w-full" disabled={busy} onClick={onDone}>Not now</Button>}
  </div>;
}