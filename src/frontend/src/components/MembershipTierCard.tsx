import { Check, Clock, Loader2 } from "lucide-react";
import React from "react";

type AccentColor = "sage" | "blush" | "terracotta" | "gold" | "forest";

interface MembershipTierCardProps {
  name: string;
  price: string;
  priceNote?: string;
  features: string[];
  buttonLabel: string;
  accentColor?: AccentColor;
  bgWash?: string;
  featured?: boolean;
  comingSoon?: boolean;
  loading?: boolean;
  onEnroll?: () => void;
}

const accentMap: Record<
  AccentColor,
  { border: string; badge: string; btn: string; check: string; accent: string }
> = {
  sage: {
    border: "border-border/40",
    badge: "bg-secondary text-foreground/70 border border-border/40",
    btn: "bg-secondary text-foreground hover:bg-muted",
    check: "text-forest",
    accent: "oklch(0.646 0.222 41.116)",
  },
  blush: {
    border: "border-blush/40",
    badge: "bg-blush/15 text-primary",
    btn: "bg-blush text-primary hover:bg-blush/90",
    check: "text-primary",
    accent: "oklch(0.6 0.118 184.704)",
  },
  terracotta: {
    border: "border-primary/40",
    badge: "bg-primary/15 text-primary",
    btn: "bg-primary text-primary-foreground hover:bg-primary/90",
    check: "text-primary",
    accent: "oklch(0.6 0.118 184.704)",
  },
  gold: {
    border: "border-gold/40",
    badge: "bg-gold/15 text-gold",
    btn: "bg-gold text-forest hover:bg-gold/90",
    check: "text-gold",
    accent: "oklch(0.828 0.189 84.429)",
  },
  forest: {
    border: "border-forest/40",
    badge: "bg-forest/15 text-forest",
    btn: "bg-forest text-cream hover:bg-forest/90",
    check: "text-forest",
    accent: "oklch(0.398 0.07 227.392)",
  },
};

export default function MembershipTierCard({
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
  onEnroll,
}: MembershipTierCardProps) {
  const accent = accentMap[accentColor];
  const washColor = bgWash ?? accent.accent;

  return (
    <div
      className={`
        relative rounded-2xl border shadow-warm
        flex flex-col h-full isolate overflow-hidden
        transition-all duration-300 hover:-translate-y-1 hover:shadow-lg
        ${featured ? `${accent.border} border-2` : "border-border/30"}
      `}
      style={{ background: "oklch(var(--background))" }}
    >
      {/* Accent wash layer */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: washColor,
          opacity: 0.13,
          zIndex: 0,
          pointerEvents: "none",
          borderRadius: "inherit",
        }}
      />

      {featured && (
        <div
          className="absolute -top-3 left-1/2 -translate-x-1/2"
          style={{ zIndex: 2 }}
        >
          <span
            className={`text-xs font-body font-semibold px-3 py-1 rounded-full border ${accent.badge}`}
          >
            Most Popular
          </span>
        </div>
      )}

      <div
        className="p-5 sm:p-6 lg:p-7 flex flex-col flex-1"
        style={{ position: "relative", zIndex: 1 }}
      >
        {/* Header */}
        <div className="mb-5 sm:mb-6">
          <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-1">
            {name}
          </h3>
          <div className="flex items-baseline gap-1.5">
            <span className="font-heading text-3xl sm:text-4xl font-bold text-foreground">
              {price}
            </span>
            {priceNote && (
              <span className="font-body text-sm text-foreground/50">
                {priceNote}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        <ul className="space-y-2.5 sm:space-y-3 mb-6 sm:mb-8 flex-1">
          {features.map((feature) => (
            <li key={feature} className="flex items-start gap-2.5">
              <Check className={`w-4 h-4 mt-0.5 shrink-0 ${accent.check}`} />
              <span className="font-body text-sm text-foreground/75 leading-snug">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA */}
        {comingSoon ? (
          <button
            type="button"
            disabled
            className="w-full py-3 rounded-xl font-body font-semibold text-sm flex items-center justify-center gap-2 bg-muted text-muted-foreground cursor-not-allowed opacity-70"
          >
            <Clock className="w-4 h-4" />
            Coming Soon
          </button>
        ) : (
          <button
            type="button"
            onClick={onEnroll}
            disabled={loading}
            className={`
              w-full py-3 rounded-xl font-body font-semibold text-sm
              flex items-center justify-center gap-2
              transition-all duration-200 ease-in-out
              hover:scale-[1.02] active:scale-[0.98]
              disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
              ${accent.btn}
            `}
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Processing…
              </>
            ) : (
              buttonLabel
            )}
          </button>
        )}
      </div>
    </div>
  );
}
