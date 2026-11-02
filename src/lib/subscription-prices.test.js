import { expect, test } from "bun:test";
import { SUBSCRIPTION_PRICES, regionPrice, yearlyMonthlyEquivalent, yearlySavingPercent } from "./subscription-prices";

test("US uses the approved charges", () => {
  expect(SUBSCRIPTION_PRICES).toEqual({ monthly: 14.99, yearly: 99.99 });
  expect(yearlyMonthlyEquivalent()).toBe(8.33);
});

test("Canada, Australia and EU keep 14.99/99.99 in local currency", () => {
  expect(regionPrice("CA")).toEqual({ currency: "CAD", monthly: 14.99, yearly: 99.99 });
  expect(regionPrice("AU").currency).toBe("AUD");
  expect(regionPrice("FR")).toEqual({ currency: "EUR", monthly: 14.99, yearly: 99.99 });
});

test("UK is 11.99 monthly and 79.99 yearly in pounds", () => {
  expect(regionPrice("GB")).toEqual({ currency: "GBP", monthly: 11.99, yearly: 79.99 });
});

test("saving badge rounds down", () => {
  expect(yearlySavingPercent(regionPrice("US"))).toBe(44);
  expect(yearlySavingPercent(regionPrice("GB"))).toBe(44);
});

test("unknown countries fall back to US", () => {
  expect(regionPrice("ZZ").currency).toBe("USD");
});
