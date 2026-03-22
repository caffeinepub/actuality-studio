import { Progress } from "@/components/ui/progress";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  Clock,
  Crown,
  Loader2,
  LogIn,
  Shield,
  Star,
} from "lucide-react";
import React from "react";
import { MemberCategory } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerMembershipState,
  useMintBadge,
  useTrialStatus,
} from "../hooks/useQueries";

export default function MembershipCard() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";
  const { data: membership, isLoading } = useGetCallerMembershipState();
  const trialStatus = useTrialStatus();
  const mintBadge = useMintBadge();

  if (!isAuthenticated) {
    return (
      <div className="bg-background rounded-2xl border border-border/40 shadow-warm p-5 sm:p-6 text-center">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4">
          Your Membership Status
        </h2>
        <Shield className="w-8 h-8 text-primary/40 mx-auto mb-3" />
        <p className="font-body text-sm text-foreground/60 mb-4">
          Track your trial, upgrade your tier, or mint your on-chain badge.
        </p>
        <button
          type="button"
          onClick={() => login()}
          disabled={isLoggingIn}
          data-ocid="membership.login_button"
          className="
            inline-flex items-center justify-center gap-2 px-5 py-2.5
            bg-primary text-primary-foreground
            font-body font-semibold text-sm rounded-full
            transition-all duration-200 ease-in-out
            hover:scale-105 hover:shadow-md active:scale-95
            disabled:opacity-50 disabled:hover:scale-100
          "
        >
          {isLoggingIn ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogIn className="w-4 h-4" />
          )}
          {isLoggingIn ? "Logging in…" : "Login to view membership status"}
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-background rounded-2xl border border-border/40 shadow-warm p-5 sm:p-6 flex items-center justify-center gap-2">
        <Loader2 className="w-5 h-5 animate-spin text-primary" />
        <span className="font-body text-sm text-foreground/60">
          Loading membership…
        </span>
      </div>
    );
  }

  if (!membership) {
    return (
      <div className="bg-background rounded-2xl border border-border/40 shadow-warm p-5 sm:p-6 text-center">
        <Shield className="w-8 h-8 text-primary/40 mx-auto mb-3" />
        <p className="font-body text-sm text-foreground/60 mb-4">
          No active membership found.
        </p>
        <Link
          to="/membership"
          className="
            inline-flex items-center gap-2 px-5 py-2.5
            bg-primary text-primary-foreground
            font-body font-semibold text-sm rounded-full
            transition-all duration-200 ease-in-out
            hover:scale-105 hover:shadow-md active:scale-95
          "
        >
          View Plans
        </Link>
      </div>
    );
  }

  // Trial member
  if (trialStatus.isTrial) {
    const progressPct = trialStatus.isExpired
      ? 100
      : Math.max(
          0,
          Math.min(100, ((30 - trialStatus.daysRemaining) / 30) * 100),
        );

    return (
      <div
        className={`bg-background rounded-2xl border shadow-warm p-5 sm:p-6 ${
          trialStatus.isExpired
            ? "border-destructive/40"
            : trialStatus.isWarning
              ? "border-gold/40"
              : "border-border/40"
        }`}
      >
        <div className="flex items-center gap-2 mb-4">
          {trialStatus.isExpired ? (
            <AlertTriangle className="w-5 h-5 text-destructive shrink-0" />
          ) : trialStatus.isWarning ? (
            <Clock className="w-5 h-5 text-gold shrink-0" />
          ) : (
            <Shield className="w-5 h-5 text-primary shrink-0" />
          )}
          <span className="font-heading text-base font-semibold text-foreground">
            {trialStatus.isExpired ? "Trial Expired" : "Trial Membership"}
          </span>
        </div>

        {!trialStatus.isExpired && (
          <>
            <Progress value={progressPct} className="h-2 mb-2" />
            <p className="font-body text-xs text-foreground/60 mb-4">
              {trialStatus.daysRemaining} day
              {trialStatus.daysRemaining !== 1 ? "s" : ""} remaining
            </p>
          </>
        )}

        {(trialStatus.isExpired || trialStatus.isWarning) && (
          <div className="flex flex-col sm:flex-row gap-2 mt-2">
            <Link
              to="/membership"
              className="
                flex-1 text-center px-4 py-2.5
                bg-primary text-primary-foreground
                font-body font-semibold text-sm rounded-full
                transition-all duration-200 ease-in-out
                hover:scale-105 hover:shadow-md active:scale-95
              "
            >
              Upgrade Now
            </Link>
            {!membership.badgeMinted && !trialStatus.isExpired && (
              <button
                type="button"
                onClick={() => mintBadge.mutate()}
                disabled={mintBadge.isPending}
                className="
                  flex-1 flex items-center justify-center gap-2 px-4 py-2.5
                  bg-secondary text-secondary-foreground
                  font-body font-semibold text-sm rounded-full
                  transition-all duration-200 ease-in-out
                  hover:scale-105 hover:shadow-md active:scale-95
                  disabled:opacity-50 disabled:hover:scale-100
                "
              >
                {mintBadge.isPending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Shield className="w-4 h-4" />
                )}
                Mint Badge
              </button>
            )}
          </div>
        )}
      </div>
    );
  }

  // Standard / Premium
  const isStandard = membership.category === MemberCategory.standard;
  const isPremium = membership.category === MemberCategory.premium;

  return (
    <div className="bg-background rounded-2xl border border-border/40 shadow-warm p-5 sm:p-6">
      <div className="flex items-center gap-2 mb-3">
        {isPremium ? (
          <Crown className="w-5 h-5 text-gold shrink-0" />
        ) : (
          <Star className="w-5 h-5 text-primary shrink-0" />
        )}
        <span className="font-heading text-base font-semibold text-foreground">
          {isPremium ? "Premium Member" : "Standard Member"}
        </span>
      </div>
      <p className="font-body text-sm text-foreground/60 mb-4">
        {isPremium
          ? "Full access to all sovereign catalog content and community features."
          : "Access to standard catalog content and community features."}
      </p>
      {isStandard && !membership.badgeMinted && (
        <button
          type="button"
          onClick={() => mintBadge.mutate()}
          disabled={mintBadge.isPending}
          className="
            w-full flex items-center justify-center gap-2 px-4 py-2.5
            bg-primary text-primary-foreground
            font-body font-semibold text-sm rounded-full
            transition-all duration-200 ease-in-out
            hover:scale-105 hover:shadow-md active:scale-95
            disabled:opacity-50 disabled:hover:scale-100
          "
        >
          {mintBadge.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Shield className="w-4 h-4" />
          )}
          {mintBadge.isPending ? "Minting…" : "Mint Your Badge NFT"}
        </button>
      )}
      {membership.badgeMinted && (
        <div className="flex items-center gap-2 text-xs font-body text-secondary">
          <Shield className="w-3.5 h-3.5" />
          Badge NFT minted — you are the direct on-chain owner
        </div>
      )}
    </div>
  );
}
