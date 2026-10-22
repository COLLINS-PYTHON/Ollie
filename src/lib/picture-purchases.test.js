import { expect, test } from "bun:test";
import { COOKIE_PURCHASES_AVAILABLE } from "./picture-store";

test("cookie purchases remain unavailable while payments are unconnected", () => {
  expect(COOKIE_PURCHASES_AVAILABLE).toBe(false);
});