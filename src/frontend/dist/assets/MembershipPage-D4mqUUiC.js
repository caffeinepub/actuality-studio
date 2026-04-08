import { j as jsxRuntimeExports, C as Clock, b as LoaderCircle, r as reactExports } from "./index-Cm56HytI.js";
import { E as EnrollmentModal } from "./EnrollmentModal-_QU4WUN3.js";
import { C as Check } from "./check-Cj4gehxa.js";
import "./plus-CNTjvOuj.js";
import "./circle-check-big-DMJvcDjl.js";
const accentMap = {
  sage: {
    border: "border-border/40",
    badge: "bg-secondary text-foreground/70 border border-border/40",
    btn: "bg-secondary text-foreground hover:bg-muted",
    check: "text-forest",
    accent: "oklch(0.646 0.222 41.116)"
  },
  blush: {
    border: "border-blush/40",
    badge: "bg-blush/15 text-primary",
    btn: "bg-blush text-primary hover:bg-blush/90",
    check: "text-primary",
    accent: "oklch(0.6 0.118 184.704)"
  },
  terracotta: {
    border: "border-primary/40",
    badge: "bg-primary/15 text-primary",
    btn: "bg-primary text-primary-foreground hover:bg-primary/90",
    check: "text-primary",
    accent: "oklch(0.6 0.118 184.704)"
  },
  gold: {
    border: "border-gold/40",
    badge: "bg-gold/15 text-gold",
    btn: "bg-gold text-forest hover:bg-gold/90",
    check: "text-gold",
    accent: "oklch(0.828 0.189 84.429)"
  },
  forest: {
    border: "border-forest/40",
    badge: "bg-forest/15 text-forest",
    btn: "bg-forest text-cream hover:bg-forest/90",
    check: "text-forest",
    accent: "oklch(0.398 0.07 227.392)"
  }
};
function MembershipTierCard({
  name,
  price,
  priceNote,
  features,
  buttonLabel,
  accentColor = "terracotta",
  bgWash,
  featured = false,
  comingSoon = false,
  loading = false,
  onEnroll
}) {
  const accent = accentMap[accentColor];
  const washColor = bgWash ?? accent.accent;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: `
        relative rounded-2xl border shadow-warm
        flex flex-col h-full isolate overflow-hidden
        transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
        ${featured ? `${accent.border} border-2` : "border-border/30"}
      `,
      style: { background: "oklch(var(--background))" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            "aria-hidden": "true",
            style: {
              position: "absolute",
              inset: 0,
              background: washColor,
              opacity: 0.13,
              zIndex: 0,
              pointerEvents: "none",
              borderRadius: "inherit"
            }
          }
        ),
        featured && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute -top-3 left-1/2 -translate-x-1/2",
            style: { zIndex: 2 },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `text-xs font-body font-semibold px-3 py-1 rounded-full border ${accent.badge}`,
                children: "Most Popular"
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "p-5 sm:p-6 lg:p-7 flex flex-col flex-1",
            style: { position: "relative", zIndex: 1 },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5 sm:mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading text-xl sm:text-2xl font-bold text-foreground mb-1", children: name }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-heading text-3xl sm:text-4xl font-bold text-foreground", children: price }),
                  priceNote && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-foreground/50", children: priceNote })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1", children: features.map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: `w-4 h-4 mt-0.5 shrink-0 ${accent.check}` }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-foreground/75 leading-snug", children: feature })
              ] }, feature)) }),
              comingSoon ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "button",
                {
                  type: "button",
                  disabled: true,
                  className: "w-full py-3 rounded-xl font-body font-semibold text-sm flex items-center justify-center gap-2 bg-muted text-muted-foreground cursor-not-allowed opacity-70",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-4 h-4" }),
                    "Coming Soon"
                  ]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: onEnroll,
                  disabled: loading,
                  className: `
              w-full py-3 rounded-xl font-body font-semibold text-sm
              flex items-center justify-center gap-2
              transition-all duration-200 ease-in-out
              hover:scale-[1.02] active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
              ${accent.btn}
            `,
                  children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                    "Processing…"
                  ] }) : buttonLabel
                }
              )
            ]
          }
        )
      ]
    }
  );
}
const tiers = [
  {
    id: "trial",
    name: "Free Trial",
    price: "Free",
    priceNote: "30 days",
    features: [
      "30-day full access trial",
      "Catalog preview",
      "Community examples access",
      "Cohort setup (up to 12 members)",
      "On-chain trial badge NFT"
    ],
    buttonLabel: "Start Free Trial",
    accentColor: "sage",
    bgWash: "oklch(0.646 0.222 41.116)"
    // Steiner chart-1 — warm amber
  },
  {
    id: "standard",
    name: "Standard",
    price: "$49",
    priceNote: "/month",
    features: [
      "Full Catalog access",
      "ADU shell blueprints",
      "Community collaboration tools",
      "Cohort management (up to 12)",
      "On-chain membership badge NFT",
      "Priority support"
    ],
    buttonLabel: "Enroll Now",
    accentColor: "terracotta",
    bgWash: "oklch(0.6 0.118 184.704)",
    // Steiner chart-2 — cool teal
    featured: true
  },
  {
    id: "premium",
    name: "Premium",
    price: "$149",
    priceNote: "/month",
    features: [
      "Everything in Standard",
      "Full BIM model access",
      "Exclusive furniture collections",
      "Direct architect consultations",
      "Premium on-chain badge NFT",
      "Early access to new units"
    ],
    buttonLabel: "Go Premium",
    accentColor: "gold",
    bgWash: "oklch(0.828 0.189 84.429)"
    // Steiner chart-4 — warm golden yellow
  },
  {
    id: "sovereign",
    name: "Sovereign",
    price: "Custom",
    features: [
      "Full unit ownership pathway",
      "Custom renovation planning",
      "Dedicated project manager",
      "Legal & title support",
      "Sovereign deed NFT",
      "Lifetime community access"
    ],
    buttonLabel: "Contact Us",
    accentColor: "forest",
    bgWash: "oklch(0.398 0.07 227.392)",
    // Steiner chart-3 — cool slate/indigo
    comingSoon: true
  }
];
function MembershipPage() {
  const [selectedTier, setSelectedTier] = reactExports.useState(null);
  const [enrollOpen, setEnrollOpen] = reactExports.useState(false);
  const handleEnroll = (tier) => {
    setSelectedTier(tier);
    setEnrollOpen(true);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background overflow-x-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-cream/60 to-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block text-xs sm:text-sm font-body font-semibold tracking-widest uppercase text-primary/70 mb-4", children: "Membership Plans" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 sm:mb-6 leading-tight", children: [
        "Choose Your",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary block sm:inline sm:ml-2", children: "Sovereign Path" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-base sm:text-lg text-foreground/65 max-w-2xl mx-auto leading-relaxed", children: "Every membership tier includes a custodian-free NFT badge minted directly to your principal on the Internet Computer. No intermediaries, no custodians." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-16 sm:pb-20 lg:pb-28", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8", children: tiers.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      MembershipTierCard,
      {
        name: tier.name,
        price: tier.price,
        priceNote: tier.priceNote,
        features: tier.features,
        buttonLabel: tier.buttonLabel,
        accentColor: tier.accentColor,
        bgWash: tier.bgWash,
        featured: tier.featured,
        comingSoon: tier.comingSoon,
        onEnroll: () => handleEnroll(tier)
      },
      tier.id
    )) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-12 sm:py-16 bg-forest text-cream", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-2xl sm:text-3xl font-bold text-cream mb-4", children: "Custodian-Free NFT Minting" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm sm:text-base text-cream/70 leading-relaxed", children: "When you enroll, your membership badge NFT is minted directly to your Internet Identity principal on the Internet Computer blockchain. There is no custodian wallet, no transfer step, and no third-party intermediary. You are the sole owner from the moment of minting." })
    ] }) }),
    selectedTier && /* @__PURE__ */ jsxRuntimeExports.jsx(
      EnrollmentModal,
      {
        open: enrollOpen,
        onClose: () => {
          setEnrollOpen(false);
          setSelectedTier(null);
        },
        tierName: selectedTier.name,
        tierId: selectedTier.id
      }
    )
  ] });
}
export {
  MembershipPage as default
};
