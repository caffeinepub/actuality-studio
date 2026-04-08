import { c as createLucideIcon, u as useInternetIdentity, r as reactExports, d as useGetCallerMembershipState, e as useGetSavedCatalogItems, f as useRemoveSavedCatalogItem, j as jsxRuntimeExports, B as Bookmark, L as Link, M as MemberCategory, g as useGetItemRatings, h as useRateItem } from "./index-Cm56HytI.js";
import { B as Badge } from "./badge-DDBOzGGS.js";
import { S as SignInOverlay } from "./SignInOverlay-B7v0kucR.js";
import { u as useDiscountRates } from "./useDiscountRates-DpjlTExc.js";
import { m as motion } from "./proxy-eYbHhNop.js";
import { T as ThumbsUp, a as ThumbsDown } from "./thumbs-up-C066wdYm.js";
import "./circle-check-big-DMJvcDjl.js";
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
function getMemberDiscount(category, rates) {
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
function RatingWidget({ itemId }) {
  const { data: ratings } = useGetItemRatings(itemId);
  const { mutate: rateItem } = useRateItem();
  const { identity } = useInternetIdentity();
  const isAuth = !!identity;
  const handleRate = (rating) => {
    if (!isAuth) return;
    rateItem({ itemId, rating });
  };
  const upvotes = (ratings == null ? void 0 : ratings.upvotes) ?? 0;
  const downvotes = (ratings == null ? void 0 : ratings.downvotes) ?? 0;
  const callerRating = (ratings == null ? void 0 : ratings.callerRating) ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => handleRate(1),
        disabled: !isAuth,
        "aria-label": "Thumbs up",
        className: `flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-semibold transition-colors duration-150 ${callerRating === 1 ? "bg-primary text-primary-foreground" : "bg-muted/40 text-muted-foreground hover:bg-primary/10 hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsUp, { className: "w-3 h-3" }),
          upvotes > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: upvotes })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => handleRate(-1),
        disabled: !isAuth,
        "aria-label": "Thumbs down",
        className: `flex items-center gap-1 px-2 py-1 rounded-full text-xs font-body font-semibold transition-colors duration-150 ${callerRating === -1 ? "bg-destructive text-destructive-foreground" : "bg-muted/40 text-muted-foreground hover:bg-destructive/10 hover:text-destructive disabled:opacity-40 disabled:cursor-not-allowed"}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ThumbsDown, { className: "w-3 h-3" }),
          downvotes > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: downvotes })
        ]
      }
    )
  ] });
}
function MyCatalogPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const [showSignIn, setShowSignIn] = reactExports.useState(false);
  const { rates } = useDiscountRates();
  const { data: membershipState } = useGetCallerMembershipState();
  const { data: savedItems = [], isLoading } = useGetSavedCatalogItems();
  const { mutate: removeItem } = useRemoveSavedCatalogItem();
  const discount = getMemberDiscount(membershipState == null ? void 0 : membershipState.category, rates);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShoppingBag, { className: "w-8 h-8 text-primary" }) }),
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
  if (!isLoading && savedItems.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex flex-col items-center justify-center px-4 py-24", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "text-center max-w-sm",
        "data-ocid": "my-catalog.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-heading text-2xl font-bold text-foreground mb-3", children: "No saved items yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 mb-6 leading-relaxed", children: "Browse the catalog and click “Save to My Catalog” on items you love to collect them here." }),
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
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 sm:py-16 lg:py-20 bg-sandstone", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
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
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.p,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, delay: 0.2 },
          className: "font-body text-sm sm:text-base text-foreground/60 max-w-xl mx-auto",
          children: [
            savedItems.length,
            " saved item",
            savedItems.length !== 1 ? "s" : "",
            " ",
            "with member pricing"
          ]
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
          "data-ocid": "my-catalog.list",
          className: "\n              [column-count:1]\n              sm:[column-count:2]\n              md:[column-count:3]\n              lg:[column-count:4]\n              xl:[column-count:5]\n              [column-gap:1.25rem]\n            ",
          children: savedItems.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.45, delay: i * 0.06 },
              "data-ocid": `my-catalog.item.${i + 1}`,
              className: "mb-5 group relative bg-card rounded-2xl border border-border/30 overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5",
              style: { breakInside: "avoid" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative overflow-hidden bg-muted/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "img",
                    {
                      src: item.imageUrl,
                      alt: item.title,
                      loading: "lazy",
                      decoding: "async",
                      className: "w-full object-cover transition-transform duration-500 group-hover:scale-105",
                      style: { maxHeight: "220px", minHeight: "120px" }
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-2 left-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "text-xs font-body font-bold px-2.5 py-1 rounded-full flex items-center gap-1 bg-primary text-primary-foreground", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { className: "w-3 h-3" }),
                    "Member Special"
                  ] }) })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2 mb-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading text-sm font-semibold text-foreground leading-snug min-w-0", children: item.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0 text-xs font-body text-muted-foreground bg-muted/40 px-2 py-0.5 rounded-full", children: item.category })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-foreground/60 line-clamp-2 mb-2 leading-relaxed", children: item.description }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm font-semibold text-primary mb-3", children: discount > 0 ? `Member Price: ${discount}% off` : "Member Price: Contact Us" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(RatingWidget, { itemId: item.itemId }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        onClick: () => removeItem(item.itemId),
                        "data-ocid": `my-catalog.delete_button.${i + 1}`,
                        className: "text-xs font-body text-muted-foreground hover:text-destructive transition-colors duration-150 shrink-0",
                        children: "Remove"
                      }
                    )
                  ] })
                ] })
              ]
            },
            item.itemId
          ))
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/catalog",
          "data-ocid": "my-catalog.link",
          className: "inline-flex items-center gap-2 px-7 py-3 rounded-full border-2 border-primary text-primary font-body font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-primary/5",
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
