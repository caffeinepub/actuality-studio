import React from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateTrialMembership } from '../hooks/useQueries';
import { Loader2 } from 'lucide-react';

export default function HeroSection() {
  const { identity, login } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const navigate = useNavigate();
  const createTrial = useCreateTrialMembership();

  const handleCTA = async () => {
    if (!isAuthenticated) {
      try {
        await login();
      } catch {
        // ignore
      }
      return;
    }
    try {
      await createTrial.mutateAsync();
    } catch {
      // already a member — navigate to membership page
    }
    navigate({ to: '/membership' });
  };

  const isPending = createTrial.isPending;

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '80vh' }}
    >
      {/* Background photo */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/mckinley-elementary-hero.jpg')",
        }}
        role="img"
        aria-label="Historic McKinley Elementary School in Spokane, WA — a 1902 Neoclassical red-brick building with symmetrical windows, pediment, and brick detailing under a blue sky"
      />

      {/* Dark gradient overlay for legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/45 to-black/65" />
      {/* Subtle warm tint overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-forest/30 via-transparent to-transparent" />

      {/* Centered overlay content */}
      <div className="relative z-10 flex items-center justify-center w-full" style={{ minHeight: '80vh' }}>
        <div className="max-w-4xl mx-auto px-6 py-20 text-center flex flex-col items-center gap-6">

          {/* Decorative rule */}
          <div className="flex items-center gap-3 mb-2">
            <span className="block h-px w-12 bg-gold/70" />
            <span className="text-gold/90 text-xs font-sans tracking-[0.25em] uppercase font-semibold">
              Sovereign Communities · Blockchain
            </span>
            <span className="block h-px w-12 bg-gold/70" />
          </div>

          {/* Primary heading */}
          <h1 className="font-heading font-bold leading-tight text-white drop-shadow-lg"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.25rem)' }}
          >
            <span className="text-white">Actuality Studio</span>
            <span className="text-gold mx-2">–</span>
            <span
              className="text-gold"
              style={{ textShadow: '0 2px 16px rgba(212,175,55,0.45)' }}
            >
              Sovereign Design
            </span>
            <span className="text-white"> for Pocket Neighborhoods &amp; ADU Co-Housing</span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-sans text-white/90 leading-relaxed max-w-2xl"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)' }}
          >
            Repurposing landmarks like McKinley Elementary School Spokane into thriving sovereign communities on the blockchain
          </p>

          {/* Sage-green CTA button */}
          <button
            onClick={handleCTA}
            disabled={isPending}
            className="mt-4 inline-flex items-center gap-2 px-8 py-4 rounded-md font-sans font-semibold text-base tracking-wide shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sage disabled:opacity-70"
            style={{
              backgroundColor: '#A8CABA',
              color: '#1a2e22',
              boxShadow: '0 4px 24px rgba(168,202,186,0.35)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#8fbdaa';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#A8CABA';
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Starting Trial…
              </>
            ) : (
              'Start Your Free 30-Day Trial'
            )}
          </button>

          {/* Fine print */}
          <p className="text-white/50 text-xs font-sans mt-1">
            No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
