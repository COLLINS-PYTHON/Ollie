import { useSyncExternalStore } from "react";
import type { Band } from "@/lib/slideshow/types";

/* Lets the Trail reopen a finished lesson as a read-only review. */
export type SlideshowReview = { categoryId: string; band: Band; label: string; lessonIndex: number };

let current: SlideshowReview | null = null;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

export function startReview(review: SlideshowReview) {
  current = review;
  emit();
}

export function endReview() {
  current = null;
  emit();
}

export function useSlideshowReview(): SlideshowReview | null {
  return useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => current,
  );
}
