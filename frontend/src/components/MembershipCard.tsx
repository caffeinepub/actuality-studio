import React from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import {
  useGetCallerMembershipState,
  useCreateTrialMembership,
  useMintMembership,
} from '../hooks/useQueries';
import { MemberCategory } from '../backend';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, Clock, Gem, Zap, AlertCircle } from 'lucide-react';

function getRemainingDays(trialEndsAt: bigint): number {
  const nowNs = BigInt(Date.now()) * BigInt(1_000_000);
  const diffNs = trialEndsAt - nowNs;
  if (diffNs <= 0n) return 0;
  return Math.ceil(Number(diffNs / BigInt(1_000_000_000) / 86400n));
}

export default function MembershipCard() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: membership, isLoading, error } = useGetCallerMembershipState();
  const createTrial = useCreateTrialMembership();
  const mintMembership = useMintMembership();

  if (!isAuthenticated) {
    return (
      <div className="card-warm p-8 text-center max-w-md mx-auto shadow-card">
        <div className="w-16 h-16 rounded-full bg-sage/20 border border-sage flex items-center justify-center mx-auto mb-4">
          <Gem className="w-8 h-8 text-terracotta" />
        </div>
        <h3 className="font-heading text-xl font-bold mb-2 text-forest">Members Only</h3>
        <p className="text-forest/60 text-sm mb-6">
          Log in with Internet Identity to access your membership status and mint your NFT.
        </p>
        <div className="flex justify-center">
          <span className="text-terracotta text-sm font-semibold">
            ↑ Use the Log In button above
          </span>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="card-warm p-8 text-center max-w-md mx-auto shadow-card">
        <Loader2 className="w-8 h-8 animate-spin text-terracotta mx-auto mb-4" />
        <p className="text-forest/60 text-sm">Loading membership status...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-warm p-8 text-center max-w-md mx-auto shadow-card border-destructive/30">
        <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-4" />
        <p className="text-sm text-forest/60">Failed to load membership. Please try again.</p>
      </div>
    );
  }

  // No membership yet — offer trial
  if (!membership) {
    return (
      <div className="card-warm p-8 max-w-md mx-auto animate-fade-in shadow-card">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-lg bg-gold/15 border border-gold/40 flex items-center justify-center">
            <Zap className="w-6 h-6 text-gold-400" />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-forest">Start Your Journey</h3>
            <p className="text-forest/60 text-sm">No membership found</p>
          </div>
        </div>

        <div className="bg-cream-200 border border-cream-300 rounded-lg p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-terracotta" />
            <span className="text-sm font-semibold text-terracotta">30-Day Free Trial</span>
          </div>
          <p className="text-forest/60 text-sm leading-relaxed">
            Start with a free 30-day trial membership. Explore all features and mint your NFT at any time during your trial.
          </p>
        </div>

        <ul className="space-y-2 mb-6">
          {['Full platform access', 'NFT minting capability', 'Exclusive member community', 'On-chain identity'].map((feature) => (
            <li key={feature} className="flex items-center gap-2 text-sm text-forest/70">
              <CheckCircle2 className="w-4 h-4 text-sage-600 flex-shrink-0" />
              {feature}
            </li>
          ))}
        </ul>

        {createTrial.error && (
          <p className="text-destructive text-xs mb-4 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {(createTrial.error as Error).message || 'Failed to start trial'}
          </p>
        )}

        <button
          onClick={() => createTrial.mutate()}
          disabled={createTrial.isPending}
          className="btn-primary-warm w-full flex items-center justify-center gap-2 py-3 px-6"
        >
          {createTrial.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Starting Trial...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              Start 30-Day Free Trial
            </>
          )}
        </button>
      </div>
    );
  }

  // NFT already minted
  if (membership.nftMinted) {
    return (
      <div className="card-warm p-8 max-w-md mx-auto animate-fade-in terracotta-glow shadow-warm-lg">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-lg bg-terracotta/15 border border-terracotta/40 flex items-center justify-center pulse-terracotta">
              <Gem className="w-6 h-6 text-terracotta" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-forest">Membership NFT</h3>
              <p className="text-forest/60 text-sm">Minted & Verified</p>
            </div>
          </div>
          <Badge className="bg-terracotta/15 text-terracotta border border-terracotta/40 rounded-md font-sans text-xs">
            {membership.category === MemberCategory.premium ? 'PREMIUM' : 'STANDARD'}
          </Badge>
        </div>

        <div className="bg-cream-200 border border-terracotta/20 rounded-lg p-4 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <CheckCircle2 className="w-4 h-4 text-terracotta" />
            <span className="text-sm font-semibold text-terracotta">NFT Successfully Minted</span>
          </div>
          <p className="text-forest/60 text-xs leading-relaxed">
            Your membership NFT is recorded on the Internet Computer blockchain. Your identity is verified and permanent.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-cream-200 border border-cream-300 rounded-lg p-3">
            <p className="text-xs text-forest/50 mb-1 uppercase tracking-wider font-sans">Status</p>
            <p className="text-sm font-semibold text-forest">Active</p>
          </div>
          <div className="bg-cream-200 border border-cream-300 rounded-lg p-3">
            <p className="text-xs text-forest/50 mb-1 uppercase tracking-wider font-sans">Tier</p>
            <p className="text-sm font-semibold text-forest capitalize">{membership.category}</p>
          </div>
        </div>
      </div>
    );
  }

  // Trial membership — show remaining days + mint button
  const remainingDays = membership.trialEndsAt ? getRemainingDays(membership.trialEndsAt) : 0;
  const isExpired = remainingDays <= 0;
  const urgency = remainingDays <= 7;

  return (
    <div className="card-warm p-8 max-w-md mx-auto animate-fade-in shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-cream-200 border border-cream-300 flex items-center justify-center">
            <Clock className={`w-6 h-6 ${urgency ? 'text-destructive' : 'text-gold-400'}`} />
          </div>
          <div>
            <h3 className="font-heading text-lg font-bold text-forest">Trial Membership</h3>
            <p className="text-forest/60 text-sm">Active</p>
          </div>
        </div>
        <Badge
          variant={isExpired ? 'destructive' : 'outline'}
          className={`rounded-md font-sans text-xs ${!isExpired ? 'border-gold/50 text-gold-400 bg-gold/10' : ''}`}
        >
          TRIAL
        </Badge>
      </div>

      {/* Trial countdown */}
      <div className={`border rounded-lg p-4 mb-6 ${urgency ? 'border-destructive/40 bg-destructive/5' : 'border-cream-300 bg-cream-200'}`}>
        {isExpired ? (
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-destructive" />
            <span className="text-sm font-semibold text-destructive">Trial Expired</span>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-forest/50 uppercase tracking-wider font-sans">Trial Remaining</span>
              <span className={`text-2xl font-bold font-sans ${urgency ? 'text-destructive' : 'text-terracotta'}`}>
                {remainingDays}
              </span>
            </div>
            <div className="w-full bg-cream-300 rounded-full h-1.5">
              <div
                className={`h-1.5 rounded-full transition-all ${urgency ? 'bg-destructive' : 'bg-terracotta'}`}
                style={{ width: `${Math.min(100, (remainingDays / 30) * 100)}%` }}
              />
            </div>
            <p className="text-xs text-forest/50 mt-2">
              {remainingDays} day{remainingDays !== 1 ? 's' : ''} remaining in your free trial
            </p>
          </>
        )}
      </div>

      {/* Mint CTA */}
      <div className="mb-4">
        <p className="text-sm text-forest/60 mb-4 leading-relaxed">
          Mint your membership NFT to secure permanent access on the Internet Computer blockchain.
        </p>

        {mintMembership.error && (
          <p className="text-destructive text-xs mb-3 flex items-center gap-1">
            <AlertCircle className="w-3 h-3" />
            {(mintMembership.error as Error).message || 'Minting failed. Please try again.'}
          </p>
        )}

        <button
          onClick={() => mintMembership.mutate()}
          disabled={mintMembership.isPending}
          className="btn-primary-warm w-full flex items-center justify-center gap-2 py-3 px-6"
        >
          {mintMembership.isPending ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Minting NFT...
            </>
          ) : (
            <>
              <Gem className="w-4 h-4" />
              Mint Membership NFT
            </>
          )}
        </button>
      </div>

      <p className="text-xs text-forest/50 text-center">
        Minting is free and permanent. Your NFT will be recorded on-chain.
      </p>
    </div>
  );
}
