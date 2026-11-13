/** Access failures must stay visible, never become a fabricated Ollie answer. */
export function learningError(error: unknown): string {
  if (error instanceof Response && error.status === 401) return 'A parent needs to sign in before Ollie can answer.';
  const message = error instanceof Error ? error.message : '';
  if (/unauthorized|not authenticated/i.test(message)) return 'A parent needs to sign in before Ollie can answer.';
  if (/approve AI processing/i.test(message)) return 'A parent needs to approve AI-assisted learning before Ollie can answer.';
  if (/Subscription verification is unavailable/i.test(message)) return 'Subscription verification is not set up yet. A parent can contact Ollie support.';
  if (/active Ollie subscription/i.test(message)) return 'A parent needs to restore purchases or choose a plan before Ollie can answer.';
  if (/subscription could not be checked/i.test(message)) return 'Your subscription could not be checked. Please try again when connected.';
  return 'Ollie could not answer right now. Please try again in a moment.';
}