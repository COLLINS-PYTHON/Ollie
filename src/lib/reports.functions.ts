import { createServerFn } from '@tanstack/react-start';
import { requireSupabaseAuth } from '@/integrations/supabase/auth-middleware';
import { z } from 'zod';
export const reportAnswer = createServerFn({ method: 'POST' }).middleware([requireSupabaseAuth])
  .inputValidator(input => z.object({ messageId: z.string().min(1).max(100), answer: z.string().trim().min(1).max(4000), question: z.string().max(500).default(''), reason: z.enum(['inappropriate', 'incorrect']).default('inappropriate') }).parse(input))
  .handler(async ({ data, context }) => {
    const { error, data: row } = await context.supabase.from('content_reports').insert({ account_id: context.userId, message_id: data.messageId, answer: data.answer, question: data.question, reason: data.reason }).select('id').single();
    if (error || !row) throw new Error('The report could not be sent. Please retry.');
    return { id: row.id };
  });