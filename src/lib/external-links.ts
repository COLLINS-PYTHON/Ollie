import { isNative } from './native';
export async function openParentLink(url: string) {
  const parsed = new URL(url);
  if (!(parsed.protocol === 'mailto:' && parsed.pathname === 'ollie.support@gmail.com') && !(parsed.protocol === 'https:' && ['apps.apple.com', 'www.apple.com'].includes(parsed.hostname))) throw new Error('This link is unavailable.');
  if (isNative() && parsed.protocol === 'https:') { const { Browser } = await import('@capacitor/browser'); await Browser.open({ url }); }
  else window.location.assign(url);
}