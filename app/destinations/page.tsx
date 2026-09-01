import Link from "next/link";

const domesticDestinations = [
  {
    name: "Kashmir",
    subtitle: "Paradise on Earth",
    image:
      "https://images.unsplash.com/photo-1569852837213-00d97a707a83?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=90&w=1400",
    href: "/destinations/domestic/kashmir",
  },
  {
    name: "Goa",
    subtitle: "Sun, Sand & Serenity",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1200&q=90",
    href: "/destinations/domestic/goa",
  },
  {
    name: "Kerala",
    subtitle: "God's Own Country",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1200&q=90",
    href: "/destinations/domestic/alleppey",
  },
  {
    name: "Rajasthan",
    subtitle: "Land of Kings",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=90",
    href: "/destinations/domestic/rajasthan",
  },
  {
    name: "Himachal Pradesh",
    subtitle: "Mountains Calling",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1200&q=90",
    href: "/destinations/domestic/himachal-pradesh",
  },
  {
    name: "Andaman",
    subtitle: "Island Paradise",
    image:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1200&q=90",
    href: "/destinations/domestic/andaman",
  },
];

const internationalDestinations = [
  {
    name: "Dubai",
    subtitle: "City of Dreams",
    image:
      "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=90",
    href: "/destinations/international/dubai",
  },
  {
    name: "Bali",
    subtitle: "Island of Gods",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=1200&q=90",
    href: "/destinations/international/bali",
  },
  {
    name: "Maldives",
    subtitle: "Tropical Bliss",
    image:
      "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=90",
    href: "/destinations/international/maldives",
  },
  {
    name: "Singapore",
    subtitle: "Lion City",
    image:
      "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&w=1200&q=90",
    href: "/destinations/international/singapore",
  },
  {
    name: "Thailand",
    subtitle: "Land of Smiles",
    image:
      "https://images.unsplash.com/photo-1528181304800-259b08848526?auto=format&fit=crop&w=1200&q=90",
    href: "/destinations/international/thailand",
  },
  {
    name: "Mauritius",
    subtitle: "Indian Ocean Gem",
    image:
      "https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=1200&q=90",
    href: "/destinations/international/mauritius",
  },
];

const categories = [
  {
    number: "01",
    icon: "⌁",
    title: "Mountains",
    subtitle: "Breathe Adventure",
  },
  {
    number: "02",
    icon: "♨",
    title: "Beaches",
    subtitle: "Relax & Unwind",
  },
  {
    number: "03",
    icon: "⌂",
    title: "Heritage",
    subtitle: "Timeless Stories",
  },
  {
    number: "04",
    icon: "♧",
    title: "Nature",
    subtitle: "Pure Escapes",
  },
  {
    number: "05",
    icon: "▥",
    title: "Cities",
    subtitle: "Urban Experiences",
  },
  {
    number: "06",
    icon: "♨",
    title: "Islands",
    subtitle: "Tropical Paradise",
  },
];

