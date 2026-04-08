import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe,
  Loader2,
  Lock,
  Plus,
  Search,
  ThumbsDown,
  ThumbsUp,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { toast } from "sonner";
import type { InternetProduct } from "../backend";
import { useActor } from "../hooks/useActor";
import type { CatalogEntry } from "../pages/CatalogPage";

const STOP_WORDS = new Set([
  "the",
  "a",
  "an",
  "is",
  "in",
  "of",
  "for",
  "with",
  "and",
  "or",
  "to",
  "it",
  "be",
  "by",
  "on",
  "at",
  "this",
  "that",
  "are",
  "was",
  "as",
  "has",
  "have",
  "from",
  "its",
  "our",
  "your",
]);

const ACTUALITY_CATEGORIES = [
  "ADU Shells",
  "Furniture Collections",
  "Architectural Details",
  "Plans & Blueprints",
];

const FALLBACK_IMG = "/assets/generated/mckinley-exterior.dim_900x600.jpg";

function guessCategory(product: InternetProduct): string {
  const text = `${product.title} ${product.description}`.toLowerCase();
  if (
    /furniture|sofa|chair|table|bed|shelf|shelving|cabinet|couch|desk/.test(
      text,
    )
  )
    return "Furniture Collections";
  if (/adu|studio|loft|unit|module|modular|shell/.test(text))
    return "ADU Shells";
  if (
    /window|door|brick|tile|panel|facade|ceiling|floor|cladding|trim/.test(text)
  )
    return "Architectural Details";
  if (/plan|blueprint|drawing|layout|diagram|schematic/.test(text))
    return "Plans & Blueprints";
  return "Furniture Collections";
}

