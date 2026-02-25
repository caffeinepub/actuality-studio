import React, { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useCreateTrialMembership } from '../hooks/useQueries';
import { Loader2 } from 'lucide-react';

export default function HeroSection() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const navigate = useNavigate();
  const createTrial = useCreateTrialMembership();
  const [ctaError, setCtaError] = useState<string | null>(null);

  const isLoggingIn = loginStatus === 'logging-in';
  const isPending = isLoggingIn || createTrial.isPending;

  const handleCTA = async () => {
    setCtaError(null);

    if (!isAuthenticated) {
      try {
        await login();
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : 'Login failed. Please try again.';
        if (msg !== 'User closed the window') {
          setCtaError('Login was cancelled or failed. Please try again.');
        }
      }
      return;
    }

    try {
      await createTrial.mutateAsync();
    } catch {
      // Already a member — navigate to membership page anyway
    }
    navigate({ to: '/membership' });
  };

  const buttonLabel = isLoggingIn
    ? 'Connecting…'
    : createTrial.isPending
    ? 'Starting Trial…'
    : 'Start Your Free 30-Day Trial';

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Background photo — McKinley Elementary School, Spokane WA */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/generated/mckinley-school-hero.dim_1920x1080.png')",
        }}
        role="img"
        aria-label="Historic McKinley Elementary School in Spokane, WA — a 1902 Neoclassical red-brick building with symmetrical windows, pediment, and brick detailing under a blue sky"
      />

      {/* Dark overlay for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/75" />

      {/* Centered content */}
      <div
        className="relative z-10 flex items-center justify-center w-full"
        style={{ minHeight: '100vh' }}
      >
        <div className="max-w-4xl mx-auto px-6 py-24 text-center flex flex-col items-center gap-6">

          {/* Decorative rule */}
          <div className="flex items-center gap-3 mb-2">
            <span className="block h-px w-10 bg-gold/70" />
            <span className="text-gold/90 text-xs font-sans tracking-[0.25em] uppercase font-semibold">
              Architecture · Community · Innovation
            </span>
            <span className="block h-px w-10 bg-gold/70" />
          </div>

          {/* Primary heading */}
          <h1
            className="font-heading font-bold leading-tight text-white drop-shadow-lg w-full"
            style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.75rem)' }}
          >
            Actuality Studio — Opening New Frontiers in Architecture
          </h1>

          {/* Subtitle */}
          <p
            className="font-sans text-white/90 leading-relaxed max-w-2xl"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.25rem)' }}
          >
            Creating Pocket Neighborhoods, ADU Co-Housing, Custom Homes and Home Renovations
          </p>

          {/* Teal-green CTA button */}
          <button
            onClick={handleCTA}
            disabled={isPending}
            className="mt-6 inline-flex items-center gap-2 px-10 py-4 rounded-md font-sans font-bold text-base tracking-wide shadow-xl transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-teal-400 focus:ring-offset-2 disabled:opacity-70 disabled:cursor-not-allowed"
            style={{
              backgroundColor: '#0d9488',
              color: '#ffffff',
              boxShadow: '0 6px 32px rgba(13,148,136,0.45)',
            }}
            onMouseEnter={e => {
              if (!isPending) {
                (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0f766e';
                (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 8px 36px rgba(13,148,136,0.55)';
              }
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.backgroundColor = '#0d9488';
              (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 32px rgba(13,148,136,0.45)';
            }}
          >
            {isPending ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                {buttonLabel}
              </>
            ) : (
              buttonLabel
            )}
          </button>

          {/* Error message */}
          {ctaError && (
            <p className="text-red-300 text-sm font-sans mt-1 bg-black/40 px-4 py-2 rounded">
              {ctaError}
            </p>
          )}

          {/* Fine print */}
          <p className="text-white/50 text-xs font-sans mt-1">
            No credit card required · Cancel anytime
          </p>
        </div>
      </div>
    </section>
  );
}
