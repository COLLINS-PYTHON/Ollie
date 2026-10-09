export const SUBSCRIPTION_PRICES = { monthly: 11.99, yearly: 99.99 };

export function yearlyMonthlyEquivalent() {
  return (SUBSCRIPTION_PRICES.yearly / 12).toFixed(2);
}