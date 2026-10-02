/* Screen time is tracked per surface: only Search and Create count toward the
   parent's limit. The daily slideshow is never tracked here. */
export type Surface = "search" | "create";

const KEY = "ollie-usage-v1";
type Usage = { day: string; seconds: Record<Surface, number> };

function today() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function read(): Usage {
  try {
    const u = JSON.parse(localStorage.getItem(KEY) ?? "null") as Usage | null;
    if (u && u.day === today()) return u;
  } catch {
    /* ignore */
  }
  return { day: today(), seconds: { search: 0, create: 0 } };
}

export function addUsage(surface: Surface, seconds: number) {
  const u = read();
  u.seconds[surface] += seconds;
  localStorage.setItem(KEY, JSON.stringify(u));
}

export function minutesToday(): number {
  const u = read();
  return Math.floor((u.seconds.search + u.seconds.create) / 60);
}
