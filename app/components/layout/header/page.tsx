import Link from "next/link";

export default function Header() {
  return (
    <header className="relative z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex min-h-24 max-w-7xl items-center justify-between gap-6 px-5 py-3 lg:px-8">
        {/* =========================================================
            LOGO
        ========================================================= */}
        <Link href="/" className="shrink-0">
          <img
            src="/welcome-holidays-logo.png"
            alt="Welcome Holidays International"
            className="h-auto w-[155px] sm:w-[175px] lg:w-[190px]"
          />
        </Link>

        {/* =========================================================
            DESKTOP NAVIGATION
        ========================================================= */}
        <nav className="hidden items-center gap-7 xl:flex">
          {/* HOME */}
          <Link
            href="/"
            className="group relative py-2 text-sm font-medium text-[#526477] transition-colors duration-200 hover:text-[#07172a]"
          >
            Home

            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d6a84f] transition-all duration-200 group-hover:w-full" />
          </Link>

          {/* ABOUT US */}
          <Link
            href="/about"
            className="group relative py-2 text-sm font-medium text-[#526477] transition-colors duration-200 hover:text-[#07172a]"
          >
            About Us

            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d6a84f] transition-all duration-200 group-hover:w-full" />
          </Link>

          {/* MEMBERSHIPS */}
          <Link
            href="/memberships"
            className="group relative py-2 text-sm font-medium text-[#526477] transition-colors duration-200 hover:text-[#07172a]"
          >
            Memberships

            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d6a84f] transition-all duration-200 group-hover:w-full" />
          </Link>

          {/* =======================================================
              DESTINATION DROPDOWN
          ======================================================= */}
          <div className="group relative h-24">
            <div className="flex h-full items-center">
              <Link
                href="/destinations"
                className="relative flex items-center gap-1.5 py-2 text-sm font-medium text-[#526477] transition-colors duration-200 hover:text-[#07172a]"
              >
                Destination

                <svg
                  width="13"
                  height="13"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-transform duration-200 group-hover:rotate-180"
                >
                  <path
                    d="M5 7.5L10 12.5L15 7.5"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d6a84f] transition-all duration-200 group-hover:w-full" />
              </Link>
            </div>

            {/* =====================================================
                DESTINATION DROPDOWN
            ===================================================== */}
            <div className="invisible absolute left-1/2 top-[78px] w-[245px] -translate-x-1/2 translate-y-3 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
              <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_20px_50px_rgba(7,23,42,0.18)]">
                {/* GOLD TOP ACCENT */}
                <div className="h-[3px] w-full bg-[#d6a84f]" />

                {/* INDIAN */}
                <Link
                  href="/destinations/domestic"
                  className="group/item flex items-center justify-between border-b border-slate-100 bg-white px-6 py-4 text-sm font-medium text-[#07172a] transition-all duration-200 hover:bg-white hover:pl-7 hover:text-[#071f5c]"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d6a84f] opacity-0 transition-opacity duration-200 group-hover/item:opacity-100" />

                    <span>Indian</span>
                  </div>

                  <span className="translate-x-[-5px] text-[#d6a84f] opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                    →
                  </span>
                </Link>

                {/* WORLDWIDE */}
                <Link
                  href="/destinations/international"
                  className="group/item flex items-center justify-between bg-white px-6 py-4 text-sm font-medium text-[#07172a] transition-all duration-200 hover:bg-white hover:pl-7 hover:text-[#071f5c]"
                >
                  <div className="flex items-center gap-3">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#d6a84f] opacity-0 transition-opacity duration-200 group-hover/item:opacity-100" />

                    <span>Worldwide</span>
                  </div>

                  <span className="translate-x-[-5px] text-[#d6a84f] opacity-0 transition-all duration-200 group-hover/item:translate-x-0 group-hover/item:opacity-100">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* CONTACT */}
          <Link
            href="/contact"
            className="group relative py-2 text-sm font-medium text-[#526477] transition-colors duration-200 hover:text-[#07172a]"
          >
            Contact

            <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-[#d6a84f] transition-all duration-200 group-hover:w-full" />
          </Link>
        </nav>

        {/* =========================================================
            DESKTOP ACTIONS
        ========================================================= */}
        <div className="hidden items-center gap-3 sm:flex">
          <Link
            href="/customer/login"
            className="rounded-full border border-[#07172a] px-5 py-2.5 text-sm font-semibold text-[#07172a] transition-all duration-200 hover:bg-[#07172a] hover:text-white"
          >
            Login
          </Link>

          <Link
            href="/memberships"
            className="rounded-full bg-[#d6a84f] px-6 py-3 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#c5983e] hover:shadow-md"
          >
            Become a Member
          </Link>
        </div>

        {/* =========================================================
            MOBILE MENU BUTTON
        ========================================================= */}
        <button
          type="button"
          aria-label="Open navigation menu"
          className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 text-[#07172a] transition hover:border-[#07172a] xl:hidden"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 7H20M4 12H20M4 17H20"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>
    </header>
  );
}