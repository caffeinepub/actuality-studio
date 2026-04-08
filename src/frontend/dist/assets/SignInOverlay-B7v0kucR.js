import { u as useInternetIdentity, j as jsxRuntimeExports, X, B as Bookmark } from "./index-Cm56HytI.js";
import { A as AnimatePresence, m as motion } from "./proxy-eYbHhNop.js";
import { C as CircleCheckBig } from "./circle-check-big-DMJvcDjl.js";
function SignInOverlay({
  isOpen,
  onClose,
  onSignIn
}) {
  const { login } = useInternetIdentity();
  const handleSignIn = () => {
    login();
    onSignIn == null ? void 0 : onSignIn();
    onClose();
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
    motion.div,
    {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
      transition: { duration: 0.2 },
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      style: { backgroundColor: "rgba(0,0,0,0.6)" },
      onClick: (e) => {
        if (e.target === e.currentTarget) onClose();
      },
      "data-ocid": "signin.modal",
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.94, y: 24 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.94, y: 24 },
          transition: { duration: 0.28, ease: "easeOut" },
          className: "relative w-full max-w-md rounded-2xl shadow-2xl p-7 sm:p-9",
          style: { backgroundColor: "var(--color-warm-1, #f5e6c8)" },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: onClose,
                "data-ocid": "signin.close_button",
                className: "absolute top-4 right-4 p-1.5 rounded-full text-foreground/50 hover:text-foreground hover:bg-foreground/10 transition-all duration-150",
                "aria-label": "Close",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "w-4 h-4" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "flex items-center justify-center w-12 h-12 rounded-full mb-5 mx-auto",
                style: { backgroundColor: "rgba(192,57,43,0.12)" },
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Bookmark,
                  {
                    className: "w-6 h-6",
                    style: { color: "var(--color-crimson-lustre, #c0392b)" }
                  }
                )
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-heading text-xl sm:text-2xl font-bold text-foreground text-center mb-2", children: "Join to Save & Save More" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-body text-sm text-foreground/60 text-center leading-relaxed mb-6", children: "Sign in with Internet Identity to save items to your personal catalog and unlock exclusive member discounts." }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "space-y-2.5 mb-7", children: [
              "Save items to your personal storefront",
              "Member Special pricing on all saved items",
              "Exclusive discounts per membership tier"
            ].map((benefit) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                CircleCheckBig,
                {
                  className: "w-4 h-4 mt-0.5 shrink-0",
                  style: { color: "var(--color-crimson-lustre, #c0392b)" }
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-body text-sm text-foreground/70", children: benefit })
            ] }, benefit)) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: handleSignIn,
                "data-ocid": "signin.submit_button",
                className: "w-full py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95",
                children: "Sign In with Internet Identity"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-foreground/40 mt-4 font-body", children: "Free to join · No credit card required" })
          ]
        },
        "overlay-card"
      )
    },
    "overlay-backdrop"
  ) });
}
export {
  SignInOverlay as S
};
