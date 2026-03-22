import { Link, useRouter } from "@tanstack/react-router";
import { Bookmark, Menu, ShieldCheck, X } from "lucide-react";
import React, { useState, useEffect } from "react";
import { useInternetIdentity } from "../hooks/useInternetIdentity";
import { useGetCallerUserProfile } from "../hooks/useQueries";
import LoginButton from "./LoginButton";

type NavItem =
  | { kind: "link"; label: string; to: string; authOnly?: boolean }
  | { kind: "scroll"; label: string; href: string };

const navItems: NavItem[] = [
  { kind: "link", label: "Home", to: "/" },
  { kind: "scroll", label: "About", href: "#about" },
  { kind: "link", label: "Memberships", to: "/membership" },
  { kind: "link", label: "Catalog", to: "/catalog" },
  { kind: "link", label: "My Catalog", to: "/my-catalog", authOnly: true },
  { kind: "link", label: "Admin Login", to: "/admin" },
  { kind: "scroll", label: "Community", href: "#community" },
];

export default function Header() {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;
  const { data: userProfile } = useGetCallerUserProfile();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // biome-ignore lint/correctness/useExhaustiveDependencies: pathname is the intentional trigger
  useEffect(() => {
    setMobileOpen(false);
  }, [router.state.location.pathname]);

  const handleScrollLink = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const visibleNavItems = navItems.filter(
    (item) => !("authOnly" in item && item.authOnly && !isAuthenticated),
  );

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background shadow-warm border-b border-border/40"
          : "bg-background"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          <Link
            to="/"
            className="flex items-center gap-2 shrink-0 transition-opacity duration-200 hover:opacity-80"
          >
            <img
              src="/assets/generated/logo-icon.dim_128x128.png"
              alt="Actuality Studio"
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full object-cover"
              loading="eager"
            />
            <span className="font-heading text-lg sm:text-xl font-bold text-gold leading-tight hidden xs:block sm:block">
              Actuality Studio
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {visibleNavItems.map((item) =>
              item.kind === "link" ? (
                <Link
                  key={item.label}
                  to={item.to}
                  className="flex items-center gap-1.5 px-3 py-2 text-sm font-body font-medium text-foreground/80 hover:text-primary rounded-md transition-all duration-200 hover:bg-primary/5 active:scale-95"
                  activeProps={{ className: "text-primary font-semibold" }}
                  data-ocid={
                    item.label === "Admin Login" ? "admin.link" : undefined
                  }
                >
                  {item.label === "My Catalog" && (
                    <Bookmark className="w-3.5 h-3.5" />
                  )}
                  {item.label === "Admin Login" && (
                    <ShieldCheck className="w-3.5 h-3.5" />
                  )}
                  {item.label}
                </Link>
              ) : (
                <button
                  type="button"
                  key={item.label}
                  onClick={() => handleScrollLink(item.href)}
                  className="px-3 py-2 text-sm font-body font-medium text-foreground/80 hover:text-primary rounded-md transition-all duration-200 hover:bg-primary/5 active:scale-95"
                >
                  {item.label}
                </button>
              ),
            )}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            {isAuthenticated && userProfile && (
              <span className="hidden sm:block text-sm font-body text-foreground/70 truncate max-w-[120px] lg:max-w-[160px]">
                {userProfile.name}
              </span>
            )}
            <LoginButton compact />
            <button
              type="button"
              className="md:hidden p-2 rounded-md text-foreground/70 hover:text-primary hover:bg-primary/5 transition-all duration-200 active:scale-95"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <nav className="bg-background border-t border-border px-4 py-3 flex flex-col gap-1">
          {visibleNavItems.map((item) =>
            item.kind === "link" ? (
              <Link
                key={item.label}
                to={item.to}
                className="flex items-center gap-2 px-3 py-3 text-base font-body font-medium text-foreground/80 hover:text-primary rounded-md transition-all duration-200 hover:bg-primary/5 active:scale-95"
                activeProps={{
                  className: "text-primary font-semibold bg-primary/5",
                }}
                onClick={() => setMobileOpen(false)}
              >
                {item.label === "My Catalog" && (
                  <Bookmark className="w-4 h-4" />
                )}
                {item.label === "Admin Login" && (
                  <ShieldCheck className="w-4 h-4" />
                )}
                {item.label}
              </Link>
            ) : (
              <button
                type="button"
                key={item.label}
                onClick={() => handleScrollLink(item.href)}
                className="px-3 py-3 text-base font-body font-medium text-foreground/80 hover:text-primary rounded-md transition-all duration-200 hover:bg-primary/5 active:scale-95 text-left"
              >
                {item.label}
              </button>
            ),
          )}
          {isAuthenticated && userProfile && (
            <div className="px-3 py-2 text-sm font-body text-foreground/50 border-t border-border mt-1 pt-3">
              Signed in as{" "}
              <span className="text-foreground/70 font-medium">
                {userProfile.name}
              </span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
