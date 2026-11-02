// US base prices. Other regions use their own local price points (not FX conversion).
export const SUBSCRIPTION_PRICES = { monthly: 14.99, yearly: 99.99 };

export type RegionPrice = { currency: string; monthly: number; yearly: number };

const EU = ["AT","BE","CY","DE","EE","ES","FI","FR","GR","HR","IE","IT","LT","LU","LV","MT","NL","PT","SI","SK"];
const REGIONS: Record<string, RegionPrice> = {
  US: { currency: "USD", ...SUBSCRIPTION_PRICES },
  CA: { currency: "CAD", monthly: 14.99, yearly: 99.99 },
  AU: { currency: "AUD", monthly: 14.99, yearly: 99.99 },
  GB: { currency: "GBP", monthly: 11.99, yearly: 79.99 },
  NZ: { currency: "NZD", monthly: 16.99, yearly: 114.99 },
  CH: { currency: "CHF", monthly: 13.99, yearly: 94.99 },
  SE: { currency: "SEK", monthly: 149, yearly: 999 },
  NO: { currency: "NOK", monthly: 149, yearly: 999 },
  DK: { currency: "DKK", monthly: 99, yearly: 699 },
  PL: { currency: "PLN", monthly: 39.99, yearly: 269.99 },
  JP: { currency: "JPY", monthly: 1800, yearly: 12000 },
  KR: { currency: "KRW", monthly: 15000, yearly: 99000 },
  SG: { currency: "SGD", monthly: 14.98, yearly: 98.98 },
  AE: { currency: "AED", monthly: 44.99, yearly: 299.99 },
  SA: { currency: "SAR", monthly: 44.99, yearly: 299.99 },
  MX: { currency: "MXN", monthly: 129, yearly: 849 },
  BR: { currency: "BRL", monthly: 34.9, yearly: 229.9 },
  ZA: { currency: "ZAR", monthly: 129.99, yearly: 849.99 },
  IN: { currency: "INR", monthly: 499, yearly: 3299 },
  NG: { currency: "NGN", monthly: 7900, yearly: 49900 },
  KE: { currency: "KES", monthly: 790, yearly: 4990 },
  GH: { currency: "GHS", monthly: 79, yearly: 499 },
  PH: { currency: "PHP", monthly: 349, yearly: 2290 },
  ID: { currency: "IDR", monthly: 79000, yearly: 499000 },
  TR: { currency: "TRY", monthly: 199.99, yearly: 1299.99 },
  EG: { currency: "EGP", monthly: 249.99, yearly: 1599.99 },
  PK: { currency: "PKR", monthly: 1500, yearly: 9900 },
};
for (const c of EU) REGIONS[c] = { currency: "EUR", monthly: 14.99, yearly: 99.99 };

export function regionPrice(country?: string | null): RegionPrice {
  return REGIONS[(country ?? "").toUpperCase()] ?? REGIONS.US;
}

/** Browser-only: country from the device language setting (e.g. en-NG). */
export function detectCountry(): string {
  if (typeof navigator === "undefined") return "US";
  for (const l of navigator.languages ?? [navigator.language]) {
    const m = /[-_]([A-Za-z]{2})\b/.exec(l);
    if (m) return m[1].toUpperCase();
  }
  return "US";
}

export function formatPrice(amount: number, currency: string) {
  const whole = Number.isInteger(amount);
  return new Intl.NumberFormat(undefined, { style: "currency", currency, minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: whole ? 0 : 2 }).format(amount);
}

/** Yearly saving vs 12 months, rounded down so the badge never overstates. */
export function yearlySavingPercent(p: RegionPrice = REGIONS.US) {
  return Math.floor((1 - p.yearly / (p.monthly * 12)) * 100);
}

export function yearlyMonthlyEquivalent(p: RegionPrice = REGIONS.US) {
  return Math.floor((p.yearly / 12) * 100) / 100;
}
