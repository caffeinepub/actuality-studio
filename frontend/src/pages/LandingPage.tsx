import React from 'react';
import { Link } from '@tanstack/react-router';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import MembershipCard from '../components/MembershipCard';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Shield, Zap, Globe, ArrowRight } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: 'On-Chain Identity',
    description: 'Your membership is permanently recorded on the Internet Computer blockchain — immutable and verifiable.',
  },
  {
    icon: Zap,
    title: '30-Day Free Trial',
    description: 'Start exploring with a full-featured trial. No credit card required, no strings attached.',
  },
  {
    icon: Globe,
    title: 'NFT Membership',
    description: 'Mint your membership as an NFT to unlock exclusive access and prove your authenticity.',
  },
];

// Decorative small leaf cluster for section accents
function LeafCluster({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <ellipse cx="25" cy="40" rx="20" ry="12" fill="#4A7043" transform="rotate(-30 25 40)" />
      <ellipse cx="55" cy="35" rx="16" ry="10" fill="#A8CABA" transform="rotate(20 55 35)" />
      <ellipse cx="40" cy="55" rx="14" ry="8" fill="#C46A4E" transform="rotate(-10 40 55)" />
      <path d="M25 40 L55 35" stroke="#F8F1E9" strokeWidth="1" opacity="0.5" />
    </svg>
  );
}

export default function LandingPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <HeroSection />

      {/* About Actuality Studio */}
      <AboutSection />

      {/* Below-hero mission statement section */}
      <section className="py-16 px-6 bg-forest text-center relative overflow-hidden">
        {/* Subtle decorative overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/10 pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          {/* Primary line */}
          <h2
            className="font-heading font-bold text-white leading-tight"
            style={{ fontSize: 'clamp(1.4rem, 3.2vw, 2.4rem)' }}
          >
            Sovereign Community Projects for Pocket Neighborhoods &amp; ADU Co-Housing
          </h2>

          {/* Decorative divider */}
          <div className="flex items-center gap-3">
            <span className="block h-px w-16 bg-gold/60" />
            <span className="block w-2 h-2 rounded-full bg-gold/70" />
            <span className="block h-px w-16 bg-gold/60" />
          </div>

          {/* First subtitle */}
          <p
            className="font-sans text-white/90 leading-relaxed max-w-3xl"
            style={{ fontSize: 'clamp(0.95rem, 1.8vw, 1.15rem)' }}
          >
            Join Us in the Renovation of the Historic McKinley Elementary School in Spokane, Washington.
            We are creating an &ldquo;Actuality Studio&rdquo; for Architectural Arts &amp; Crafts.
          </p>

          {/* Second subtitle */}
          <p
            className="font-sans text-white/80 leading-relaxed max-w-3xl"
            style={{ fontSize: 'clamp(0.9rem, 1.6vw, 1.05rem)' }}
          >
            An Invitation for Clients, Architects, Interior Designers, Landscape Architects, Builders
            and related Trades, Suppliers, and Sponsors to open New Frontiers in Architecture here in Spokane.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 relative overflow-hidden">
        {/* Subtle background motif */}
        <LeafCluster className="absolute top-8 right-8 w-24 h-24 opacity-[0.10] pointer-events-none" />
        <LeafCluster className="absolute bottom-8 left-8 w-20 h-20 opacity-[0.08] pointer-events-none" />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-sans tracking-widest uppercase text-terracotta font-semibold mb-3">
              Why Actuality Studio
            </p>
            <h2 className="font-heading text-4xl font-bold text-forest">
              Built for Digital Authenticity
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="card-warm p-6 group hover:shadow-warm transition-all duration-300 hover:-translate-y-0.5"
              >
                <div className="w-10 h-10 bg-terracotta/10 border border-terracotta/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-terracotta/20 transition-colors">
                  <Icon className="w-5 h-5 text-terracotta" />
                </div>
                <h3 className="font-heading text-lg font-bold text-forest mb-2">{title}</h3>
                <p className="text-forest/60 text-sm leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Membership CTA section */}
      <section className="py-20 px-6 bg-cream-200 relative overflow-hidden">
        {/* Decorative vine motif */}
        <svg
          aria-hidden="true"
          viewBox="0 0 300 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute left-0 top-0 w-64 h-48 opacity-[0.10] pointer-events-none"
        >
          <path
            d="M0 180 Q60 140, 50 100 Q40 60, 80 40 Q120 20, 150 50"
            stroke="#4A7043"
            strokeWidth="3"
            fill="none"
          />
          <ellipse cx="50" cy="100" rx="20" ry="12" fill="#A8CABA" transform="rotate(-25 50 100)" />
          <ellipse cx="80" cy="40" rx="18" ry="10" fill="#4A7043" transform="rotate(15 80 40)" />
          <ellipse cx="150" cy="50" rx="15" ry="9" fill="#C46A4E" transform="rotate(-10 150 50)" />
        </svg>
        <svg
          aria-hidden="true"
          viewBox="0 0 300 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute right-0 bottom-0 w-64 h-48 opacity-[0.10] pointer-events-none"
          style={{ transform: 'scaleX(-1)' }}
        >
          <path
            d="M0 180 Q60 140, 50 100 Q40 60, 80 40 Q120 20, 150 50"
            stroke="#4A7043"
            strokeWidth="3"
            fill="none"
          />
          <ellipse cx="50" cy="100" rx="20" ry="12" fill="#A8CABA" transform="rotate(-25 50 100)" />
          <ellipse cx="80" cy="40" rx="18" ry="10" fill="#4A7043" transform="rotate(15 80 40)" />
          <ellipse cx="150" cy="50" rx="15" ry="9" fill="#C46A4E" transform="rotate(-10 150 50)" />
        </svg>

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-xs font-sans tracking-widest uppercase text-sage-600 font-semibold mb-3">
              Membership
            </p>
            <h2 className="font-heading text-4xl font-bold text-forest mb-4">
              {isAuthenticated ? 'Your Membership Status' : 'Join the Community'}
            </h2>
            <p className="text-forest/60 text-lg max-w-xl mx-auto leading-relaxed">
              {isAuthenticated
                ? 'Manage your membership and mint your NFT below.'
                : 'Start your free trial today and become part of an exclusive on-chain community.'}
            </p>
          </div>

          <div className="flex flex-col items-center gap-6">
            <MembershipCard />
            {!isAuthenticated && (
              <Link
                to="/membership"
                className="flex items-center gap-2 text-sm font-semibold text-terracotta hover:text-terracotta-600 transition-colors"
              >
                Learn more about membership
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
