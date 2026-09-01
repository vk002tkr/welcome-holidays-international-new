import Link from "next/link";

const destinations = [
  {
    name: "Agra",
    category: "Domestic",
    description:
      "Discover India's iconic Mughal heritage, magnificent architecture and the timeless beauty of the Taj Mahal.",
    image:
      "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=90",
    href: "/destinations/domestic/agra",
  },
  {
    name: "Alleppey",
    category: "Domestic",
    description:
      "Experience Kerala's peaceful backwaters, tropical landscapes and unforgettable stays along the water.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=1400&q=90",
    href: "/destinations/domestic/alleppey",
  },
  {
    name: "Amritsar",
    category: "Domestic",
    description:
      "Explore a city of faith, history and culture, home to the magnificent Golden Temple.",
    image:
      "https://images.unsplash.com/photo-1588096344356-9b8e0c5a2c7b?auto=format&fit=crop&w=1400&q=90",
    href: "/destinations/domestic/amritsar",
  },
  {
    name: "Auli",
    category: "Domestic",
    description:
      "Escape into the Himalayas with snow-covered slopes, breathtaking mountain views and peaceful alpine surroundings.",
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1400&q=90",
    href: "/destinations/domestic/auli",
  },
  {
    name: "Bangalore",
    category: "Domestic",
    description:
      "Discover India's garden city, where modern city life meets heritage, greenery, culture and exceptional experiences.",
    image:
      "https://images.unsplash.com/photo-1596176530529-78163a4f7af2?auto=format&fit=crop&w=1400&q=90",
    href: "/destinations/domestic/bangalore",
  },
];

