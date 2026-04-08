import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bookmark,
  ExternalLink,
  Loader2,
  Search,
  ThumbsDown,
  ThumbsUp,
  X,
} from "lucide-react";
import { motion } from "motion/react";
import { type CSSProperties, useState } from "react";
import FindItemsPanel from "../components/FindItemsPanel";
import SignInOverlay from "../components/SignInOverlay";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useCatalogEntries, useItemRating } from "../hooks/useQueries";
import { useSavedCatalog } from "../hooks/useSavedCatalog";

export interface CatalogEntry {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: string;
  tags: string[];
  accessLevel: "free" | "preview" | "premium";
  price?: string;
  sourceUrl?: string;
}

export const SEED_ENTRIES: CatalogEntry[] = [
  {
    id: "1",
    title: "McKinley Loft Shell A",
    description:
      "Primary ADU shell derived from the original north-wing classroom envelope. 620 sq ft with soaring 11′ ceilings, exposed brick, and original transom windows.",
    imageUrl: "/assets/generated/mckinley-interior-apt.dim_900x600.jpg",
    category: "ADU Shells",
    tags: ["adu", "loft", "north-wing", "premium"],
    accessLevel: "premium",
  },
  {
    id: "2",
    title: "Compact Studio Module",
    description:
      "Efficient 320 sq ft studio layout optimised for the school's standard classroom bay. Open plan with built-in storage wall and Murphy bed alcove.",
    imageUrl: "/assets/generated/adu-shell-type-a.dim_640x427.jpg",
    category: "ADU Shells",
    tags: ["studio", "compact", "efficient"],
    accessLevel: "free",
  },
  {
    id: "3",
    title: "Corner Unit with Bay Window",
    description:
      "Premium corner ADU capturing two original window bays. 740 sq ft with angled living area and restored pressed-tin ceiling detail.",
    imageUrl: "/assets/generated/mckinley-interior-detail.dim_900x600.jpg",
    category: "ADU Shells",
    tags: ["corner", "bay-window", "premium"],
    accessLevel: "premium",
  },
  {
    id: "4",
    title: "Arts & Crafts Bedroom Set",
    description:
      "Seven-piece bedroom collection in white oak and hand-hammered copper hardware. Inspired by 1902 Craftsman detailing found in original McKinley millwork.",
    imageUrl: "/assets/generated/furniture-set-sovereign.dim_640x427.jpg",
    category: "Furniture Collections",
    tags: ["bedroom", "craftsman", "oak", "copper"],
    accessLevel: "preview",
  },
  {
    id: "5",
    title: "Craftsman Dining Suite",
    description:
      "Extending table seats 4–8 with matched spindle-back chairs. White oak with mortise-and-tenon joinery; optional built-in hutch available.",
    imageUrl: "/assets/generated/furniture-set-compact.dim_640x427.jpg",
    category: "Furniture Collections",
    tags: ["dining", "craftsman", "extendable"],
    accessLevel: "preview",
  },
  {
    id: "6",
    title: "Reading Nook Package",
    description:
      "Built-in window seat with under-seat storage, flanking bookshelves, and swing-arm lamp brackets. Designed to fit standard 36″ McKinley window bays.",
    imageUrl: "/assets/generated/mckinley-staircase.dim_900x600.jpg",
    category: "Furniture Collections",
    tags: ["nook", "storage", "built-in"],
    accessLevel: "free",
  },
  {
    id: "7",
    title: "Original Pressed Tin Ceiling Panel",
    description:
      "Exact reproduction of the 12″ × 12″ pressed tin pattern documented in the 1902 McKinley construction records. Available in raw, primed, and oil-rubbed bronze.",
    imageUrl: "/assets/generated/mckinley-interior-detail.dim_900x600.jpg",
    category: "Architectural Details",
    tags: ["ceiling", "tin", "1902", "historic"],
    accessLevel: "premium",
  },
  {
    id: "8",
    title: "1902 Brick Facade Detail",
    description:
      "High-resolution photogrammetric scan of the original Flemish-bond brickwork on the south elevation. Includes mortar analysis and repointing specification.",
    imageUrl: "/assets/generated/mckinley-exterior.dim_900x600.jpg",
    category: "Architectural Details",
    tags: ["brick", "facade", "scan", "historic"],
    accessLevel: "preview",
  },
  {
    id: "9",
    title: "McKinley Unit Floor Plan A",
    description:
      "Full construction-document set for Loft Shell A: floor plan, reflected ceiling plan, elevations, sections, and finish schedule. IFC + PDF formats.",
    imageUrl: "/assets/generated/mckinley-gymnasium-studio.dim_640x427.jpg",
    category: "Plans & Blueprints",
    tags: ["floor-plan", "IFC", "construction", "loft-a"],
    accessLevel: "premium",
  },
  {
    id: "10",
    title: "Site Plan — North Wing",
    description:
      "Site plan showing the north-wing ADU cluster layout, shared courtyard, bicycle storage, and utility easements at 117 N Napa Street.",
    imageUrl: "/assets/generated/mckinley-1902.dim_640x427.jpg",
    category: "Plans & Blueprints",
    tags: ["site-plan", "north-wing", "courtyard"],
    accessLevel: "premium",
  },
];

