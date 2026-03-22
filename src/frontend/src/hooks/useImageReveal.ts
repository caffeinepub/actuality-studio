import { useRef } from "react";

interface UseImageRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Always returns isVisible: true — images are never hidden.
 * The image-reveal-visible CSS class applies a gentle fade-in on mount.
 */
export function useImageReveal<T extends HTMLElement = HTMLDivElement>(
  _options: UseImageRevealOptions = {},
) {
  const ref = useRef<T>(null);
  return { ref, isVisible: true };
}
