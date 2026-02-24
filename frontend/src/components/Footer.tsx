import React from 'react';
import { Heart } from 'lucide-react';

export default function Footer() {
  const year = new Date().getFullYear();
  const appId = encodeURIComponent(typeof window !== 'undefined' ? window.location.hostname : 'actuality-studio');

  return (
    <footer className="border-t border-cream-300 bg-cream-200 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-sm text-forest/60">
          <span className="font-sans tracking-wider uppercase text-xs">
            © {year} Actuality Studio
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-forest/60">
          <span>Built with</span>
          <Heart className="w-3.5 h-3.5 fill-terracotta text-terracotta" />
          <span>using</span>
          <a
            href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appId}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-terracotta hover:text-terracotta-600 font-semibold transition-colors"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}
