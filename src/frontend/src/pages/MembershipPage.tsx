import React, { useState } from "react";
import EnrollmentModal from "../components/EnrollmentModal";
import MembershipTierCard from "../components/MembershipTierCard";

interface Tier {
  id: string;
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  buttonLabel: string;
  accentColor: "sage" | "blush" | "terracotta" | "gold" | "forest";
  featured?: boolean;
  comingSoon?: boolean;
}

const tiers: Tier[] = [
  {
    id: "trial",
    name: "Free Trial",
    price: "Free",
    priceNote: "30 days",
    features: [
      "30-day full access trial",
      "Catalog preview",
      "Community examples access",
      "Cohort setup (up to 12 members)",
      "On-chain trial badge NFT",
    ],
    buttonLabel: "Start Free Trial",
    accentColor: "sage",
  },
  {
    id: "standard",
    name: "Standard",
    price: "$49",
    priceNote: "/month",
    features: [
      "Full Catalog access",
      "ADU shell blueprints",
      "Community collaboration tools",
      "Cohort management (up to 12)",
      "On-chain membership badge NFT",
      "Priority support",
    ],
    buttonLabel: "Enroll Now",
    accentColor: "terracotta",
    featured: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "$149",
    priceNote: "/month",
    features: [
      "Everything in Standard",
      "Full BIM model access",
      "Exclusive furniture collections",
      "Direct architect consultations",
      "Premium on-chain badge NFT",
      "Early access to new units",
    ],
    buttonLabel: "Go Premium",
    accentColor: "gold",
  },
  {
    id: "sovereign",
    name: "Sovereign",
    price: "Custom",
    features: [
      "Full unit ownership pathway",
      "Custom renovation planning",
      "Dedicated project manager",
      "Legal & title support",
      "Sovereign deed NFT",
      "Lifetime community access",
    ],
    buttonLabel: "Contact Us",
    accentColor: "forest",
    comingSoon: true,
  },
];

export default function MembershipPage() {
  const [selectedTier, setSelectedTier] = useState<Tier | null>(null);
  const [enrollOpen, setEnrollOpen] = useState(false);

  const handleEnroll = (tier: Tier) => {
    setSelectedTier(tier);
    setEnrollOpen(true);
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero */}
      <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-cream/60 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-4">
            Membership Plans
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight">
            Choose Your
            <span className="text-primary block sm:inline sm:ml-2">
              Sovereign Path
            </span>
          </h1>
          <p className="font-body text-base sm:text-lg text-foreground/65 max-w-2xl mx-auto leading-relaxed">
            Every membership tier includes a custodian-free NFT badge minted
            directly to your principal on the Internet Computer. No
            intermediaries, no custodians.
          </p>
        </div>
      </section>

      {/* Tier Cards */}
      <section className="pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8">
            {tiers.map((tier) => (
              <MembershipTierCard
                key={tier.id}
                name={tier.name}
                price={tier.price}
                priceNote={tier.priceNote}
                features={tier.features}
                buttonLabel={tier.buttonLabel}
                accentColor={tier.accentColor}
                featured={tier.featured}
                comingSoon={tier.comingSoon}
                onEnroll={() => handleEnroll(tier)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* NFT Ownership callout */}
      <section className="py-12 sm:py-16 bg-forest text-cream">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-cream mb-4">
            Custodian-Free NFT Minting
          </h2>
          <p className="font-body text-sm sm:text-base text-cream/70 leading-relaxed">
            When you enroll, your membership badge NFT is minted directly to
            your Internet Identity principal on the Internet Computer
            blockchain. There is no custodian wallet, no transfer step, and no
            third-party intermediary. You are the sole owner from the moment of
            minting.
          </p>
        </div>
      </section>

      {selectedTier && (
        <EnrollmentModal
          open={enrollOpen}
          onClose={() => {
            setEnrollOpen(false);
            setSelectedTier(null);
          }}
          tierName={selectedTier.name}
          tierId={selectedTier.id}
        />
      )}
    </div>
  );
}
