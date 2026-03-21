import { Bookmark, CheckCircle, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface SignInOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSignIn?: () => void;
}

export default function SignInOverlay({
  isOpen,
  onClose,
  onSignIn,
}: SignInOverlayProps) {
  const { login } = useInternetIdentity();

  const handleSignIn = () => {
    login();
    onSignIn?.();
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="overlay-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
          data-ocid="signin.modal"
        >
          <motion.div
            key="overlay-card"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="relative w-full max-w-md rounded-2xl shadow-2xl p-7 sm:p-9"
            style={{ backgroundColor: "var(--color-warm-1, #f5e6c8)" }}
          >
            <button
              type="button"
              onClick={onClose}
              data-ocid="signin.close_button"
              className="absolute top-4 right-4 p-1.5 rounded-full text-foreground/50 hover:text-foreground hover:bg-foreground/10 transition-all duration-150"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            <div
              className="flex items-center justify-center w-12 h-12 rounded-full mb-5 mx-auto"
              style={{ backgroundColor: "rgba(192,57,43,0.12)" }}
            >
              <Bookmark
                className="w-6 h-6"
                style={{ color: "var(--color-crimson-lustre, #c0392b)" }}
              />
            </div>

            <h2 className="font-heading text-xl sm:text-2xl font-bold text-foreground text-center mb-2">
              Join to Save &amp; Save More
            </h2>
            <p className="font-body text-sm text-foreground/60 text-center leading-relaxed mb-6">
              Sign in with Internet Identity to save items to your personal
              catalog and unlock exclusive member discounts.
            </p>

            <ul className="space-y-2.5 mb-7">
              {[
                "Save items to your personal storefront",
                "Member Special pricing on all saved items",
                "Exclusive discounts per membership tier",
              ].map((benefit) => (
                <li key={benefit} className="flex items-start gap-2.5">
                  <CheckCircle
                    className="w-4 h-4 mt-0.5 shrink-0"
                    style={{ color: "var(--color-crimson-lustre, #c0392b)" }}
                  />
                  <span className="font-body text-sm text-foreground/70">
                    {benefit}
                  </span>
                </li>
              ))}
            </ul>

            <button
              type="button"
              onClick={handleSignIn}
              data-ocid="signin.submit_button"
              className="w-full py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
            >
              Sign In with Internet Identity
            </button>

            <p className="text-center text-xs text-foreground/40 mt-4 font-body">
              Free to join &middot; No credit card required
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
