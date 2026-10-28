
"use client";

import { useState } from "react";
import Link from "next/link";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileDestinationsOpen, setMobileDestinationsOpen] = useState(false);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
    setMobileDestinationsOpen(false);
  }

  const linkClass =
    "block rounded-lg px-4 py-3 text-sm font-medium text-[#26384a] transition hover:bg-[#f8f5ee] hover:text-[#07172a]";

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:px-8">
        <Link href="/" onClick={closeMobileMenu} className="shrink-0">
          <img
            src="/welcome-holidays-logo.png"
            alt="Welcome Holidays International"
            className="h-auto w-[140px] sm:w-[175px] lg:w-[190px]"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden items-center gap-7 xl:flex">
          <Link href="/" className="text-sm font-medium text-[#526477] transition hover:text-[#07172a]">
            Home
          </Link>

          <Link href="/about" className="text-sm font-medium text-[#526477] transition hover:text-[#07172a]">
            About Us
          </Link>

          <Link href="/memberships" className="text-sm font-medium text-[#526477] transition hover:text-[#07172a]">
            Memberships
          </Link>

          <div className="group relative flex h-20 items-center">
            <Link
              href="/destinations"
              className="flex items-center gap-1.5 text-sm font-medium text-[#526477] transition hover:text-[#07172a]"
            >
              Destination
              <svg
                width="13"
                height="13"
                viewBox="0 0 20 20"
                fill="none"
                aria-hidden="true"
                className="transition-transform group-hover:rotate-180"
              >
                <path
                  d="M5 7.5L10 12.5L15 7.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>

            <div className="invisible absolute left-1/2 top-[68px] w-[245px] -translate-x-1/2 translate-y-2 rounded-2xl border border-slate-200 bg-white opacity-0 shadow-[0_20px_50px_rgba(7,23,42,0.18)] transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="h-[3px] rounded-t-2xl bg-[#d6a84f]" />
              <Link href="/destinations/domestic" className="block border-b border-slate-100 px-6 py-4 text-sm text-[#07172a] hover:bg-[#f8f5ee]">
                Indian
              </Link>
              <Link href="/destinations/international" className="block px-6 py-4 text-sm text-[#07172a] hover:bg-[#f8f5ee]">
                Worldwide
              </Link>
            </div>
          </div>

          <Link href="/contact" className="text-sm font-medium text-[#526477] transition hover:text-[#07172a]">
            Contact
          </Link>
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 sm:flex xl:flex">
          <Link
            href="/customer/login"
            className="rounded-full border border-[#07172a] px-5 py-2.5 text-sm font-semibold text-[#07172a] transition hover:bg-[#07172a] hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/memberships"
            className="rounded-full bg-[#d6a84f] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#c5983e]"
          >
            Become a Member
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={mobileMenuOpen}
          aria-controls="mobile-navigation"
          onClick={() => setMobileMenuOpen((open) => !open)}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-slate-300 text-[#07172a] transition hover:border-[#d6a84f] xl:hidden"
        >
          {mobileMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="absolute left-0 right-0 top-full z-50 max-h-[calc(100dvh-80px)] overflow-y-auto border-t border-slate-200 bg-white px-4 pb-6 pt-4 shadow-[0_20px_35px_rgba(7,23,42,0.14)] sm:px-6 xl:hidden"
        >
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            <Link href="/" onClick={closeMobileMenu} className={linkClass}>
              Home
            </Link>

            <Link href="/about" onClick={closeMobileMenu} className={linkClass}>
              About Us
            </Link>

            <Link href="/memberships" onClick={closeMobileMenu} className={linkClass}>
              Memberships
            </Link>

            <div>
              <button
                type="button"
                aria-expanded={mobileDestinationsOpen}
                onClick={() => setMobileDestinationsOpen((open) => !open)}
                className={`${linkClass} flex w-full items-center justify-between text-left`}
              >
                Destination
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  fill="none"
                  aria-hidden="true"
                  className={`transition-transform ${mobileDestinationsOpen ? "rotate-180" : ""}`}
                >
                  <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {mobileDestinationsOpen && (
                <div className="ml-4 mt-1 border-l-2 border-[#d6a84f] pl-3">
                  <Link
                    href="/destinations"
                    onClick={closeMobileMenu}
                    className={linkClass}
                  >
                    All Destinations
                  </Link>
                  <Link
                    href="/destinations/domestic"
                    onClick={closeMobileMenu}
                    className={linkClass}
                  >
                    Indian Destinations
                  </Link>
                  <Link
                    href="/destinations/international"
                    onClick={closeMobileMenu}
                    className={linkClass}
                  >
                    Worldwide Destinations
                  </Link>
                </div>
              )}
            </div>

            <Link href="/contact" onClick={closeMobileMenu} className={linkClass}>
              Contact
            </Link>

            <div className="mt-4 grid grid-cols-1 gap-3 border-t border-slate-200 pt-5 sm:grid-cols-2">
              <Link
                href="/customer/login"
                onClick={closeMobileMenu}
                className="rounded-full border border-[#07172a] px-5 py-3.5 text-center text-sm font-semibold text-[#07172a] transition hover:bg-[#07172a] hover:text-white"
              >
                Login
              </Link>

              <Link
                href="/memberships"
                onClick={closeMobileMenu}
                className="rounded-full bg-[#d6a84f] px-5 py-3.5 text-center text-sm font-semibold text-white transition hover:bg-[#c5983e]"
              >
                Become a Member
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
