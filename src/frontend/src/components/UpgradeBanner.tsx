import { Link } from "@tanstack/react-router";
import { AlertTriangle, Clock, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useTrialStatus } from "../hooks/useQueries";

const DISMISS_KEY = "upgrade-banner-dismissed";

export default function UpgradeBanner() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const trialStatus = useTrialStatus();
  const [dismissed, setDismissed] = useState(() => {
    try {
      return sessionStorage.getItem(DISMISS_KEY) === "true";
    } catch {
      return false;
    }
  });

  const shouldShow =
    isAuthenticated &&
    trialStatus.isTrial &&
    (trialStatus.isExpired || trialStatus.isWarning) &&
    !dismissed;

  const handleDismiss = () => {
    setDismissed(true);
    try {
      sessionStorage.setItem(DISMISS_KEY, "true");
    } catch {
      // ignore
    }
  };

  if (!shouldShow) return null;

  return (
    <div
      className={`
        w-full px-4 py-2.5 sm:py-3
        flex flex-wrap sm:flex-nowrap items-center justify-between gap-2
        text-sm font-body
        ${trialStatus.isExpired ? "bg-destructive text-destructive-foreground" : "bg-gold/90 text-forest"}
      `}
    >
      <div className="flex items-center gap-2 min-w-0">
        {trialStatus.isExpired ? (
          <AlertTriangle className="w-4 h-4 shrink-0" />
        ) : (
          <Clock className="w-4 h-4 shrink-0" />
        )}
        <span className="truncate text-xs sm:text-sm">
          {trialStatus.isExpired
            ? "Your trial has expired. Upgrade to continue accessing the catalog."
            : `Trial expires in ${trialStatus.daysRemaining} day${trialStatus.daysRemaining !== 1 ? "s" : ""} — upgrade to keep full access.`}
        </span>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <Link
          to="/membership"
          className="
            px-3 py-1.5 sm:px-4 sm:py-2
            bg-primary text-primary-foreground
            font-semibold text-xs sm:text-sm rounded-full
            transition-all duration-200 ease-in-out
            hover:scale-105 hover:shadow-md active:scale-95
          "
        >
          Upgrade Now
        </Link>
        {!trialStatus.isExpired && (
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss banner"
            className="
              p-1.5 rounded-full
              hover:bg-forest/10 transition-all duration-200
              hover:scale-110 active:scale-95
            "
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
