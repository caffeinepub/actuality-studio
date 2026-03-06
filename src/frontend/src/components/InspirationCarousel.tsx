import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { useImageReveal } from "../hooks/useImageReveal";

interface Slide {
  src: string;
  srcSet: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

const slides: Slide[] = [
  {
    src: "/assets/generated/mckinley-exterior.dim_1200x800.png",
    srcSet: "/assets/generated/mckinley-exterior.dim_1200x800.png 1200w",
    alt: "McKinley Elementary School, Spokane, WA — Exterior",
    caption:
      "The iconic 1902 red-brick facade of McKinley Elementary School in Spokane, Washington, preserved for future generations.",
    width: 1200,
    height: 800,
  },
  {
    src: "/assets/generated/mckinley-interior-apt.dim_1200x800.png",
    srcSet: "/assets/generated/mckinley-interior-apt.dim_1200x800.png 1200w",
    alt: "McKinley Lofts, Spokane, WA — Interior Apartment",
    caption:
      "Open-plan loft living with original hardwood floors and exposed brick inside Spokane's historic McKinley School.",
    width: 1200,
    height: 800,
  },
  {
    src: "/assets/generated/mckinley-staircase.dim_1200x800.png",
    srcSet: "/assets/generated/mckinley-staircase.dim_1200x800.png 1200w",
    alt: "McKinley Elementary School, Spokane, WA — Original Cast-Iron Staircase",
    caption:
      "Restored cast-iron staircases at Spokane's McKinley Elementary School — a century of stories in every step.",
    width: 1200,
    height: 800,
  },
  {
    src: "/assets/generated/mckinley-interior-detail.dim_1200x800.png",
    srcSet: "/assets/generated/mckinley-interior-detail.dim_1200x800.png 1200w",
    alt: "McKinley Elementary School, Spokane, WA — Interior Architectural Detail",
    caption:
      "Arched windows and original millwork bring warmth to every space in Spokane's McKinley Lofts.",
    width: 1200,
    height: 800,
  },
];

export default function InspirationCarousel() {
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Reveal the carousel section as it scrolls into view
  const { ref: sectionRef, isVisible: sectionVisible } =
    useImageReveal<HTMLDivElement>({
      threshold: 0.08,
      rootMargin: "0px 0px -60px 0px",
    });

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 400);
    },
    [isTransitioning],
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: current is intentional to reset timer on slide change
  useEffect(() => {
    timerRef.current = setTimeout(next, 5000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, next]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-spring overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <span className="inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3">
            Real-World Inspiration
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-forest">
            The McKinley Vision — Spokane, WA
          </h2>
        </div>

        {/* Carousel */}
        <div
          ref={sectionRef}
          className={`relative rounded-2xl overflow-hidden shadow-2xl ${sectionVisible ? "image-reveal-visible" : "image-reveal-hidden"}`}
        >
          {/* Images */}
          <div className="relative aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7] bg-forest/50">
            {slides.map((slide, i) => (
              <img
                key={slide.src}
                src={slide.src}
                srcSet={slide.srcSet}
                sizes="(max-width: 768px) 100vw, 80vw"
                alt={slide.alt}
                width={slide.width}
                height={slide.height}
                loading="lazy"
                decoding="async"
                className={`
                  absolute inset-0 w-full h-full object-cover
                  transition-opacity duration-500 ease-in-out
                  ${i === current ? "opacity-100" : "opacity-0"}
                `}
              />
            ))}

            {/* Nav buttons */}
            <button
              type="button"
              onClick={prev}
              aria-label="Previous slide"
              className="
                absolute left-3 sm:left-4 top-1/2 -translate-y-1/2
                w-10 h-10 sm:w-12 sm:h-12
                flex items-center justify-center
                bg-forest/60 hover:bg-forest/80 text-cream
                rounded-full backdrop-blur-sm
                transition-all duration-200 ease-in-out
                hover:scale-110 active:scale-95
              "
            >
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
            <button
              type="button"
              onClick={next}
              aria-label="Next slide"
              className="
                absolute right-3 sm:right-4 top-1/2 -translate-y-1/2
                w-10 h-10 sm:w-12 sm:h-12
                flex items-center justify-center
                bg-forest/60 hover:bg-forest/80 text-cream
                rounded-full backdrop-blur-sm
                transition-all duration-200 ease-in-out
                hover:scale-110 active:scale-95
              "
            >
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          </div>

          {/* Caption below image */}
          <div className="px-4 sm:px-6 lg:px-8 pt-4 pb-2 bg-forest/90 min-h-[3.5rem] flex items-center">
            <p
              className={`
                font-body text-sm sm:text-base lg:text-lg text-cream/90 max-w-2xl mx-auto text-center w-full italic
                transition-all duration-400 ease-in-out
                ${isTransitioning ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}
              `}
            >
              {slides[current].caption}
            </p>
          </div>

          {/* Dots */}
          <div className="flex items-center justify-center gap-2 py-3 bg-forest/80">
            {slides.map((slide, i) => (
              <button
                type="button"
                key={slide.src}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`
                  rounded-full transition-all duration-300 ease-in-out
                  hover:scale-125 active:scale-95
                  ${i === current ? "w-6 h-2.5 bg-gold" : "w-2.5 h-2.5 bg-cream/30 hover:bg-cream/60"}
                `}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-8 sm:mt-10">
          <Link
            to="/catalog"
            className="
              inline-flex items-center gap-2
              px-6 py-3 sm:px-7 sm:py-3.5
              bg-gold text-forest
              font-body font-semibold text-sm sm:text-base
              rounded-full
              transition-all duration-200 ease-in-out
              hover:scale-105 hover:shadow-lg hover:bg-gold/90
              active:scale-95
            "
          >
            View Full Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
