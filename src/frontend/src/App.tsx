import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { ThemeProvider } from "next-themes";
import React, { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import ProfileSetupModal from "./components/ProfileSetupModal";
import UpgradeBanner from "./components/UpgradeBanner";
import { useInternetIdentity } from "./hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "./hooks/useQueries";

const LandingPage = lazy(() => import("./pages/LandingPage"));
const MembershipPage = lazy(() => import("./pages/MembershipPage"));
const CatalogPage = lazy(() => import("./pages/CatalogPage"));
const MyCatalogPage = lazy(() => import("./pages/MyCatalogPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, retry: 1 },
  },
});

function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <p className="text-sm text-muted-foreground font-body">Loading…</p>
      </div>
    </div>
  );
}

function AppShell() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();
  const showProfileSetup =
    isAuthenticated && !profileLoading && isFetched && userProfile === null;
  return (
    <>
      {isAuthenticated && <UpgradeBanner />}
      <Layout />
      {showProfileSetup && <ProfileSetupModal />}
    </>
  );
}

const rootRoute = createRootRoute({ component: AppShell });

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <LandingPage />
    </Suspense>
  ),
});

const membershipRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/membership",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MembershipPage />
    </Suspense>
  ),
});

const catalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/catalog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <CatalogPage />
    </Suspense>
  ),
});

const myCatalogRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/my-catalog",
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <MyCatalogPage />
    </Suspense>
  ),
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  membershipRoute,
  catalogRoute,
  myCatalogRoute,
]);
const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ThemeProvider>
  );
}
