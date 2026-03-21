import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#f5e6c8] border-t border-foreground/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-2 text-xs font-body text-foreground/50">
          <p>\u00a9 {year} Actuality Studio. All rights reserved.</p>
          <div className="flex items-center gap-4">
            {/* biome-ignore lint/a11y/useValidAnchor: placeholder links for legal pages */}
            <a
              href="/privacy"
              data-ocid="footer.privacy_link"
              className="hover:text-primary transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <span className="text-foreground/25">\u00b7</span>
            {/* biome-ignore lint/a11y/useValidAnchor: placeholder links for legal pages */}
            <a
              href="/terms"
              data-ocid="footer.terms_link"
              className="hover:text-primary transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
