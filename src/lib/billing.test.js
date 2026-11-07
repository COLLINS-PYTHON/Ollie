import { afterEach, expect, test } from 'bun:test';
import { verifiedPremium } from './billing.server';
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
test('missing configuration fails closed without an external request', async () => { let calls = 0; globalThis.fetch = async () => { calls++; return Response.json({}); }; await expect(verifiedPremium('account', undefined)).rejects.toThrow('unavailable'); expect(calls).toBe(0); });
test('server validates the authenticated account against RevenueCat', async () => { let requested = ''; globalThis.fetch = async url => { requested = String(url); return Response.json({ subscriber: { entitlements: { premium: { product_identifier: 'com.ollie.learning.yearly', expires_date: '2099-11-07T00:00:00Z' } } } }); }; expect(await verifiedPremium('parent-account', 'test-key')).toBe(true); expect(requested).toBe('https://api.revenuecat.com/v1/subscribers/parent-account'); });
test('RevenueCat failure never grants access', async () => { globalThis.fetch = async () => new Response('', { status: 503 }); await expect(verifiedPremium('account', 'test-key')).rejects.toThrow('could not be checked'); });