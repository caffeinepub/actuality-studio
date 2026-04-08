import { Link } from "@tanstack/react-router";
import React from "react";

export default function PrivacyPage() {
  const updated = "April 2026";

  return (
    <div className="min-h-screen bg-background">
      <section className="py-12 sm:py-16 bg-sandstone border-b border-border/20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="inline-block text-xs font-body font-semibold tracking-widest uppercase text-primary/70 mb-3">
            Legal
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-2">
            Privacy Policy
          </h1>
          <p className="font-body text-sm text-foreground/50">
            Last updated: {updated}
          </p>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-neutral max-w-none">
          <div className="space-y-8 font-body text-foreground/80 leading-relaxed">
            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                1. Scope &amp; Nature of this Policy
              </h2>
              <p>
                Actuality Studio operates as a private membership association
                and all transactions are conducted in trade, not commerce,
                pursuant to the lawful rights of private parties. This Privacy
                Policy governs the handling of information within Actuality
                Studio's private platform, accessible exclusively to members and
                invited guests.
              </p>
              <p className="mt-3">
                This platform is hosted on the Internet Computer Protocol (ICP)
                blockchain infrastructure and makes use of Internet Identity for
                authentication. No personal data beyond what Internet Identity
                provides (a cryptographic principal identifier) is collected or
                stored by Actuality Studio.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                2. Information We Collect
              </h2>
              <p>
                <strong>Internet Identity Principal:</strong> When you
                authenticate using Internet Identity, your anonymous principal
                identifier is used to identify your session and membership. This
                identifier is a pseudonymous cryptographic key — it does not
                contain your name, email address, phone number, or any other
                personally identifiable information.
              </p>
              <p className="mt-3">
                <strong>Membership Data:</strong> Information related to your
                membership tier, cohort assignments, and on-chain NFT badges is
                stored on the Internet Computer blockchain as part of the
                platform's canisters. This data is under your direct control as
                the principal holder.
              </p>
              <p className="mt-3">
                <strong>Catalog Interactions:</strong> Items saved to your
                personal catalog are stored locally in your browser and, where
                applicable, associated with your principal on-chain. No
                behavioral analytics, tracking cookies, or third-party data
                brokers are used.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                3. How We Use Information
              </h2>
              <p>
                Information is used solely to provide platform features:
                membership verification, cohort management, catalog access, and
                personal storefront functionality. We do not sell, lease, or
                transfer member data to any third party. We do not use member
                data for marketing, advertising, or profiling.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                4. Jurisdiction &amp; Legal Framework
              </h2>
              <p>
                Actuality Studio is based in Spokane, Washington. Members are
                acknowledged as State Nationals operating within their lawful
                private capacity. All transactions and agreements are conducted
                in private trade under the maxims of equity and common law, not
                as commercial transactions subject to statutory regulation.
              </p>
              <p className="mt-3">
                Transactions facilitated through Actuality Studio may utilize
                the Global Family Group 528 Prosperity Account system (
                <a
                  href="https://global528.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  global528.com
                </a>
                ) as a private exchange mechanism between sovereign parties.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                5. Data Security
              </h2>
              <p>
                Your membership data lives on-chain on the Internet Computer,
                benefiting from the blockchain's inherent security and
                decentralization. No centralized database stores your
                credentials. Authentication is handled entirely through Internet
                Identity, which uses hardware-backed cryptographic keys.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                6. Your Rights
              </h2>
              <p>
                As the holder of your Internet Identity principal, you maintain
                complete control over your on-chain data. You may revoke your
                Internet Identity at any time through the Internet Identity
                dashboard. Saved catalog items stored locally may be cleared
                through your browser's local storage settings.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                7. Changes to this Policy
              </h2>
              <p>
                This Privacy Policy may be updated periodically. Material
                changes will be communicated through the platform. Continued use
                of the platform following any changes constitutes acceptance of
                the revised policy.
              </p>
            </div>

            <div>
              <h2 className="font-heading text-xl font-bold text-foreground mb-3">
                8. Contact
              </h2>
              <p>
                For questions regarding this Privacy Policy or your membership
                data, please contact us through the Actuality Studio platform or
                reach the admin via the Admin Dashboard.
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
            to="/terms"
            className="font-body text-sm text-primary hover:underline transition-colors duration-200"
          >
            Terms of Service →
          </Link>
        </div>
      </section>
    </div>
  );
}
