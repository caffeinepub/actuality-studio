import { useQueryClient } from "@tanstack/react-query";
import { Loader2, LogIn, LogOut } from "lucide-react";
import React from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";

interface LoginButtonProps {
  compact?: boolean;
}

export default function LoginButton({ compact = false }: LoginButtonProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === "logging-in";

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === "User is already authenticated") {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  if (compact) {
    return (
      <button
        type="button"
        onClick={handleAuth}
        disabled={isLoggingIn}
        aria-label={isAuthenticated ? "Logout" : "Login"}
        className={`
          flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-body font-medium
          transition-all duration-200 ease-in-out
          hover:scale-105 active:scale-95
          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
          ${
            isAuthenticated
              ? "bg-blush/20 text-primary hover:bg-blush/30 border border-primary/20"
              : "bg-primary text-primary-foreground hover:bg-primary/90 hover:shadow-md"
          }
        `}
      >
        {isLoggingIn ? (
          <Loader2 className="w-3.5 h-3.5 animate-spin" />
        ) : isAuthenticated ? (
          <LogOut className="w-3.5 h-3.5" />
        ) : (
          <LogIn className="w-3.5 h-3.5" />
        )}
        <span className="hidden sm:inline">
          {isLoggingIn ? "Logging in…" : isAuthenticated ? "Logout" : "Login"}
        </span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleAuth}
      disabled={isLoggingIn}
      className={`
        flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-body font-semibold
        transition-all duration-200 ease-in-out
        hover:scale-105 active:scale-95 hover:shadow-lg
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        ${
          isAuthenticated
            ? "bg-blush/20 text-primary hover:bg-blush/30 border border-primary/20"
            : "bg-primary text-primary-foreground hover:bg-primary/90"
        }
      `}
    >
      {isLoggingIn ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isAuthenticated ? (
        <LogOut className="w-4 h-4" />
      ) : (
        <LogIn className="w-4 h-4" />
      )}
      {isLoggingIn ? "Logging in…" : isAuthenticated ? "Logout" : "Login"}
    </button>
  );
}