function autoTags(product: InternetProduct): string[] {
  const words = `${product.title} ${product.description}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  return [...new Set(words)].slice(0, 8);
}

// ── Local-only rating widget (not yet in catalog) ─────────────────────────────
function LocalRatingWidget({ itemId }: { itemId: string }) {
  const [localRating, setLocalRating] = useState<1 | -1 | null>(null);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);

  const handleRate = (rating: 1 | -1) => {
    if (localRating === rating) {
      // toggle off
      setLocalRating(null);
      if (rating === 1) setUpvotes((v) => Math.max(0, v - 1));
      else setDownvotes((v) => Math.max(0, v - 1));
    } else {
      // undo previous
      if (localRating === 1) setUpvotes((v) => Math.max(0, v - 1));
      if (localRating === -1) setDownvotes((v) => Math.max(0, v - 1));
      // apply new
      setLocalRating(rating);
      if (rating === 1) setUpvotes((v) => v + 1);
      else setDownvotes((v) => v + 1);
    }
  };

  return (
    <div
      className="flex items-center gap-1.5"
      aria-label={`Rating for ${itemId}`}
    >
      <button
        type="button"
        onClick={() => handleRate(1)}
        aria-label="Thumbs up"
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-semibold transition-colors duration-150 ${
          localRating === 1
            ? "bg-primary text-primary-foreground"
            : "bg-muted/40 text-foreground/50 hover:bg-primary/10 hover:text-primary"
        }`}
      >
        <ThumbsUp className="w-3 h-3" />
        {upvotes > 0 && <span>{upvotes}</span>}
      </button>
      <button
        type="button"
        onClick={() => handleRate(-1)}
        aria-label="Thumbs down"
        className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-semibold transition-colors duration-150 ${
          localRating === -1
            ? "bg-destructive text-destructive-foreground"
            : "bg-muted/40 text-foreground/50 hover:bg-destructive/10 hover:text-destructive"
        }`}
      >
        <ThumbsDown className="w-3 h-3" />
        {downvotes > 0 && <span>{downvotes}</span>}
      </button>
    </div>
  );
}

// ── Single result card ────────────────────────────────────────────────────────
function ResultCard({
  product,
  onSelect,
  isSelected,
  isUploaded,
}: {
  product: InternetProduct;
  onSelect: () => void;
  isSelected: boolean;
  isUploaded: boolean;
}) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className={`group rounded-xl border transition-all duration-200 overflow-hidden flex flex-col bg-card ${
        isSelected
          ? "border-primary shadow-md ring-2 ring-primary/30"
          : "border-border/30 hover:border-primary/40 hover:shadow-sm"
      }`}
      style={{ breakInside: "avoid", pageBreakInside: "avoid" }}
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-muted/20">
        <img
          src={imgError || !product.imageUrl ? FALLBACK_IMG : product.imageUrl}
          alt={product.title}
          loading="lazy"
          onError={() => setImgError(true)}
          className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
          style={{ maxHeight: "220px", minHeight: "120px" }}
        />
        {isUploaded && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-primary text-primary-foreground text-xs font-body font-bold px-2 py-0.5 rounded-full">
            <CheckCircle2 className="w-3 h-3" />
            Added
          </div>
        )}
        {product.source && (
          <span className="absolute bottom-2 left-2 text-xs font-body font-semibold bg-background/80 text-foreground/60 px-2 py-0.5 rounded-full backdrop-blur-sm">
            {product.source}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <h4 className="font-heading text-sm font-semibold text-foreground line-clamp-2 leading-snug mb-1">
          {product.title}
        </h4>
        <p className="font-body text-xs text-foreground/60 line-clamp-3 leading-relaxed mb-3 flex-1">
          {product.description}
        </p>

        <div className="mt-auto space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-body text-base font-bold text-primary">
              {product.price
                ? product.price.startsWith("$")
                  ? product.price
                  : `$${product.price}`
                : "—"}
            </span>
            <LocalRatingWidget itemId={product.id} />
          </div>

          <div className="grid grid-cols-2 gap-1.5">
            <a
              href={
                product.purchaseUrl ||
                `https://www.amazon.com/s?k=${encodeURIComponent(product.title)}`
              }
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg bg-muted/40 text-foreground/70 hover:bg-primary/10 hover:text-primary transition-colors text-xs font-body font-semibold"
            >
              <ExternalLink className="w-3 h-3" />
              Order
            </a>
            <button
              type="button"
              onClick={onSelect}
              data-ocid={`find_items.select_card.${product.id}`}
              className={`flex items-center justify-center gap-1 py-1.5 px-2 rounded-lg text-xs font-body font-semibold transition-colors ${
                isSelected
                  ? "bg-primary/20 text-primary border border-primary/30"
                  : "bg-primary/10 text-primary hover:bg-primary/20"
              }`}
            >
              {isSelected ? "Selected ✓" : "Select & Tag"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Tag + upload panel ────────────────────────────────────────────────────────
function TagUploadPanel({
  product,
  onUpload,
  isAuthenticated,
  onShowSignIn,
}: {
  product: InternetProduct;
  onUpload: (entry: CatalogEntry, price: string, sourceUrl: string) => void;
  isAuthenticated: boolean;
  onShowSignIn: () => void;
}) {
  const [tags, setTags] = useState<string[]>(() => autoTags(product));
  const [newTag, setNewTag] = useState("");
  const [category, setCategory] = useState(() => guessCategory(product));
  const [price, setPrice] = useState(() => product.price || "");
  const [sourceUrl, setSourceUrl] = useState(
    () =>
      product.purchaseUrl ||
      `https://www.amazon.com/s?k=${encodeURIComponent(product.title)}`,
  );
  const [imgError, setImgError] = useState(false);

  const removeTag = (tag: string) =>
    setTags((prev) => prev.filter((t) => t !== tag));

  const addTag = () => {
    const t = newTag.trim().toLowerCase().replace(/\s+/g, "-");
    if (t && !tags.includes(t)) setTags((prev) => [...prev, t]);
    setNewTag("");
  };

  const handleUpload = () => {
    if (!isAuthenticated) {
      onShowSignIn();
      return;
    }
    const entry: CatalogEntry = {
      id: product.id || Date.now().toString(),
      title: product.title,
      description: product.description,
      imageUrl: imgError || !product.imageUrl ? FALLBACK_IMG : product.imageUrl,
      category,
      tags,
      accessLevel: "free",
      price,
      sourceUrl,
    };
    onUpload(entry, price, sourceUrl);
    toast.success(`"${product.title}" added to Catalog!`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.25 }}
      className="mt-5 p-4 sm:p-5 rounded-2xl border border-primary/20 bg-card shadow-inner"
    >
      <div className="flex gap-4 mb-4">
        <img
          src={imgError || !product.imageUrl ? FALLBACK_IMG : product.imageUrl}
          alt={product.title}
          onError={() => setImgError(true)}
          className="w-20 h-20 rounded-xl object-cover shrink-0 border border-border/20"
        />
        <div className="min-w-0">
          <h4 className="font-heading text-base font-bold text-foreground mb-0.5 truncate">
            {product.title}
          </h4>
          {product.source && (
            <p className="font-body text-xs text-foreground/50 mb-1">
              {product.source}
            </p>
          )}
          <p className="font-body text-xs text-foreground/60 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      {/* Price & Source URL */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            Price
          </p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-body text-sm text-muted-foreground">
              $
            </span>
            <Input
              data-ocid="find_items.price_input"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="font-body text-sm h-9 pl-6"
            />
          </div>
        </div>
        <div>
          <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            Source / Order URL
          </p>
          <Input
            data-ocid="find_items.source_url_input"
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            className="font-body text-sm h-9"
            placeholder="https://..."
          />
        </div>
      </div>

      {/* Suggested tags */}
      <div className="mb-3">
        <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Suggested Tags
        </p>
        <div className="flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="gap-1 pr-1.5 font-body text-xs cursor-pointer hover:bg-destructive/10 hover:border-destructive/40 transition-colors"
            >
              #{tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="ml-0.5 rounded-full hover:text-destructive transition-colors"
                aria-label={`Remove tag ${tag}`}
              >
                <X className="w-2.5 h-2.5" />
              </button>
            </Badge>
          ))}
        </div>
      </div>

      {/* Add custom tag */}
      <div className="flex gap-2 mb-4">
        <Input
          data-ocid="find_items.tag_input"
          type="text"
          placeholder="Add custom tag…"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addTag();
            }
          }}
          className="font-body text-xs h-8"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addTag}
          data-ocid="find_items.add_tag_button"
          className="h-8 px-3 text-xs"
        >
          <Plus className="w-3 h-3 mr-1" />
          Add
        </Button>
      </div>

      {/* Category selector */}
      <div className="mb-4">
        <p className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Category
        </p>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger
            data-ocid="find_items.category_select"
            className="font-body text-sm h-9"
          >
            <SelectValue />
          </SelectTrigger>
          <SelectContent className="font-body">
            {ACTUALITY_CATEGORIES.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Upload or sign-in prompt */}
      {isAuthenticated ? (
        <Button
          type="button"
          onClick={handleUpload}
          data-ocid="find_items.upload_button"
          className="w-full font-body font-semibold gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload to Catalog
        </Button>
      ) : (
        <div className="rounded-xl border border-primary/20 bg-muted/30 p-4 text-center">
          <Lock className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="font-body text-sm font-semibold text-foreground/80 mb-1">
            Members can upload to the Catalog
          </p>
          <p className="font-body text-xs text-muted-foreground mb-3">
            Sign in and select a membership plan to start adding items and
            receive member discounts.
          </p>
          <Button
            type="button"
            onClick={onShowSignIn}
            data-ocid="find_items.signin_to_upload_button"
            className="w-full font-body font-semibold gap-2"
          >
            Sign In to Upload
          </Button>
        </div>
      )}
    </motion.div>
  );
}

