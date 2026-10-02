/* Device-only storage until accounts exist. Pictures live in IndexedDB (too big for
   localStorage); the cookie balance lives in localStorage. */

export type Picture = { id: string; idea: string; dataUrl: string; createdAt: number };

export const FREE_PER_DAY = 10;
export const JARS = [
  { id: "small", label: "Small jar", count: 10, price: "$0.99" },
  { id: "large", label: "Large jar", count: 50, price: "$2.99" },
] as const;

const DB = "ollie-pictures";
const STORE = "pictures";

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

export async function loadPictures(): Promise<Picture[]> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE).objectStore(STORE).getAll();
    req.onsuccess = () => resolve((req.result as Picture[]).sort((a, b) => b.createdAt - a.createdAt));
    req.onerror = () => reject(req.error);
  });
}

export async function savePicture(p: Picture): Promise<void> {
  const db = await openDb();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(p);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error);
  });
}

export type Balance = { day: string; freeUsed: number; jarCookies: number };
const KEY = "ollie-cookies-v1";

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function loadBalance(): Balance {
  let b: Balance = { day: today(), freeUsed: 0, jarCookies: 0 };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) b = JSON.parse(raw) as Balance;
  } catch {
    /* fresh balance */
  }
  if (b.day !== today()) b = { ...b, day: today(), freeUsed: 0 };
  return b;
}

export function saveBalance(b: Balance) {
  localStorage.setItem(KEY, JSON.stringify(b));
}

export function cookiesLeft(b: Balance) {
  return Math.max(0, FREE_PER_DAY - b.freeUsed) + b.jarCookies;
}

/* Free cookies are spent first. Returns which kind was spent so a blocked picture can be refunded. */
export function spend(b: Balance): { next: Balance; kind: "free" | "jar" } | null {
  if (b.freeUsed < FREE_PER_DAY) return { next: { ...b, freeUsed: b.freeUsed + 1 }, kind: "free" };
  if (b.jarCookies > 0) return { next: { ...b, jarCookies: b.jarCookies - 1 }, kind: "jar" };
  return null;
}

export function refund(b: Balance, kind: "free" | "jar"): Balance {
  return kind === "free" ? { ...b, freeUsed: Math.max(0, b.freeUsed - 1) } : { ...b, jarCookies: b.jarCookies + 1 };
}

/* Slideshow completion rewards land here as extra generations. */
export function addCookies(b: Balance, n: number): Balance {
  return { ...b, jarCookies: b.jarCookies + n };
}
