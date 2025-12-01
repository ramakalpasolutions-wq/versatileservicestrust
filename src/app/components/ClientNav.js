"use client";

import React, { useState } from "react";

export default function ClientNav() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className="relative backdrop-blur-sm bg-black/50 shadow-md px-4 sm:px-6 py-3 
                 flex items-center justify-between"
      aria-label="Main navigation"
      style={{ zIndex: 9998 }}
    >
      {/* LEFT SECTION — LOGO ONLY */}
      <div className="flex items-center gap-3">
        <img
          src="/logo.webp"
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-md"
          alt="Logo"
        />

        <a
          href="/"
          className="text-lg sm:text-xl font-semibold text-blue-700 hidden sm:inline-block"
        >
          Versatile Services Trust
        </a>
      </div>

      {/* RIGHT SECTION — DESKTOP NAV */}
      <div className="hidden lg:flex items-center space-x-6 text-white">
        <a href="/" className="hover:text-blue-400 transition">Home</a>
        <a href="/about" className="hover:text-blue-400 transition">About</a>
        <a href="/biodata" className="hover:text-blue-400 transition">Biodata</a>
        <a href="/gallery" className="hover:text-blue-400 transition">Gallery</a>
        <a href="/contact" className="hover:text-blue-400 transition">Contact</a>

        <a
          href="/donate"
          className="donate-btn ml-2 inline-flex items-center gap-2 text-black bg-red-500 
                     px-4 py-2 rounded-full shadow-lg hover:scale-105 transition"
        >
          Donate
        </a>
      </div>

      {/* RIGHT SIDE — HAMBURGER ICON (MOBILE ONLY) */}
      <button
        className="lg:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/30"
        aria-label="Toggle menu"
        aria-expanded={mobileOpen}
        onClick={() => setMobileOpen((s) => !s)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-9 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              mobileOpen
                ? "M6 18L18 6M6 6l12 12"
                : "M4 6h16M4 12h16M4 18h16"
            }
          />
        </svg>
      </button>

      {/* MOBILE DROPDOWN MENU */}
      <div
        className={`absolute top-full mt-2 right-4 w-full sm:w-56 max-w-[95vw] 
                    rounded-lg p-3 shadow-lg lg:hidden origin-top-right
                    transition-all duration-200 ease-out`}
        style={{
          zIndex: mobileOpen ? 9999 : 9997,
          backgroundColor: "rgba(0,0,0,0.9)",
          pointerEvents: mobileOpen ? "auto" : "none",
          opacity: mobileOpen ? 1 : 0,
          transform: mobileOpen
            ? "translateY(0) scale(1)"
            : "translateY(-8px) scale(0.97)",
        }}
      >
        <div className="flex flex-col gap-2">
          <a href="/" className="py-2 px-3 hover:bg-white/5" onClick={() => setMobileOpen(false)}>Home</a>
          <a href="/about" className="py-2 px-3 hover:bg-white/5" onClick={() => setMobileOpen(false)}>About</a>
          <a href="/biodata" className="py-2 px-3 hover:bg-white/5" onClick={() => setMobileOpen(false)}>Biodata</a>
          <a href="/gallery" className="py-2 px-3 hover:bg-white/5" onClick={() => setMobileOpen(false)}>Gallery</a>
          <a href="/contact" className="py-2 px-3 hover:bg-white/5" onClick={() => setMobileOpen(false)}>Contact</a>

          <a
            href="/donate"
            className="mt-2 py-2 px-3 rounded bg-red-500 text-black text-center font-semibold hover:brightness-110"
            onClick={() => setMobileOpen(false)}
          >
            Donate
          </a>
        </div>
      </div>
    </nav>
  );
}
