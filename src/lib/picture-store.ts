import { readKidValue, writeKidValue, activeKidId } from "./kid-storage";
/* Device-only storage until accounts exist. Pictures live in IndexedDB (too big for
   localStorage); the cookie balance lives in localStorage. */

export type Picture = { id: string; idea: string; dataUrl: string; createdAt: number };

export const FREE_PER_DAY = 10;
// Enable only after a verified payment flow supplies purchased-cookie credits.
export const COOKIE_PURCHASES_AVAILABLE = false;
export const JARS = [
  { id: "small", label: "Small jar", count: 10, price: "$0.99" },
  { id: "large", label: "Large jar", count: 50, price: "$2.99" },
] as const;

const DB = () => activeKidId() === "first" ? "ollie-pictures" : `ollie-pictures-${activeKidId()}`;
const STORE = "pictures";

function openDb(id = activeKidId()): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(id === 'first' ? 'ollie-pictures' : `ollie-pictures-${id}`, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE, { keyPath: "id" });
    req.onsuccess = () => { req.result.onversionchange = () => req.result.close(); resolve(req.result); };
    req.onerror = () => reject(req.error);
  });
}

export async function loadPictures(id = activeKidId()): Promise<Picture[]> {
  const db = await openDb(id);
  return new Promise((resolve, reject) => {
    const req = db.transaction(STORE).objectStore(STORE).getAll();
    req.onsuccess = () => { db.close(); resolve((req.result as Picture[]).sort((a, b) => b.createdAt - a.createdAt)); };
    req.onerror = () => { db.close(); reject(req.error); };
  });
}

export async function savePicture(p: Picture, id = activeKidId()): Promise<void> {
  const db = await openDb(id);
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE, "readwrite");
    tx.objectStore(STORE).put(p);
    tx.oncomplete = () => { db.close(); resolve(); };
    tx.onerror = () => { db.close(); reject(tx.error); };
  });
}

export async function deleteLocalPictures(ids: string[]): Promise<void> {
  for (const id of ids) await new Promise<void>((resolve, reject) => {
    const request = indexedDB.deleteDatabase(id === 'first' ? 'ollie-pictures' : `ollie-pictures-${id}`);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(new Error('Could not clear saved pictures.'));
    request.onblocked = () => reject(new Error('Close other Ollie tabs and retry deletion.'));
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
    const raw = readKidValue(KEY);
    if (raw) b = JSON.parse(raw) as Balance;
  } catch {
    /* fresh balance */
  }
  if (b.day !== today()) b = { ...b, day: today(), freeUsed: 0 };
  return b;
}

export function saveBalance(b: Balance) {
  writeKidValue(KEY, JSON.stringify(b));
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
