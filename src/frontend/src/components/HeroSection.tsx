import { motion } from "motion/react";
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
    <section>
      {/* Hero image — clean, no overlay, no text */}
      <div
        ref={heroImgRef}
        className={`w-full aspect-[21/9] overflow-hidden ${
          heroImgVisible ? "image-reveal-visible" : "image-reveal-hidden"
        }`}
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

      {/* Content block below the image */}
      <div className="bg-background py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-primary text-xs sm:text-sm font-body font-medium tracking-wide uppercase">
              Historic Preservation · Sovereign Living
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2 }}
            className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-5"
          >
            Actuality Studio
            <span className="block text-primary mt-1 sm:mt-2">
              McKinley Lofts
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.3 }}
            className="font-body text-base sm:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
          >
            Join a sovereign community transforming Spokane, Washington's
            historic 1902 McKinley Elementary School into living spaces that
            honor the past while building the future.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
          >
            <button
              type="button"
              data-ocid="hero.primary_button"
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
              data-ocid="hero.secondary_button"
              onClick={() =>
                document
                  .getElementById("about")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="
                w-full sm:w-auto
                px-7 py-3.5 sm:px-8 sm:py-4
                bg-muted text-foreground border border-border
                font-body font-medium text-base sm:text-lg
                rounded-full
                transition-all duration-200 ease-in-out
                hover:scale-105 hover:bg-muted/80 hover:shadow-lg
                active:scale-95
                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50
              "
            >
              Learn More
            </button>
          </motion.div>
        </div>
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
