import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Principal } from "@dfinity/principal";
import {
  AlertCircle,
  CheckCircle,
  Loader2,
  LogIn,
  Plus,
  Shield,
  Trash2,
  Users,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { MemberRole } from "../backend";
import type { CohortMember } from "../backend";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useCreateCohort,
  useCreateTrialMembership,
  useMintBadge,
} from "../hooks/useQueries";

interface EnrollmentModalProps {
  open: boolean;
  onClose: () => void;
  tierName: string;
  tierId: string;
}

type Step = "auth" | "minting" | "cohort" | "success";

interface CohortMemberInput {
  id: number;
  principalText: string;
  role: MemberRole;
  error?: string;
}

function validatePrincipal(text: string): boolean {
  try {
    Principal.fromText(text);
    return true;
  } catch {
    return false;
  }
}

export default function EnrollmentModal({
  open,
  onClose,
  tierName,
  tierId,
}: EnrollmentModalProps) {
  const { identity, login, loginStatus } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const createTrial = useCreateTrialMembership();
  const mintBadge = useMintBadge();
  const createCohort = useCreateCohort();

  const [step, setStep] = useState<Step>("auth");
  const [cohortMembers, setCohortMembers] = useState<CohortMemberInput[]>([]);
  const nextIdRef = React.useRef(0);
  const [mintError, setMintError] = useState<string | null>(null);

  // Advance to minting step once authenticated
  useEffect(() => {
    if (isAuthenticated && step === "auth") {
      setStep("minting");
    }
  }, [isAuthenticated, step]);

  // Reset on close
  useEffect(() => {
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

  // Direct on-chain mint — no custodian, caller is owner
  const handleMint = async () => {
    setMintError(null);
    try {
      if (tierId === "trial") {
        await createTrial.mutateAsync();
      } else {
        await mintBadge.mutateAsync();
      }
      setStep("cohort");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes("already a member")) {
        // Already enrolled — skip to cohort
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
      { id, principalText: "", role: MemberRole.family },
    ]);
  };

  const removeCohortMember = (index: number) => {
    setCohortMembers((prev) => prev.filter((_, i) => i !== index));
  };

  const updateMember = (
    index: number,
    field: keyof CohortMemberInput,
    value: string,
  ) => {
    setCohortMembers((prev) =>
      prev.map((m, i) => {
        if (i !== index) return m;
        if (field === "principalText") {
          const error =
            value && !validatePrincipal(value)
              ? "Invalid principal ID"
              : undefined;
          return { ...m, principalText: value, error };
        }
        return { ...m, [field]: value as MemberRole };
      }),
    );
  };

  const handleCreateCohort = async () => {
    const validMembers = cohortMembers.filter(
      (m) => m.principalText && validatePrincipal(m.principalText),
    );
    const members: CohortMember[] = validMembers.map((m) => ({
      principal: Principal.fromText(m.principalText),
      role: m.role,
    }));
    try {
      if (members.length > 0) {
        await createCohort.mutateAsync(members);
      }
      setStep("success");
    } catch (err) {
      console.error("Cohort creation error", err);
      setStep("success"); // Still advance on error
    }
  };

  const isMinting = createTrial.isPending || mintBadge.isPending;
  const isCohortPending = createCohort.isPending;

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="w-[calc(100vw-2rem)] max-w-md sm:max-w-lg mx-auto max-h-[90vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl sm:text-2xl text-foreground">
            {step === "auth" && "Sign In to Enroll"}
            {step === "minting" && `Mint Your ${tierName} Badge`}
            {step === "cohort" && "Invite Your Cohort"}
            {step === "success" && "Welcome to Actuality Studio!"}
          </DialogTitle>
          <DialogDescription className="font-body text-sm text-foreground/60">
            {step === "auth" &&
              "Authenticate with Internet Identity to begin enrollment."}
            {step === "minting" &&
              "Your NFT badge will be minted directly on-chain — you are the sole owner, no custodian."}
            {step === "cohort" &&
              "Optionally invite up to 12 cohort members by their principal ID."}
            {step === "success" &&
              "Your membership is active and your badge is on-chain."}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4 space-y-4">
          {/* AUTH STEP */}
          {step === "auth" && (
            <div className="text-center py-6 sm:py-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <LogIn className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <p className="font-body text-sm text-foreground/70 mb-6 max-w-xs mx-auto">
                Use Internet Identity to securely authenticate. Your principal
                becomes the direct NFT owner — no intermediaries.
              </p>
              <button
                type="button"
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="
                  w-full sm:w-auto px-8 py-3.5
                  bg-primary text-primary-foreground
                  font-body font-semibold text-base rounded-full
                  transition-all duration-200 ease-in-out
                  hover:scale-105 hover:shadow-lg active:scale-95
                  disabled:opacity-50 disabled:hover:scale-100
                  flex items-center justify-center gap-2 mx-auto
                "
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Authenticating…
                  </>
                ) : (
                  <>
                    <LogIn className="w-4 h-4" />
                    Login with Internet Identity
                  </>
                )}
              </button>
            </div>
          )}

          {/* MINTING STEP */}
          {step === "minting" && (
            <div className="text-center py-4 sm:py-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-primary" />
              </div>
              <div className="bg-primary/5 rounded-xl p-4 mb-5 text-left space-y-2">
                <p className="font-body text-xs sm:text-sm text-foreground/70">
                  <span className="font-semibold text-foreground">Tier:</span>{" "}
                  {tierName}
                </p>
                <p className="font-body text-xs sm:text-sm text-foreground/70">
                  <span className="font-semibold text-foreground">Owner:</span>{" "}
                  <span className="font-mono text-xs break-all">
                    {identity?.getPrincipal().toString()}
                  </span>
                </p>
                <p className="font-body text-xs sm:text-sm text-foreground/70">
                  <span className="font-semibold text-foreground">
                    Custodian:
                  </span>{" "}
                  <span className="text-secondary font-semibold">
                    None — direct on-chain ownership
                  </span>
                </p>
              </div>

              {mintError && (
                <div className="flex items-start gap-2 bg-destructive/10 border border-destructive/20 rounded-xl p-3 mb-4 text-left">
                  <AlertCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <p className="font-body text-xs text-destructive">
                    {mintError}
                  </p>
                </div>
              )}

              <button
                type="button"
                onClick={handleMint}
                disabled={isMinting}
                className="
                  w-full px-6 py-3.5
                  bg-primary text-primary-foreground
                  font-body font-semibold text-base rounded-full
                  transition-all duration-200 ease-in-out
                  hover:scale-105 hover:shadow-lg active:scale-95
                  disabled:opacity-50 disabled:hover:scale-100
                  flex items-center justify-center gap-2
                "
              >
                {isMinting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Minting on-chain…
                  </>
                ) : (
                  <>
                    <Shield className="w-4 h-4" />
                    Mint Badge NFT
                  </>
                )}
              </button>
            </div>
          )}

          {/* COHORT STEP */}
          {step === "cohort" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-body text-sm text-foreground/70">
                  {cohortMembers.length}/12 members added
                </p>
                <button
                  type="button"
                  onClick={addCohortMember}
                  disabled={cohortMembers.length >= 12}
                  className="
                    flex items-center gap-1.5 px-3 py-1.5
                    bg-secondary/20 text-secondary
                    font-body font-medium text-xs rounded-full
                    transition-all duration-200 ease-in-out
                    hover:scale-105 hover:bg-secondary/30 active:scale-95
                    disabled:opacity-40 disabled:hover:scale-100
                  "
                >
                  <Plus className="w-3.5 h-3.5" />
                  Add Member
                </button>
              </div>

              {cohortMembers.length === 0 && (
                <div className="text-center py-6 bg-muted/30 rounded-xl">
                  <Users className="w-8 h-8 text-foreground/30 mx-auto mb-2" />
                  <p className="font-body text-sm text-foreground/50">
                    No cohort members yet. Add up to 12.
                  </p>
                </div>
              )}

              <div className="space-y-3 max-h-48 sm:max-h-64 overflow-y-auto pr-1">
                {cohortMembers.map((member, i) => (
                  <div
                    key={member.id}
                    className="bg-muted/20 rounded-xl p-3 space-y-2"
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Principal ID (e.g. aaaaa-aa)"
                        value={member.principalText}
                        onChange={(e) =>
                          updateMember(i, "principalText", e.target.value)
                        }
                        className="
                          flex-1 min-w-0 px-3 py-2 text-xs font-mono
                          bg-background border border-border/40 rounded-lg
                          focus:outline-none focus:ring-2 focus:ring-primary/30
                          placeholder:text-foreground/30
                        "
                      />
                      <button
                        type="button"
                        onClick={() => removeCohortMember(i)}
                        className="
                          p-2 text-foreground/40 hover:text-destructive
                          rounded-lg transition-all duration-200 hover:bg-destructive/10
                          active:scale-95 shrink-0
                        "
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    {member.error && (
                      <p className="text-xs text-destructive font-body">
                        {member.error}
                      </p>
                    )}
                    <select
                      value={member.role}
                      onChange={(e) => updateMember(i, "role", e.target.value)}
                      className="
                        w-full px-3 py-2 text-xs font-body
                        bg-background border border-border/40 rounded-lg
                        focus:outline-none focus:ring-2 focus:ring-primary/30
                      "
                    >
                      <option value={MemberRole.family}>Family</option>
                      <option value={MemberRole.friend}>Friend</option>
                      <option value={MemberRole.professional}>
                        Professional
                      </option>
                    </select>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStep("success")}
                  className="
                    flex-1 px-5 py-3
                    bg-muted/40 text-foreground/70
                    font-body font-medium text-sm rounded-full
                    transition-all duration-200 ease-in-out
                    hover:scale-105 hover:bg-muted/60 active:scale-95
                  "
                >
                  Skip for Now
                </button>
                <button
                  type="button"
                  onClick={handleCreateCohort}
                  disabled={isCohortPending}
                  className="
                    flex-1 flex items-center justify-center gap-2 px-5 py-3
                    bg-primary text-primary-foreground
                    font-body font-semibold text-sm rounded-full
                    transition-all duration-200 ease-in-out
                    hover:scale-105 hover:shadow-md active:scale-95
                    disabled:opacity-50 disabled:hover:scale-100
                  "
                >
                  {isCohortPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving…
                    </>
                  ) : (
                    <>
                      <Users className="w-4 h-4" />
                      Save Cohort
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* SUCCESS STEP */}
          {step === "success" && (
            <div className="text-center py-6 sm:py-8">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <CheckCircle className="w-8 h-8 sm:w-10 sm:h-10 text-secondary" />
              </div>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-foreground mb-2">
                You're In!
              </h3>
              <p className="font-body text-sm text-foreground/70 mb-6 max-w-xs mx-auto">
                Your {tierName} membership badge is minted on-chain. You are the
                direct owner — no custodian, no intermediary.
              </p>
              <div className="bg-secondary/10 rounded-xl p-4 mb-6 text-left space-y-1.5">
                <p className="font-body text-xs font-semibold text-secondary uppercase tracking-wide mb-2">
                  Unlocked Features
                </p>
                {[
                  "Sovereign Catalog Preview",
                  "Community Examples Access",
                  "Cohort Collaboration Tools",
                  "On-Chain Badge NFT",
                ].map((feature) => (
                  <div key={feature} className="flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-secondary shrink-0" />
                    <span className="font-body text-xs text-foreground/70">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={onClose}
                className="
                  w-full px-6 py-3.5
                  bg-primary text-primary-foreground
                  font-body font-semibold text-base rounded-full
                  transition-all duration-200 ease-in-out
                  hover:scale-105 hover:shadow-lg active:scale-95
                "
              >
                Start Exploring
              </button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
