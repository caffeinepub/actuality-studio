import React from 'react';
import MembershipCard from '../components/MembershipCard';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import LoginButton from '../components/LoginButton';
import { Gem, Lock } from 'lucide-react';

// Decorative leaf motif for the membership page
function PageLeafMotif() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 160 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute right-0 top-0 w-40 h-56 opacity-[0.12] pointer-events-none"
    >
      {/* Main stem */}
      <path
        d="M80 210 Q70 170, 75 130 Q80 90, 65 55 Q55 30, 70 10"
        stroke="#4A7043"
        strokeWidth="3"
        fill="none"
      />
      {/* Leaves */}
      <ellipse cx="75" cy="130" rx="28" ry="16" fill="#A8CABA" transform="rotate(-35 75 130)" />
      <ellipse cx="65" cy="80" rx="24" ry="14" fill="#4A7043" transform="rotate(25 65 80)" />
      <ellipse cx="70" cy="40" rx="20" ry="12" fill="#C46A4E" transform="rotate(-20 70 40)" />
      {/* Small accent leaves */}
      <ellipse cx="95" cy="155" rx="16" ry="9" fill="#4A7043" transform="rotate(30 95 155)" />
      <ellipse cx="55" cy="105" rx="14" ry="8" fill="#A8CABA" transform="rotate(-15 55 105)" />
    </svg>
  );
}

export default function MembershipPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  return (
    <div className="min-h-screen bg-background py-20 px-6 relative overflow-hidden">
      {/* Decorative motifs */}
      <PageLeafMotif />
      <svg
        aria-hidden="true"
        viewBox="0 0 160 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 bottom-0 w-36 h-48 opacity-[0.10] pointer-events-none"
        style={{ transform: 'scaleX(-1) scaleY(-1)' }}
      >
        <path
          d="M80 210 Q70 170, 75 130 Q80 90, 65 55 Q55 30, 70 10"
          stroke="#4A7043"
          strokeWidth="3"
          fill="none"
        />
        <ellipse cx="75" cy="130" rx="28" ry="16" fill="#A8CABA" transform="rotate(-35 75 130)" />
        <ellipse cx="65" cy="80" rx="24" ry="14" fill="#4A7043" transform="rotate(25 65 80)" />
        <ellipse cx="70" cy="40" rx="20" ry="12" fill="#C46A4E" transform="rotate(-20 70 40)" />
      </svg>

      <div className="max-w-7xl mx-auto">
        {/* Page header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Gem className="w-5 h-5 text-terracotta" />
            <p className="text-xs font-sans tracking-widest uppercase text-terracotta font-semibold">
              NFT Membership
            </p>
          </div>
          <h1 className="font-heading text-5xl font-bold text-forest mb-4">
            Your Membership
          </h1>
          <p className="text-forest/60 text-lg max-w-xl mx-auto leading-relaxed">
            Manage your Actuality Studio membership. Start a free trial, track your status, and mint your NFT on the Internet Computer.
          </p>
        </div>

        {/* Content */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto text-center">
            <div className="card-warm p-10 mb-6 shadow-card">
              <div className="w-16 h-16 bg-cream-200 border border-cream-300 rounded-xl flex items-center justify-center mx-auto mb-6">
                <Lock className="w-8 h-8 text-forest/40" />
              </div>
              <h2 className="font-heading text-xl font-bold text-forest mb-3">Authentication Required</h2>
              <p className="text-forest/60 text-sm leading-relaxed mb-8">
                Please log in with Internet Identity to view and manage your membership status.
              </p>
              <div className="flex justify-center">
                <LoginButton />
              </div>
            </div>
            <p className="text-xs text-forest/40 font-sans">
              Internet Identity — secure, private, on-chain authentication
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-8">
            <MembershipCard />

            {/* Info section */}
            <div className="max-w-md w-full">
              <div className="card-warm p-6 shadow-card">
                <h3 className="font-heading text-base font-bold text-forest mb-4">
                  About NFT Membership
                </h3>
                <div className="space-y-3 text-sm text-forest/60 leading-relaxed">
                  <p>
                    Your membership NFT is minted directly on the Internet Computer blockchain, giving you a permanent, verifiable record of your membership.
                  </p>
                  <p>
                    Once minted, your membership is tied to your Internet Identity principal and cannot be transferred or revoked.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
