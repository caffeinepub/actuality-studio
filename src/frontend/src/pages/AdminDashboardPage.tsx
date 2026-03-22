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
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-24"
        style={{ backgroundColor: "#f5e6c8" }}
      >
        <div className="text-center max-w-sm">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "rgba(192,57,43,0.1)" }}
          >
            <ShieldCheck className="w-8 h-8" style={{ color: "#c0392b" }} />
          </div>
          <h1
            className="font-heading text-2xl font-bold mb-3"
            style={{ color: "#2c1a0e" }}
          >
            Admin Dashboard
          </h1>
          <p
            className="font-body text-sm mb-6 leading-relaxed"
            style={{ color: "#7a5c44" }}
          >
            Sign in with Internet Identity to access.
          </p>
          <button
            type="button"
            onClick={() => setShowSignIn(true)}
            data-ocid="admin.submit_button"
            className="px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95"
            style={{ backgroundColor: "#c0392b", color: "#ffffff" }}
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
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "#f5e6c8" }}
        data-ocid="admin.loading_state"
      >
        <Loader2
          className="w-8 h-8 animate-spin"
          style={{ color: "#c0392b" }}
        />
      </div>
    );
  }

  // State 3 — No admin exists yet
  if (hasAnyAdmin === false) {
    return (
      <div
        className="min-h-screen flex flex-col items-center justify-center px-4 py-24"
        style={{ backgroundColor: "#f5e6c8" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-md"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "rgba(192,57,43,0.1)" }}
          >
            <ShieldCheck className="w-8 h-8" style={{ color: "#c0392b" }} />
          </div>
          <h1
            className="font-heading text-2xl font-bold mb-3"
            style={{ color: "#2c1a0e" }}
          >
            Set Up Admin Access
          </h1>
          <p
            className="font-body text-sm mb-6 leading-relaxed"
            style={{ color: "#7a5c44" }}
          >
            No admin has been registered yet. As the first user, you can
            register yourself as the site administrator.
          </p>
          <button
            type="button"
            onClick={() => registerMutation.mutate()}
            disabled={registerMutation.isPending}
            data-ocid="admin.primary_button"
            className="px-6 py-3 rounded-full font-body font-semibold text-sm transition-all duration-200 hover:scale-105 hover:shadow-lg active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2 mx-auto"
            style={{ backgroundColor: "#c0392b", color: "#ffffff" }}
          >
            {registerMutation.isPending && (
              <Loader2 className="w-4 h-4 animate-spin" />
            )}
            Register as Admin
          </button>
          {registerMutation.isError && (
            <p
              className="mt-3 text-sm"
              style={{ color: "#c0392b" }}
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
        className="min-h-screen flex flex-col items-center justify-center px-4 py-24"
        style={{ backgroundColor: "#f5e6c8" }}
        data-ocid="admin.error_state"
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="text-center max-w-sm"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "rgba(192,57,43,0.12)" }}
          >
            <ShieldCheck className="w-8 h-8" style={{ color: "#c0392b" }} />
          </div>
          <h1
            className="font-heading text-2xl font-bold mb-3"
            style={{ color: "#2c1a0e" }}
          >
            Access Denied
          </h1>
          <p
            className="font-body text-sm mb-6 leading-relaxed"
            style={{ color: "#7a5c44" }}
          >
            You do not have admin privileges for this site.
          </p>
          <button
            type="button"
            onClick={() => navigate({ to: "/" })}
            data-ocid="admin.secondary_button"
            className="px-6 py-3 rounded-full font-body font-semibold text-sm border transition-all duration-200 hover:scale-105 active:scale-95"
            style={{
              borderColor: "#c0392b",
              color: "#c0392b",
              backgroundColor: "transparent",
            }}
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
    <div
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#f5e6c8" }}
    >
      {/* Header */}
      <section
        className="py-10 sm:py-14"
        style={{
          background:
            "linear-gradient(to bottom, rgba(245,230,200,0.9), rgba(245,230,200,0.5))",
        }}
      >
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45 }}
            className="flex items-center gap-3 mb-1"
          >
            <ShieldCheck className="w-6 h-6" style={{ color: "#c0392b" }} />
            <span
              className="font-body text-sm font-semibold tracking-widest uppercase"
              style={{ color: "rgba(192,57,43,0.7)" }}
            >
              Actuality Studio — Administration
            </span>
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-heading text-3xl sm:text-4xl font-bold"
            style={{ color: "#2c1a0e" }}
          >
            Admin Dashboard
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.25 }}
            className="mt-4 w-20 h-0.5 rounded-full"
            style={{ backgroundColor: "rgba(192,57,43,0.3)" }}
          />
        </div>
      </section>

      <section className="pb-16 sm:pb-24 pt-6">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Section A: Discount Settings */}
          <div>
            <h2
              className="font-heading text-lg font-semibold mb-4"
              style={{ color: "#2c1a0e" }}
            >
              Catalog Discount Settings
            </h2>
            <AdminDiscountSettings />
          </div>

          {/* Section B: Admin Principal Management */}
          <div>
            <h2
              className="font-heading text-lg font-semibold mb-1"
              style={{ color: "#2c1a0e" }}
            >
              Admin Access
            </h2>
            <p className="font-body text-sm mb-5" style={{ color: "#7a5c44" }}>
              Manage who has administrator privileges for Actuality Studio.
            </p>

            {/* Current admins list */}
            <div
              className="rounded-xl border mb-6 overflow-hidden"
              style={{
                borderColor: "rgba(192,57,43,0.2)",
                backgroundColor: "rgba(245,230,200,0.6)",
              }}
              data-ocid="admin.table"
            >
              {adminList && adminList.length > 0 ? (
                adminList.map((principal, idx) => (
                  <div
                    key={principal}
                    className={`flex items-center justify-between px-4 py-3 ${
                      idx < adminList.length - 1 ? "border-b" : ""
                    }`}
                    style={{ borderColor: "rgba(192,57,43,0.12)" }}
                    data-ocid={`admin.item.${idx + 1}`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center shrink-0"
                        style={{ backgroundColor: "rgba(192,57,43,0.12)" }}
                      >
                        <ShieldCheck
                          className="w-3.5 h-3.5"
                          style={{ color: "#c0392b" }}
                        />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="font-body text-sm font-medium truncate"
                          style={{ color: "#2c1a0e" }}
                          title={principal}
                        >
                          {truncatePrincipal(principal)}
                        </p>
                        {principal === callerPrincipal && (
                          <span
                            className="font-body text-xs"
                            style={{ color: "#7a5c44" }}
                          >
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
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-body text-xs font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed shrink-0 ml-3"
                      style={{
                        backgroundColor: "rgba(192,57,43,0.08)",
                        color: "#c0392b",
                        border: "1px solid rgba(192,57,43,0.2)",
                      }}
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
                  className="px-4 py-6 text-center font-body text-sm"
                  style={{ color: "#7a5c44" }}
                  data-ocid="admin.empty_state"
                >
                  No admins listed.
                </div>
              )}
            </div>

            {/* Add admin form */}
            <div
              className="rounded-xl border p-5"
              style={{
                borderColor: "rgba(192,57,43,0.2)",
                backgroundColor: "rgba(245,230,200,0.4)",
              }}
            >
              <h3
                className="font-heading text-sm font-semibold mb-3"
                style={{ color: "#2c1a0e" }}
              >
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
                  className="flex-1 px-4 py-2.5 rounded-lg font-body text-sm border outline-none transition-all duration-200 focus:ring-2"
                  style={{
                    backgroundColor: "rgba(245,230,200,0.8)",
                    borderColor: principalError
                      ? "#c0392b"
                      : "rgba(192,57,43,0.25)",
                    color: "#2c1a0e",
                  }}
                />
                <button
                  type="button"
                  onClick={handleAddAdmin}
                  disabled={addAdminMutation.isPending || !newPrincipal.trim()}
                  data-ocid="admin.submit_button"
                  className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg font-body text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                  style={{ backgroundColor: "#c0392b", color: "#ffffff" }}
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
                  className="mt-2 font-body text-xs"
                  style={{ color: "#c0392b" }}
                  data-ocid="admin.error_state"
                >
                  {principalError}
                </p>
              )}
              {addAdminMutation.isError && !principalError && (
                <p
                  className="mt-2 font-body text-xs"
                  style={{ color: "#c0392b" }}
                  data-ocid="admin.error_state"
                >
                  Failed to grant admin access. Please try again.
                </p>
              )}
              {addAdminMutation.isSuccess && (
                <p
                  className="mt-2 font-body text-xs"
                  style={{ color: "#5a7a44" }}
                  data-ocid="admin.success_state"
                >
                  Admin access granted successfully.
                </p>
              )}
              <p
                className="mt-3 font-body text-xs"
                style={{ color: "#7a5c44" }}
              >
                ⚠ Removing yourself will revoke your own admin access.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
