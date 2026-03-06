import { useEffect, useRef, useState } from "react";

interface UseImageRevealOptions {
  threshold?: number;
  rootMargin?: string;
}

/**
 * Returns a ref to attach to an image container and a boolean indicating
 * whether the element is visible. Uses IntersectionObserver to trigger a
 * progressive reveal (fade-in + upward slide) as the element enters the viewport.
 */
export function useImageReveal<T extends HTMLElement = HTMLDivElement>(
  options: UseImageRevealOptions = {},
) {
  const { threshold = 0.1, rootMargin = "0px 0px -40px 0px" } = options;
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // If already in viewport on mount, reveal immediately
    const rect = el.getBoundingClientRect();
    const inViewport =
      rect.top < window.innerHeight &&
      rect.bottom > 0 &&
      rect.left < window.innerWidth &&
      rect.right > 0;

    if (inViewport) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin },
    );

    observer.observe(el);

    return () => {
      observer.unobserve(el);
    };
  }, [threshold, rootMargin]);

  return { ref, isVisible };
}
