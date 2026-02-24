import React from 'react';
import { createRouter, createRoute, createRootRoute, RouterProvider } from '@tanstack/react-router';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useQueries';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import MembershipPage from './pages/MembershipPage';
import ProfileSetupModal from './components/ProfileSetupModal';

// ── Routes ────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: AppShell,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: LandingPage,
});

const membershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/membership',
  component: MembershipPage,
});

const routeTree = rootRoute.addChildren([indexRoute, membershipRoute]);

const router = createRouter({ routeTree });

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// ── App Shell (handles profile setup modal) ───────────────────────────────

function AppShell() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const { data: userProfile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();

  // Show profile setup modal only when:
  // - authenticated
  // - profile query has settled
  // - no profile exists yet
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  return (
    <>
      <Layout />
      <ProfileSetupModal open={showProfileSetup} />
    </>
  );
}

// ── Root App ──────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />;
}