export default function DestinationsPage() {
  return (
    <main className="bg-[#f8f9fa] text-[#07172a]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative min-h-[650px] overflow-hidden bg-[#07172a]">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=2200&q=90"
            alt="India travel destination"
            className="h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-[#07172a]/65" />

          <div className="absolute inset-0 bg-gradient-to-r from-[#07172a]/95 via-[#07172a]/65 to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/80 via-transparent to-transparent" />
        </div>

        <div className="relative z-10 mx-auto flex min-h-[650px] max-w-[1500px] items-center px-6 py-24 lg:px-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-5">
              <span className="h-px w-16 bg-[#d6a84f]" />

              <p className="text-[11px] font-semibold uppercase tracking-[0.38em] text-[#e5bd63]">
                Explore The World
              </p>
            </div>

            <h1 className="mt-9 text-6xl font-semibold tracking-[-0.07em] text-white sm:text-7xl lg:text-[100px] lg:leading-[0.92]">
              Destinations
            </h1>

            <p className="mt-9 max-w-3xl text-lg leading-8 text-white/65 sm:text-xl">
              Discover handpicked destinations, memorable stays and
              extraordinary experiences with Welcome Holidays International.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#destinations"
                className="inline-flex items-center rounded-full bg-[#d6a84f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#c5983e]"
              >
                Explore Destinations
                <span className="ml-3">↓</span>
              </a>

              <Link
                href="/memberships"
                className="inline-flex items-center rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/5"
              >
                View Memberships
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="bg-white px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <div className="flex items-center gap-4">
                <span className="h-px w-12 bg-[#d6a84f]" />

                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                  Our Destinations
                </p>
              </div>

              <h2 className="mt-7 max-w-xl text-4xl font-medium leading-[1.08] tracking-[-0.04em] sm:text-5xl lg:text-6xl">
                Places worth
                <br />
                <span className="font-light italic">
                  remembering.
                </span>
              </h2>

              <div className="mt-9 flex items-center">
                <span className="h-px w-24 bg-[#d6a84f]" />

                <span className="mx-3 text-xl text-[#d6a84f]">
                  ❧
                </span>

                <span className="h-px w-24 bg-[#d6a84f]" />
              </div>
            </div>

            <div className="max-w-3xl">
              <p className="text-lg leading-8 text-slate-600">
                From historic cities and peaceful backwaters to Himalayan
                escapes and vibrant metropolitan destinations, explore places
                selected for memorable holidays.
              </p>

              <p className="mt-6 text-base leading-8 text-slate-500">
                Browse our destinations, discover associated properties and
                find the perfect setting for your next Welcome Holidays
                International experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          DESTINATIONS
      ========================================================= */}
      <section
        id="destinations"
        className="bg-[#faf9f5] px-5 py-20 sm:px-6 lg:px-8 lg:py-28"
      >
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                Domestic Destinations
              </p>

              <h2 className="mt-4 text-4xl font-medium tracking-[-0.04em] sm:text-5xl">
                Start exploring India.
              </h2>
            </div>

            <p className="max-w-md text-sm leading-7 text-slate-500">
              Explore destinations where culture, nature, history and
              hospitality come together.
            </p>
          </div>

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {destinations.map((destination) => (
              <Link
                key={destination.name}
                href={destination.href}
                className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#d6a84f] hover:shadow-lg"
              >
                {/* IMAGE */}
                <div className="relative h-[300px] overflow-hidden bg-[#07172a]">
                  <img
                    src={destination.image}
                    alt={destination.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/75 via-transparent to-transparent" />

                  <span className="absolute left-5 top-5 rounded-full border border-white/20 bg-[#30451d]/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-white backdrop-blur-md">
                    {destination.category}
                  </span>

                  <span className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-md transition duration-300 group-hover:bg-[#d6a84f]">
                    →
                  </span>
                </div>

                {/* CONTENT */}
                <div className="p-7">
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                    {destination.name}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-slate-500">
                    {destination.description}
                  </p>

                  <div className="mt-6 flex items-center text-xs font-semibold text-[#b58935]">
                    Explore Destination
                    <span className="ml-2 transition group-hover:translate-x-1">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          EXPERIENCE STRIP
      ========================================================= */}
      <section className="px-5 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="relative min-h-[500px] overflow-hidden rounded-[32px] bg-[#07172a]">
            <img
              src="https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=2200&q=90"
              alt="Travel experience in India"
              className="absolute inset-0 h-full w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#07172a]/90 via-[#07172a]/50 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/80 via-transparent to-transparent" />

            <div className="relative flex min-h-[500px] items-end px-8 py-10 sm:px-12 lg:px-16 lg:py-16">
              <div className="max-w-2xl">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
                  Travel With Us
                </p>

                <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.04em] text-white sm:text-5xl">
                  More than a destination.
                  <br />
                  <span className="font-light italic">
                    It's an experience.
                  </span>
                </h2>

                <p className="mt-6 max-w-xl text-base leading-8 text-white/55">
                  Choose your destination, discover your stay and create
                  memories that stay with you long after the journey ends.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          PLAN YOUR JOURNEY
      ========================================================= */}
      <section className="px-5 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-[1500px]">
          <div className="overflow-hidden rounded-[32px] bg-[#07172a]">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              <div className="px-8 py-12 sm:px-12 lg:px-16 lg:py-16">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
                  Plan Your Journey
                </p>

                <h2 className="mt-6 max-w-2xl text-4xl font-semibold leading-[1.08] tracking-[-0.05em] text-white sm:text-5xl">
                  Your next holiday
                  <br />
                  <span className="font-light italic">
                    starts here.
                  </span>
                </h2>

                <p className="mt-7 max-w-xl text-base leading-8 text-white/50">
                  Explore our destinations, choose your preferred property and
                  get ready for your next memorable escape.
                </p>

                <a
                  href="#destinations"
                  className="mt-9 inline-flex items-center rounded-full bg-[#d6a84f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#c5983e]"
                >
                  Explore Destinations
                  <span className="ml-3">→</span>
                </a>
              </div>

              <div className="relative flex min-h-[300px] items-end overflow-hidden bg-[#0b2138] px-8 py-10 sm:px-12 lg:min-h-full lg:px-14 lg:py-16">
                <div className="pointer-events-none absolute inset-0 opacity-10">
                  <svg
                    viewBox="0 0 600 500"
                    className="h-full w-full"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 390L110 250L175 315L285 130L365 235L455 80L600 300V500H0V390Z"
                      stroke="#d6a84f"
                      strokeWidth="2"
                    />

                    <path
                      d="M0 420L110 290L175 350L285 170L365 270L455 115L600 330"
                      stroke="#d6a84f"
                      strokeWidth="1"
                    />
                  </svg>
                </div>

                <div className="relative z-10">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-white/40">
                    Welcome Holidays International
                  </p>

                  <h3 className="mt-4 text-3xl font-semibold text-white">
                    Your journey awaits.
                  </h3>

                  <p className="mt-4 max-w-sm text-sm leading-7 text-white/40">
                    Discover a world of unforgettable experiences.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-[#faf9f5] px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-[1500px]">
          <div className="flex flex-col justify-between gap-8 rounded-[30px] bg-[#07172a] p-8 sm:p-12 lg:flex-row lg:items-center lg:p-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
                Welcome Holidays International
              </p>

              <h2 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                Where will your next journey take you?
              </h2>

              <p className="mt-4 max-w-xl text-sm leading-7 text-white/45">
                Explore our destinations and find the perfect place for your
                next holiday.
              </p>
            </div>

            <Link
              href="/memberships"
              className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#d6a84f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#c5983e]"
            >
              Become a Member
              <span className="ml-3">→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}