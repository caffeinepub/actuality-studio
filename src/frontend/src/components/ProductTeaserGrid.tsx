import { Link } from "@tanstack/react-router";
import React from "react";
import { useImageReveal } from "../hooks/useImageReveal";

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  imageSrcSet: string;
  badge: string;
  accentColor: string;
}

const products: Product[] = [
  {
    id: "adu-a",
    title: "ADU Shell — Type A",
    description:
      "Modular 400 sq ft single-story accessory dwelling unit shell.",
    imageUrl: "/assets/generated/adu-shell-type-a.dim_640x427.jpg",
    imageSrcSet: "/assets/generated/adu-shell-type-a.dim_640x427.jpg 600w",
    badge: "ADU",
    accentColor: "bg-secondary text-forest border border-border/40",
  },
  {
    id: "adu-b",
    title: "ADU Shell — Type B",
    description: "Two-story 650 sq ft ADU with optional rooftop terrace.",
    imageUrl: "/assets/generated/adu-shell-type-b.dim_640x427.jpg",
    imageSrcSet: "/assets/generated/adu-shell-type-b.dim_640x427.jpg 600w",
    badge: "ADU",
    accentColor: "bg-secondary text-forest border border-border/40",
  },
  {
    id: "furniture-compact",
    title: "Furniture Set — Compact",
    description:
      "Space-optimized furniture collection for studio and one-bedroom lofts.",
    imageUrl: "/assets/generated/furniture-set-compact.dim_640x427.jpg",
    imageSrcSet: "/assets/generated/furniture-set-compact.dim_640x427.jpg 600w",
    badge: "Furniture",
    accentColor: "bg-gold/20 text-gold border-gold/30",
  },
  {
    id: "furniture-sovereign",
    title: "Furniture Set — Sovereign",
    description:
      "Premium curated collection for full-floor sovereign loft residences.",
    imageUrl: "/assets/generated/furniture-set-sovereign.dim_640x427.jpg",
    imageSrcSet:
      "/assets/generated/furniture-set-sovereign.dim_640x427.jpg 600w",
    badge: "Furniture",
    accentColor: "bg-gold/20 text-gold border-gold/30",
  },
];

function ProductCard({ product, index }: { product: Product; index: number }) {
  const { ref, isVisible } = useImageReveal<HTMLDivElement>({
    threshold: 0.1,
    rootMargin: `0px 0px -${30 + index * 10}px 0px`,
  });

  return (
    <div
      ref={ref}
      className={`group bg-background rounded-2xl border border-border/30 shadow-warm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${isVisible ? "image-reveal-visible" : "image-reveal-hidden"}`}
    >
      {/* Image */}
      <div className="relative aspect-[3/2] overflow-hidden">
        <img
          src={product.imageUrl}
          srcSet={product.imageSrcSet}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          alt={product.title}
          width={600}
          height={400}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 left-3 text-xs font-body font-semibold px-2.5 py-1 rounded-full border ${product.accentColor}`}
        >
          {product.badge}
        </span>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <h3 className="font-heading text-base font-semibold text-foreground mb-1.5 leading-snug">
          {product.title}
        </h3>
        <p className="font-body text-xs text-foreground/60 leading-relaxed mb-4">
          {product.description}
        </p>
        <Link
          to="/catalog"
          className="
            inline-flex items-center gap-1.5
            text-xs font-body font-semibold text-primary
            hover:text-primary/80 transition-colors duration-200
            group/link
          "
        >
          View in Catalog
          <span className="transition-transform duration-200 group-hover/link:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

export default function ProductTeaserGrid() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-sandstone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14">
          <span className="inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3">
            Catalog Preview
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Featured Products
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {products.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-10 sm:mt-12">
          <Link
            to="/catalog"
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
            Browse Full Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