function DestinationCard({
  destination,
}: {
  destination: {
    name: string;
    subtitle: string;
    image: string;
    href: string;
  };
}) {
  return (
    <Link
      href={destination.href}
      className="group relative block h-[430px] overflow-hidden rounded-[22px] border border-black/10 bg-[#07172a] shadow-[0_12px_35px_rgba(7,23,42,0.12)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_22px_50px_rgba(7,23,42,0.2)]"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#07172a] via-[#07172a]/10 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.22em] text-[#e5bd63]">
              Destination
            </p>

            <h3 className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-white">
              {destination.name}
            </h3>

            <p className="mt-1 text-sm text-white/65">
              {destination.subtitle}
            </p>
          </div>

          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10 text-lg text-white backdrop-blur-md transition-all duration-300 group-hover:border-[#d6a84f] group-hover:bg-[#d6a84f]">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function DestinationsPage() {
  return (
    <main className="overflow-hidden bg-[#f6f3ec] text-[#07172a]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[760px] overflow-hidden bg-[#07172a]">
        <img
          src="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=92"
          alt="Luxury mountain destination"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#07172a]/35" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#041323]/95 via-[#07172a]/60 to-[#07172a]/10" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/90 via-transparent to-[#07172a]/10" />

        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-[1500px] flex-col justify-end px-6 pb-16 pt-32 lg:px-10 lg:pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-14 bg-[#d6a84f]" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.4em] text-[#e5bd63]">
                Explore The World
              </p>
            </div>

            <h1 className="mt-7 text-[72px] font-light leading-[0.88] tracking-[-0.07em] text-white sm:text-[90px] lg:text-[120px]">
              Destinations
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-7 text-white/65 sm:text-lg sm:leading-8">
              Extraordinary places. Unforgettable experiences.
              <br className="hidden sm:block" />
              Handpicked destinations crafted for memories that last a
              lifetime.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#domestic"
                className="inline-flex items-center rounded-full bg-[#d6a84f] px-7 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#07172a] transition hover:bg-[#e5bd63]"
              >
                Explore Destinations
                <span className="ml-4 text-base">→</span>
              </a>

              <Link
                href="/memberships"
                className="inline-flex items-center rounded-full border border-white/30 bg-white/5 px-7 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-white backdrop-blur-sm transition hover:bg-white/10"
              >
                View Memberships
              </Link>
            </div>
          </div>

          <div className="mt-16 grid max-w-5xl grid-cols-2 gap-7 border-t border-white/15 pt-7 sm:grid-cols-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#e5bd63]">
                Handpicked
              </p>
              <p className="mt-2 text-sm text-white/65">Destinations</p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#e5bd63]">
                Premium
              </p>
              <p className="mt-2 text-sm text-white/65">Experiences</p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#e5bd63]">
                Trusted
              </p>
              <p className="mt-2 text-sm text-white/65">Travel Partner</p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#e5bd63]">
                Best Value
              </p>
              <p className="mt-2 text-sm text-white/65">Guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DOMESTIC DESTINATIONS
      ========================================================= */}
      <section
        id="domestic"
        className="bg-[#f6f3ec] px-5 py-20 sm:px-6 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b58935]">
                Incredible India
              </p>

              <h2 className="mt-4 text-5xl font-light tracking-[-0.05em] sm:text-6xl">
                Domestic Destinations
              </h2>
            </div>

            <div className="flex max-w-xl items-end justify-between gap-8">
              <p className="hidden text-sm leading-7 text-slate-500 sm:block">
                From the Himalayas to the backwaters, from royal heritage to
                tropical beaches — explore the magic of India.
              </p>

              <a
                href="#domestic"
                className="flex shrink-0 items-center rounded-full border border-[#c9a457] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#07172a] transition hover:bg-[#d6a84f]"
              >
                View All Domestic
                <span className="ml-3">→</span>
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {domesticDestinations.map((destination) => (
              <DestinationCard
                key={destination.name}
                destination={destination}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          FEATURED KASHMIR
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#07172a]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1569852837213-00d97a707a83?auto=format&fit=crop&fm=jpg&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&ixlib=rb-4.1.0&q=90&w=2400"
            alt="Dal Lake Srinagar Kashmir"
            className="h-full w-full object-cover object-center"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#07172a]/95 via-[#07172a]/65 to-[#07172a]/10" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/50 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto min-h-[520px] max-w-[1500px] px-6 py-20 lg:px-10">
          <div className="flex min-h-[380px] max-w-xl flex-col justify-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#e5bd63]">
              Featured Destination
            </p>

            <h2 className="mt-5 text-6xl font-light tracking-[-0.06em] text-white sm:text-7xl">
              Kashmir
            </h2>

            <div className="mt-5 flex items-center gap-3">
              <span className="h-px w-14 bg-[#d6a84f]" />

              <span className="text-[#d6a84f]">✦</span>

              <span className="h-px w-14 bg-[#d6a84f]" />
            </div>

            <p className="mt-6 max-w-md text-sm leading-7 text-white/60">
              Where every season paints a new picture of heaven on earth.
              Discover serene lakes, snow-covered mountains and unforgettable
              Himalayan experiences.
            </p>

            <Link
              href="/destinations/domestic/kashmir"
              className="mt-8 inline-flex w-fit items-center rounded-full bg-[#d6a84f] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#07172a] transition hover:bg-[#e5bd63]"
            >
              Explore Kashmir
              <span className="ml-4">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTERNATIONAL DESTINATIONS
      ========================================================= */}
      <section
        id="international"
        className="bg-[#f6f3ec] px-5 py-20 sm:px-6 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b58935]">
                Around The World
              </p>

              <h2 className="mt-4 text-5xl font-light tracking-[-0.05em] sm:text-6xl">
                International Destinations
              </h2>
            </div>

            <div className="flex max-w-xl items-end justify-between gap-8">
              <p className="hidden text-sm leading-7 text-slate-500 sm:block">
                Discover global icons and hidden gems. Experience the world
                with comfort, freedom and luxury.
              </p>

              <a
                href="#international"
                className="flex shrink-0 items-center rounded-full border border-[#c9a457] px-5 py-3 text-[10px] font-semibold uppercase tracking-[0.1em] text-[#07172a] transition hover:bg-[#d6a84f]"
              >
                View All International
                <span className="ml-3">→</span>
              </a>
            </div>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {internationalDestinations.map((destination) => (
              <DestinationCard
                key={destination.name}
                destination={destination}
              />
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          DESTINATION CATEGORIES
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#06131f] px-5 py-20 sm:px-6 lg:px-10 lg:py-24">
        <div className="absolute inset-0 opacity-[0.08]">
          <img
            src="https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#e5bd63]">
              Travel Your Way
            </p>

            <h2 className="mt-4 text-4xl font-light tracking-[-0.04em] text-white sm:text-5xl">
              Destination Categories
            </h2>

            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#d6a84f]" />
              <span className="text-[#d6a84f]">✦</span>
              <span className="h-px w-12 bg-[#d6a84f]" />
            </div>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-y-8 md:grid-cols-3 lg:grid-cols-6">
            {categories.map((category) => (
              <div
                key={category.number}
                className="group border-white/10 p-7 text-center transition hover:bg-white/[0.03] lg:border-r lg:last:border-r-0"
              >
                <span className="text-[9px] tracking-[0.2em] text-[#d6a84f]">
                  {category.number}
                </span>

                <div className="mt-5 text-4xl font-light text-[#d6a84f] transition duration-300 group-hover:scale-110">
                  {category.icon}
                </div>

                <h3 className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                  {category.title}
                </h3>

                <p className="mt-2 text-[11px] text-white/40">
                  {category.subtitle}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          MEMBERSHIP CTA
      ========================================================= */}
      <section className="bg-[#06131f] px-5 pb-20 sm:px-6 lg:px-10 lg:pb-24">
        <div className="mx-auto max-w-[1400px]">
          <div className="relative min-h-[400px] overflow-hidden rounded-[28px] border border-[#a77e2d] bg-[#07172a]">
            <img
              src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=2000&q=90"
              alt="Luxury resort"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#07172a]/95 via-[#07172a]/75 to-[#07172a]/20" />

            <div className="relative z-10 flex min-h-[400px] items-center px-8 py-12 sm:px-12 lg:px-14">
              <div className="max-w-2xl">
                <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#e5bd63]">
                  Be Part Of Our Exclusive Family
                </p>

                <h2 className="mt-5 text-4xl font-light tracking-[-0.05em] text-white sm:text-5xl lg:text-6xl">
                  Your Journey.
                  <br />
                  <span className="italic">Our Priority.</span>
                </h2>

                <p className="mt-6 max-w-xl text-sm leading-7 text-white/55">
                  Unlock exclusive deals, premium stays and unforgettable
                  experiences with Welcome Holidays International.
                </p>

                <Link
                  href="/memberships"
                  className="mt-8 inline-flex items-center rounded-full bg-[#d6a84f] px-7 py-4 text-xs font-semibold uppercase tracking-[0.08em] text-[#07172a] transition hover:bg-[#e5bd63]"
                >
                  Become A Member
                  <span className="ml-4">→</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 md:grid-cols-4">
            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d6a84f]">
                Exclusive Benefits
              </p>

              <p className="mt-2 text-xs text-white/45">
                Member Only Offers
              </p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d6a84f]">
                Best Price Guarantee
              </p>

              <p className="mt-2 text-xs text-white/45">
                Always The Best Value
              </p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d6a84f]">
                24/7 Personal Support
              </p>

              <p className="mt-2 text-xs text-white/45">
                We&apos;re Here For You
              </p>
            </div>

            <div>
              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#d6a84f]">
                Curated Experiences
              </p>

              <p className="mt-2 text-xs text-white/45">
                Handpicked For You
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}