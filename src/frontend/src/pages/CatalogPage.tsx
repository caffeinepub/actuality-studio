import { Link } from "@tanstack/react-router";
import { AlertTriangle, CheckCircle, Eye, Loader2, Lock } from "lucide-react";
import React from "react";
import { MemberCategory } from "../backend";
import { useImageReveal } from "../hooks/useImageReveal";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCatalogEntries,
  useGetCallerMembershipState,
  useTrialStatus,
} from "../hooks/useQueries";

type AccessLevel =
  | "full"
  | "preview"
  | "locked-expired"
  | "locked-no-membership";

function getAccessLevel(
  isAuthenticated: boolean,
  membership:
    | { category: MemberCategory; badgeMinted: boolean }
    | null
    | undefined,
  trialStatus: ReturnType<typeof useTrialStatus>,
  entryAccessLevel: "free" | "preview" | "premium",
): AccessLevel {
  if (!isAuthenticated || !membership) return "locked-no-membership";
  if (trialStatus.isExpired) return "locked-expired";

  const isPremium = membership.category === MemberCategory.premium;
  const isStandard = membership.category === MemberCategory.standard;
  const isTrial = membership.category === MemberCategory.trial;

  if (entryAccessLevel === "free") return "full";
  if (entryAccessLevel === "preview") {
    if (isPremium || isStandard || isTrial) return "preview";
    return "locked-no-membership";
  }
  if (entryAccessLevel === "premium") {
    if (isPremium) return "full";
    if (isStandard || isTrial) return "preview";
    return "locked-no-membership";
  }
  return "locked-no-membership";
}

interface CatalogEntry {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  accessLevel: "free" | "preview" | "premium";
}

function CatalogCard({
  entry,
  isAuthenticated,
  membership,
  trialStatus,
}: {
  entry: CatalogEntry;
  isAuthenticated: boolean;
  membership:
    | { category: MemberCategory; badgeMinted: boolean }
    | null
    | undefined;
  trialStatus: ReturnType<typeof useTrialStatus>;
}) {
  const { ref, isVisible } = useImageReveal<HTMLDivElement>({
    threshold: 0.08,
  });
  const access = getAccessLevel(
    isAuthenticated,
    membership,
    trialStatus,
    entry.accessLevel,
  );
  const isLocked =
    access === "locked-expired" || access === "locked-no-membership";
  const isPreview = access === "preview";

  return (
    <div
      ref={ref}
      className={`group relative bg-background rounded-2xl border border-border/30 shadow-warm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${isVisible ? "image-reveal-visible" : "image-reveal-hidden"}`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={entry.imageUrl}
          alt={entry.title}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
            isLocked ? "blur-sm scale-105" : ""
          }`}
        />
        {/* Access badge */}
        <div className="absolute top-3 right-3">
          {access === "full" && (
            <span className="flex items-center gap-1 bg-secondary/90 text-secondary-foreground text-xs font-body font-semibold px-2.5 py-1 rounded-full">
              <CheckCircle className="w-3 h-3" />
              Full Access
            </span>
          )}
          {isPreview && (
            <span className="flex items-center gap-1 bg-gold/90 text-forest text-xs font-body font-semibold px-2.5 py-1 rounded-full">
              <Eye className="w-3 h-3" />
              Preview
            </span>
          )}
          {isLocked && (
            <span className="flex items-center gap-1 bg-foreground/70 text-background text-xs font-body font-semibold px-2.5 py-1 rounded-full">
              <Lock className="w-3 h-3" />
              Locked
            </span>
          )}
        </div>

        {/* Lock overlay */}
        {isLocked && (
          <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center">
            <div className="text-center p-4">
              <Lock className="w-8 h-8 text-cream mx-auto mb-2" />
              <p className="font-body text-xs text-cream font-semibold">
                {access === "locked-expired" ? "Trial Expired" : "Members Only"}
              </p>
              <Link
                to="/membership"
                className="
                  mt-2 inline-block px-3 py-1.5
                  bg-primary text-primary-foreground
                  font-body font-semibold text-xs rounded-full
                  transition-all duration-200 hover:scale-105 active:scale-95
                "
              >
                {access === "locked-expired" ? "Upgrade" : "Join Now"}
              </Link>
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-heading text-base sm:text-lg font-semibold text-foreground leading-snug">
            {entry.title}
          </h3>
          <span className="shrink-0 text-xs font-body text-foreground/40 bg-muted/40 px-2 py-0.5 rounded-full">
            {entry.category}
          </span>
        </div>
        <p className="font-body text-xs sm:text-sm text-foreground/60 leading-relaxed mb-3">
          {isLocked ? "••••••••••••••••••••••••••••••••" : entry.description}
        </p>
        <div className="flex flex-wrap gap-1.5">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-body text-foreground/40 bg-muted/30 px-2 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CatalogPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: membership, isLoading: membershipLoading } =
    useGetCallerMembershipState();
  const trialStatus = useTrialStatus();
  const {
    data: entries,
    isLoading: entriesLoading,
    error,
  } = useCatalogEntries();

  const isLoading = membershipLoading || entriesLoading;

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Expired banner */}
      {isAuthenticated && trialStatus.isExpired && (
        <div className="bg-destructive/10 border-b border-destructive/20 px-4 py-3">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-destructive shrink-0" />
              <p className="font-body text-sm text-destructive">
                Your trial has expired. Upgrade to regain full catalog access.
              </p>
            </div>
            <Link
              to="/membership"
              className="
                px-4 py-2 bg-destructive text-destructive-foreground
                font-body font-semibold text-xs rounded-full
                transition-all duration-200 hover:scale-105 active:scale-95
                shrink-0
              "
            >
              Upgrade Now
            </Link>
          </div>
        </div>
      )}

      {/* Header */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-cream/60 to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3">
            Catalog
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            The McKinley Collection
          </h1>
          <p className="font-body text-sm sm:text-base text-foreground/60 max-w-xl mx-auto leading-relaxed">
            Curated ADU shells, furniture collections, and architectural details
            from the historic McKinley Elementary School in Spokane, Washington.
          </p>
        </div>
      </section>

      {/* Catalog Grid */}
      <section className="pb-16 sm:pb-20 lg:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="font-body text-sm text-destructive">
                Failed to load catalog entries.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
              {entries?.map((entry) => (
                <CatalogCard
                  key={entry.id}
                  entry={entry}
                  isAuthenticated={isAuthenticated}
                  membership={membership}
                  trialStatus={trialStatus}
                />
              ))}
            </div>
          )}

          {/* Unauthenticated CTA */}
          {!isAuthenticated && (
            <div className="mt-10 sm:mt-12 text-center bg-primary/5 rounded-2xl border border-primary/15 p-8 sm:p-10">
              <Lock className="w-10 h-10 text-primary/40 mx-auto mb-4" />
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2">
                Members-Only Catalog
              </h3>
              <p className="font-body text-sm text-foreground/60 mb-6 max-w-md mx-auto">
                Join Actuality Studio to access the full Catalog for McKinley
                Elementary School in Spokane, WA — including ADU blueprints,
                furniture collections, and architectural details.
              </p>
              <Link
                to="/membership"
                className="
                  inline-flex items-center gap-2
                  px-6 py-3 sm:px-8 sm:py-3.5
                  bg-primary text-primary-foreground
                  font-body font-semibold text-sm sm:text-base
                  rounded-full
                  transition-all duration-200 ease-in-out
                  hover:scale-105 hover:shadow-lg active:scale-95
                "
              >
                View Membership Plans
              </Link>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
