import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Plus, Trash2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React, { useState } from "react";
import { useIsCallerAdmin } from "../hooks/useQueries";

interface Product {
  id: string;
  title: string;
  description: string;
  badge: string;
  imageUrl: string;
}

const SEED_PRODUCTS: Product[] = [
  {
    id: "1",
    title: "ADU Shell — Type A",
    description:
      "Modular 400 sq ft single-story accessory dwelling unit shell. Designed for efficient land use with flexible interior configurations.",
    badge: "ADU",
    imageUrl: "/assets/generated/adu-shell-type-a.dim_600x400.png",
  },
  {
    id: "2",
    title: "ADU Shell — Type B",
    description:
      "Two-story 650 sq ft ADU with optional rooftop terrace. Maximizes vertical space while maintaining a small footprint.",
    badge: "ADU",
    imageUrl: "/assets/generated/adu-shell-type-b.dim_600x400.png",
  },
  {
    id: "3",
    title: "Furniture Set — Compact",
    description:
      "Space-optimized furniture collection for studio and one-bedroom lofts. Thoughtfully curated for sovereign living.",
    badge: "Furniture",
    imageUrl: "/assets/generated/furniture-set-compact.dim_600x400.png",
  },
  {
    id: "4",
    title: "Furniture Set — Sovereign",
    description:
      "Premium curated collection for full-floor sovereign loft residences. Each piece selected for beauty, durability, and harmony.",
    badge: "Furniture",
    imageUrl: "/assets/generated/furniture-set-sovereign.dim_600x400.png",
  },
];

