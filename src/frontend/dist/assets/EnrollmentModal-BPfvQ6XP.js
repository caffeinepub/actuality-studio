import { a as createLucideIcon, u as useInternetIdentity, e as useCreateTrialMembership, f as useMintBadge, g as useCreateCohort, r as reactExports, o, j as jsxRuntimeExports, D as Dialog, h as DialogContent, i as DialogHeader, k as DialogTitle, l as DialogDescription, m as LogIn, L as LoaderCircle, n as MemberRole, p as Principal } from "./index-9epJpKfF.js";
import { P as Plus } from "./plus-CPFaGhBX.js";
import { C as CircleCheckBig } from "./circle-check-big-BfvWcJEO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["line", { x1: "12", x2: "12", y1: "8", y2: "12", key: "1pkeuh" }],
  ["line", { x1: "12", x2: "12.01", y1: "16", y2: "16", key: "4dfq90" }]
];
const CircleAlert = createLucideIcon("circle-alert", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ]
];
const Shield = createLucideIcon("shield", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M3 6h18", key: "d0wm0j" }],
  ["path", { d: "M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6", key: "4alrt4" }],
  ["path", { d: "M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2", key: "v07s0e" }],
  ["line", { x1: "10", x2: "10", y1: "11", y2: "17", key: "1uufr5" }],
  ["line", { x1: "14", x2: "14", y1: "11", y2: "17", key: "xtxkd" }]
];
const Trash2 = createLucideIcon("trash-2", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
  ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
];
const Users = createLucideIcon("users", __iconNode);
function validatePrincipal(text) {
  try {
    Principal.fromText(text);
    return true;
  } catch {
    return false;
  }
}
function EnrollmentModal({
  open,
  onClose,
  tierName,
  tierId
}) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";
  const createTrial = useCreateTrialMembership();
  const mintBadge = useMintBadge();
  const createCohort = useCreateCohort();
  const [step, setStep] = reactExports.useState("auth");
  const [cohortMembers, setCohortMembers] = reactExports.useState([]);
  const nextIdRef = o.useRef(0);
  const [mintError, setMintError] = reactExports.useState(null);
  reactExports.useEffect(() => {
    if (isAuthenticated && step === "auth") {
      setStep("minting");
    }
  }, [isAuthenticated, step]);
  reactExports.useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setStep(isAuthenticated ? "minting" : "auth");
        setCohortMembers([]);
        setMintError(null);
      }, 300);
    }
  }, [open, isAuthenticated]);
  const handleLogin = async () => {
    try {
      await login();
    } catch (e) {
      console.error("Login error", e);
    }
  };
  const handleMint = async () => {
    setMintError(null);
    try {
      if (tierId === "trial") {
        await createTrial.mutateAsync();
      } else {
        await mintBadge.mutateAsync();
      }
      setStep("cohort");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("already a member")) {
        setStep("cohort");
      } else {
        setMintError(msg);
      }
    }
  };
  const addCohortMember = () => {
    if (cohortMembers.length >= 12) return;
    const id = nextIdRef.current++;
    setCohortMembers((prev) => [
      ...prev,
      { id, principalText: "", role: MemberRole.family }
    ]);
  };
  const removeCohortMember = (index) => {
    setCohortMembers((prev) => prev.filter((_, i) => i !== index));
  };
  const updateMember = (index, field, value) => {
    setCohortMembers(
      (prev) => prev.map((m, i) => {
        if (i !== index) return m;
        if (field === "principalText") {
          const error = value && !validatePrincipal(value) ? "Invalid principal ID" : void 0;
          return { ...m, principalText: value, error };
        }
        return { ...m, [field]: value };
      })
    );
  };
  const handleCreateCohort = async () => {
    const validMembers = cohortMembers.filter(
      (m) => m.principalText && validatePrincipal(m.principalText)
    );
    const members = validMembers.map((m) => ({
      principal: Principal.fromText(m.principalText),
      role: m.role
    }));
    try {
      if (members.length > 0) {
        await createCohort.mutateAsync(members);
      }
      setStep("success");
    } catch (err) {
      console.error("Cohort creation error", err);
      setStep("success");
    }
  };
  const isMinting = createTrial.isPending || mintBadge.isPending;
  const isCohortPending = createCohort.isPending;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Dialog, { open, onOpenChange: (v) => !v && onClose(), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogContent, { className: "w-[calc(100vw-2rem)] max-w-md sm:max-w-lg mx-auto max-h-[90vh] overflow-y-auto rounded-2xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogTitle, { className: "font-heading text-xl sm:text-2xl text-foreground", children: [
        step === "auth" && "Sign In to Enroll",
        step === "minting" && `Mint Your ${tierName} Badge`,
        step === "cohort" && "Invite Your Cohort",
        step === "success" && "Welcome to Actuality Studio!"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DialogDescription, { className: "font-body text-sm text-foreground/60", children: [
        step === "auth" && "Authenticate with Internet Identity to begin enrollment.",
        step === "minting" && "Your NFT badge will be minted directly on-chain — you are the sole owner, no custodian.",
        step === "cohort" && "Optionally invite up to 12 cohort members by their principal ID.",
        step === "success" && "Your membership is active and your badge is on-chain."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 space-y-4", children: [
      step === "auth" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6 sm:py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-8 h-8 sm:w-10 sm:h-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/70 mb-6 max-w-xs mx-auto", children: "Use Internet Identity to securely authenticate. Your principal becomes the direct NFT owner — no intermediaries." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleLogin,
            disabled: isLoggingIn,
            className: "\n                  w-full sm:w-auto px-8 py-3.5\n                  bg-primary text-primary-foreground\n                  font-body font-semibold text-base rounded-full\n                  transition-all duration-200 ease-in-out\n                  hover:scale-105 hover:shadow-lg active:scale-95\n                  disabled:opacity-50 disabled:hover:scale-100\n                  flex items-center justify-center gap-2 mx-auto\n                ",
            children: isLoggingIn ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              "Authenticating…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogIn, { className: "w-4 h-4" }),
              "Login with Internet Identity"
            ] })
          }
        )
      ] }),
      step === "minting" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-4 sm:py-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-8 h-8 sm:w-10 sm:h-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-primary/5 rounded-xl p-4 mb-5 text-left space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs sm:text-sm text-foreground/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Tier:" }),
            " ",
            tierName
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs sm:text-sm text-foreground/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Owner:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs break-all", children: identity == null ? void 0 : identity.getPrincipal().toString() })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-xs sm:text-sm text-foreground/70", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground", children: "Custodian:" }),
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-secondary font-semibold", children: "None — direct on-chain ownership" })
          ] })
        ] }),
        mintError && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-4 text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4 text-destructive shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs text-destructive", children: mintError })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleMint,
            disabled: isMinting,
            className: "\n                  w-full px-6 py-3.5\n                  bg-primary text-primary-foreground\n                  font-body font-semibold text-base rounded-full\n                  transition-all duration-200 ease-in-out\n                  hover:scale-105 hover:shadow-lg active:scale-95\n                  disabled:opacity-50 disabled:hover:scale-100\n                  flex items-center justify-center gap-2\n                ",
            children: isMinting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
              "Minting on-chain…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "w-4 h-4" }),
              "Mint Badge NFT"
            ] })
          }
        )
      ] }),
      step === "cohort" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-foreground/70", children: [
            cohortMembers.length,
            "/12 members added"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: addCohortMember,
              disabled: cohortMembers.length >= 12,
              className: "\n                    flex items-center gap-1.5 px-3 py-1.5\n                    bg-secondary/20 text-secondary\n                    font-body font-medium text-xs rounded-full\n                    transition-all duration-200 ease-in-out\n                    hover:scale-105 hover:bg-secondary/30 active:scale-95\n                    disabled:opacity-40 disabled:hover:scale-100\n                  ",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "w-3.5 h-3.5" }),
                "Add Member"
              ]
            }
          )
        ] }),
        cohortMembers.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6 bg-muted/30 rounded-xl", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-8 h-8 text-foreground/30 mx-auto mb-2" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/50", children: "No cohort members yet. Add up to 12." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-3 max-h-48 sm:max-h-64 overflow-y-auto pr-1", children: cohortMembers.map((member, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "bg-muted/20 rounded-xl p-3 space-y-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "input",
                  {
                    type: "text",
                    placeholder: "Principal ID (e.g. aaaaa-aa)",
                    value: member.principalText,
                    onChange: (e) => updateMember(i, "principalText", e.target.value),
                    className: "\n                          flex-1 min-w-0 px-3 py-2 text-xs font-mono\n                          bg-background border border-border/40 rounded-lg\n                          focus:outline-none focus:ring-2 focus:ring-primary/30\n                          placeholder:text-foreground/30\n                        "
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => removeCohortMember(i),
                    className: "\n                          p-2 text-foreground/40 hover:text-destructive\n                          rounded-lg transition-all duration-200 hover:bg-destructive/10\n                          active:scale-95 shrink-0\n                        ",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "w-4 h-4" })
                  }
                )
              ] }),
              member.error && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-destructive font-body", children: member.error }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "select",
                {
                  value: member.role,
                  onChange: (e) => updateMember(i, "role", e.target.value),
                  className: "\n                        w-full px-3 py-2 text-xs font-body\n                        bg-background border border-border/40 rounded-lg\n                        focus:outline-none focus:ring-2 focus:ring-primary/30\n                      ",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: MemberRole.family, children: "Family" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: MemberRole.friend, children: "Friend" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: MemberRole.professional, children: "Professional" })
                  ]
                }
              )
            ]
          },
          member.id
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 pt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setStep("success"),
              className: "\n                    flex-1 px-5 py-3\n                    bg-muted/40 text-foreground/70\n                    font-body font-medium text-sm rounded-full\n                    transition-all duration-200 ease-in-out\n                    hover:scale-105 hover:bg-muted/60 active:scale-95\n                  ",
              children: "Skip for Now"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: handleCreateCohort,
              disabled: isCohortPending,
              className: "\n                    flex-1 flex items-center justify-center gap-2 px-5 py-3\n                    bg-primary text-primary-foreground\n                    font-body font-semibold text-sm rounded-full\n                    transition-all duration-200 ease-in-out\n                    hover:scale-105 hover:shadow-md active:scale-95\n                    disabled:opacity-50 disabled:hover:scale-100\n                  ",
              children: isCohortPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "w-4 h-4 animate-spin" }),
                "Saving…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "w-4 h-4" }),
                "Save Cohort"
              ] })
            }
          )
        ] })
      ] }),
      step === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-6 sm:py-8", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 sm:mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-8 h-8 sm:w-10 sm:h-10 text-secondary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-heading text-lg sm:text-xl font-bold text-foreground mb-2", children: "You're In!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-body text-sm text-foreground/70 mb-6 max-w-xs mx-auto", children: [
          "Your ",
          tierName,
          " membership badge is minted on-chain. You are the direct owner — no custodian, no intermediary."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-secondary/10 rounded-xl p-4 mb-6 text-left space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-xs font-semibold text-secondary uppercase tracking-wide mb-2", children: "Unlocked Features" }),
          [
            "Catalog Preview",
            "Community Examples Access",
            "Cohort Collaboration Tools",
            "On-Chain Badge NFT"
          ].map((feature) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "w-3.5 h-3.5 text-secondary shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-xs text-foreground/70", children: feature })
          ] }, feature))
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: onClose,
            className: "\n                  w-full px-6 py-3.5\n                  bg-primary text-primary-foreground\n                  font-body font-semibold text-base rounded-full\n                  transition-all duration-200 ease-in-out\n                  hover:scale-105 hover:shadow-lg active:scale-95\n                ",
            children: "Start Exploring"
          }
        )
      ] })
    ] })
  ] }) });
}
export {
  EnrollmentModal as E,
  Shield as S,
  Trash2 as T
};
