import { expect, test } from "bun:test";
import { SUBSCRIPTION_PRICES, yearlyMonthlyEquivalent } from "./subscription-prices";

test("yearly plan shows the monthly equivalent of the approved annual charge", () => {
  expect(SUBSCRIPTION_PRICES.yearly).toBe(99.99);
  expect(yearlyMonthlyEquivalent()).toBe("8.33");
});