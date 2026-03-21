import { c as createLucideIcon, s as clsx, j as jsxRuntimeExports, S as Slot, b as cn, u as useInternetIdentity, r as reactExports, B as Bookmark, L as Link } from "./index-Dl1C1aBr.js";
import { u as useSavedCatalog, S as SEED_ENTRIES, a as SignInOverlay } from "./CatalogPage-9eEWLoy1.js";
import { m as motion } from "./proxy-CNPjm07E.js";
import "./circle-check-big-BWss_wb0.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z", key: "hou9p0" }],
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M16 10a4 4 0 0 1-8 0", key: "1ltviw" }]
];
const ShoppingBag = createLucideIcon("shopping-bag", __iconNode$1);
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
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const falsyToString = (value) => typeof value === "boolean" ? `${value}` : value === 0 ? "0" : value;
const cx = clsx;
const cva = (base, config) => (props) => {
  var _config_compoundVariants;
  if ((config === null || config === void 0 ? void 0 : config.variants) == null) return cx(base, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
  const { variants, defaultVariants } = config;
  const getVariantClassNames = Object.keys(variants).map((variant) => {
    const variantProp = props === null || props === void 0 ? void 0 : props[variant];
    const defaultVariantProp = defaultVariants === null || defaultVariants === void 0 ? void 0 : defaultVariants[variant];
    if (variantProp === null) return null;
    const variantKey = falsyToString(variantProp) || falsyToString(defaultVariantProp);
    return variants[variant][variantKey];
  });
  const propsWithoutUndefined = props && Object.entries(props).reduce((acc, param) => {
    let [key, value] = param;
    if (value === void 0) {
      return acc;
    }
    acc[key] = value;
    return acc;
  }, {});
  const getCompoundVariantClassNames = config === null || config === void 0 ? void 0 : (_config_compoundVariants = config.compoundVariants) === null || _config_compoundVariants === void 0 ? void 0 : _config_compoundVariants.reduce((acc, param) => {
    let { class: cvClass, className: cvClassName, ...compoundVariantOptions } = param;
    return Object.entries(compoundVariantOptions).every((param2) => {
      let [key, value] = param2;
      return Array.isArray(value) ? value.includes({
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key]) : {
        ...defaultVariants,
        ...propsWithoutUndefined
      }[key] === value;
    }) ? [
      ...acc,
      cvClass,
      cvClassName
    ] : acc;
  }, []);
  return cx(base, getVariantClassNames, getCompoundVariantClassNames, props === null || props === void 0 ? void 0 : props.class, props === null || props === void 0 ? void 0 : props.className);
};
const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-md border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
        secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
        destructive: "border-transparent bg-destructive text-destructive-foreground [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Badge({
  className,
  variant,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "span";
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Comp,
    {
      "data-slot": "badge",
      className: cn(badgeVariants({ variant }), className),
      ...props
    }
  );
}
function MyCatalogPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { savedIds, unsaveItem } = useSavedCatalog();
  const [showSignIn, setShowSignIn] = reactExports.useState(false);
  const savedEntries = SEED_ENTRIES.filter((e) => savedIds.includes(e.id));
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5",
            style: { backgroundColor: "rgba(192,57,43,0.1)" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              ShoppingBag,
              {
                className: "w-8 h-8",
                style: { color: "var(--color-crimson-lustre, #c0392b)" }
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-heading text-2xl font-bold text-foreground mb-3", children: "My Catalog" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 mb-6 leading-relaxed", children: "Sign in to view your saved catalog items and access exclusive member pricing." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowSignIn(true),
            "data-ocid": "my-catalog.submit_button",
            className: "px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95",
            children: "Sign In to Continue"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        SignInOverlay,
        {
          isOpen: showSignIn,
          onClose: () => setShowSignIn(false)
        }
      )
    ] });
  }
  if (savedEntries.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center max-w-sm",
        "data-ocid": "my-catalog.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5",
              style: { backgroundColor: "rgba(192,57,43,0.1)" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Bookmark,
                {
                  className: "w-8 h-8",
                  style: { color: "var(--color-crimson-lustre, #c0392b)" }
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-heading text-2xl font-bold text-foreground mb-3", children: "No saved items yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 mb-6 leading-relaxed", children: 'Browse the catalog and click "Save to My Catalog" on items you love to collect them here.' }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/catalog",
              "data-ocid": "my-catalog.link",
              className: "inline-flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95",
              children: "Browse Catalog"
            }
          )
        ]
      }
    ) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#f5e6c8]/60 to-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.span,
        {
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-3",
          children: "Personal Storefront"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay: 0.1 },
          className: "font-heading text-3xl sm:text-4xl font-bold text-foreground mb-3",
          children: "My Catalog"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.p,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay: 0.2 },
          className: "font-body text-sm sm:text-base text-foreground/60 max-w-xl mx-auto",
          children: "Your saved items with member pricing"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { scaleX: 0, opacity: 0 },
          animate: { scaleX: 1, opacity: 1 },
          transition: { duration: 0.6, delay: 0.35 },
          className: "mt-5 mx-auto w-24 h-0.5 bg-primary/30 rounded-full"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-16 sm:pb-20 lg:pb-28 pt-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8",
          "data-ocid": "my-catalog.list",
          children: savedEntries.map((entry, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.45, delay: i * 0.07 },
              "data-ocid": `my-catalog.item.${i + 1}`,
              className: "group relative bg-background rounded-2xl border border-border/30 shadow-warm overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-[4/3] overflow-hidden", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: entry.imageUrl,
                      alt: entry.title,
                      loading: "lazy",
                      decoding: "async",
                      className: "w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      className: "text-xs font-body font-bold px-2.5 py-1 rounded-full flex items-center gap-1",
                      style: {
                        backgroundColor: "var(--color-crimson-lustre, #c0392b)",
                        color: "#fff"
                      },
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
                        "Member Special"
                      ]
                    }
                  ) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading text-base font-semibold text-foreground leading-snug", children: entry.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs font-body text-foreground/40 bg-muted/40 px-2 py-0.5 rounded-full", children: entry.category })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-body text-sm font-semibold mb-3",
                      style: { color: "#8b4513" },
                      children: "Member Price: Contact Us"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1", children: entry.tags.slice(0, 2).map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: "text-xs font-body text-foreground/40 bg-muted/30 px-2 py-0.5 rounded-full",
                        children: [
                          "#",
                          tag
                        ]
                      },
                      tag
                    )) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => unsaveItem(entry.id),
                        "data-ocid": `my-catalog.delete_button.${i + 1}`,
                        className: "text-xs font-body text-foreground/40 hover:text-destructive transition-colors duration-150 shrink-0",
                        children: "Remove"
                      }
                    )
                  ] })
                ] })
              ]
            },
            entry.id
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/catalog",
          "data-ocid": "my-catalog.link",
          className: "inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 font-body font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95",
          style: {
            borderColor: "var(--color-crimson-lustre, #c0392b)",
            color: "var(--color-crimson-lustre, #c0392b)"
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-4 h-4" }),
            "Browse More Items"
          ]
        }
      ) })
    ] }) })
  ] });
}
export {
  MyCatalogPage as default
};
