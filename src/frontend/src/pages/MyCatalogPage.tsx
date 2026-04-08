import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { Bookmark, ShoppingBag, Tag, ThumbsDown, ThumbsUp } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import { MemberCategory } from "../backend";
import SignInOverlay from "../components/SignInOverlay";
import { useDiscountRates } from "../hooks/useDiscountRates";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useGetCallerMembershipState,
  useGetItemRatings,
  useGetSavedCatalogItems,
  useRateItem,
  useRemoveSavedCatalogItem,
} from "../hooks/useQueries";

function getMemberDiscount(
  category: MemberCategory | null | undefined,
  rates: { trial: number; cohort: number; patronPro: number; sponsor: number },
): number {
  switch (category) {
    case MemberCategory.trial:
      return rates.trial;
    case MemberCategory.standard:
      return rates.cohort;
    case MemberCategory.premium:
      return rates.patronPro;
    default:
      return rates.sponsor;
  }
}

// ── Per-item rating widget backed by actor ────────────────────────────────────
function RatingWidget({ itemId }: { itemId: string }) {
  const { data: ratings } = useGetItemRatings(itemId);
  const { mutate: rateItem } = useRateItem();
  const { identity } = useInternetIdentity();
  const isAuth = !!identity;

  const handleRate = (rating: 1 | -1) => {
    if (!isAuth) return;
    rateItem({ itemId, rating });
  };

  const upvotes = ratings?.upvotes ?? 0;
  const downvotes = ratings?.downvotes ?? 0;
  const callerRating = ratings?.callerRating ?? null;

  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={() => handleRate(1)}
        disabled={!isAuth}
        aria-label="Thumbs up"
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-semibold transition-colors duration-150 ${
          callerRating === 1
            ? "bg-primary text-primary-foreground"
            : "bg-muted/40 text-muted-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed"
        }`}
      >
        <ThumbsUp className="w-3 h-3" />
        {upvotes > 0 && <span>{upvotes}</span>}
      </button>
      <button
        type="button"
        onClick={() => handleRate(-1)}
        disabled={!isAuth}
        aria-label="Thumbs down"
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-semibold transition-colors duration-150 ${
          callerRating === -1
            ? "bg-destructive text-destructive-foreground"
            : "bg-muted/40 text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-40 disabled:cursor-not-allowed"
        }`}
      >
        <ThumbsDown className="w-3 h-3" />
        {downvotes > 0 && <span>{downvotes}</span>}
      </button>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function MyCatalogPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [showSignIn, setShowSignIn] = useState(false);
  const { rates } = useDiscountRates();
  const { data: membershipState } = useGetCallerMembershipState();
  const { data: savedItems = [], isLoading } = useGetSavedCatalogItems();
  const { mutate: removeItem } = useRemoveSavedCatalogItem();

  const discount = getMemberDiscount(membershipState?.category, rates);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <ShoppingBag className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-3">
            My Catalog
          </h1>
          <p className="font-body text-sm text-foreground/60 mb-6 leading-relaxed">
            Sign in to view your saved catalog items and access exclusive member
            pricing.
          </p>
          <button
            type="button"
            onClick={() => setShowSignIn(true)}
            data-ocid="my-catalog.submit_button"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Sign In to Continue
          </button>
        </div>
        <SignInOverlay
          isOpen={showSignIn}
          onClose={() => setShowSignIn(false)}
        />
      </div>
    );
  }

  if (!isLoading && savedItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24">
        <div
          className="text-center max-w-sm"
          data-ocid="my-catalog.empty_state"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <Bookmark className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-3">
            No saved items yet
          </h1>
          <p className="font-body text-sm text-foreground/60 mb-6 leading-relaxed">
            Browse the catalog and click &ldquo;Save to My Catalog&rdquo; on
            items you love to collect them here.
          </p>
          <Link
            to="/catalog"
            data-ocid="my-catalog.link"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Browse Catalog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <section className="py-12 sm:py-16 lg:py-20 bg-sandstone">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3"
          >
            Personal Storefront
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3"
          >
            My Catalog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="font-body text-sm sm:text-base text-foreground/60 max-w-xl mx-auto"
          >
            {savedItems.length} saved item{savedItems.length !== 1 ? "s" : ""}{" "}
            with member pricing
          </motion.p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-5 mx-auto w-24 h-0.5 bg-primary/30 rounded-full"
          />
        </div>
      </section>

      <section className="pb-16 sm:pb-20 lg:pb-28 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Masonry layout: 1→2→3→4→5 columns */}
          <div
            data-ocid="my-catalog.list"
            className="
              [column-count:1]
              sm:[column-count:2]
              md:[column-count:3]
              lg:[column-count:4]
              xl:[column-count:5]
              [column-gap:1.25rem]
            "
          >
            {savedItems.map((item, i) => (
              <motion.div
                key={item.itemId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                data-ocid={`my-catalog.item.${i + 1}`}
                className="mb-5 group relative bg-card rounded-2xl border border-border/30 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
                style={{ breakInside: "avoid" }}
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-muted/20">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ maxHeight: "220px", minHeight: "120px" }}
                  />
                  <div className="absolute top-2 left-2">
                    <Badge className="text-xs font-body font-bold px-2.5 py-1 rounded-full flex items-center gap-1 bg-primary text-primary-foreground">
                      <Tag className="w-3 h-3" />
                      Member Special
                    </Badge>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-heading text-sm font-semibold text-foreground leading-snug min-w-0">
                      {item.title}
                    </h3>
                    <span className="shrink-0 text-xs font-body text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>

                  <p className="font-body text-xs text-foreground/60 line-clamp-2 mb-2 leading-relaxed">
                    {item.description}
                  </p>

                  <p className="font-body text-sm font-semibold text-primary mb-3">
                    {discount > 0
                      ? `Member Price: ${discount}% off`
                      : "Member Price: Contact Us"}
                  </p>

                  <div className="flex items-center justify-between">
                    <RatingWidget itemId={item.itemId} />
                    <button
                      type="button"
                      onClick={() => removeItem(item.itemId)}
                      data-ocid={`my-catalog.delete_button.${i + 1}`}
                      className="text-xs font-body text-muted-foreground hover:text-destructive transition-colors duration-150 shrink-0"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link
              to="/catalog"
              data-ocid="my-catalog.link"
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-primary text-primary font-body font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-primary/5"
            >
              <Bookmark className="w-4 h-4" />
              Browse More Items
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
