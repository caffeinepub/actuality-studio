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
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Globe,
  Loader2,
  Lock,
  Plus,
  Upload,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { toast } from "sonner";
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

interface ExternalProduct {
  id: number;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  tags?: string[];
  price: number;
  brand?: string;
}

function guessCategory(product: ExternalProduct): string {
  const text =
    `${product.title} ${product.description} ${product.category}`.toLowerCase();
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

function autoTags(product: ExternalProduct): string[] {
  const words = `${product.title} ${product.description} ${product.category}`
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, " ")
    .split(/\s+/)
    .filter((w) => w.length > 2 && !STOP_WORDS.has(w));
  const fromApi = product.tags ?? [];
  const all = [...new Set([...fromApi, ...words])];
  return all.slice(0, 8);
}

function ResultCard({
  product,
  onSelect,
  isSelected,
}: {
  product: ExternalProduct;
  onSelect: () => void;
  isSelected: boolean;
}) {
  const orderUrl = `https://www.amazon.com/s?k=${encodeURIComponent(product.title)}`;

  return (
    <div
      className={`group rounded-xl border transition-all duration-200 overflow-hidden flex flex-col ${
        isSelected
          ? "border-primary shadow-md ring-2 ring-primary/30"
          : "border-border/30 hover:border-primary/40 hover:shadow-sm"
      }`}
    >
      {/* Image */}
      <button
        type="button"
        onClick={onSelect}
        className="block w-full text-left"
      >
        <div className="aspect-video overflow-hidden bg-muted/20">
          <img
            src={product.thumbnail}
            alt={product.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.src = FALLBACK_IMG;
            }}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </button>

      {/* Content */}
      <div className="p-3 flex flex-col flex-1">
        <button type="button" onClick={onSelect} className="text-left mb-2">
          <h4 className="font-heading text-sm font-semibold text-foreground line-clamp-2 leading-snug mb-1">
            {product.title}
          </h4>
          {product.brand && (
            <p className="font-body text-xs text-foreground/50 mb-1">
              {product.brand}
            </p>
          )}
          <p className="font-body text-xs text-foreground/60 line-clamp-3 leading-relaxed">
            {product.description}
          </p>
        </button>

        <div className="mt-auto pt-2 border-t border-border/15">
          <div className="flex items-center justify-between mb-2">
            <span className="font-body text-base font-bold text-primary">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-xs font-body text-foreground/40 bg-muted/40 px-2 py-0.5 rounded-full capitalize">
              {product.category}
            </span>
          </div>
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex items-center justify-center gap-1.5 w-full py-1.5 px-3 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-xs font-body font-semibold"
          >
            <ExternalLink className="w-3 h-3" />
            View &amp; Order →
          </a>
        </div>
      </div>
    </div>
  );
}

