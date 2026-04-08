import { a as createLucideIcon, j as jsxRuntimeExports, L as Link, c as cn, r as reactExports, s as useIsCallerAdmin, u as useInternetIdentity, d as useGetCallerMembershipState, z as useTrialStatus, f as useMintBadge, b as LoaderCircle, m as LogIn, T as TriangleAlert, C as Clock, M as MemberCategory } from "./index-DA2SeFgQ.js";
import { B as Badge } from "./badge-BHc3Psfk.js";
import { A as AnimatePresence, m as motion, B as Button, I as Input } from "./proxy-DHlry1-0.js";
import { L as Label, P as Primitive } from "./label-7_kNpLMS.js";
import { T as Trash2, E as EnrollmentModal, S as Shield } from "./EnrollmentModal-DJGiMPuF.js";
import { P as Plus } from "./plus-HbIiio_Y.js";
import "./circle-check-big-BWbW26r9.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m15 18-6-6 6-6", key: "1wnfg3" }]];
const ChevronLeft = createLucideIcon("chevron-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z",
      key: "1vdc57"
    }
  ],
  ["path", { d: "M5 21h14", key: "11awu3" }]
];
const Crown = createLucideIcon("crown", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z",
      key: "r04s7s"
    }
  ]
];
const Star = createLucideIcon("star", __iconNode);
function AboutSection() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "section",
    {
      id: "about",
      className: "py-16 sm:py-20 lg:py-28 bg-background overflow-hidden",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-12 sm:mb-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3", children: "Our Story" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight", children: [
            "From Schoolhouse to",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary block sm:inline sm:ml-2", children: "Sovereign Home" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto space-y-5 sm:space-y-6 mb-12 sm:mb-16 text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base sm:text-lg text-foreground/80 leading-relaxed", children: "Built in 1902, McKinley Elementary School in Spokane, Washington stands as a testament to the city's architectural heritage. Its red-brick façade, arched windows, and cast-iron staircases have witnessed over a century of community life in Spokane's historic neighborhoods." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base sm:text-lg text-foreground/80 leading-relaxed", children: "Actuality Studio is transforming this Spokane landmark into sovereign loft residences — spaces where history meets modern living, and where community ownership replaces traditional landlord models." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base sm:text-lg text-foreground/80 leading-relaxed", children: "Our on-chain membership system ensures every resident holds a verifiable, custodian-free NFT badge — proof of belonging that lives on the Internet Computer, not in a corporate database." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2 flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/membership",
              className: "\n                inline-flex items-center gap-2\n                px-6 py-3 sm:px-7 sm:py-3.5\n                bg-primary text-primary-foreground\n                font-body font-semibold text-sm sm:text-base\n                rounded-full\n                transition-all duration-200 ease-in-out\n                hover:scale-105 hover:shadow-lg hover:bg-primary/90\n                active:scale-95\n              ",
              children: "View Memberships"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden aspect-[4/3] shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/mckinley-1902.dim_640x427.jpg",
                srcSet: "/assets/generated/mckinley-1902.dim_640x427.jpg 640w",
                sizes: "(max-width: 640px) 100vw, 50vw",
                alt: "McKinley Elementary School, Spokane, WA — c. 1902",
                width: 600,
                height: 400,
                className: "w-full h-full object-cover transition-transform duration-500 hover:scale-105",
                loading: "lazy",
                decoding: "async"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-primary/70 text-center italic", children: "c. 1902 — Original Building, Spokane, WA" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden aspect-[4/3] shadow-warm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: "/assets/generated/mckinley-gymnasium-studio.dim_640x427.jpg",
                srcSet: "/assets/generated/mckinley-gymnasium-studio.dim_640x427.jpg 640w",
                sizes: "(max-width: 640px) 100vw, 50vw",
                alt: "McKinley Elementary School Gymnasium renovated as Actuality Studio, Spokane, WA",
                width: 600,
                height: 400,
                className: "w-full h-full object-cover transition-transform duration-500 hover:scale-105",
                loading: "lazy",
                decoding: "async"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-body text-primary/70 text-center italic", children: "Today — Gymnasium Space, Spokane, WA" })
          ] })
        ] })
      ] })
    }
  );
}
function Textarea({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "textarea",
    {
      "data-slot": "textarea",
      className: cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex field-sizing-content min-h-16 w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ...props
    }
  );
}
const SEED_PRODUCTS = [
  {
    id: "1",
    title: "ADU Shell — Type A",
    description: "Modular 400 sq ft single-story accessory dwelling unit shell. Designed for efficient land use with flexible interior configurations.",
    badge: "ADU",
    imageUrl: "/assets/generated/adu-shell-type-a.dim_640x427.jpg"
  },
  {
    id: "2",
    title: "ADU Shell — Type B",
    description: "Two-story 650 sq ft ADU with optional rooftop terrace. Maximizes vertical space while maintaining a small footprint.",
    badge: "ADU",
    imageUrl: "/assets/generated/adu-shell-type-b.dim_640x427.jpg"
  },
  {
    id: "3",
    title: "Furniture Set — Compact",
    description: "Space-optimized furniture collection for studio and one-bedroom lofts. Thoughtfully curated for sovereign living.",
    badge: "Furniture",
    imageUrl: "/assets/generated/furniture-set-compact.dim_640x427.jpg"
  },
  {
    id: "4",
    title: "Furniture Set — Sovereign",
    description: "Premium curated collection for full-floor sovereign loft residences. Each piece selected for beauty, durability, and harmony.",
    badge: "Furniture",
    imageUrl: "/assets/generated/furniture-set-sovereign.dim_640x427.jpg"
  }
];
function CatalogPreviewCarousel() {
  const [products, setProducts] = reactExports.useState(SEED_PRODUCTS);
  const [currentIndex, setCurrentIndex] = reactExports.useState(0);
  const [direction, setDirection] = reactExports.useState("next");
  const [showAddForm, setShowAddForm] = reactExports.useState(false);
  const [newProduct, setNewProduct] = reactExports.useState({
    title: "",
    description: "",
    badge: "",
    imageUrl: ""
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
    const added = {
      id: Date.now().toString(),
      title: newProduct.title.trim(),
      description: newProduct.description.trim(),
      badge: newProduct.badge.trim() || "Product",
      imageUrl: newProduct.imageUrl.trim() || "/assets/generated/adu-shell-type-a.dim_640x427.jpg"
    };
    setProducts((prev) => [...prev, added]);
    setNewProduct({ title: "", description: "", badge: "", imageUrl: "" });
    setShowAddForm(false);
    setCurrentIndex(products.length);
  };
  const slideVariants = {
    enter: (dir) => ({
      x: dir === "next" ? 60 : -60,
      opacity: 0
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({
      x: dir === "next" ? -60 : 60,
      opacity: 0
    })
  };
  if (!current) return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 lg:py-28 bg-sandstone", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10 sm:mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3", children: "Catalog Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-tight", children: [
        "Featured ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: "Products" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden shadow-warm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-full aspect-video bg-muted overflow-hidden", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, custom: direction, mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            custom: direction,
            variants: slideVariants,
            initial: "enter",
            animate: "center",
            exit: "exit",
            transition: { duration: 0.35, ease: "easeInOut" },
            className: "absolute inset-0",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: current.imageUrl,
                alt: current.title,
                className: "w-full h-full object-cover",
                loading: "lazy",
                decoding: "async"
              }
            )
          },
          current.id
        ) }),
        products.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: goPrev,
              "aria-label": "Previous product",
              "data-ocid": "catalog_preview.pagination_prev",
              className: "absolute left-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center text-foreground hover:bg-background hover:scale-110 transition-all duration-200 shadow-warm",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: goNext,
              "aria-label": "Next product",
              "data-ocid": "catalog_preview.pagination_next",
              className: "absolute right-3 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm border border-border/40 flex items-center justify-center text-foreground hover:bg-background hover:scale-110 transition-all duration-200 shadow-warm",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5" })
            }
          )
        ] }),
        products.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10", children: products.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => {
              setDirection(i > currentIndex ? "next" : "prev");
              setCurrentIndex(i);
            },
            className: `w-2 h-2 rounded-full transition-all duration-200 ${i === currentIndex ? "bg-primary scale-125" : "bg-background/60 hover:bg-background/90"}`,
            "aria-label": `Go to product ${i + 1}`
          },
          p.id
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { initial: false, custom: direction, mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          custom: direction,
          variants: slideVariants,
          initial: "enter",
          animate: "center",
          exit: "exit",
          transition: { duration: 0.3, ease: "easeInOut", delay: 0.05 },
          className: "bg-background border-t border-border/30 px-6 py-6 sm:px-8 sm:py-8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4 flex-wrap", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: "mb-3 text-xs font-semibold border-primary/40 text-primary bg-primary/5",
                    children: current.badge
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading text-xl sm:text-2xl font-bold text-foreground mb-2", children: current.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm sm:text-base text-foreground/70 leading-relaxed mb-4", children: current.description }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Link,
                  {
                    to: "/catalog",
                    className: "inline-flex items-center gap-1.5 text-sm font-body font-semibold text-primary hover:text-primary/80 transition-colors duration-200 underline-offset-4 hover:underline",
                    "data-ocid": "catalog_preview.link",
                    children: "View in Catalog →"
                  }
                )
              ] }),
              isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "destructive",
                  size: "sm",
                  onClick: handleRemove,
                  disabled: products.length <= 1,
                  "data-ocid": "catalog_preview.delete_button",
                  className: "shrink-0 flex items-center gap-1.5",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-3.5 h-3.5" }),
                    "Remove"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-body text-foreground/40 mt-4", children: [
              currentIndex + 1,
              " of ",
              products.length
            ] })
          ]
        },
        `${current.id}-info`
      ) })
    ] }),
    isAdmin && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "outline",
          size: "sm",
          onClick: () => setShowAddForm((v) => !v),
          "data-ocid": "catalog_preview.open_modal_button",
          className: "flex items-center gap-1.5 border-primary/30 text-primary hover:bg-primary/5",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-4 h-4" }),
            showAddForm ? "Cancel" : "Add Product"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: showAddForm && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: -8 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -8 },
          transition: { duration: 0.2 },
          className: "mt-3 bg-background rounded-xl border border-border/40 shadow-warm p-5 sm:p-6",
          "data-ocid": "catalog_preview.panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-heading text-base font-bold text-foreground mb-4", children: "Add New Product" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-title", className: "text-sm font-body", children: "Title" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cp-title",
                    placeholder: "Product title",
                    value: newProduct.title,
                    onChange: (e) => setNewProduct((p) => ({
                      ...p,
                      title: e.target.value
                    })),
                    "data-ocid": "catalog_preview.input"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-badge", className: "text-sm font-body", children: "Badge / Category" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cp-badge",
                    placeholder: "e.g. ADU, Furniture",
                    value: newProduct.badge,
                    onChange: (e) => setNewProduct((p) => ({
                      ...p,
                      badge: e.target.value
                    }))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-desc", className: "text-sm font-body", children: "Description" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Textarea,
                  {
                    id: "cp-desc",
                    placeholder: "Short product description",
                    rows: 2,
                    value: newProduct.description,
                    onChange: (e) => setNewProduct((p) => ({
                      ...p,
                      description: e.target.value
                    })),
                    "data-ocid": "catalog_preview.textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5 sm:col-span-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cp-img", className: "text-sm font-body", children: "Image URL" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "cp-img",
                    placeholder: "/assets/generated/my-image.png",
                    value: newProduct.imageUrl,
                    onChange: (e) => setNewProduct((p) => ({
                      ...p,
                      imageUrl: e.target.value
                    }))
                  }
                )
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end mt-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                onClick: handleAdd,
                disabled: !newProduct.title.trim(),
                "data-ocid": "catalog_preview.submit_button",
                className: "bg-primary text-primary-foreground hover:bg-primary/90",
                children: "Add Product"
              }
            ) })
          ]
        }
      ) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/catalog",
        className: "\n              inline-flex items-center gap-2\n              px-7 py-3.5\n              bg-primary text-primary-foreground\n              font-body font-semibold text-base\n              rounded-full\n              transition-all duration-200 ease-in-out\n              hover:scale-105 hover:shadow-lg hover:bg-primary/90\n              active:scale-95\n            ",
        "data-ocid": "catalog_preview.primary_button",
        children: "Browse Full Catalog"
      }
    ) })
  ] }) });
}
function HeroSection() {
  const [enrollOpen, setEnrollOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full aspect-[21/9] overflow-hidden bg-stone-200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "img",
      {
        src: "/assets/generated/mckinley-school-hero.dim_1280x720.jpg",
        srcSet: "/assets/generated/mckinley-school-hero.dim_1280x720.jpg 1280w",
        sizes: "100vw",
        alt: "Historic McKinley Elementary School, Spokane, Washington",
        width: 1280,
        height: 720,
        className: "w-full h-full object-cover object-center",
        loading: "eager",
        fetchPriority: "high"
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-background py-12 sm:py-16 lg:py-20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.1 },
          className: "inline-flex items-center gap-2 bg-primary/10 border border-primary/20 rounded-full px-4 py-1.5 mb-6",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-full bg-primary animate-pulse" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary text-xs sm:text-sm font-body font-medium tracking-wide uppercase", children: "Historic Preservation · Sovereign Living" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.h1,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay: 0.2 },
          className: "font-heading text-3xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-4 sm:mb-5",
          children: [
            "Actuality Studio",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "block text-primary mt-1 sm:mt-2", children: "McKinley Lofts" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.65, delay: 0.3 },
          className: "font-body text-base sm:text-lg lg:text-xl text-foreground/70 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed",
          children: "Join a sovereign community transforming Spokane, Washington's historic 1902 McKinley Elementary School into living spaces that honor the past while building the future."
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay: 0.4 },
          className: "flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "hero.primary_button",
                onClick: () => setEnrollOpen(true),
                className: "\n                w-full sm:w-auto\n                px-7 py-3.5 sm:px-8 sm:py-4\n                bg-primary text-primary-foreground\n                font-body font-semibold text-base sm:text-lg\n                rounded-full\n                transition-all duration-200 ease-in-out\n                hover:scale-105 hover:shadow-xl hover:bg-primary/90\n                active:scale-95\n                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50\n              ",
                children: "Start Your Free 30-Day Trial"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                "data-ocid": "hero.secondary_button",
                onClick: () => {
                  var _a;
                  return (_a = document.getElementById("about")) == null ? void 0 : _a.scrollIntoView({ behavior: "smooth" });
                },
                className: "\n                w-full sm:w-auto\n                px-7 py-3.5 sm:px-8 sm:py-4\n                bg-muted text-foreground border border-border\n                font-body font-medium text-base sm:text-lg\n                rounded-full\n                transition-all duration-200 ease-in-out\n                hover:scale-105 hover:bg-muted/80 hover:shadow-lg\n                active:scale-95\n                focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50\n              ",
                children: "Learn More"
              }
            )
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      EnrollmentModal,
      {
        open: enrollOpen,
        onClose: () => setEnrollOpen(false),
        tierName: "Trial",
        tierId: "trial"
      }
    )
  ] });
}
const slides = [
  {
    src: "/assets/generated/mckinley-exterior.dim_900x600.jpg",
    srcSet: "/assets/generated/mckinley-exterior.dim_900x600.jpg 900w",
    alt: "McKinley Elementary School, Spokane, WA — Exterior",
    caption: "The iconic 1902 red-brick facade of McKinley Elementary School in Spokane, Washington, preserved for future generations.",
    width: 1200,
    height: 800
  },
  {
    src: "/assets/generated/mckinley-interior-apt.dim_900x600.jpg",
    srcSet: "/assets/generated/mckinley-interior-apt.dim_900x600.jpg 900w",
    alt: "McKinley Lofts, Spokane, WA — Interior Apartment",
    caption: "Open-plan loft living with original hardwood floors and exposed brick inside Spokane's historic McKinley School.",
    width: 1200,
    height: 800
  },
  {
    src: "/assets/generated/mckinley-staircase.dim_900x600.jpg",
    srcSet: "/assets/generated/mckinley-staircase.dim_900x600.jpg 900w",
    alt: "McKinley Elementary School, Spokane, WA — Original Cast-Iron Staircase",
    caption: "Restored cast-iron staircases at Spokane's McKinley Elementary School — a century of stories in every step.",
    width: 1200,
    height: 800
  },
  {
    src: "/assets/generated/mckinley-interior-detail.dim_900x600.jpg",
    srcSet: "/assets/generated/mckinley-interior-detail.dim_900x600.jpg 900w",
    alt: "McKinley Elementary School, Spokane, WA — Interior Architectural Detail",
    caption: "Arched windows and original millwork bring warmth to every space in Spokane's McKinley Lofts.",
    width: 1200,
    height: 800
  }
];
function InspirationCarousel() {
  const [current, setCurrent] = reactExports.useState(0);
  const [isTransitioning, setIsTransitioning] = reactExports.useState(false);
  const timerRef = reactExports.useRef(null);
  const goTo = reactExports.useCallback(
    (index) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent((index + slides.length) % slides.length);
      setTimeout(() => setIsTransitioning(false), 400);
    },
    [isTransitioning]
  );
  const next = reactExports.useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = reactExports.useCallback(() => goTo(current - 1), [current, goTo]);
  reactExports.useEffect(() => {
    timerRef.current = setTimeout(next, 5e3);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, next]);
  reactExports.useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prev, next]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 lg:py-24 bg-spring overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-8 sm:mb-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3", children: "Real-World Inspiration" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-forest", children: "The McKinley Vision — Spokane, WA" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative rounded-2xl overflow-hidden shadow-2xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[16/9] sm:aspect-[16/8] lg:aspect-[16/7] bg-forest/50", children: [
        slides.map((slide, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "img",
          {
            src: slide.src,
            srcSet: slide.srcSet,
            sizes: "(max-width: 768px) 100vw, 80vw",
            alt: slide.alt,
            width: slide.width,
            height: slide.height,
            loading: "lazy",
            decoding: "async",
            className: `
                  absolute inset-0 w-full h-full object-cover
                  transition-opacity duration-500 ease-in-out
                  ${i === current ? "opacity-100" : "opacity-0"}
                `
          },
          slide.src
        )),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: prev,
            "aria-label": "Previous slide",
            className: "\n                absolute left-3 sm:left-4 top-1/2 -translate-y-1/2\n                w-10 h-10 sm:w-12 sm:h-12\n                flex items-center justify-center\n                bg-forest/60 hover:bg-forest/80 text-cream\n                rounded-full backdrop-blur-sm\n                transition-all duration-200 ease-in-out\n                hover:scale-110 active:scale-95\n              ",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "w-5 h-5 sm:w-6 sm:h-6" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: next,
            "aria-label": "Next slide",
            className: "\n                absolute right-3 sm:right-4 top-1/2 -translate-y-1/2\n                w-10 h-10 sm:w-12 sm:h-12\n                flex items-center justify-center\n                bg-forest/60 hover:bg-forest/80 text-cream\n                rounded-full backdrop-blur-sm\n                transition-all duration-200 ease-in-out\n                hover:scale-110 active:scale-95\n              ",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-5 h-5 sm:w-6 sm:h-6" })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 sm:px-6 lg:px-8 pt-4 pb-2 bg-forest/90 min-h-[3.5rem] flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "p",
        {
          className: `
                font-body text-sm sm:text-base lg:text-lg text-cream/90 max-w-2xl mx-auto text-center w-full italic
                transition-all duration-400 ease-in-out
                ${isTransitioning ? "opacity-0 translate-y-1" : "opacity-100 translate-y-0"}
              `,
          children: slides[current].caption
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center gap-2 py-3 bg-forest/80", children: slides.map((slide, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => goTo(i),
          "aria-label": `Go to slide ${i + 1}`,
          className: `
                  rounded-full transition-all duration-300 ease-in-out
                  hover:scale-125 active:scale-95
                  ${i === current ? "w-6 h-2.5 bg-gold" : "w-2.5 h-2.5 bg-cream/30 hover:bg-cream/60"}
                `
        },
        slide.src
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-center mt-8 sm:mt-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/catalog",
        className: "\n              inline-flex items-center gap-2\n              px-6 py-3 sm:px-7 sm:py-3.5\n              bg-gold text-forest\n              font-body font-semibold text-sm sm:text-base\n              rounded-full\n              transition-all duration-200 ease-in-out\n              hover:scale-105 hover:shadow-lg hover:bg-gold/90\n              active:scale-95\n            ",
        children: "View Full Catalog"
      }
    ) })
  ] }) });
}
function createContextScope(scopeName, createContextScopeDeps = []) {
  let defaultContexts = [];
  function createContext3(rootComponentName, defaultContext) {
    const BaseContext = reactExports.createContext(defaultContext);
    BaseContext.displayName = rootComponentName + "Context";
    const index = defaultContexts.length;
    defaultContexts = [...defaultContexts, defaultContext];
    const Provider = (props) => {
      var _a;
      const { scope, children, ...context } = props;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const value = reactExports.useMemo(() => context, Object.values(context));
      return /* @__PURE__ */ jsxRuntimeExports.jsx(Context.Provider, { value, children });
    };
    Provider.displayName = rootComponentName + "Provider";
    function useContext2(consumerName, scope) {
      var _a;
      const Context = ((_a = scope == null ? void 0 : scope[scopeName]) == null ? void 0 : _a[index]) || BaseContext;
      const context = reactExports.useContext(Context);
      if (context) return context;
      if (defaultContext !== void 0) return defaultContext;
      throw new Error(`\`${consumerName}\` must be used within \`${rootComponentName}\``);
    }
    return [Provider, useContext2];
  }
  const createScope = () => {
    const scopeContexts = defaultContexts.map((defaultContext) => {
      return reactExports.createContext(defaultContext);
    });
    return function useScope(scope) {
      const contexts = (scope == null ? void 0 : scope[scopeName]) || scopeContexts;
      return reactExports.useMemo(
        () => ({ [`__scope${scopeName}`]: { ...scope, [scopeName]: contexts } }),
        [scope, contexts]
      );
    };
  };
  createScope.scopeName = scopeName;
  return [createContext3, composeContextScopes(createScope, ...createContextScopeDeps)];
}
function composeContextScopes(...scopes) {
  const baseScope = scopes[0];
  if (scopes.length === 1) return baseScope;
  const createScope = () => {
    const scopeHooks = scopes.map((createScope2) => ({
      useScope: createScope2(),
      scopeName: createScope2.scopeName
    }));
    return function useComposedScopes(overrideScopes) {
      const nextScopes = scopeHooks.reduce((nextScopes2, { useScope, scopeName }) => {
        const scopeProps = useScope(overrideScopes);
        const currentScope = scopeProps[`__scope${scopeName}`];
        return { ...nextScopes2, ...currentScope };
      }, {});
      return reactExports.useMemo(() => ({ [`__scope${baseScope.scopeName}`]: nextScopes }), [nextScopes]);
    };
  };
  createScope.scopeName = baseScope.scopeName;
  return createScope;
}
var PROGRESS_NAME = "Progress";
var DEFAULT_MAX = 100;
var [createProgressContext] = createContextScope(PROGRESS_NAME);
var [ProgressProvider, useProgressContext] = createProgressContext(PROGRESS_NAME);
var Progress$1 = reactExports.forwardRef(
  (props, forwardedRef) => {
    const {
      __scopeProgress,
      value: valueProp = null,
      max: maxProp,
      getValueLabel = defaultGetValueLabel,
      ...progressProps
    } = props;
    if ((maxProp || maxProp === 0) && !isValidMaxNumber(maxProp)) {
      console.error(getInvalidMaxError(`${maxProp}`, "Progress"));
    }
    const max = isValidMaxNumber(maxProp) ? maxProp : DEFAULT_MAX;
    if (valueProp !== null && !isValidValueNumber(valueProp, max)) {
      console.error(getInvalidValueError(`${valueProp}`, "Progress"));
    }
    const value = isValidValueNumber(valueProp, max) ? valueProp : null;
    const valueLabel = isNumber(value) ? getValueLabel(value, max) : void 0;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressProvider, { scope: __scopeProgress, value, max, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "aria-valuemax": max,
        "aria-valuemin": 0,
        "aria-valuenow": isNumber(value) ? value : void 0,
        "aria-valuetext": valueLabel,
        role: "progressbar",
        "data-state": getProgressState(value, max),
        "data-value": value ?? void 0,
        "data-max": max,
        ...progressProps,
        ref: forwardedRef
      }
    ) });
  }
);
Progress$1.displayName = PROGRESS_NAME;
var INDICATOR_NAME = "ProgressIndicator";
var ProgressIndicator = reactExports.forwardRef(
  (props, forwardedRef) => {
    const { __scopeProgress, ...indicatorProps } = props;
    const context = useProgressContext(INDICATOR_NAME, __scopeProgress);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Primitive.div,
      {
        "data-state": getProgressState(context.value, context.max),
        "data-value": context.value ?? void 0,
        "data-max": context.max,
        ...indicatorProps,
        ref: forwardedRef
      }
    );
  }
);
ProgressIndicator.displayName = INDICATOR_NAME;
function defaultGetValueLabel(value, max) {
  return `${Math.round(value / max * 100)}%`;
}
function getProgressState(value, maxValue) {
  return value == null ? "indeterminate" : value === maxValue ? "complete" : "loading";
}
function isNumber(value) {
  return typeof value === "number";
}
function isValidMaxNumber(max) {
  return isNumber(max) && !isNaN(max) && max > 0;
}
function isValidValueNumber(value, max) {
  return isNumber(value) && !isNaN(value) && value <= max && value >= 0;
}
function getInvalidMaxError(propValue, componentName) {
  return `Invalid prop \`max\` of value \`${propValue}\` supplied to \`${componentName}\`. Only numbers greater than 0 are valid max values. Defaulting to \`${DEFAULT_MAX}\`.`;
}
function getInvalidValueError(propValue, componentName) {
  return `Invalid prop \`value\` of value \`${propValue}\` supplied to \`${componentName}\`. The \`value\` prop must be:
  - a positive number
  - less than the value passed to \`max\` (or ${DEFAULT_MAX} if no \`max\` prop is set)
  - \`null\` or \`undefined\` if the progress is indeterminate.

Defaulting to \`null\`.`;
}
var Root = Progress$1;
var Indicator = ProgressIndicator;
function Progress({
  className,
  value,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "progress",
      className: cn(
        "bg-primary/20 relative h-2 w-full overflow-hidden rounded-full",
        className
      ),
      ...props,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Indicator,
        {
          "data-slot": "progress-indicator",
          className: "bg-primary h-full w-full flex-1 transition-all",
          style: { transform: `translateX(-${100 - (value || 0)}%)` }
        }
      )
    }
  );
}
function MembershipCard() {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";
  const { data: membership, isLoading } = useGetCallerMembershipState();
  const trialStatus = useTrialStatus();
  const mintBadge = useMintBadge();
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-2xl border border-border/40 shadow-warm p-5 sm:p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-2xl sm:text-3xl font-bold text-foreground mb-4", children: "Your Membership Status" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-primary/40 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 mb-4", children: "Track your trial, upgrade your tier, or mint your on-chain badge." }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => login(),
          disabled: isLoggingIn,
          "data-ocid": "membership.login_button",
          className: "\n            inline-flex items-center justify-center gap-2 px-5 py-2.5\n            bg-primary text-primary-foreground\n            font-body font-semibold text-sm rounded-full\n            transition-all duration-200 ease-in-out\n            hover:scale-105 hover:shadow-md active:scale-95\n            disabled:opacity-50 disabled:hover:scale-100\n          ",
          children: [
            isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
            isLoggingIn ? "Logging in…" : "Login to view membership status"
          ]
        }
      )
    ] });
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-2xl border border-border/40 shadow-warm p-5 sm:p-6 flex items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-5 h-5 animate-spin text-primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-foreground/60", children: "Loading membership…" })
    ] });
  }
  if (!membership) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-2xl border border-border/40 shadow-warm p-5 sm:p-6 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 text-primary/40 mx-auto mb-3" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 mb-4", children: "No active membership found." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/membership",
          className: "\n            inline-flex items-center gap-2 px-5 py-2.5\n            bg-primary text-primary-foreground\n            font-body font-semibold text-sm rounded-full\n            transition-all duration-200 ease-in-out\n            hover:scale-105 hover:shadow-md active:scale-95\n          ",
          children: "View Plans"
        }
      )
    ] });
  }
  if (trialStatus.isTrial) {
    const progressPct = trialStatus.isExpired ? 100 : Math.max(
      0,
      Math.min(100, (30 - trialStatus.daysRemaining) / 30 * 100)
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: `bg-background rounded-2xl border shadow-warm p-5 sm:p-6 ${trialStatus.isExpired ? "border-destructive/40" : trialStatus.isWarning ? "border-gold/40" : "border-border/40"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-4", children: [
            trialStatus.isExpired ? /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-5 h-5 text-destructive shrink-0" }) : trialStatus.isWarning ? /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-5 h-5 text-gold shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-5 h-5 text-primary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-heading text-base font-semibold text-foreground", children: trialStatus.isExpired ? "Trial Expired" : "Trial Membership" })
          ] }),
          !trialStatus.isExpired && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Progress, { value: progressPct, className: "h-2 mb-2" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs text-foreground/60 mb-4", children: [
              trialStatus.daysRemaining,
              " day",
              trialStatus.daysRemaining !== 1 ? "s" : "",
              " remaining"
            ] })
          ] }),
          (trialStatus.isExpired || trialStatus.isWarning) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Link,
              {
                to: "/membership",
                className: "\n                flex-1 text-center px-4 py-2.5\n                bg-primary text-primary-foreground\n                font-body font-semibold text-sm rounded-full\n                transition-all duration-200 ease-in-out\n                hover:scale-105 hover:shadow-md active:scale-95\n              ",
                children: "Upgrade Now"
              }
            ),
            !membership.badgeMinted && !trialStatus.isExpired && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => mintBadge.mutate(),
                disabled: mintBadge.isPending,
                className: "\n                  flex-1 flex items-center justify-center gap-2 px-4 py-2.5\n                  bg-secondary text-secondary-foreground\n                  font-body font-semibold text-sm rounded-full\n                  transition-all duration-200 ease-in-out\n                  hover:scale-105 hover:shadow-md active:scale-95\n                  disabled:opacity-50 disabled:hover:scale-100\n                ",
                children: [
                  mintBadge.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
                  "Mint Badge"
                ]
              }
            )
          ] })
        ]
      }
    );
  }
  const isStandard = membership.category === MemberCategory.standard;
  const isPremium = membership.category === MemberCategory.premium;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-background rounded-2xl border border-border/40 shadow-warm p-5 sm:p-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mb-3", children: [
      isPremium ? /* @__PURE__ */ jsxRuntimeExports.jsx(Crown, { className: "w-5 h-5 text-gold shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Star, { className: "w-5 h-5 text-primary shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-heading text-base font-semibold text-foreground", children: isPremium ? "Premium Member" : "Standard Member" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 mb-4", children: isPremium ? "Full access to all sovereign catalog content and community features." : "Access to standard catalog content and community features." }),
    isStandard && !membership.badgeMinted && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => mintBadge.mutate(),
        disabled: mintBadge.isPending,
        className: "\n            w-full flex items-center justify-center gap-2 px-4 py-2.5\n            bg-primary text-primary-foreground\n            font-body font-semibold text-sm rounded-full\n            transition-all duration-200 ease-in-out\n            hover:scale-105 hover:shadow-md active:scale-95\n            disabled:opacity-50 disabled:hover:scale-100\n          ",
        children: [
          mintBadge.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
          mintBadge.isPending ? "Minting…" : "Mint Your Badge NFT"
        ]
      }
    ),
    membership.badgeMinted && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-body text-secondary", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-3.5 h-3.5" }),
      "Badge NFT minted — you are the direct on-chain owner"
    ] })
  ] });
}
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(HeroSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AboutSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(InspirationCarousel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CatalogPreviewCarousel, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 lg:py-28 bg-forest text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-gold/70 mb-4", children: "Our Mission" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-cream mb-6 sm:mb-8 leading-tight", children: [
        "Sovereign Living,",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gold block sm:inline sm:ml-2", children: "On-Chain" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base sm:text-lg text-cream/80 leading-relaxed mb-8 sm:mb-10 max-w-2xl mx-auto", children: "We can assume that housing is a right, or that it's a choice — like “...Sovereignty in our own right”. We can believe everything we think (or not), but our Mind and our ability to Reason are precious gifts that extend from within, when we “choose” our highest joy, passion and excitement, through Presence and Imagination. By placing membership and ownership records on the Internet Computer, we eliminate custodians, reduce friction, and help secure ownership and true sovereignty over our homes." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/membership",
          className: "\n              inline-flex items-center gap-2\n              px-7 py-3.5 sm:px-8 sm:py-4\n              bg-gold text-forest\n              font-body font-bold text-base sm:text-lg\n              rounded-full\n              transition-all duration-200 ease-in-out\n              hover:scale-105 hover:shadow-xl hover:bg-gold/90\n              active:scale-95\n            ",
          children: "Join the Community"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "community", className: "py-16 sm:py-20 lg:py-24 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center mb-10 sm:mb-14", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3", children: "Why Actuality Studio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground", children: "Built Different" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8", children: [
        {
          icon: "🏛️",
          title: "Historic Preservation",
          desc: "Every renovation decision honors the 1902 architectural heritage of McKinley Elementary School in Spokane, Washington."
        },
        {
          icon: "🔗",
          title: "On-Chain Ownership",
          desc: "Your membership badge is a custodian-free NFT on the Internet Computer — you own it, period."
        },
        {
          icon: "🌿",
          title: "Sovereign Community",
          desc: "Cohort-based living with up to 12 trusted members per household, governed on-chain."
        }
      ].map((card) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "bg-background rounded-2xl border border-border/30 shadow-warm p-6 sm:p-7 hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-3xl sm:text-4xl mb-4", children: card.icon }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading text-lg sm:text-xl font-bold text-primary mb-2", children: card.title }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/70 leading-relaxed", children: card.desc })
          ]
        },
        card.title
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 bg-sandstone", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MembershipCard, {}) }) })
  ] });
}
export {
  LandingPage as default
};
