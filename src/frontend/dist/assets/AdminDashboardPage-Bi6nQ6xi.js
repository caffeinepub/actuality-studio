const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/index-Cm56HytI.js","assets/index-CQUTHDOk.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, r as reactExports, u as useInternetIdentity, w as useNavigate, x as useHasAnyAdmin, y as useIsCallerAdmin, z as useListAdmins, A as useRegisterAsFirstAdmin, E as useAddAdmin, F as useRemoveAdmin, S as ShieldCheck, b as LoaderCircle, _ as __vitePreload } from "./index-Cm56HytI.js";
import { I as Input, B as Button } from "./input-I5YBvk03.js";
import { L as Label } from "./label-CibylFeC.js";
import { u as ue } from "./index-CXAJ8zcb.js";
import { u as useDiscountRates, D as DEFAULT_RATES } from "./useDiscountRates-DpjlTExc.js";
import { m as motion } from "./proxy-eYbHhNop.js";
import { S as SignInOverlay } from "./SignInOverlay-B7v0kucR.js";
import "./circle-check-big-DMJvcDjl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserMinus = createLucideIcon("user-minus", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserPlus = createLucideIcon("user-plus", __iconNode);
function Card({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card",
      className: cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm",
        className
      ),
      ...props
    }
  );
}
function CardHeader({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-header",
      className: cn(
        "@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6 has-data-[slot=card-action]:grid-cols-[1fr_auto] [.border-b]:pb-6",
        className
      ),
      ...props
    }
  );
}
function CardTitle({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-title",
      className: cn("leading-none font-semibold", className),
      ...props
    }
  );
}
function CardDescription({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-description",
      className: cn("text-muted-foreground text-sm", className),
      ...props
    }
  );
}
function CardContent({ className, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-slot": "card-content",
      className: cn("px-6", className),
      ...props
    }
  );
}
const TIERS = [
  { key: "trial", label: "Trial", description: "30-day free trial members" },
  { key: "cohort", label: "Cohort", description: "Standard cohort members" },
  {
    key: "patronPro",
    label: "Patron Pro",
    description: "Premium patron members"
  },
  {
    key: "sponsor",
    label: "Sponsor / Client",
    description: "Sponsor and client accounts"
  }
];
function AdminDiscountSettings() {
  const { rates, setRates, resetRates } = useDiscountRates();
  const [draft, setDraft] = reactExports.useState({ ...rates });
  const [saved, setSaved] = reactExports.useState(false);
  const handleChange = (key, value) => {
    const num = Math.min(100, Math.max(0, Math.round(Number(value) || 0)));
    setDraft((prev) => ({ ...prev, [key]: num }));
  };
  const handleSave = () => {
    setRates(draft);
    setSaved(true);
    ue.success("Discount rates saved successfully");
    setTimeout(() => setSaved(false), 3e3);
  };
  const handleReset = () => {
    resetRates();
    setDraft({ ...DEFAULT_RATES });
    ue("Discount rates reset to defaults");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.45 },
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "max-w-2xl border-border/40 shadow-warm bg-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "pb-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { className: "font-heading text-xl text-foreground", children: "Discount Rates by Membership Tier" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { className: "font-body text-sm leading-relaxed text-foreground/60", children: "Set the automatic discount applied to saved catalog items for each member type. Rates are applied as a percentage off the list price." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-5", children: [
          TIERS.map((tier) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/30 transition-colors duration-150",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Label,
                    {
                      htmlFor: `discount-${tier.key}`,
                      className: "font-body font-semibold text-sm block mb-0.5 text-foreground",
                      children: tier.label
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-foreground/55", children: tier.description })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: `discount-${tier.key}`,
                      type: "number",
                      min: 0,
                      max: 100,
                      value: draft[tier.key],
                      onChange: (e) => handleChange(tier.key, e.target.value),
                      "data-ocid": `admin.${tier.key}.input`,
                      className: "w-20 text-center font-body font-semibold text-sm bg-background border-border/40"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm font-medium text-foreground/60", children: "%" })
                ] })
              ]
            },
            tier.key
          )),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex items-center gap-3 pt-2",
              "data-ocid": "admin.settings.panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    onClick: handleSave,
                    "data-ocid": "admin.settings.save_button",
                    className: "flex-1 bg-primary text-primary-foreground font-body font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 hover:bg-primary/90",
                    children: saved ? "✓ Saved!" : "Save Discount Rates"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: handleReset,
                    "data-ocid": "admin.settings.secondary_button",
                    className: "font-body font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 border-primary/30 text-primary hover:bg-primary/5",
                    children: "Reset to Defaults"
                  }
                )
              ]
            }
          )
        ] })
      ] })
    }
  );
}
function truncatePrincipal(p) {
  if (p.length <= 20) return p;
  return `${p.slice(0, 12)}...${p.slice(-6)}`;
}
function AdminDashboardPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const navigate = useNavigate();
  const { data: hasAnyAdmin, isLoading: loadingHasAny } = useHasAnyAdmin();
  const { data: isAdmin, isLoading: loadingIsAdmin } = useIsCallerAdmin();
  const { data: adminList, refetch: refetchAdmins } = useListAdmins();
  const registerMutation = useRegisterAsFirstAdmin();
  const addAdminMutation = useAddAdmin();
  const removeAdminMutation = useRemoveAdmin();
  const [newPrincipal, setNewPrincipal] = reactExports.useState("");
  const [principalError, setPrincipalError] = reactExports.useState("");
  const [showSignIn, setShowSignIn] = reactExports.useState(false);
  if (!isAuthenticated) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen flex flex-col items-center justify-center px-4 py-24 bg-sandstone", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center max-w-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-heading text-2xl font-bold text-foreground mb-3", children: "Admin Dashboard" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 mb-6 leading-relaxed", children: "Sign in with Internet Identity to access." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowSignIn(true),
            "data-ocid": "admin.submit_button",
            className: "px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95",
            children: "Sign In"
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
  if (loadingHasAny || loadingIsAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex items-center justify-center bg-sandstone",
        "data-ocid": "admin.loading_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-8 h-8 animate-spin text-primary" })
      }
    );
  }
  if (hasAnyAdmin === false) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen flex flex-col items-center justify-center px-4 py-24 bg-sandstone", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.4 },
        className: "text-center max-w-md",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-heading text-2xl font-bold text-foreground mb-3", children: "Set Up Admin Access" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 mb-6 leading-relaxed", children: "No admin has been registered yet. As the first user, you can register yourself as the site administrator." }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => registerMutation.mutate(),
              disabled: registerMutation.isPending,
              "data-ocid": "admin.primary_button",
              className: "px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 mx-auto",
              children: [
                registerMutation.isPending && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                "Register as Admin"
              ]
            }
          ),
          registerMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-3 text-sm text-destructive",
              "data-ocid": "admin.error_state",
              children: "Registration failed. Please try again."
            }
          )
        ]
      }
    ) });
  }
  if (!isAdmin) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen flex flex-col items-center justify-center px-4 py-24 bg-sandstone",
        "data-ocid": "admin.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "text-center max-w-sm",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-8 h-8 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-heading text-2xl font-bold text-foreground mb-3", children: "Access Denied" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 mb-6 leading-relaxed", children: "You do not have admin privileges for this site." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  onClick: () => navigate({ to: "/" }),
                  "data-ocid": "admin.secondary_button",
                  className: "px-6 py-3 rounded-full border border-primary text-primary bg-transparent font-body font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-primary/5",
                  children: "Go to Home"
                }
              )
            ]
          }
        )
      }
    );
  }
  const handleAddAdmin = async () => {
    setPrincipalError("");
    const trimmed = newPrincipal.trim();
    if (!trimmed) {
      setPrincipalError("Please enter a principal ID.");
      return;
    }
    try {
      const { Principal } = await __vitePreload(async () => {
        const { Principal: Principal2 } = await import("./index-Cm56HytI.js").then((n) => n.a8);
        return { Principal: Principal2 };
      }, true ? __vite__mapDeps([0,1]) : void 0);
      Principal.fromText(trimmed);
      await addAdminMutation.mutateAsync(trimmed);
      setNewPrincipal("");
      refetchAdmins();
    } catch {
      setPrincipalError("Invalid principal ID format.");
    }
  };
  const handleRemoveAdmin = async (principal) => {
    await removeAdminMutation.mutateAsync(principal);
    refetchAdmins();
  };
  const callerPrincipal = (identity == null ? void 0 : identity.getPrincipal().toText()) ?? "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen overflow-x-hidden bg-sandstone", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10 sm:py-14 bg-gradient-to-b from-sandstone to-background/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.45 },
          className: "flex items-center gap-3 mb-1",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-6 h-6 text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm font-semibold tracking-widest uppercase text-primary/70", children: "Actuality Studio — Administration" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.h1,
        {
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.08 },
          className: "font-heading text-3xl sm:text-4xl font-bold text-foreground",
          children: "Admin Dashboard"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          initial: { scaleX: 0, opacity: 0 },
          animate: { scaleX: 1, opacity: 1 },
          transition: { duration: 0.55, delay: 0.25 },
          className: "mt-4 w-20 h-0.5 rounded-full bg-primary/30"
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "pb-16 sm:pb-24 pt-6 bg-background", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-lg font-semibold text-foreground mb-4", children: "Catalog Discount Settings" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdminDiscountSettings, {})
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-lg font-semibold text-foreground mb-1", children: "Admin Access" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 mb-5", children: "Manage who has administrator privileges for Actuality Studio." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "rounded-xl border border-border/30 mb-6 overflow-hidden bg-card",
            "data-ocid": "admin.table",
            children: adminList && adminList.length > 0 ? adminList.map((principal, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `flex items-center justify-between px-4 py-3 ${idx < adminList.length - 1 ? "border-b border-border/20" : ""}`,
                "data-ocid": `admin.item.${idx + 1}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-3.5 h-3.5 text-primary" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          className: "font-body text-sm font-medium text-foreground truncate",
                          title: principal,
                          children: truncatePrincipal(principal)
                        }
                      ),
                      principal === callerPrincipal && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-foreground/50", children: "(you)" })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "button",
                    {
                      type: "button",
                      onClick: () => handleRemoveAdmin(principal),
                      disabled: adminList.length <= 1 || removeAdminMutation.isPending,
                      "data-ocid": `admin.delete_button.${idx + 1}`,
                      className: "flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs font-medium text-primary bg-primary/8 border border-primary/20 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 ml-3 hover:bg-primary/15",
                      title: adminList.length <= 1 ? "Cannot remove the last admin" : "Remove admin",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { className: "w-3.5 h-3.5" }),
                        "Remove"
                      ]
                    }
                  )
                ]
              },
              principal
            )) : /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "px-4 py-6 text-center font-body text-sm text-foreground/50",
                "data-ocid": "admin.empty_state",
                children: "No admins listed."
              }
            )
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border border-border/30 p-5 bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading text-sm font-semibold text-foreground mb-3", children: "Grant Admin Access" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "text",
                value: newPrincipal,
                onChange: (e) => {
                  setNewPrincipal(e.target.value);
                  setPrincipalError("");
                },
                placeholder: "Enter principal ID (e.g. xxxxx-xxxxx-...)",
                "data-ocid": "admin.input",
                className: `flex-1 px-4 py-2.5 rounded-lg font-body text-sm border outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30 bg-background text-foreground ${principalError ? "border-destructive" : "border-border/40"}`
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleAddAdmin,
                disabled: addAdminMutation.isPending || !newPrincipal.trim(),
                "data-ocid": "admin.submit_button",
                className: "flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0",
                children: [
                  addAdminMutation.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "w-4 h-4" }),
                  "Grant Admin"
                ]
              }
            )
          ] }),
          principalError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-2 font-body text-xs text-destructive",
              "data-ocid": "admin.error_state",
              children: principalError
            }
          ),
          addAdminMutation.isError && !principalError && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-2 font-body text-xs text-destructive",
              "data-ocid": "admin.error_state",
              children: "Failed to grant admin access. Please try again."
            }
          ),
          addAdminMutation.isSuccess && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "mt-2 font-body text-xs text-secondary",
              "data-ocid": "admin.success_state",
              children: "Admin access granted successfully."
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-3 font-body text-xs text-foreground/50", children: "⚠ Removing yourself will revoke your own admin access." })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminDashboardPage as default
};