function TagUploadPanel({
  product,
  onUpload,
  isAuthenticated,
  onShowSignIn,
}: {
  product: ExternalProduct;
  onUpload: (entry: CatalogEntry, price: string, sourceUrl: string) => void;
  isAuthenticated: boolean;
  onShowSignIn: () => void;
}) {
  const [tags, setTags] = useState<string[]>(() => autoTags(product));
  const [newTag, setNewTag] = useState("");
  const [category, setCategory] = useState(() => guessCategory(product));
  const [price, setPrice] = useState(() => product.price.toFixed(2));
  const [sourceUrl, setSourceUrl] = useState(
    () => `https://www.amazon.com/s?k=${encodeURIComponent(product.title)}`,
  );

  const removeTag = (tag: string) =>
    setTags((prev) => prev.filter((t) => t !== tag));

  const addTag = () => {
    const t = newTag.trim().toLowerCase().replace(/\s+/g, "-");
    if (t && !tags.includes(t)) {
      setTags((prev) => [...prev, t]);
    }
    setNewTag("");
  };

  const handleUpload = () => {
    if (!isAuthenticated) {
      onShowSignIn();
      return;
    }
    const entry: CatalogEntry = {
      id: Date.now().toString(),
      title: product.title,
      description: product.description,
      imageUrl: product.thumbnail,
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
      className="mt-5 p-4 sm:p-5 rounded-2xl border border-primary/20 bg-[#f5e6c8]/40 shadow-inner"
    >
      <div className="flex gap-4 mb-4">
        <img
          src={product.thumbnail}
          alt={product.title}
          onError={(e) => {
            e.currentTarget.src = FALLBACK_IMG;
          }}
          className="w-20 h-20 rounded-xl object-cover shrink-0 border border-border/20"
        />
        <div>
          <h4 className="font-heading text-base font-bold text-foreground mb-0.5">
            {product.title}
          </h4>
          {product.brand && (
            <p className="font-body text-xs text-foreground/50 mb-1">
              {product.brand}
            </p>
          )}
          <p className="font-body text-xs text-foreground/60 line-clamp-2">
            {product.description}
          </p>
        </div>
      </div>

      {/* Price & Source URL fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        <div>
          <p className="font-body text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1.5">
            Price
          </p>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-body text-sm text-foreground/50">
              $
            </span>
            <Input
              data-ocid="find_items.price_input"
              type="text"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="font-body text-sm bg-background/80 border-border/30 h-9 pl-6"
            />
          </div>
        </div>
        <div>
          <p className="font-body text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-1.5">
            Source / Order URL
          </p>
          <Input
            data-ocid="find_items.source_url_input"
            type="url"
            value={sourceUrl}
            onChange={(e) => setSourceUrl(e.target.value)}
            className="font-body text-sm bg-background/80 border-border/30 h-9"
            placeholder="https://..."
          />
        </div>
      </div>

      <p className="font-body text-xs text-foreground/50 italic mb-4 bg-background/40 rounded-lg px-3 py-2 border border-border/20">
        Members can save this item with pricing and a direct order link visible
        in their personal catalog.
      </p>

      {/* Auto-suggested tags */}
      <div className="mb-3">
        <p className="font-body text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-2">
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
          className="font-body text-sm bg-background/80 border-border/30 h-8 text-xs"
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
        <p className="font-body text-xs font-semibold text-foreground/60 uppercase tracking-wide mb-2">
          Category
        </p>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger
            data-ocid="find_items.category_select"
            className="font-body text-sm bg-background/80 border-border/30 h-9"
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

      {/* Upload button — gated for guests */}
      {isAuthenticated ? (
        <Button
          type="button"
          onClick={handleUpload}
          data-ocid="find_items.upload_button"
          className="w-full bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold gap-2"
        >
          <Upload className="w-4 h-4" />
          Upload to Catalog
        </Button>
      ) : (
        <div className="rounded-xl border border-primary/20 bg-[#f5e6c8]/60 p-4 text-center">
          <Lock className="w-5 h-5 text-primary mx-auto mb-2" />
          <p className="font-body text-sm font-semibold text-foreground/80 mb-1">
            Members can upload to the Catalog
          </p>
          <p className="font-body text-xs text-foreground/55 mb-3">
            Sign in and select a membership plan to start adding items and
            receive member discounts.
          </p>
          <Button
            type="button"
            onClick={onShowSignIn}
            data-ocid="find_items.signin_to_upload_button"
            className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold gap-2 w-full"
          >
            Sign In to Upload
          </Button>
        </div>
      )}
    </motion.div>
  );
}

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
  const [isExpanded, setIsExpanded] = useState(false);
  const [query, setQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ExternalProduct[]>([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedProduct, setSelectedProduct] =
    useState<ExternalProduct | null>(null);
  const [uploadedIds, setUploadedIds] = useState<Set<number>>(new Set());

  const handleSearch = async () => {
    if (!query.trim()) return;
    setIsLoading(true);
    setResults([]);
    setSelectedProduct(null);
    setHasSearched(false);
    try {
      const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query.trim())}&limit=12`;
      const res = await fetch(url);
      if (!res.ok) throw new Error("Search failed");
      const data = await res.json();
      setResults(data.products ?? []);
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

  return (
    <div className="border border-border/20 rounded-2xl overflow-hidden bg-[#f5e6c8]/25">
      {/* Toggle header */}
      <button
        type="button"
        onClick={() => setIsExpanded((v) => !v)}
        data-ocid="find_items.toggle"
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-[#f5e6c8]/50 transition-colors duration-200 text-left"
      >
        <span className="flex items-center gap-2 font-body text-sm font-semibold text-foreground/80">
          <Globe className="w-4 h-4 text-primary" />
          Find New Items from Internet Shops
        </span>
        {isExpanded ? (
          <ChevronUp className="w-4 h-4 text-foreground/50" />
        ) : (
          <ChevronDown className="w-4 h-4 text-foreground/50" />
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
              {/* Natural language search */}
              <div className="flex gap-2 mt-3">
                <Input
                  data-ocid="find_items.search_input"
                  type="text"
                  placeholder="Describe what you're looking for (e.g. modular shelving unit, timber window frame)…"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                  }}
                  className="font-body text-sm bg-background/70 border-border/30 focus:border-primary/50 flex-1"
                />
                <Button
                  type="button"
                  onClick={handleSearch}
                  disabled={isLoading || !query.trim()}
                  data-ocid="find_items.search_button"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 font-body font-semibold shrink-0"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>

              {/* Loading */}
              {isLoading && (
                <div
                  data-ocid="find_items.loading_state"
                  className="flex items-center justify-center py-8 gap-3"
                >
                  <Loader2 className="w-5 h-5 animate-spin text-primary" />
                  <span className="font-body text-sm text-foreground/60">
                    Searching shops and markets…
                  </span>
                </div>
              )}

              {/* Empty / error state */}
              {!isLoading && hasSearched && results.length === 0 && (
                <div
                  data-ocid="find_items.empty_state"
                  className="text-center py-8"
                >
                  <p className="font-body text-sm text-foreground/50">
                    No items found for{" "}
                    <span className="font-semibold text-foreground/70">
                      "{query}"
                    </span>
                    . Try a different description.
                  </p>
                </div>
              )}

              {/* Results grid */}
              {!isLoading && results.length > 0 && (
                <>
                  <p className="font-body text-xs text-foreground/50 mt-3 mb-2">
                    {results.length} items found — click an item to tag and
                    upload to catalog
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {results.map((product) => (
                      <div key={product.id} className="relative">
                        {uploadedIds.has(product.id) && (
                          <div className="absolute top-2 right-2 z-10 bg-primary text-primary-foreground text-xs font-body font-bold px-2 py-0.5 rounded-full">
                            Added
                          </div>
                        )}
                        <ResultCard
                          product={product}
                          isSelected={selectedProduct?.id === product.id}
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
