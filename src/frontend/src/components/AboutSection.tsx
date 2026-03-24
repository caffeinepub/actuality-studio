import { Link } from "@tanstack/react-router";
import React, { useState } from "react";

export default function AboutSection() {
  const [img1Loaded, setImg1Loaded] = useState(false);
  const [img2Loaded, setImg2Loaded] = useState(false);

  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-28 bg-background overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <span className="inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3">
            Our Story
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            From Schoolhouse to
            <span className="text-primary block sm:inline sm:ml-2">
              Sovereign Home
            </span>
          </h2>
        </div>

        {/* Text: full width */}
        <div className="max-w-3xl mx-auto space-y-5 sm:space-y-6 mb-12 sm:mb-16 text-center">
          <p className="font-body text-base sm:text-lg text-foreground/80 leading-relaxed">
            Built in 1902, McKinley Elementary School in Spokane, Washington
            stands as a testament to the city's architectural heritage. Its
            red-brick façade, arched windows, and cast-iron staircases have
            witnessed over a century of community life in Spokane's historic
            neighborhoods.
          </p>
          <p className="font-body text-base sm:text-lg text-foreground/80 leading-relaxed">
            Actuality Studio is transforming this Spokane landmark into
            sovereign loft residences — spaces where history meets modern
            living, and where community ownership replaces traditional landlord
            models.
          </p>
          <p className="font-body text-base sm:text-lg text-foreground/80 leading-relaxed">
            Our on-chain membership system ensures every resident holds a
            verifiable, custodian-free NFT badge — proof of belonging that lives
            on the Internet Computer, not in a corporate database.
          </p>
          <div className="pt-2 flex justify-center">
            <Link
              to="/membership"
              className="
                inline-flex items-center gap-2
                px-6 py-3 sm:px-7 sm:py-3.5
                bg-primary text-primary-foreground
                font-body font-semibold text-sm sm:text-base
                rounded-full
                transition-all duration-200 ease-in-out
                hover:scale-105 hover:shadow-lg hover:bg-primary/90
                active:scale-95
              "
            >
              View Memberships
            </Link>
          </div>
        </div>

        {/* Images: side by side below text */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          <div className="space-y-2">
            <div className="rounded-xl overflow-hidden aspect-[4/3] shadow-warm">
              <img
                src="/assets/generated/mckinley-1902.dim_600x400.png"
                srcSet="/assets/generated/mckinley-1902.dim_600x400.png 600w"
                sizes="(max-width: 640px) 100vw, 50vw"
                alt="McKinley Elementary School, Spokane, WA — c. 1902"
                width={600}
                height={400}
                onLoad={() => setImg1Loaded(true)}
                style={{
                  opacity: img1Loaded ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-xs font-body text-primary/70 text-center italic">
              c. 1902 — Original Building, Spokane, WA
            </p>
          </div>
          <div className="space-y-2">
            <div className="rounded-xl overflow-hidden aspect-[4/3] shadow-warm">
              <img
                src="/assets/generated/mckinley-gymnasium-studio.dim_600x400.png"
                srcSet="/assets/generated/mckinley-gymnasium-studio.dim_600x400.png 600w"
                sizes="(max-width: 640px) 100vw, 50vw"
                alt="McKinley Elementary School Gymnasium renovated as Actuality Studio, Spokane, WA"
                width={600}
                height={400}
                onLoad={() => setImg2Loaded(true)}
                style={{
                  opacity: img2Loaded ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
                decoding="async"
              />
            </div>
            <p className="text-xs font-body text-primary/70 text-center italic">
              Today — Gymnasium Space, Spokane, WA
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
