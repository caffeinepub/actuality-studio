import { useNavigate } from "@tanstack/react-router";
import { Loader2, ShieldCheck, UserMinus, UserPlus } from "lucide-react";
import { motion } from "motion/react";
import React, { useState } from "react";
import AdminDiscountSettings from "../components/AdminDiscountSettings";
import SignInOverlay from "../components/SignInOverlay";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import {
  useAddAdmin,
  useHasAnyAdmin,
  useIsCallerAdmin,
  useListAdmins,
  useRegisterAsFirstAdmin,
  useRemoveAdmin,
} from "../hooks/useQueries";

function truncatePrincipal(p: string): string {
  if (p.length <= 20) return p;
  return `${p.slice(0, 12)}...${p.slice(-6)}`;
}

export default function AdminDashboardPage() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const navigate = useNavigate();

  const { data: hasAnyAdmin, isLoading: loadingHasAny } = useHasAnyAdmin();
  const { data: isAdmin, isLoading: loadingIsAdmin } = useIsCallerAdmin();
  const { data: adminList, refetch: refetchAdmins } = useListAdmins();

  const registerMutation = useRegisterAsFirstAdmin();
  const addAdminMutation = useAddAdmin();
  const removeAdminMutation = useRemoveAdmin();

  const [newPrincipal, setNewPrincipal] = useState("");
  const [principalError, setPrincipalError] = useState("");
  const [showSignIn, setShowSignIn] = useState(false);

  // State 1 — Not logged in
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24 bg-sandstone">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-3">
            Admin Dashboard
          </h1>
          <p className="font-body text-sm text-foreground/60 mb-6 leading-relaxed">
            Sign in with Internet Identity to access.
          </p>
          <button
            type="button"
            onClick={() => setShowSignIn(true)}
            data-ocid="admin.submit_button"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
          >
            Sign In
          </button>
        </div>
        <SignInOverlay
          isOpen={showSignIn}
          onClose={() => setShowSignIn(false)}
        />
      </div>
    );
  }

  // State 2 — Checking admin status
  if (loadingHasAny || loadingIsAdmin) {
    return (
      <div
        className="min-h-screen flex items-center justify-center bg-sandstone"
        data-ocid="admin.loading_state"
      >
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // State 3 — No admin exists yet
  if (hasAnyAdmin === false) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-24 bg-sandstone">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-md"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-3">
            Set Up Admin Access
          </h1>
          <p className="font-body text-sm text-foreground/60 mb-6 leading-relaxed">
            No admin has been registered yet. As the first user, you can
            register yourself as the site administrator.
          </p>
          <button
            type="button"
            onClick={() => registerMutation.mutate()}
            disabled={registerMutation.isPending}
            data-ocid="admin.primary_button"
            className="px-6 py-3 rounded-full bg-primary text-primary-foreground font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
          >
            {registerMutation.isPending && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            Register as Admin
          </button>
          {registerMutation.isError && (
            <p
              className="mt-3 text-sm text-destructive"
              data-ocid="admin.error_state"
            >
              Registration failed. Please try again.
            </p>
          )}
        </motion.div>
      </div>
    );
  }

  // State 4 — Not an admin
  if (!isAdmin) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-24 bg-sandstone"
        data-ocid="admin.error_state"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-sm"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-5">
            <ShieldCheck className="w-8 h-8 text-primary" />
          </div>
          <h1 className="font-heading text-2xl font-bold text-foreground mb-3">
            Access Denied
          </h1>
          <p className="font-body text-sm text-foreground/60 mb-6 leading-relaxed">
            You do not have admin privileges for this site.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            data-ocid="admin.secondary_button"
            className="px-6 py-3 rounded-full border border-primary text-primary bg-transparent font-body font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 hover:bg-primary/5"
          >
            Go to Home
          </button>
        </motion.div>
      </div>
    );
  }

  // State 5 — Full admin dashboard
  const handleAddAdmin = async () => {
    setPrincipalError("");
    const trimmed = newPrincipal.trim();
    if (!trimmed) {
      setPrincipalError("Please enter a principal ID.");
      return;
    }
    try {
      const { Principal } = await import("@icp-sdk/core/principal");
      Principal.fromText(trimmed); // validate
      await addAdminMutation.mutateAsync(trimmed);
      setNewPrincipal("");
      refetchAdmins();
    } catch {
      setPrincipalError("Invalid principal ID format.");
    }
  };

  const handleRemoveAdmin = async (principal: string) => {
    await removeAdminMutation.mutateAsync(principal);
    refetchAdmins();
  };

  const callerPrincipal = identity?.getPrincipal().toText() ?? "";

  return (
    <div className="min-h-screen overflow-x-hidden bg-sandstone">
      {/* Header */}
      <section className="py-10 sm:py-14 bg-gradient-to-b from-sandstone to-background/60">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-3 mb-1"
          >
            <ShieldCheck className="w-6 h-6 text-primary" />
            <span className="font-body text-sm font-semibold tracking-widest uppercase text-primary/70">
              Actuality Studio — Administration
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-heading text-3xl sm:text-4xl font-bold text-foreground"
          >
            Admin Dashboard
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-4 w-20 h-0.5 rounded-full bg-primary/30"
          />
        </div>
      </section>

      <section className="pb-16 sm:pb-24 pt-6 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section A: Discount Settings */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-4">
              Catalog Discount Settings
            </h2>
            <AdminDiscountSettings />
          </div>

          {/* Section B: Admin Principal Management */}
          <div>
            <h2 className="font-heading text-lg font-semibold text-foreground mb-1">
              Admin Access
            </h2>
            <p className="font-body text-sm text-foreground/60 mb-5">
              Manage who has administrator privileges for Actuality Studio.
            </p>

            {/* Current admins list */}
            <div
              className="rounded-xl border border-border/30 mb-6 overflow-hidden bg-card"
              data-ocid="admin.table"
            >
              {adminList && adminList.length > 0 ? (
                adminList.map((principal, idx) => (
                  <div
                    key={principal}
                    className={`flex items-center justify-between px-4 py-3 ${
                      idx < adminList.length - 1
                        ? "border-b border-border/20"
                        : ""
                    }`}
                    data-ocid={`admin.item.${idx + 1}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-3.5 h-3.5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="font-body text-sm font-medium text-foreground truncate"
                          title={principal}
                        >
                          {truncatePrincipal(principal)}
                        </p>
                        {principal === callerPrincipal && (
                          <span className="font-body text-xs text-foreground/50">
                            (you)
                          </span>
                        )}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveAdmin(principal)}
                      disabled={
                        adminList.length <= 1 || removeAdminMutation.isPending
                      }
                      data-ocid={`admin.delete_button.${idx + 1}`}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs font-medium text-primary bg-primary/8 border border-primary/20 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 ml-3 hover:bg-primary/15"
                      title={
                        adminList.length <= 1
                          ? "Cannot remove the last admin"
                          : "Remove admin"
                      }
                    >
                      <UserMinus className="w-3.5 h-3.5" />
                      Remove
                    </button>
                  </div>
                ))
              ) : (
                <div
                  className="px-4 py-6 text-center font-body text-sm text-foreground/50"
                  data-ocid="admin.empty_state"
                >
                  No admins listed.
                </div>
              )}
            </div>

            {/* Add admin form */}
            <div className="rounded-xl border border-border/30 p-5 bg-card">
              <h3 className="font-heading text-sm font-semibold text-foreground mb-3">
                Grant Admin Access
              </h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <input
                  type="text"
                  value={newPrincipal}
                  onChange={(e) => {
                    setNewPrincipal(e.target.value);
                    setPrincipalError("");
                  }}
                  placeholder="Enter principal ID (e.g. xxxxx-xxxxx-...)"
                  data-ocid="admin.input"
                  className={`flex-1 px-4 py-2.5 rounded-lg font-body text-sm border outline-none transition-all duration-200 focus:ring-2 focus:ring-primary/30 bg-background text-foreground ${
                    principalError ? "border-destructive" : "border-border/40"
                  }`}
                />
                <button
                  type="button"
                  onClick={handleAddAdmin}
                  disabled={addAdminMutation.isPending || !newPrincipal.trim()}
                  data-ocid="admin.submit_button"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground font-body text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                >
                  {addAdminMutation.isPending ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  Grant Admin
                </button>
              </div>
              {principalError && (
                <p
                  className="mt-2 font-body text-xs text-destructive"
                  data-ocid="admin.error_state"
                >
                  {principalError}
                </p>
              )}
              {addAdminMutation.isError && !principalError && (
                <p
                  className="mt-2 font-body text-xs text-destructive"
                  data-ocid="admin.error_state"
                >
                  Failed to grant admin access. Please try again.
                </p>
              )}
              {addAdminMutation.isSuccess && (
                <p
                  className="mt-2 font-body text-xs text-secondary"
                  data-ocid="admin.success_state"
                >
                  Admin access granted successfully.
                </p>
              )}
              <p className="mt-3 font-body text-xs text-foreground/50">
                ⚠ Removing yourself will revoke your own admin access.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
