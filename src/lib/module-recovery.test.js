import { expect, test } from "bun:test";
import { isModuleLoadError, recoverModuleLoad } from "./module-recovery";

test("recognizes Safari and Chromium import failures, not unrelated errors", () => {
  expect(isModuleLoadError(new TypeError("Importing a module script failed."))).toBe(true);
  expect(isModuleLoadError(new TypeError("Failed to fetch dynamically imported module: /old.js"))).toBe(true);
  expect(isModuleLoadError(new Error("Invalid PIN"))).toBe(false);
});

test("refreshes once for persistent failure without deleting saved data", () => {
  const data = new Map([["ollie-profile", "saved"]]);
  let reloads = 0;
  const originalWindow = Object.getOwnPropertyDescriptor(globalThis, "window");
  Object.defineProperty(globalThis, "window", { configurable: true, value: {
    sessionStorage: { getItem: (key) => data.get(key) ?? null, setItem: (key, value) => data.set(key, value) },
    location: { reload: () => { reloads += 1; } },
  } });
  try {
    expect(recoverModuleLoad(new Error("Importing a module script failed."))).toBe(true);
    expect(recoverModuleLoad(new Error("Importing a module script failed."))).toBe(false);
    expect(reloads).toBe(1);
    expect(data.get("ollie-profile")).toBe("saved");
  } finally {
    if (originalWindow) Object.defineProperty(globalThis, "window", originalWindow);
    else Reflect.deleteProperty(globalThis, "window");
  }
});