// ── Main panel ────────────────────────────────────────────────────────────────

interface FindItemsPanelProps {
  onAddEntry: (entry: CatalogEntry) => void;
  isAuthenticated: boolean;
  onShowSignIn: () => void;
}

export default function FindItemsPanel({
  onAddEntry,
  isAuthenticated,
  onShowSignIn,
}: FindItemsPanelProps) {
  const { actor } = useActor();

  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<InternetProduct[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<InternetProduct | null>(null);
  const [uploadedIds, setUploadedIds] = useState<Set<string>>(new Set());

  const handleSearch = async () => {
    if (!query.trim() || !actor) return;
    setIsLoading(true);
    setResults([]);
    setSelectedProduct(null);
    setHasSearched(false);
    setSubmittedQuery(query.trim());
    try {
      const data = await actor.searchInternetProducts(query.trim());
      setResults(data ?? []);
    } catch {
      toast.error("Search failed. Please try again.");
      setResults([]);
    } finally {
      setIsLoading(false);
      setHasSearched(true);
    }
  };

  const handleUpload = (entry: CatalogEntry) => {
    if (selectedProduct) {
      setUploadedIds((prev) => new Set([...prev, selectedProduct.id]));
    }
    onAddEntry(entry);
    setSelectedProduct(null);
  };

  const isActorReady = !!actor;

  return (
    <div className="border border-border/20 rounded-2xl overflow-hidden bg-card/50">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        data-ocid="find_items.toggle"
        className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-muted/30 transition-colors duration-200 text-left"
      >
        <span className="flex items-center gap-2 font-body text-sm font-semibold text-foreground/80">
          <Globe className="w-4 h-4 text-primary" />
          Find New Items from Internet Shops
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-muted-foreground" />
        ) : (
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        )}
      </button>

      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 pt-1 border-t border-border/20">
              {/* Search bar */}
              <div className="flex gap-2 mt-3">
                <Input
                  data-ocid="find_items.search_input"
                  type="text"
                  placeholder="Search for furniture, fixtures, tools, building materials and more…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="font-body text-sm flex-1"
                />
                <Button
                  type="button"
                  onClick={handleSearch}
                  disabled={isLoading || !query.trim() || !isActorReady}
                  data-ocid="find_items.search_button"
                  className="font-body font-semibold shrink-0 gap-2"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <>
                      <Search className="w-4 h-4" />
                      Search
                    </>
                  )}
                </Button>
              </div>

              {/* Actor not ready */}
              {!isActorReady && !isLoading && (
                <p className="font-body text-xs text-muted-foreground mt-2 flex items-center gap-1.5">
                  <Loader2 className="w-3 h-3 animate-spin" />
                  Connecting to network…
                </p>
              )}

              {/* Loading */}
              {isLoading && (
                <div
                  data-ocid="find_items.loading_state"
                  className="flex items-center justify-center py-10 gap-3"
                >
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="font-body text-sm text-muted-foreground">
                    Searching shops and markets…
                  </span>
                </div>
              )}

              {/* Empty prompt (before any search) */}
              {!isLoading && !hasSearched && (
                <div className="text-center py-8">
                  <Globe className="w-8 h-8 text-muted-foreground/40 mx-auto mb-2" />
                  <p className="font-body text-sm text-muted-foreground">
                    Search for furniture, fixtures, tools, building materials
                    and more…
                  </p>
                </div>
              )}

              {/* No results */}
              {!isLoading && hasSearched && results.length === 0 && (
                <div
                  data-ocid="find_items.empty_state"
                  className="text-center py-8"
                >
                  <p className="font-body text-sm text-muted-foreground">
                    No results found for{" "}
                    <span className="font-semibold text-foreground/70">
                      "{submittedQuery}"
                    </span>
                    . Try a different search term.
                  </p>
                </div>
              )}

              {/* Results — CSS masonry layout */}
              {!isLoading && results.length > 0 && (
                <>
                  <p
                    className="font-body text-xs text-muted-foreground mt-3 mb-3"
                    data-ocid="find_items.result_count"
                  >
                    {results.length} item{results.length !== 1 ? "s" : ""} found
                    — select to tag and upload to catalog
                  </p>

                  {/* Masonry: 1 col → 2 → 3 → 4 → 5 */}
                  <div
                    data-ocid="find_items.results_masonry"
                    style={{
                      columnCount: 1,
                      columnGap: "1rem",
                    }}
                    className="
                      [column-count:1]
                      sm:[column-count:2]
                      md:[column-count:3]
                      lg:[column-count:4]
                      xl:[column-count:5]
                      [column-gap:1rem]
                    "
                  >
                    {results.map((product) => (
                      <div
                        key={product.id}
                        className="mb-4"
                        style={{ breakInside: "avoid" }}
                      >
                        <ResultCard
                          product={product}
                          isSelected={selectedProduct?.id === product.id}
                          isUploaded={uploadedIds.has(product.id)}
                          onSelect={() =>
                            setSelectedProduct(
                              selectedProduct?.id === product.id
                                ? null
                                : product,
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>

                  {/* Tag & Upload panel */}
                  <AnimatePresence>
                    {selectedProduct && (
                      <TagUploadPanel
                        key={selectedProduct.id}
                        product={selectedProduct}
                        onUpload={handleUpload}
                        isAuthenticated={isAuthenticated}
                        onShowSignIn={onShowSignIn}
                      />
                    )}
                  </AnimatePresence>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
