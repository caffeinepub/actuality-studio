import React from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import { LogIn, LogOut, Loader2 } from 'lucide-react';

interface LoginButtonProps {
  variant?: 'default' | 'compact';
}

export default function LoginButton({ variant = 'default' }: LoginButtonProps) {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const queryClient = useQueryClient();

  const isAuthenticated = !!identity;
  const isLoggingIn = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: unknown) {
        const err = error as Error;
        if (err?.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleAuth}
        disabled={isLoggingIn}
        className={`
          flex items-center gap-2 px-4 py-2 text-sm font-semibold tracking-wide
          transition-all duration-200 rounded-md border
          ${isAuthenticated
            ? 'border-blush text-forest/70 bg-blush/20 hover:bg-blush/40 hover:text-forest'
            : 'border-terracotta text-terracotta hover:bg-terracotta hover:text-cream'
          }
          disabled:opacity-50 disabled:cursor-not-allowed
        `}
      >
        {isLoggingIn ? (
          <Loader2 className="w-4 h-4 animate-spin" />
        ) : isAuthenticated ? (
          <LogOut className="w-4 h-4" />
        ) : (
          <LogIn className="w-4 h-4" />
        )}
        {isLoggingIn ? 'Connecting...' : isAuthenticated ? 'Log Out' : 'Log In'}
      </button>
    );
  }

  return (
    <button
      onClick={handleAuth}
      disabled={isLoggingIn}
      className={`
        flex items-center gap-2 px-6 py-3 font-semibold tracking-wide
        transition-all duration-200 rounded-md
        ${isAuthenticated
          ? 'bg-blush/30 border border-blush text-forest hover:bg-blush/50'
          : 'btn-primary-warm'
        }
        disabled:opacity-50 disabled:cursor-not-allowed
      `}
    >
      {isLoggingIn ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : isAuthenticated ? (
        <LogOut className="w-4 h-4" />
      ) : (
        <LogIn className="w-4 h-4" />
      )}
      {isLoggingIn ? 'Connecting...' : isAuthenticated ? 'Log Out' : 'Log In'}
    </button>
  );
}
