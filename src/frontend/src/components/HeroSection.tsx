import React, { useState } from "react";
import { useImageReveal } from "../hooks/useImageReveal";
import EnrollmentModal from "./EnrollmentModal";

export default function HeroSection() {
  const [enrollOpen, setEnrollOpen] = useState(false);
  const { ref: heroImgRef, isVisible: heroImgVisible } =
    useImageReveal<HTMLDivElement>({
      threshold: 0.05,
      rootMargin: "0px",
    });

  return (
    <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div
          ref={heroImgRef}
          className={`w-full h-full ${heroImgVisible ? "image-reveal-visible" : "image-reveal-hidden"}`}
        >
          <img
            src="/assets/generated/mckinley-school-hero.dim_1920x1080.png"
            srcSet="/assets/generated/mckinley-school-hero.dim_1920x1080.png 1920w"
            sizes="100vw"
            alt="Historic McKinley Elementary School, Spokane, Washington"
            width={1920}
            height={1080}
            className="w-full h-full object-cover object-center"
            loading="eager"
            fetchPriority="high"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-forest/60 via-forest/40 to-forest/70" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 bg-gold/20 backdrop-blur-sm border border-gold/30 rounded-full px-4 py-1.5 mb-6 sm:mb-8">
          <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
          <span className="text-gold text-xs sm:text-sm font-body font-medium tracking-wide uppercase">
            Historic Preservation · Sovereign Living
          </span>
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl lg:text-7xl font-bold text-cream leading-tight mb-4 sm:mb-6">
          Actuality Studio
          <span className="block text-gold mt-1 sm:mt-2">McKinley Lofts</span>
        </h1>

        <p className="font-body text-base sm:text-lg lg:text-xl text-cream/85 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed">
          Join a sovereign community transforming Spokane, Washington's historic
          1902 McKinley Elementary School into living spaces that honor the past
          while building the future.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          <button
            type="button"
            onClick={() => setEnrollOpen(true)}
            className="
              w-full sm:w-auto
              px-7 py-3.5 sm:px-8 sm:py-4
              bg-primary text-primary-foreground
              font-body font-semibold text-base sm:text-lg
              rounded-full
              transition-all duration-200 ease-in-out
              hover:scale-105 hover:shadow-xl hover:bg-primary/90
              active:scale-95
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
            "
          >
            Start Your Free 30-Day Trial
          </button>
          <button
            type="button"
            onClick={() =>
              document
                .getElementById("about")
                ?.scrollIntoView({ behavior: "smooth" })
            }
            className="
              w-full sm:w-auto
              px-7 py-3.5 sm:px-8 sm:py-4
              bg-cream/10 text-cream border border-cream/30
              font-body font-medium text-base sm:text-lg
              rounded-full backdrop-blur-sm
              transition-all duration-200 ease-in-out
              hover:scale-105 hover:bg-cream/20 hover:shadow-lg
              active:scale-95
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cream/50
            "
          >
            Learn More
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-cream/50 animate-bounce">
        <div className="w-px h-8 bg-cream/30" />
        <span className="text-xs font-body tracking-widest uppercase">
          Scroll
        </span>
      </div>

      <EnrollmentModal
        open={enrollOpen}
        onClose={() => setEnrollOpen(false)}
        tierName="Trial"
        tierId="trial"
      />
    </section>
  );
}
