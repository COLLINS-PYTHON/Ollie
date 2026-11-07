import { supabase } from '@/integrations/supabase/client';
import { isNative } from './native';
import { appleAuthConfig, revokeNativeApple } from './apple.functions';
import { lovable } from '@/integrations/lovable';
async function authorize() {
 const rawNonce = crypto.randomUUID();
 const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rawNonce));
 const nonce = [...new Uint8Array(hash)].map(byte => byte.toString(16).padStart(2, '0')).join('');
 const { SignInWithApple } = await import('@capacitor-community/apple-sign-in');
 const { response } = await SignInWithApple.authorize({ clientId: 'com.ollie.learning', redirectURI: window.location.origin, scopes: 'email', state: crypto.randomUUID(), nonce });
 return { response, rawNonce };
}
export async function nativeAppleSignIn() {
 if (!(await appleAuthConfig()).native) {
  const result = await lovable.auth.signInWithOAuth('apple', { redirect_uri: window.location.href });
  if (result.error) throw new Error('Apple sign-in could not be completed. Please retry.');
  return !result.redirected;
 }
 const { response, rawNonce } = await authorize();
 if (!response.identityToken) throw new Error('Apple sign-in did not return an authorization.');
 const result = await supabase.auth.signInWithIdToken({ provider: 'apple', token: response.identityToken, nonce: rawNonce });
 if (result.error) throw new Error('Apple sign-in could not be completed. Please retry.');
 return true;
}
export async function disconnectNativeApple() {
 if (!isNative()) return;
 if (!(await appleAuthConfig()).native) return;
 const { data: { user } } = await supabase.auth.getUser();
 if (!user?.identities?.some(identity => identity.provider === 'apple')) return;
 const { response } = await authorize();
 if (!response.authorizationCode) throw new Error('Apple authorization could not be disconnected.');
 await revokeNativeApple({ data: { code: response.authorizationCode } });
}
export async function openAppleDisconnect() {
 const url = `${window.location.origin}/~oauth/apple/revoke?redirect_uri=${encodeURIComponent(window.location.origin)}`;
 if (isNative()) { const { Browser } = await import('@capacitor/browser'); await Browser.open({ url }); }
 else window.open(url, '_blank', 'noopener,noreferrer');
}