export default function CatalogPreviewCarousel() {
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    description: "",
    badge: "",
    imageUrl: "",
  });

  const { data: isAdmin } = useIsCallerAdmin();

  const current = products[currentIndex];

  const goNext = () => {
    if (products.length <= 1) return;
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % products.length);
  };

  const goPrev = () => {
    if (products.length <= 1) return;
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + products.length) % products.length);
  };

  const handleRemove = () => {
    if (products.length <= 1) return;
    const next = products.filter((_, i) => i !== currentIndex);
    setProducts(next);
    setCurrentIndex((prev) => Math.min(prev, next.length - 1));
  };

  const handleAdd = () => {
    if (!newProduct.title.trim()) return;
    const added: Product = {
      id: Date.now().toString(),
      title: newProduct.title.trim(),
      description: newProduct.description.trim(),
      badge: newProduct.badge.trim() || "Product",
      imageUrl:
        newProduct.imageUrl.trim() ||
        "/assets/generated/adu-shell-type-a.dim_600x400.png",
    };
    setProducts((prev) => [...prev, added]);
    setNewProduct({ title: "", description: "", badge: "", imageUrl: "" });
    setShowAddForm(false);
    setCurrentIndex(products.length);
  };

  const slideVariants = {
    enter: (dir: "next" | "prev") => ({
      x: dir === "next" ? 60 : -60,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: "next" | "prev") => ({
      x: dir === "next" ? -60 : 60,
      opacity: 0,
    }),
  };

  if (!current) return null;

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-sandstone">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3">
            Catalog Preview
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Featured <span className="text-primary">Products</span>
          </h2>
        </div>

        {/* Carousel wrapper */}
        <div className="relative rounded-2xl overflow-hidden shadow-warm">
          {/* Full-width image */}
          <div className="relative w-full aspect-video bg-muted overflow-hidden">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={current.id}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.35, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <img
                  src={current.imageUrl}
                  alt={current.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
            </AnimatePresence>

            {/* Nav arrows */}
            {products.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={goPrev}
                  aria-label="Previous product"
                  data-ocid="catalog_preview.pagination_prev"
                  className="absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center text-foreground hover:bg-background hover:scale-110 transition-all duration-200 shadow-warm"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={goNext}
                  aria-label="Next product"
                  data-ocid="catalog_preview.pagination_next"
                  className="absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center text-foreground hover:bg-background hover:scale-110 transition-all duration-200 shadow-warm"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Dot indicators */}
            {products.length > 1 && (
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                {products.map((p, i) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => {
                      setDirection(i > currentIndex ? "next" : "prev");
                      setCurrentIndex(i);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      i === currentIndex
                        ? "bg-primary scale-125"
                        : "bg-background/60 hover:bg-background/90"
                    }`}
                    aria-label={`Go to product ${i + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Product info card — visually attached */}
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={`${current.id}-info`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeInOut", delay: 0.05 }}
              className="bg-background border-t border-border/30 px-6 py-6 sm:px-8 sm:py-8"
            >
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div className="flex-1 min-w-0">
                  <Badge
                    variant="outline"
                    className="mb-3 text-xs font-semibold border-primary/40 text-primary bg-primary/5"
                  >
                    {current.badge}
                  </Badge>
                  <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-2">
                    {current.title}
                  </h3>
                  <p className="font-body text-sm sm:text-base text-foreground/70 leading-relaxed mb-4">
                    {current.description}
                  </p>
                  <Link
                    to="/catalog"
                    className="inline-flex items-center gap-1.5 text-sm font-body font-semibold text-primary hover:text-primary/80 transition-colors duration-200 underline-offset-4 hover:underline"
                    data-ocid="catalog_preview.link"
                  >
                    View in Catalog →
                  </Link>
                </div>

                {isAdmin && (
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleRemove}
                    disabled={products.length <= 1}
                    data-ocid="catalog_preview.delete_button"
                    className="shrink-0 flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Remove
                  </Button>
                )}
              </div>

              {/* Counter */}
              <p className="text-xs font-body text-foreground/40 mt-4">
                {currentIndex + 1} of {products.length}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Admin: Add Product */}
        {isAdmin && (
          <div className="mt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowAddForm((v) => !v)}
              data-ocid="catalog_preview.open_modal_button"
              className="flex items-center gap-1.5 border-primary/30 text-primary hover:bg-primary/5"
            >
              <Plus className="w-4 h-4" />
              {showAddForm ? "Cancel" : "Add Product"}
            </Button>

            <AnimatePresence>
              {showAddForm && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="mt-3 bg-background rounded-xl border border-border/40 shadow-warm p-5 sm:p-6"
                  data-ocid="catalog_preview.panel"
                >
                  <h4 className="font-heading text-base font-bold text-foreground mb-4">
                    Add New Product
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label htmlFor="cp-title" className="text-sm font-body">
                        Title
                      </Label>
                      <Input
                        id="cp-title"
                        placeholder="Product title"
                        value={newProduct.title}
                        onChange={(e) =>
                          setNewProduct((p) => ({
                            ...p,
                            title: e.target.value,
                          }))
                        }
                        data-ocid="catalog_preview.input"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="cp-badge" className="text-sm font-body">
                        Badge / Category
                      </Label>
                      <Input
                        id="cp-badge"
                        placeholder="e.g. ADU, Furniture"
                        value={newProduct.badge}
                        onChange={(e) =>
                          setNewProduct((p) => ({
                            ...p,
                            badge: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="cp-desc" className="text-sm font-body">
                        Description
                      </Label>
                      <Textarea
                        id="cp-desc"
                        placeholder="Short product description"
                        rows={2}
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct((p) => ({
                            ...p,
                            description: e.target.value,
                          }))
                        }
                        data-ocid="catalog_preview.textarea"
                      />
                    </div>
                    <div className="space-y-1.5 sm:col-span-2">
                      <Label htmlFor="cp-img" className="text-sm font-body">
                        Image URL
                      </Label>
                      <Input
                        id="cp-img"
                        placeholder="/assets/generated/my-image.png"
                        value={newProduct.imageUrl}
                        onChange={(e) =>
                          setNewProduct((p) => ({
                            ...p,
                            imageUrl: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button
                      onClick={handleAdd}
                      disabled={!newProduct.title.trim()}
                      data-ocid="catalog_preview.submit_button"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      Add Product
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}

        {/* CTA */}
        <div className="mt-10 text-center">
          <Link
            to="/catalog"
            className="
              inline-flex items-center gap-2
              px-7 py-3.5
              bg-primary text-primary-foreground
              font-body font-semibold text-base
              rounded-full
              transition-all duration-200 ease-in-out
              hover:scale-105 hover:shadow-lg hover:bg-primary/90
              active:scale-95
            "
            data-ocid="catalog_preview.primary_button"
          >
            Browse Full Catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
