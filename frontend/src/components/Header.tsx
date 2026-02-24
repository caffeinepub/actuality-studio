import React, { useState } from 'react';
import { Link } from '@tanstack/react-router';
import LoginButton from './LoginButton';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { User, Menu, X } from 'lucide-react';

type RouterNavLink = {
  kind: 'route';
  label: string;
  to: '/' | '/membership';
};

type AnchorNavLink = {
  kind: 'anchor';
  label: string;
  href: string;
};

type NavLink = RouterNavLink | AnchorNavLink;

const navLinks: NavLink[] = [
  { kind: 'route',  label: 'Home',               to: '/' },
  { kind: 'anchor', label: 'About',               href: '#about' },
  { kind: 'route',  label: 'Memberships',         to: '/membership' },
  { kind: 'anchor', label: 'Sovereign Catalog',   href: '#catalog' },
  { kind: 'anchor', label: 'Community Examples',  href: '#examples' },
];

const desktopLinkClass =
  'px-3 py-2 text-sm font-medium text-forest/75 hover:text-forest hover:bg-cream-200 rounded-md transition-all duration-150 tracking-wide whitespace-nowrap';

const mobileLinkClass =
  'px-4 py-3 text-sm font-medium text-forest/80 hover:text-forest hover:bg-cream-200 rounded-md transition-all duration-150 tracking-wide text-left';

export default function Header() {
  const { identity } = useInternetIdentity();
  const { data: profile } = useGetCallerUserProfile();
  const isAuthenticated = !!identity;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleAnchorClick = (href: string) => {
    setMobileOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const renderDesktopLink = (link: NavLink) => {
    if (link.kind === 'route') {
      return (
        <Link
          key={link.label}
          to={link.to}
          className={desktopLinkClass}
          activeProps={{ className: 'px-3 py-2 text-sm font-medium text-forest bg-cream-200 rounded-md tracking-wide whitespace-nowrap' }}
        >
          {link.label}
        </Link>
      );
    }
    return (
      <button
        key={link.label}
        onClick={() => handleAnchorClick(link.href)}
        className={desktopLinkClass}
      >
        {link.label}
      </button>
    );
  };

  const renderMobileLink = (link: NavLink) => {
    if (link.kind === 'route') {
      return (
        <Link
          key={link.label}
          to={link.to}
          className={mobileLinkClass}
          onClick={() => setMobileOpen(false)}
        >
          {link.label}
        </Link>
      );
    }
    return (
      <button
        key={link.label}
        onClick={() => handleAnchorClick(link.href)}
        className={mobileLinkClass}
      >
        {link.label}
      </button>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-cream-50/97 backdrop-blur-md border-b border-cream-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4" style={{ height: '72px' }}>

        {/* ── Logo ── */}
        <Link
          to="/"
          className="flex items-center gap-3 shrink-0 group"
          onClick={() => setMobileOpen(false)}
        >
          <img
            src="/assets/generated/logomark-seasonal.dim_128x128.png"
            alt="Actuality Studio logomark"
            className="w-9 h-9 object-contain"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/assets/generated/logo-icon.dim_128x128.png';
            }}
          />
          <span
            className="font-heading font-bold text-xl leading-none tracking-wide"
            style={{ color: 'oklch(0.76 0.13 60)' }}
          >
            Actuality Studio
          </span>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map(renderDesktopLink)}
        </nav>

        {/* ── Right: User + Login ── */}
        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {isAuthenticated && profile && (
            <div className="flex items-center gap-2 text-sm text-forest/70 border border-cream-300 rounded-md px-3 py-1.5 bg-cream-50">
              <User className="w-3.5 h-3.5 text-terracotta" />
              <span className="font-medium text-forest max-w-[120px] truncate">{profile.name}</span>
            </div>
          )}
          <LoginButton variant="compact" />
        </div>

        {/* ── Mobile Hamburger ── */}
        <button
          className="lg:hidden flex items-center justify-center w-10 h-10 rounded-md text-forest hover:bg-cream-200 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-cream-300 bg-cream-50/98 backdrop-blur-md px-6 py-4 flex flex-col gap-1 shadow-warm">
          {navLinks.map(renderMobileLink)}

          <div className="mt-3 pt-3 border-t border-cream-300 flex flex-col gap-3">
            {isAuthenticated && profile && (
              <div className="flex items-center gap-2 text-sm text-forest/70 px-4">
                <User className="w-4 h-4 text-terracotta" />
                <span className="font-medium text-forest">{profile.name}</span>
              </div>
            )}
            <div className="px-4">
              <LoginButton variant="default" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
