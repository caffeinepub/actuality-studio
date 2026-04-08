import { Link } from "@tanstack/react-router";
import React from "react";

export default function TermsPage() {
  const updated = "April 2026";

  return (
    <div className="min-h-screen bg-background">
      <section className="py-12 sm:py-16 bg-sandstone border-b border-border/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-body font-semibold tracking-widest uppercase text-primary/70 mb-3">
            Legal
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Terms of Service
          </h1>
          <p className="font-body text-sm text-foreground/50">
            Last updated: {updated}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-8 font-body text-foreground/80 leading-relaxed">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                1. Private Membership Agreement
              </h2>
              <p>
                By accessing Actuality Studio, you enter into a private
                membership agreement with Actuality Studio, a private
                association operating in Spokane, Washington. This agreement is
                made between sovereign private parties operating in trade, not
                commerce. These Terms are not subject to statutory consumer
                protection laws unless expressly stated.
              </p>
              <p className="mt-3">
                Membership in Actuality Studio is open to State Nationals and
                private parties who agree to these Terms in their private
                capacity. By enrolling, you affirm that you are acting as a
                sovereign individual, not as a corporate entity subject to
                statutory regulation.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                2. On-Chain Membership &amp; NFT Badges
              </h2>
              <p>
                Upon enrollment, your membership badge NFT is minted directly to
                your Internet Identity principal on the Internet Computer
                blockchain. You are the sole and direct owner of this NFT from
                the moment of minting. Actuality Studio acts as no custodian —
                there is no intermediary holding your badge on your behalf.
              </p>
              <p className="mt-3">
                Your on-chain membership badge is proof of your standing within
                the Actuality Studio community. Membership tiers and associated
                rights are as described on the Memberships page of this
                platform.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                3. Cohort Membership
              </h2>
              <p>
                Members may form cohorts of up to twelve (12) individuals for
                collaborative living arrangements within the McKinley Lofts
                community. Cohort membership is governed on-chain. Each cohort
                member holds their own Internet Identity principal and
                membership badge. Actuality Studio does not adjudicate internal
                cohort disputes.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                4. Catalog &amp; Transactions
              </h2>
              <p>
                The Actuality Studio Catalog presents items of interest to
                members for potential acquisition. Items sourced from
                third-party vendors link directly to the vendor's platform for
                ordering and payment. Actuality Studio does not process payments
                directly for third-party items.
              </p>
              <p className="mt-3">
                Member discounts applied to saved catalog items reflect the
                discount rate set by the platform administrator for your
                membership tier. Actuality Studio's direct transactions —
                including membership fees and community contributions — are
                facilitated through the Global Family Group 528 Prosperity
                Account system (
                <a
                  href="https://global528.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  global528.com
                </a>
                ) as private exchanges in trade between sovereign parties.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                5. Use of the Platform
              </h2>
              <p>
                Members agree to use the platform in good faith for its stated
                purposes: sovereign living community management, catalog
                exploration, and on-chain membership administration. Members
                agree not to use the platform to harm other members, to
                reverse-engineer the underlying smart contracts for malicious
                purposes, or to misrepresent their membership status.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                6. Limitation of Liability
              </h2>
              <p>
                Actuality Studio, its administrators, and affiliates make no
                warranties regarding the platform beyond what is expressly
                stated. The Internet Computer blockchain infrastructure is
                provided by the DFINITY Foundation and is independent of
                Actuality Studio. Platform availability, smart contract
                functionality, and blockchain state are subject to the
                underlying ICP network conditions.
              </p>
              <p className="mt-3">
                Actuality Studio is not liable for: loss of access to your
                Internet Identity, blockchain network disruptions, market
                fluctuations in the value of membership NFTs, or outcomes of
                third-party transactions initiated through the Catalog.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                7. Governing Law
              </h2>
              <p>
                These Terms are governed by the private law of Washington State
                as applied between sovereign private parties. Any disputes shall
                first be addressed through private mediation between the
                parties. These Terms do not constitute a commercial contract
                subject to the Uniform Commercial Code unless both parties
                expressly agree in writing.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                8. Amendments
              </h2>
              <p>
                Actuality Studio reserves the right to amend these Terms.
                Material amendments will be announced through the platform.
                Continued membership following any amendment constitutes
                acceptance of the revised Terms.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                9. Acceptance
              </h2>
              <p>
                By enrolling in Actuality Studio and using this platform, you
                affirm that you have read, understood, and agree to these Terms
                of Service in your private sovereign capacity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-8 bg-sandstone border-t border-border/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <Link
            to="/"
            className="font-body text-sm text-foreground/60 hover:text-primary transition-colors duration-200"
          >
            ← Back to Home
          </Link>
          <Link
            to="/privacy"
            className="font-body text-sm text-primary hover:underline transition-colors duration-200"
          >
            Privacy Policy →
          </Link>
        </div>
      </section>
    </div>
  );
}
