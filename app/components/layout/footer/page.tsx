import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white text-[#07172a]">
      <div className="border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1.5fr_0.8fr_0.8fr_1fr]">
            {/* BRAND */}
            <div>
              <Link href="/" className="inline-block">
                <img
                  src="/welcome-holidays-logo.png"
                  alt="Welcome Holidays International"
                  className="h-auto w-[185px]"
                />
              </Link>

              <p className="mt-6 max-w-md text-sm leading-7 text-slate-500">
                Discover memorable holidays, beautiful destinations and
                thoughtfully designed membership experiences with Welcome
                Holidays International.
              </p>

              <p className="mt-5 text-xs leading-6 text-slate-400">
                A venture of YNRS Business Solutions.
              </p>
            </div>

            {/* EXPLORE */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b58935]">
                Explore
              </p>

              <div className="mt-6 flex flex-col gap-4 text-sm">
                <Link
                  href="/"
                  className="text-slate-500 transition-colors hover:text-[#07172a]"
                >
                  Home
                </Link>

                <Link
                  href="/about"
                  className="text-slate-500 transition-colors hover:text-[#07172a]"
                >
                  About Us
                </Link>

                <Link
                  href="/memberships"
                  className="text-slate-500 transition-colors hover:text-[#07172a]"
                >
                  Memberships
                </Link>

                <Link
                  href="/destinations"
                  className="text-slate-500 transition-colors hover:text-[#07172a]"
                >
                  Destinations
                </Link>
              </div>
            </div>

            {/* QUICK LINKS */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b58935]">
                Quick Links
              </p>

              <div className="mt-6 flex flex-col gap-4 text-sm">
                <Link
                  href="/packages"
                  className="text-slate-500 transition-colors hover:text-[#07172a]"
                >
                  Holiday Packages
                </Link>

                <Link
                  href="/services"
                  className="text-slate-500 transition-colors hover:text-[#07172a]"
                >
                  Services
                </Link>

                <Link
                  href="/customer/login"
                  className="text-slate-500 transition-colors hover:text-[#07172a]"
                >
                  Customer Login
                </Link>

                <Link
                  href="/contact"
                  className="text-slate-500 transition-colors hover:text-[#07172a]"
                >
                  Contact Us
                </Link>
              </div>
            </div>

            {/* CONTACT */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b58935]">
                Get In Touch
              </p>

              <div className="mt-6 space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
                    Email
                  </p>

                  <a
                    href="mailto:info@welcomeholidaysinternational.com"
                    className="mt-2 block break-words text-sm text-slate-600 transition-colors hover:text-[#07172a]"
                  >
                    info@welcomeholidaysinternational.com
                  </a>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-[0.15em] text-slate-400">
                    Call US
                  </p>

                  <Link
                    href="/contact"
                    className="mt-2 inline-block text-sm font-medium text-[#07172a] transition-colors hover:text-[#b58935]"
                  >
                      → +91 783-867-9191
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="border-t border-slate-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} Welcome Holidays International. All
            rights reserved.
          </p>

          <div className="flex items-center gap-5">
            <Link
              href="/+917838679191"
              className="transition-colors hover:text-[#07172a]"
            >
              Privacy
            </Link>

            <Link
              href="/contact"
              className="transition-colors hover:text-[#07172a]"
            >
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}