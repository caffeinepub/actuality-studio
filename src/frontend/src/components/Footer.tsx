import { Link } from "@tanstack/react-router";
import { Heart } from "lucide-react";
import React from "react";
import { SiGithub, SiInstagram, SiLinkedin, SiX } from "react-icons/si";

const socialLinks = [
  { icon: SiX, href: "https://x.com", label: "X (Twitter)" },
  { icon: SiInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: SiLinkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: SiGithub, href: "https://github.com", label: "GitHub" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(
    typeof window !== "undefined"
      ? window.location.hostname
      : "actuality-studio",
  );

  return (
    <footer className="bg-forest text-cream/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/assets/generated/logo-icon.dim_128x128.png"
                alt="Actuality Studio"
                className="w-8 h-8 rounded-full object-cover"
                loading="lazy"
              />
              <span className="font-heading text-lg font-bold text-gold">
                Actuality Studio
              </span>
            </div>
            <p className="font-body text-sm text-cream/60 leading-relaxed max-w-xs">
              Transforming Spokane, Washington's historic McKinley Elementary
              School into sovereign loft residences on the Internet Computer.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-cream/90 uppercase tracking-wider mb-4">
              Navigate
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", to: "/" },
                { label: "Memberships", to: "/membership" },
                { label: "Sovereign Catalog", to: "/catalog" },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="font-body text-sm text-cream/60 hover:text-gold transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-cream/90 uppercase tracking-wider mb-4">
              Legal
            </h4>
            <ul className="space-y-2.5">
              {legalLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    className="font-body text-sm text-cream/60 hover:text-gold transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* ICP + Social */}
          <div>
            <h4 className="font-heading text-sm font-semibold text-cream/90 uppercase tracking-wider mb-4">
              Built On
            </h4>
            <a
              href="https://internetcomputer.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cream/10 hover:bg-cream/15 border border-cream/20 rounded-xl px-3 py-2.5 transition-all duration-200 hover:scale-105 active:scale-95 mb-5"
            >
              <svg
                viewBox="0 0 32 32"
                className="w-5 h-5 shrink-0"
                fill="none"
                role="img"
                aria-label="Internet Computer Protocol logo"
              >
                <circle cx="16" cy="16" r="16" fill="#29ABE2" />
                <ellipse
                  cx="16"
                  cy="16"
                  rx="12"
                  ry="6"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <ellipse
                  cx="16"
                  cy="16"
                  rx="6"
                  ry="12"
                  stroke="white"
                  strokeWidth="2"
                  fill="none"
                />
                <circle cx="16" cy="16" r="2.5" fill="white" />
              </svg>
              <span className="font-body text-xs text-cream/80">
                Decentralized on ICP
              </span>
            </a>

            <div className="flex items-center gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-8 h-8 flex items-center justify-center rounded-full bg-cream/10 hover:bg-cream/20 text-cream/60 hover:text-gold transition-all duration-200 hover:scale-110 active:scale-95"
                >
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-body text-cream/40">
          <p>© {year} Actuality Studio. All rights reserved.</p>
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gold transition-colors duration-200"
          >
            Built with <Heart className="w-3 h-3 text-primary fill-primary" />{" "}
            using caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