const CATEGORIES = [
  "All",
  "ADU Shells",
  "Furniture Collections",
  "Architectural Details",
  "Plans & Blueprints",
];

// ── Rating buttons ─────────────────────────────────────────────────────────────

function RatingButtons({
  itemId,
  isAuthenticated,
  onShowSignIn,
}: {
  itemId: string;
  isAuthenticated: boolean;
  onShowSignIn: () => void;
}) {
  const { ratingsQuery, rateMutation } = useItemRating(itemId);
  const ratings = ratingsQuery.data ?? {
    upvotes: 0,
    downvotes: 0,
    callerRating: null,
  };

  const handleRate = (rating: 1 | -1) => {
    if (!isAuthenticated) {
      onShowSignIn();
      return;
    }
    rateMutation.mutate(rating);
  };

  const isUpActive = ratings.callerRating === 1;
  const isDownActive = ratings.callerRating === -1;
  const isLoading = rateMutation.isPending;

  return (
    <div className="flex items-center gap-2 mt-2">
      <button
        type="button"
        title={isAuthenticated ? "Upvote" : "Sign in to rate items"}
        aria-label="Upvote this item"
        disabled={isLoading}
        data-ocid="catalog.rate.up"
        onClick={() => handleRate(1)}
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-medium transition-all duration-200 border ${
          isUpActive
            ? "bg-primary/15 border-primary/40 text-primary"
            : isAuthenticated
              ? "border-border/40 text-foreground/40 hover:border-primary/40 hover:text-primary hover:bg-primary/5"
              : "border-border/20 text-foreground/25 cursor-not-allowed"
        }`}
      >
        <ThumbsUp
          className="w-3 h-3"
          fill={isUpActive ? "currentColor" : "none"}
          strokeWidth={isUpActive ? 0 : 2}
        />
        <span>{ratings.upvotes}</span>
      </button>
      <button
        type="button"
        title={isAuthenticated ? "Downvote" : "Sign in to rate items"}
        aria-label="Downvote this item"
        disabled={isLoading}
        data-ocid="catalog.rate.down"
        onClick={() => handleRate(-1)}
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-medium transition-all duration-200 border ${
          isDownActive
            ? "bg-destructive/15 border-destructive/40 text-destructive"
            : isAuthenticated
              ? "border-border/40 text-foreground/40 hover:border-destructive/40 hover:text-destructive hover:bg-destructive/5"
              : "border-border/20 text-foreground/25 cursor-not-allowed"
        }`}
      >
        <ThumbsDown
          className="w-3 h-3"
          fill={isDownActive ? "currentColor" : "none"}
          strokeWidth={isDownActive ? 0 : 2}
        />
        <span>{ratings.downvotes}</span>
      </button>
    </div>
  );
}

// ── Catalog Card ───────────────────────────────────────────────────────────────

