import { Outlet } from "@tanstack/react-router";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pt-16 sm:pt-18">
        <Outlet />
      </main>
      {/* Decorative vine divider */}
      <div className="w-full overflow-hidden" aria-hidden="true">
        <svg
          viewBox="0 0 1440 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-8 sm:h-10"
          preserveAspectRatio="none"
          role="presentation"
          aria-hidden="true"
        >
          <path
            d="M0 20 Q180 5 360 20 Q540 35 720 20 Q900 5 1080 20 Q1260 35 1440 20"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
            className="text-primary/15"
          />
          <path
            d="M0 28 Q180 13 360 28 Q540 43 720 28 Q900 13 1080 28 Q1260 43 1440 28"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            className="text-secondary/10"
          />
        </svg>
      </div>
      <Footer />
    </div>
  );
}
