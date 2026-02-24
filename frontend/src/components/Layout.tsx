import React from 'react';
import { Outlet } from '@tanstack/react-router';
import Header from './Header';
import Footer from './Footer';

// Subtle vine divider SVG used between sections
function VineDivider() {
  return (
    <div className="relative w-full overflow-hidden h-8 pointer-events-none" aria-hidden="true">
      <svg
        viewBox="0 0 1440 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute inset-0 w-full h-full opacity-[0.12]"
        preserveAspectRatio="none"
      >
        {/* Vine line */}
        <path
          d="M0 16 Q120 4, 240 16 Q360 28, 480 16 Q600 4, 720 16 Q840 28, 960 16 Q1080 4, 1200 16 Q1320 28, 1440 16"
          stroke="#4A7043"
          strokeWidth="2"
          fill="none"
        />
        {/* Small leaves along vine */}
        {[120, 360, 600, 840, 1080, 1320].map((x) => (
          <ellipse key={x} cx={x} cy={10} rx="8" ry="5" fill="#A8CABA" transform={`rotate(-20 ${x} 10)`} />
        ))}
        {[240, 480, 720, 960, 1200].map((x) => (
          <ellipse key={x} cx={x} cy={22} rx="7" ry="4" fill="#C46A4E" transform={`rotate(15 ${x} 22)`} />
        ))}
      </svg>
    </div>
  );
}

export default function Layout() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header />
      <main className="flex-1 pt-16">
        <Outlet />
      </main>
      <VineDivider />
      <Footer />
    </div>
  );
}