function CatalogCard({
  entry,
  isSaved,
  onToggleSave,
  onShowSignIn,
  isAuthenticated,
}: {
  entry: CatalogEntry;
  isSaved: boolean;
  onToggleSave: () => void;
  onShowSignIn: () => void;
  isAuthenticated: boolean;
}) {
  const handleSaveClick = () => {
    if (!isAuthenticated) {
      onShowSignIn();
    } else {
      onToggleSave();
    }
  };

  return (
    <div
      className="group relative bg-card rounded-2xl border border-border/30 shadow-sm overflow-hidden hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 break-inside-avoid mb-4"
      style={{ breakInside: "avoid" }}
    >
      <div className="relative overflow-hidden">
        <img
          src={entry.imageUrl}
          alt={entry.title}
          loading="lazy"
          decoding="async"
          width={640}
          height={427}
          onError={(e) => {
            e.currentTarget.src =
              "/assets/generated/mckinley-exterior.dim_900x600.jpg";
          }}
          className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-103"
        />
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-heading text-sm sm:text-base font-semibold text-foreground leading-snug min-w-0">
            {entry.title}
          </h3>
          <span className="shrink-0 text-xs font-body text-foreground/40 bg-muted/40 px-2 py-0.5 rounded-full whitespace-nowrap">
            {entry.category}
          </span>
        </div>
        <p className="font-body text-xs text-foreground/60 leading-relaxed mb-2">
          {entry.description}
        </p>
        <div className="flex flex-wrap gap-1 mb-2">
          {entry.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-body text-foreground/40 bg-muted/30 px-1.5 py-0.5 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>
        {entry.price && (
          <div className="mb-2">
            <span className="inline-block font-body text-sm font-bold text-primary bg-primary/10 px-3 py-0.5 rounded-full">
              ${entry.price}
            </span>
          </div>
        )}
        {entry.sourceUrl && (
          <a
            href={entry.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="catalog.order_link"
            className="inline-flex items-center gap-1 text-xs font-body font-semibold text-primary hover:text-primary/80 transition-colors mb-2"
          >
            <ExternalLink className="w-3 h-3" />
            Order Now →
          </a>
        )}

        <div className="flex items-center justify-between flex-wrap gap-2 pt-2 border-t border-border/20">
          <button
            type="button"
            onClick={handleSaveClick}
            data-ocid="catalog.save.button"
            className={`flex items-center gap-1 text-xs font-body transition-all duration-200 ${
              isSaved
                ? "text-primary font-semibold"
                : "text-foreground/50 hover:text-primary"
            }`}
          >
            <Bookmark
              className="w-3.5 h-3.5"
              fill={isSaved ? "currentColor" : "none"}
            />
            {isSaved ? "Saved" : "Save to My Catalog"}
          </button>

          <RatingButtons
            itemId={entry.id}
            isAuthenticated={isAuthenticated}
            onShowSignIn={onShowSignIn}
          />
        </div>
      </div>
    </div>
  );
}

// ── Result count badge ─────────────────────────────────────────────────────────

function ResultCount({
  count,
  query,
}: {
  count: number;
  query: string;
}) {
  if (!query) return null;
  return (
    <span
      data-ocid="catalog.result_count"
      className="inline-flex items-center gap-1 text-xs font-body font-medium text-foreground/50 bg-muted/40 px-3 py-1 rounded-full border border-border/20"
    >
      {count} result{count !== 1 ? "s" : ""} for{" "}
      <em className="not-italic font-semibold text-foreground/70">"{query}"</em>
    </span>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────────

export default function CatalogPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const {
    data: entries,
    isLoading: entriesLoading,
    error,
  } = useCatalogEntries();

  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [showSignInOverlay, setShowSignInOverlay] = useState(false);
  const [extraEntries, setExtraEntries] = useState<CatalogEntry[]>([]);

  const { isSaved, toggleSave } = useSavedCatalog();

  const baseEntries: CatalogEntry[] =
    entries && entries.length > 0 ? (entries as CatalogEntry[]) : SEED_ENTRIES;
  const allEntries: CatalogEntry[] = [...baseEntries, ...extraEntries];

  const filteredEntries = allEntries.filter((entry) => {
    const matchesCategory =
      activeCategory === "All" || entry.category === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      entry.title.toLowerCase().includes(q) ||
      entry.description.toLowerCase().includes(q) ||
      entry.category.toLowerCase().includes(q) ||
      entry.tags.some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  });

  const featuredEntries = filteredEntries
    .filter((e) => e.accessLevel === "premium")
    .slice(0, 2);
  const remainingEntries = filteredEntries.filter(
    (e) => !featuredEntries.find((f) => f.id === e.id),
  );

  const activeSearch = searchQuery.trim();

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Hero */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[oklch(0.95_0.03_78_/_0.6)] to-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3"
          >
            McKinley Collection
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight"
          >
            Catalog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.2 }}
            className="font-body text-sm sm:text-base text-foreground/60 max-w-xl mx-auto leading-relaxed"
          >
            Curated ADU shells, furniture collections, and architectural details
            from the historic McKinley Elementary School in Spokane, Washington.
          </motion.p>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-6 mx-auto w-24 h-0.5 bg-primary/30 rounded-full"
          />
        </div>
      </section>

      {/* Sticky search bar */}
      <section className="sticky top-0 z-20 bg-background/95 backdrop-blur-sm border-b border-border/20 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex items-center gap-2">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/40" />
              <Input
                data-ocid="catalog.search_input"
                type="text"
                placeholder="Search Catalog by Title, Tag, Description, or Category"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9 pr-9 font-body text-sm bg-muted/30 border-border/30 focus:border-primary/40"
              />
              {activeSearch && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => setSearchQuery("")}
                  data-ocid="catalog.search_clear"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/40 hover:text-foreground/70 transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
            {activeSearch && (
              <ResultCount
                count={filteredEntries.length}
                query={activeSearch}
              />
            )}
          </div>

          <div className="flex gap-1.5 overflow-x-auto pb-1 scrollbar-hide">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                data-ocid={`catalog.${cat.toLowerCase().replace(/[^a-z0-9]/g, "-")}.tab`}
                onClick={() => setActiveCategory(cat)}
                className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-body font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-foreground/60 hover:text-foreground hover:bg-muted/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Internet Search panel */}
      <section className="py-4 bg-muted/20 border-b border-border/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FindItemsPanel
            onAddEntry={(entry) => setExtraEntries((prev) => [entry, ...prev])}
            isAuthenticated={isAuthenticated}
            onShowSignIn={() => setShowSignInOverlay(true)}
          />
        </div>
      </section>

      {/* Catalog grid */}
      <section className="pb-16 sm:pb-20 lg:pb-28 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {entriesLoading ? (
            <div
              className="flex items-center justify-center py-20"
              data-ocid="catalog.loading_state"
            >
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : error ? (
            <div className="text-center py-20" data-ocid="catalog.error_state">
              <p className="font-body text-sm text-destructive">
                Failed to load catalog entries.
              </p>
            </div>
          ) : filteredEntries.length === 0 ? (
            <div className="text-center py-20" data-ocid="catalog.empty_state">
              <p className="font-body text-lg font-semibold text-foreground/50 mb-2">
                No items found
              </p>
              {activeSearch && (
                <div className="space-y-2">
                  <p className="font-body text-sm text-foreground/40">
                    No results match "{activeSearch}"
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setSearchQuery("")}
                    className="text-primary hover:text-primary/80"
                  >
                    Clear search
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <>
              {/* Spotlight — standard 2-col grid for featured items */}
              {featuredEntries.length > 0 && (
                <div className="mb-10">
                  <h2 className="font-heading text-base font-semibold text-foreground/60 mb-4 tracking-widest uppercase text-sm">
                    Spotlight
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                    {featuredEntries.map((entry, i) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.45, delay: i * 0.1 }}
                        data-ocid={`catalog.item.${i + 1}`}
                      >
                        <CatalogCard
                          entry={entry}
                          isAuthenticated={isAuthenticated}
                          isSaved={isSaved(entry.id)}
                          onToggleSave={() => toggleSave(entry.id)}
                          onShowSignIn={() => setShowSignInOverlay(true)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Main masonry grid */}
              {remainingEntries.length > 0 && (
                <>
                  {featuredEntries.length > 0 && (
                    <h2 className="font-heading text-base font-semibold text-foreground/60 mb-4 tracking-widest uppercase text-sm">
                      All Items
                    </h2>
                  )}
                  {/* CSS Multi-column masonry layout */}
                  <div
                    data-ocid="catalog.masonry_grid"
                    style={{
                      columnCount:
                        "var(--masonry-cols)" as CSSProperties["columnCount"],
                      columnGap: "1rem",
                    }}
                    className="[--masonry-cols:1] sm:[--masonry-cols:2] lg:[--masonry-cols:3] xl:[--masonry-cols:4] 2xl:[--masonry-cols:5]"
                  >
                    {remainingEntries.map((entry, i) => (
                      <motion.div
                        key={entry.id}
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: i * 0.05 }}
                        data-ocid={`catalog.item.${featuredEntries.length + i + 1}`}
                        style={{ breakInside: "avoid" }}
                        className="break-inside-avoid"
                      >
                        <CatalogCard
                          entry={entry}
                          isAuthenticated={isAuthenticated}
                          isSaved={isSaved(entry.id)}
                          onToggleSave={() => toggleSave(entry.id)}
                          onShowSignIn={() => setShowSignInOverlay(true)}
                        />
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </section>

      <SignInOverlay
        isOpen={showSignInOverlay}
        onClose={() => setShowSignInOverlay(false)}
      />
    </div>
  );
}
