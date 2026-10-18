/* Day 5 trial reminder: billing notice plus the child's report since the trial started.
   Sending is not connected yet; this builds the content once delivery exists. */
import { SUBSCRIPTION_PRICES } from "@/lib/subscription-prices";

export const TRIAL_DAYS = 7;
export const REMINDER_DAY = 5;

export type TrialReport = {
  lessonsCompleted: number;
  questionsAsked: number;
  quizAccuracy: number | null;
  streakDays: number;
  standoutQuestion?: string;
};

export function trialDates(start: Date) {
  const day = (n: number) => new Date(start.getTime() + n * 86_400_000);
  return { reminder: day(REMINDER_DAY), billing: day(TRIAL_DAYS) };
}

export function buildTrialReminder(opts: { childName: string; plan: "monthly" | "yearly"; trialStart: Date; report: TrialReport; cancelUrl: string }) {
  const { childName, plan, report } = opts;
  const { billing } = trialDates(opts.trialStart);
  const date = billing.toLocaleDateString(undefined, { month: "long", day: "numeric" });
  const price = plan === "yearly" ? `$${SUBSCRIPTION_PRICES.yearly.toFixed(2)} per year` : `$${SUBSCRIPTION_PRICES.monthly.toFixed(2)} per month`;
  return {
    subject: `Your Ollie trial ends in 2 days. ${childName}'s learning report is inside`,
    notice: `Your free trial ends on ${date}. Your ${plan} plan (${price}) starts then. Cancel anytime before ${date} with one tap.`,
    report: [
      { label: "Daily lessons", value: `${report.lessonsCompleted} of ${REMINDER_DAY}` },
      { label: "Questions explored", value: String(report.questionsAsked) },
      { label: "Quiz accuracy", value: report.quizAccuracy === null ? "None yet" : `${report.quizAccuracy}%` },
      { label: "Learning streak", value: `${report.streakDays} days` },
    ],
    standout: report.standoutQuestion ? `${childName} asked: "${report.standoutQuestion}"` : null,
    actions: { keep: "Keep learning with Ollie", cancel: { label: "Manage or cancel", url: opts.cancelUrl } },
  };
}
