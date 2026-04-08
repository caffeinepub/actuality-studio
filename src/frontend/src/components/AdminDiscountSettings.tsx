import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { motion } from "motion/react";
import React, { useState } from "react";
import { toast } from "sonner";
import { DEFAULT_RATES, useDiscountRates } from "../hooks/useDiscountRates";
import type { DiscountRates } from "../hooks/useDiscountRates";

const TIERS: {
  key: keyof DiscountRates;
  label: string;
  description: string;
}[] = [
  { key: "trial", label: "Trial", description: "30-day free trial members" },
  { key: "cohort", label: "Cohort", description: "Standard cohort members" },
  {
    key: "patronPro",
    label: "Patron Pro",
    description: "Premium patron members",
  },
  {
    key: "sponsor",
    label: "Sponsor / Client",
    description: "Sponsor and client accounts",
  },
];

export default function AdminDiscountSettings() {
  const { rates, setRates, resetRates } = useDiscountRates();
  const [draft, setDraft] = useState<DiscountRates>({ ...rates });
  const [saved, setSaved] = useState(false);

  const handleChange = (key: keyof DiscountRates, value: string) => {
    const num = Math.min(100, Math.max(0, Math.round(Number(value) || 0)));
    setDraft((prev) => ({ ...prev, [key]: num }));
  };

  const handleSave = () => {
    setRates(draft);
    setSaved(true);
    toast.success("Discount rates saved successfully");
    setTimeout(() => setSaved(false), 3000);
  };

  const handleReset = () => {
    resetRates();
    setDraft({ ...DEFAULT_RATES });
    toast("Discount rates reset to defaults");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
    >
      <Card className="max-w-2xl border-border/40 shadow-warm bg-card">
        <CardHeader className="pb-4">
          <CardTitle className="font-heading text-xl text-foreground">
            Discount Rates by Membership Tier
          </CardTitle>
          <CardDescription className="font-body text-sm leading-relaxed text-foreground/60">
            Set the automatic discount applied to saved catalog items for each
            member type. Rates are applied as a percentage off the list price.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-5">
          {TIERS.map((tier) => (
            <div
              key={tier.key}
              className="flex items-center justify-between gap-4 p-4 rounded-xl bg-muted/30 transition-colors duration-150"
            >
              <div className="flex-1 min-w-0">
                <Label
                  htmlFor={`discount-${tier.key}`}
                  className="font-body font-semibold text-sm block mb-0.5 text-foreground"
                >
                  {tier.label}
                </Label>
                <p className="font-body text-xs text-foreground/55">
                  {tier.description}
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Input
                  id={`discount-${tier.key}`}
                  type="number"
                  min={0}
                  max={100}
                  value={draft[tier.key]}
                  onChange={(e) => handleChange(tier.key, e.target.value)}
                  data-ocid={`admin.${tier.key}.input`}
                  className="w-20 text-center font-body font-semibold text-sm bg-background border-border/40"
                />
                <span className="font-body text-sm font-medium text-foreground/60">
                  %
                </span>
              </div>
            </div>
          ))}

          <div
            className="flex items-center gap-3 pt-2"
            data-ocid="admin.settings.panel"
          >
            <Button
              onClick={handleSave}
              data-ocid="admin.settings.save_button"
              className="flex-1 bg-primary text-primary-foreground font-body font-semibold transition-all duration-200 hover:scale-[1.02] active:scale-95 hover:bg-primary/90"
            >
              {saved ? "✓ Saved!" : "Save Discount Rates"}
            </Button>
            <Button
              variant="outline"
              onClick={handleReset}
              data-ocid="admin.settings.secondary_button"
              className="font-body font-medium transition-all duration-200 hover:scale-[1.02] active:scale-95 border-primary/30 text-primary hover:bg-primary/5"
            >
              Reset to Defaults
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
