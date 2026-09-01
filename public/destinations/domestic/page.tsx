import Link from "next/link";

const destinations = [
  {
    name: "Kashmir",
    location: "Jammu & Kashmir",
    tagline: "Paradise on Earth",
    description:
      "Glacial mountains, serene lakes, houseboats and timeless Himalayan landscapes.",
    image:
      "https://images.unsplash.com/photo-1569852837213-00d97a707a83?auto=format&fit=crop&fm=jpg&q=90&w=1600",
    href: "/destinations/domestic/kashmir",
    number: "01",
  },
  {
    name: "Goa",
    location: "West Coast, India",
    tagline: "Sun. Sand. Soul.",
    description:
      "A laid-back escape of golden beaches, coastal charm and unforgettable sunsets.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1600&q=90",
    href: "/destinations/domestic/goa",
    number: "02",
  },
  {
    name: "Kerala",
    location: "South India",
    tagline: "God's Own Country",
    description:
      "Slow down among emerald backwaters, tropical landscapes and peaceful retreats.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1600&q=90",
    href: "/destinations/domestic/alleppey",
    number: "03",
  },
  {
    name: "Rajasthan",
    location: "North-West India",
    tagline: "The Land of Kings",
    description:
      "Royal palaces, magnificent forts, desert landscapes and centuries of heritage.",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1600&q=90",
    href: "/destinations/domestic/rajasthan",
    number: "04",
  },
  {
    name: "Himachal Pradesh",
    location: "Northern India",
    tagline: "Where Mountains Call",
    description:
      "Snow-dusted peaks, pine forests, charming valleys and refreshing mountain air.",
    image:
      "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=1600&q=90",
    href: "/destinations/domestic/himachal-pradesh",
    number: "05",
  },
  {
    name: "Andaman",
    location: "Bay of Bengal",
    tagline: "Island Paradise",
    description:
      "Turquoise waters, white-sand beaches and tropical island experiences.",
    image:
      "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?auto=format&fit=crop&w=1600&q=90",
    href: "/destinations/domestic/andaman",
    number: "06",
  },
];

const travelStyles = [
  {
    number: "01",
    title: "Mountain Escapes",
    description:
      "Wake up to dramatic peaks, crisp air and unforgettable Himalayan landscapes.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=90",
  },
  {
    number: "02",
    title: "Beach Retreats",
    description:
      "Trade the everyday for warm sand, blue waters and slow coastal mornings.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=90",
  },
  {
    number: "03",
    title: "Royal Heritage",
    description:
      "Step into India's magnificent past through palaces, forts and living traditions.",
    image:
      "https://images.unsplash.com/photo-1599661046289-e31897846e41?auto=format&fit=crop&w=1200&q=90",
  },
  {
    number: "04",
    title: "Nature & Wellness",
    description:
      "Find quiet corners surrounded by greenery, water and restorative landscapes.",
    image:
      "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=1200&q=90",
  },
];

