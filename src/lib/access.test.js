import { afterEach, expect, test } from 'bun:test';
import { requireLearningAccess } from './access.server';
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
test('AI requires saved parent consent even when a subscription exists', async () => { let checkedBilling = false; globalThis.fetch = async () => { checkedBilling = true; return Response.json({}); }; const client = { from: () => ({ select: () => ({ eq: () => ({ maybeSingle: async () => ({ data: { ai_consent: false }, error: null }) }) }) }) }; await expect(requireLearningAccess(client, 'parent', 'test-key')).rejects.toThrow('approve AI'); expect(checkedBilling).toBe(false); });