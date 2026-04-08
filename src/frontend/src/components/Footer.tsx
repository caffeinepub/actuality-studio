import { Link } from "@tanstack/react-router";
import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  const hostname =
    typeof window !== "undefined"
      ? window.location.hostname
      : "actuality-studio";

  return (
    <footer className="bg-sandstone border-t border-border/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 text-xs font-body text-foreground/50">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
            <p>© {year} Actuality Studio. All rights reserved.</p>
            <span className="hidden sm:block text-foreground/25">·</span>
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors duration-200"
            >
              Built with love using caffeine.ai
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              to="/privacy"
              data-ocid="footer.privacy_link"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <span className="text-foreground/25">·</span>
            <Link
              to="/terms"
              data-ocid="footer.terms_link"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