function DestinationCard({
  destination,
}: {
  destination: (typeof destinations)[number];
}) {
  return (
    <Link
      href={destination.href}
      className="group relative block min-h-[560px] overflow-hidden rounded-[28px] bg-[#07172a]"
    >
      <img
        src={destination.image}
        alt={destination.name}
        className="absolute inset-0 h-full w-full object-cover transition duration-[1200ms] group-hover:scale-110"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-[#041323] via-[#07172a]/25 to-transparent" />

      <div className="absolute left-6 top-6 flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-full border border-white/25 bg-black/10 text-[10px] text-white backdrop-blur-md">
          {destination.number}
        </span>

        <span className="rounded-full border border-white/20 bg-black/10 px-4 py-2 text-[9px] font-semibold uppercase tracking-[0.2em] text-white backdrop-blur-md">
          India
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-7">
        <p className="text-[9px] font-semibold uppercase tracking-[0.28em] text-[#e5bd63]">
          {destination.location}
        </p>

        <h3 className="mt-3 text-4xl font-light tracking-[-0.05em] text-white">
          {destination.name}
        </h3>

        <p className="mt-1 text-sm font-light italic text-white/65">
          {destination.tagline}
        </p>

        <div className="mt-5 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-24 group-hover:opacity-100">
          <p className="max-w-md text-sm leading-7 text-white/60">
            {destination.description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-5">
          <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white">
            Explore Destination
          </span>

          <span className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-md transition duration-300 group-hover:border-[#d6a84f] group-hover:bg-[#d6a84f]">
            →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default function DomesticDestinationsPage() {
  return (
    <main className="overflow-hidden bg-[#f6f3ec] text-[#07172a]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[720px] overflow-hidden bg-[#07172a]">
        <img
          src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2400&q=92"
          alt="India travel"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-[#07172a]/45" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#041323]/95 via-[#07172a]/65 to-transparent" />

        <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/90 via-transparent to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-[720px] max-w-[1500px] items-end px-6 pb-16 lg:px-10 lg:pb-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-14 bg-[#d6a84f]" />

              <p className="text-[10px] font-semibold uppercase tracking-[0.4em] text-[#e5bd63]">
                Discover India
              </p>
            </div>

            <h1 className="mt-7 text-[68px] font-light leading-[0.9] tracking-[-0.07em] text-white sm:text-[88px] lg:text-[118px]">
              Incredible
              <br />
              <span className="italic">India.</span>
            </h1>

            <p className="mt-8 max-w-2xl text-base leading-8 text-white/60 sm:text-lg">
              A country of extraordinary contrasts, timeless traditions and
              landscapes that stay with you long after the journey ends.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href="#destinations"
                className="inline-flex items-center rounded-full bg-[#d6a84f] px-7 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#07172a] transition hover:bg-[#e5bd63]"
              >
                Explore India
                <span className="ml-4">↓</span>
              </a>

              <Link
                href="/memberships"
                className="inline-flex items-center rounded-full border border-white/25 bg-white/5 px-7 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-white backdrop-blur-md transition hover:bg-white/10"
              >
                Travel With Us
              </Link>
            </div>

            <div className="mt-16 grid max-w-3xl grid-cols-2 gap-6 border-t border-white/15 pt-7 sm:grid-cols-4">
              <div>
                <p className="text-2xl font-light text-white">06</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/40">
                  Featured Destinations
                </p>
              </div>

              <div>
                <p className="text-2xl font-light text-white">∞</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/40">
                  Experiences
                </p>
              </div>

              <div>
                <p className="text-2xl font-light text-white">5★</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/40">
                  Premium Stays
                </p>
              </div>

              <div>
                <p className="text-2xl font-light text-white">24/7</p>
                <p className="mt-1 text-[9px] uppercase tracking-[0.18em] text-white/40">
                  Support
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="bg-white px-6 py-20 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b58935]">
                The Indian Collection
              </p>

              <h2 className="mt-5 text-5xl font-light leading-[1] tracking-[-0.055em] sm:text-6xl">
                Six destinations.
                <br />
                <span className="italic">Endless stories.</span>
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-lg leading-8 text-slate-600">
                India rewards the curious. Every region offers a completely
                different rhythm, from snow-covered Himalayan valleys and
                tranquil backwaters to royal cities and tropical islands.
              </p>

              <div className="mt-7 flex items-center gap-3">
                <span className="h-px w-16 bg-[#d6a84f]" />
                <span className="text-[#d6a84f]">✦</span>
                <span className="h-px w-16 bg-[#d6a84f]" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESTINATIONS
      ========================================================= */}
      <section
        id="destinations"
        className="bg-[#f6f3ec] px-5 py-20 sm:px-6 lg:px-10 lg:py-28"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.32em] text-[#b58935]">
                Curated For You
              </p>

              <h2 className="mt-4 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
                Explore the collection
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-500">
              Handpicked destinations designed to inspire your next Indian
              escape.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
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
            src="https://images.unsplash.com/photo-1569852837213-00d97a707a83?auto=format&fit=crop&fm=jpg&q=90&w=2400"
            alt="Kashmir Dal Lake"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-gradient-to-r from-[#041323]/95 via-[#07172a]/65 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[620px] max-w-[1500px] items-center px-6 py-20 lg:px-10">
          <div className="max-w-2xl">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#e5bd63]">
              Our Featured Escape
            </p>

            <h2 className="mt-5 text-7xl font-light tracking-[-0.07em] text-white sm:text-8xl">
              Kashmir
            </h2>

            <p className="mt-3 text-xl font-light italic text-white/65">
              Paradise on Earth
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="h-px w-16 bg-[#d6a84f]" />
              <span className="text-[#d6a84f]">✦</span>
              <span className="h-px w-16 bg-[#d6a84f]" />
            </div>

            <p className="mt-7 max-w-xl text-base leading-8 text-white/60">
              Drift across Dal Lake, wake up to Himalayan views and experience
              the quiet beauty of one of India's most extraordinary
              destinations.
            </p>

            <Link
              href="/destinations/domestic/kashmir"
              className="mt-9 inline-flex items-center rounded-full bg-[#d6a84f] px-7 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#07172a] transition hover:bg-[#e5bd63]"
            >
              Discover Kashmir
              <span className="ml-4">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          TRAVEL STYLES
      ========================================================= */}
      <section className="bg-white px-5 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="text-center">
            <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b58935]">
              Find Your Escape
            </p>

            <h2 className="mt-4 text-4xl font-light tracking-[-0.05em] sm:text-5xl">
              Travel your way
            </h2>

            <div className="mx-auto mt-6 flex items-center justify-center gap-3">
              <span className="h-px w-12 bg-[#d6a84f]" />
              <span className="text-[#d6a84f]">✦</span>
              <span className="h-px w-12 bg-[#d6a84f]" />
            </div>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {travelStyles.map((style) => (
              <div
                key={style.number}
                className="group relative h-[390px] overflow-hidden rounded-[24px] bg-[#07172a]"
              >
                <img
                  src={style.image}
                  alt={style.title}
                  className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#041323] via-transparent to-transparent" />

                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="text-[9px] tracking-[0.25em] text-[#e5bd63]">
                    {style.number}
                  </span>

                  <h3 className="mt-3 text-2xl font-light text-white">
                    {style.title}
                  </h3>

                  <p className="mt-3 text-sm leading-6 text-white/55">
                    {style.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY WELCOME HOLIDAYS
      ========================================================= */}
      <section className="bg-[#f6f3ec] px-5 py-20 sm:px-6 lg:px-10 lg:py-28">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b58935]">
                The Welcome Difference
              </p>

              <h2 className="mt-5 text-5xl font-light leading-[1.02] tracking-[-0.055em] sm:text-6xl">
                India,
                <br />
                <span className="italic">beautifully planned.</span>
              </h2>

              <p className="mt-7 max-w-md text-sm leading-7 text-slate-500">
                Your holiday should feel effortless. We bring together
                destinations, stays and experiences so you can focus on what
                really matters — enjoying the journey.
              </p>

              <Link
                href="/memberships"
                className="mt-8 inline-flex items-center rounded-full border border-[#b58935] px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.08em] text-[#07172a] transition hover:bg-[#d6a84f]"
              >
                Discover Membership
                <span className="ml-4">→</span>
              </Link>
            </div>

            <div className="grid gap-px overflow-hidden rounded-[28px] border border-slate-200 bg-slate-200 sm:grid-cols-2">
              <div className="bg-white p-8 sm:p-10">
                <span className="text-2xl text-[#d6a84f]">✦</span>

                <h3 className="mt-6 text-xl font-semibold">
                  Curated Stays
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Carefully selected properties for comfortable and memorable
                  stays.
                </p>
              </div>

              <div className="bg-white p-8 sm:p-10">
                <span className="text-2xl text-[#d6a84f]">◌</span>

                <h3 className="mt-6 text-xl font-semibold">
                  Personal Assistance
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Support whenever you need it, from planning through your
                  journey.
                </p>
              </div>

              <div className="bg-white p-8 sm:p-10">
                <span className="text-2xl text-[#d6a84f]">◇</span>

                <h3 className="mt-6 text-xl font-semibold">
                  Member Benefits
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Unlock exclusive advantages designed to make every holiday
                  more rewarding.
                </p>
              </div>

              <div className="bg-white p-8 sm:p-10">
                <span className="text-2xl text-[#d6a84f]">∞</span>

                <h3 className="mt-6 text-xl font-semibold">
                  Memorable Experiences
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  Discover places and moments that turn a holiday into a story
                  worth telling.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#06131f] px-5 py-20 sm:px-6 lg:px-10 lg:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=2200&q=90"
            alt=""
            className="h-full w-full object-cover opacity-20"
          />

          <div className="absolute inset-0 bg-[#06131f]/80" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1100px] text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#e5bd63]">
            Your Indian Journey
          </p>

          <h2 className="mt-5 text-5xl font-light tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
            India is waiting.
            <br />
            <span className="italic">Are you ready?</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/45">
            Choose your destination and let Welcome Holidays International
            take care of the rest.
          </p>

          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a
              href="#destinations"
              className="inline-flex items-center rounded-full bg-[#d6a84f] px-7 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-[#07172a] transition hover:bg-[#e5bd63]"
            >
              Explore Destinations
              <span className="ml-4">↑</span>
            </a>

            <Link
              href="/memberships"
              className="inline-flex items-center rounded-full border border-white/20 px-7 py-4 text-xs font-semibold uppercase tracking-[0.1em] text-white transition hover:bg-white/5"
            >
              Become A Member
            </Link>
          </div>

          <div className="mx-auto mt-14 h-px max-w-xl bg-white/10" />

          <p className="mt-7 text-[9px] uppercase tracking-[0.35em] text-white/25">
            Welcome Holidays International
          </p>
        </div>
      </section>
    </main>
  );
}