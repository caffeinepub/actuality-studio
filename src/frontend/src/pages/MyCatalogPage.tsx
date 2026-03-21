import { Badge } from "@/components/ui/badge";
import { Link } from "@tanstack/react-router";
import { Bookmark, ShoppingBag, Tag } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import SignInOverlay from "../components/SignInOverlay";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useSavedCatalog } from "../hooks/useSavedCatalog";
import { SEED_ENTRIES } from "./CatalogPage";

export default function MyCatalogPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { savedIds, unsaveItem } = useSavedCatalog();
  const [showSignIn, setShowSignIn] = useState(false);

  const savedEntries = SEED_ENTRIES.filter((e) => savedIds.includes(e.id));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24">
        <div className="text-center max-w-sm">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "rgba(192,57,43,0.1)" }}
          >
            <ShoppingBag
              className="w-8 h-8"
              style={{ color: "var(--color-crimson-lustre, #c0392b)" }}
            />
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

  if (savedEntries.length === 0) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24">
        <div
          className="text-center max-w-sm"
          data-ocid="my-catalog.empty_state"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "rgba(192,57,43,0.1)" }}
          >
            <Bookmark
              className="w-8 h-8"
              style={{ color: "var(--color-crimson-lustre, #c0392b)" }}
            />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-3">
            No saved items yet
          </h1>
          <p className="font-body text-sm text-foreground/60 mb-6 leading-relaxed">
            Browse the catalog and click "Save to My Catalog" on items you love
            to collect them here.
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
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f5e6c8]/60 to-background">
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
            Your saved items with member pricing
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
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8"
            data-ocid="my-catalog.list"
          >
            {savedEntries.map((entry, i) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.07 }}
                data-ocid={`my-catalog.item.${i + 1}`}
                className="group relative bg-background rounded-2xl border border-border/30 shadow-warm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={entry.imageUrl}
                    alt={entry.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge
                      className="text-xs font-body font-bold px-2.5 py-1 rounded-full flex items-center gap-1"
                      style={{
                        backgroundColor: "var(--color-crimson-lustre, #c0392b)",
                        color: "#fff",
                      }}
                    >
                      <Tag className="w-3 h-3" />
                      Member Special
                    </Badge>
                  </div>
                </div>

                <div className="p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <h3 className="font-heading text-base font-semibold text-foreground leading-snug">
                      {entry.title}
                    </h3>
                    <span className="shrink-0 text-xs font-body text-foreground/40 bg-muted/40 px-2 py-0.5 rounded-full">
                      {entry.category}
                    </span>
                  </div>

                  <p
                    className="font-body text-sm font-semibold mb-3"
                    style={{ color: "#8b4513" }}
                  >
                    Member Price: Contact Us
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1">
                      {entry.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-body text-foreground/40 bg-muted/30 px-2 py-0.5 rounded-full"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => unsaveItem(entry.id)}
                      data-ocid={`my-catalog.delete_button.${i + 1}`}
                      className="text-xs font-body text-foreground/40 hover:text-destructive transition-colors duration-150 shrink-0"
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
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 font-body font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                borderColor: "var(--color-crimson-lustre, #c0392b)",
                color: "var(--color-crimson-lustre, #c0392b)",
              }}
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
