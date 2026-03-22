import { Link } from "@tanstack/react-router";
import React from "react";
import AboutSection from "../components/AboutSection";
import HeroSection from "../components/HeroSection";
import InspirationCarousel from "../components/InspirationCarousel";
import MembershipCard from "../components/MembershipCard";
import ProductTeaserGrid from "../components/ProductTeaserGrid";

export default function LandingPage() {
  return (
    <div className="overflow-x-hidden">
      <HeroSection />
      <AboutSection />
      <InspirationCarousel />
      <ProductTeaserGrid />

      {/* Mission Section */}
      <section className="py-16 sm:py-20 lg:py-28 bg-forest text-cream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-gold/70 mb-4">
            Our Mission
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-6 sm:mb-8 leading-tight">
            Sovereign Living,
            <span className="text-gold block sm:inline sm:ml-2">On-Chain</span>
          </h2>
          <p className="font-body text-base sm:text-lg text-cream/75 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto">
            We believe housing should be a right, not a commodity. By placing
            membership and ownership records on the Internet Computer, we
            eliminate custodians, reduce friction, and give residents true
            sovereignty over their homes in Spokane, Washington.
          </p>
          <Link
            to="/membership"
            className="
              inline-flex items-center gap-2
              px-7 py-3.5 sm:px-8 sm:py-4
              bg-gold text-forest
              font-body font-bold text-base sm:text-lg
              rounded-full
              transition-all duration-200 ease-in-out
              hover:scale-105 hover:shadow-xl hover:bg-gold/90
              active:scale-95
            "
          >
            Join the Community
          </Link>
        </div>
      </section>

      {/* Feature Cards */}
      <section id="community" className="py-16 sm:py-20 lg:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <span className="inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3">
              Why Actuality Studio
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
              Built Different
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
            {[
              {
                icon: "🏛️",
                title: "Historic Preservation",
                desc: "Every renovation decision honors the 1902 architectural heritage of McKinley Elementary School in Spokane, Washington.",
              },
              {
                icon: "🔗",
                title: "On-Chain Ownership",
                desc: "Your membership badge is a custodian-free NFT on the Internet Computer — you own it, period.",
              },
              {
                icon: "🌿",
                title: "Sovereign Community",
                desc: "Cohort-based living with up to 12 trusted members per household, governed on-chain.",
              },
            ].map((card) => (
              <div
                key={card.title}
                className="bg-background rounded-2xl border border-border/30 shadow-warm p-6 sm:p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="text-3xl sm:text-4xl mb-4">{card.icon}</div>
                <h3 className="font-heading text-lg sm:text-xl font-bold text-primary mb-2">
                  {card.title}
                </h3>
                <p className="font-body text-sm text-foreground/70 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA */}
      <section className="py-16 sm:py-20 bg-sandstone">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <MembershipCard />
        </div>
      </section>
    </div>
  );
}
