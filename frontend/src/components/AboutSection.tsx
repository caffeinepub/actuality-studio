import React from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

export default function AboutSection() {
  return (
    <section className="py-20 px-6 bg-background relative overflow-hidden">
      {/* Subtle decorative leaf motif — top-right */}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute top-0 right-0 w-40 h-40 opacity-[0.07] pointer-events-none"
      >
        <ellipse cx="60" cy="50" rx="40" ry="22" fill="#4A7043" transform="rotate(-20 60 50)" />
        <ellipse cx="80" cy="80" rx="30" ry="16" fill="#A8CABA" transform="rotate(15 80 80)" />
        <ellipse cx="35" cy="85" rx="25" ry="14" fill="#C46A4E" transform="rotate(-10 35 85)" />
      </svg>

      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left column: text + CTA ── */}
          <div className="flex flex-col gap-6">
            {/* Eyebrow label */}
            <p className="text-xs font-sans tracking-widest uppercase text-terracotta font-semibold">
              Our Story
            </p>

            {/* Heading */}
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-forest leading-tight">
              About Actuality Studio
            </h2>

            {/* Decorative divider */}
            <div className="flex items-center gap-3">
              <span className="block h-px w-12 bg-gold/60" />
              <span className="block w-2 h-2 rounded-full bg-gold/70" />
              <span className="block h-px w-12 bg-gold/60" />
            </div>

            {/* Descriptive text */}
            <p className="font-sans text-forest/75 text-lg leading-relaxed">
              A decentralized platform on Dfinity's Internet Computer for creating ADU-based pocket
              neighborhoods and small co-housing communities. Secure, transparent, and truly sovereign.
            </p>

            {/* Supporting detail */}
            <p className="font-sans text-forest/60 text-base leading-relaxed">
              Rooted in the historic bones of McKinley Elementary School in Spokane, WA — built in 1902 —
              Actuality Studio bridges timeless craft with cutting-edge blockchain infrastructure to
              empower architects, builders, and community members alike.
            </p>

            {/* CTA button */}
            <div className="mt-2">
              <Link
                to="/membership"
                className="inline-flex items-center gap-2 px-8 py-3.5 rounded-md font-sans font-bold text-sm tracking-wide bg-terracotta text-white shadow-warm hover:bg-terracotta-600 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-terracotta/40 focus:ring-offset-2"
              >
                View Memberships
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* ── Right column: side-by-side images ── */}
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {/* Historic 1902 photo */}
              <div className="flex flex-col gap-2">
                <div className="relative overflow-hidden rounded-lg shadow-warm border border-gold/20 aspect-[3/2]">
                  <img
                    src="/assets/generated/mckinley-1902.dim_600x400.png"
                    alt="McKinley Elementary School, Spokane WA — historic 1902 exterior"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Sepia overlay to reinforce historic feel */}
                  <div className="absolute inset-0 bg-amber-900/10 mix-blend-multiply pointer-events-none" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="block w-2 h-2 rounded-full bg-gold/70 flex-shrink-0" />
                  <span className="font-sans text-xs font-semibold text-forest/70 tracking-wide uppercase">
                    1902 — Historic
                  </span>
                </div>
              </div>

              {/* Current exterior photo */}
              <div className="flex flex-col gap-2">
                <div className="relative overflow-hidden rounded-lg shadow-warm border border-sage/30 aspect-[3/2]">
                  <img
                    src="/assets/generated/mckinley-current.dim_600x400.png"
                    alt="McKinley Elementary School, Spokane WA — current exterior"
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="block w-2 h-2 rounded-full bg-sage/80 flex-shrink-0" />
                  <span className="font-sans text-xs font-semibold text-forest/70 tracking-wide uppercase">
                    Today — Spokane, WA
                  </span>
                </div>
              </div>
            </div>

            {/* Caption */}
            <p className="font-sans text-xs text-forest/45 italic text-center leading-relaxed">
              McKinley Elementary School, Spokane, WA — a 1902 Neoclassical landmark being
              transformed into a living studio for architectural arts &amp; crafts.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
