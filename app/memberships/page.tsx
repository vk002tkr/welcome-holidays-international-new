import Link from "next/link";

const membership25 = [
  {
    name: "RED CARD",
    color: "red",
    type1: "₹10,20,000",
    type2: "₹14,99,000",
    dp1: "₹5,10,000",
    dp2: "₹7,49,500",
    emi1: "₹48,237",
    emi2: "₹70,890",
    description:
      "Designed for families looking for an extended holiday membership with greater flexibility.",
  },
  {
    name: "WHITE CARD",
    color: "white",
    type1: "₹7,99,000",
    type2: "₹11,89,000",
    dp1: "₹3,99,500",
    dp2: "₹5,94,500",
    emi1: "₹37,786",
    emi2: "₹56,230",
    description:
      "A balanced membership option for families and travellers who love regular getaways.",
  },
  {
    name: "BLUE CARD",
    color: "blue",
    type1: "₹5,90,000",
    type2: "₹8,21,000",
    dp1: "₹2,95,000",
    dp2: "₹4,10,500",
    emi1: "₹27,902",
    emi2: "₹38,826",
    description:
      "A practical holiday membership option for travellers seeking long-term value.",
  },
];

const membership15 = [
  {
    name: "RED CARD",
    color: "red",
    type1: "₹7,15,000",
    type2: "₹9,80,000",
    dp1: "₹3,57,500",
    dp2: "₹4,90,000",
    emi1: "₹33,813",
    emi2: "₹46,345",
    description:
      "Designed for families looking for an extended holiday membership with greater flexibility.",
  },
  {
    name: "WHITE CARD",
    color: "white",
    type1: "₹5,20,000",
    type2: "₹7,85,000",
    dp1: "₹2,60,000",
    dp2: "₹3,92,500",
    emi1: "₹24,591",
    emi2: "₹37,124",
    description:
      "A balanced membership option for families and travellers who love regular getaways.",
  },
  {
    name: "BLUE CARD",
    color: "blue",
    type1: "₹3,50,000",
    type2: "₹5,25,000",
    dp1: "₹1,75,000",
    dp2: "₹2,62,500",
    emi1: "₹16,552",
    emi2: "₹24,828",
    description:
      "A practical holiday membership option for travellers seeking long-term value.",
  },
];

const benefits = [
  {
    icon: "✦",
    title: "Holiday Planning",
    description:
      "Plan your holidays through a structured membership designed around your travel needs.",
  },
  {
    icon: "◇",
    title: "Destination Access",
    description:
      "Explore a wide selection of destinations across India and international locations.",
  },
  {
    icon: "⌂",
    title: "Comfortable Stays",
    description:
      "Enjoy memorable stays and holiday experiences through our destination network.",
  },
  {
    icon: "◎",
    title: "Member Support",
    description:
      "Get assistance throughout your holiday planning and booking journey.",
  },
  {
    icon: "↗",
    title: "Travel Experiences",
    description:
      "Turn family vacations, weekend breaks and special occasions into memorable journeys.",
  },
  {
    icon: "∞",
    title: "Long-Term Value",
    description:
      "A membership designed to become part of your long-term holiday planning.",
  },
];

const seasons = [
  {
    name: "RED",
    title: "Peak Family Holidays",
    description:
      "Designed around popular holiday periods and family travel requirements.",
    color: "bg-[#ef1d2d]",
  },
  {
    name: "WHITE",
    title: "Flexible Getaways",
    description:
      "A balanced option for extended weekends and shorter holiday breaks.",
    color: "bg-white border border-slate-200",
  },
  {
    name: "BLUE",
    title: "Holiday Escapes",
    description:
      "For travellers who enjoy planning relaxing escapes throughout the year.",
    color: "bg-[#1254b8]",
  },
];

function PlanCard({
  plan,
  years,
}: {
  plan: (typeof membership25)[number];
  years: number;
}) {
  const isWhite = plan.color === "white";

  return (
    <div
      className={`overflow-hidden rounded-[24px] shadow-xl transition duration-300 hover:-translate-y-1 hover:shadow-2xl ${
        plan.color === "red"
          ? "bg-[#ef2633] text-white"
          : plan.color === "blue"
            ? "bg-[#173fbb] text-white"
            : "bg-white text-[#07172a] ring-1 ring-slate-200"
      }`}
    >
      <div
        className={`border-b px-7 py-6 ${
          isWhite ? "border-[#d6a84f]" : "border-white/20"
        }`}
      >
        <div className="flex items-center justify-between">
          <div>
            <p
              className={`text-xl font-bold ${
                isWhite ? "text-[#b5862c]" : "text-white"
              }`}
            >
              {plan.name}
            </p>

            <p
              className={`mt-1 text-[10px] uppercase tracking-[0.2em] ${
                isWhite ? "text-slate-400" : "text-white/60"
              }`}
            >
              {years} Year Membership
            </p>
          </div>

          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${
              isWhite
                ? "bg-[#fff8e8] text-[#b5862c]"
                : "bg-white/10 text-white"
            }`}
          >
            ✦
          </div>
        </div>
      </div>

      <div className="p-7">
        <p
          className={`mb-7 text-sm leading-6 ${
            isWhite ? "text-slate-500" : "text-white/70"
          }`}
        >
          {plan.description}
        </p>

        <div className="overflow-hidden rounded-2xl border border-current/10">
          <div
            className={`grid grid-cols-[1.25fr_1fr_1fr] px-4 py-3 text-[10px] font-bold uppercase tracking-wide ${
              isWhite ? "bg-slate-50" : "bg-black/10"
            }`}
          >
            <span>Category</span>
            <span>Type 1</span>
            <span>Type 2</span>
          </div>

          <div className="space-y-0 text-xs">
            <div className="grid grid-cols-[1.25fr_1fr_1fr] border-t border-current/10 px-4 py-4">
              <span className="font-semibold">Price</span>
              <span>{plan.type1}</span>
              <span>{plan.type2}</span>
            </div>

            <div className="grid grid-cols-[1.25fr_1fr_1fr] border-t border-current/10 px-4 py-4">
              <span className="font-semibold">DP%</span>
              <span>50%</span>
              <span>50%</span>
            </div>

            <div className="grid grid-cols-[1.25fr_1fr_1fr] border-t border-current/10 px-4 py-4">
              <span className="font-semibold">DP</span>
              <span>{plan.dp1}</span>
              <span>{plan.dp2}</span>
            </div>

            <div className="grid grid-cols-[1.25fr_1fr_1fr] border-t border-current/10 px-4 py-4">
              <span className="font-semibold">12 EMI</span>
              <span>{plan.emi1}</span>
              <span>{plan.emi2}</span>
            </div>
          </div>
        </div>

        <Link
          href="/contact"
          className={`mt-7 flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition ${
            isWhite
              ? "bg-[#07172a] text-white hover:bg-[#10253d]"
              : "bg-white text-[#07172a] hover:bg-slate-100"
          }`}
        >
          Enquire About This Plan
          <span className="ml-2">→</span>
        </Link>
      </div>
    </div>
  );
}

function MembershipTier({
  years,
  plans,
}: {
  years: number;
  plans: typeof membership25;
}) {
  return (
    <section className="relative overflow-hidden bg-[#07172a] px-6 py-24 lg:px-8 lg:py-28">
      <div className="absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-[#d6a84f]/5 blur-3xl" />

      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-blue-500/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
              Membership Plans
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              {years} Year Membership
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
              Choose the card that best matches your holiday planning needs.
            </p>
          </div>

          <div className="rounded-full border border-[#d6a84f]/40 bg-[#d6a84f]/10 px-5 py-3 text-xs font-semibold text-[#e5bd63]">
            Type 1 &amp; Type 2 Accommodation
          </div>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {plans.map((plan) => (
            <PlanCard key={plan.name} plan={plan} years={years} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function MembershipsPage() {
  return (
    <div className="min-h-screen bg-white text-[#07172a]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#07172a]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1470214304380-aadaedcfff1b?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-[#07172a]/80" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07172a] via-[#07172a]/70 to-transparent" />

        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-14 bg-[#d6a84f]" />

              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e5bd63]">
                Welcome Holidays International
              </p>
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[1.03] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Travel more.
              <br />

              <span className="font-light italic text-[#e5bd63]">
                Experience more.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Discover our holiday membership plans and unlock a more
              structured, rewarding way to plan your vacations.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#plans"
                className="rounded-full bg-[#d6a84f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#c5983e]"
              >
                Explore Plans
                <span className="ml-3">↓</span>
              </a>

              <Link
                href="/contact"
                className="rounded-full border border-white/25 px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Talk to Us
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO / VALUE
      ========================================================= */}
      <section className="px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                Why Membership
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
                Your holidays deserve a better plan.
              </h2>
            </div>

            <div>
              <p className="text-lg leading-8 text-slate-600">
                A Welcome Holidays International membership is designed to
                bring greater structure and value to the way you plan your
                holidays.
              </p>

              <p className="mt-5 text-base leading-8 text-slate-500">
                From selecting destinations and planning stays to receiving
                member support, the experience is designed around making your
                holiday journey simpler and more enjoyable.
              </p>

              <div className="mt-8 rounded-2xl border border-[#e6d3a4] bg-[#fffaf0] p-5">
                <p className="text-sm font-semibold leading-6 text-[#07172a]">
                  Welcome Holidays International is a venture of{" "}
                  <span className="text-[#b5862c]">
                    YNRS Business Solutions
                  </span>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          BENEFITS
      ========================================================= */}
      <section className="bg-[#faf9f5] px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58935]">
              Member Benefits
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              More than just a membership.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500">
              We are building a membership experience around the things that
              make travelling enjoyable.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d6a84f] hover:shadow-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff8e8] text-xl text-[#b5862c]">
                  {benefit.icon}
                </div>

                <h3 className="mt-6 text-xl font-semibold">
                  {benefit.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          ACCOMMODATION TYPES
      ========================================================= */}
      <section className="px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58935]">
              Accommodation Categories
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Choose the stay that fits you.
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500">
              Our membership plans are structured around two accommodation
              categories so members can choose according to their requirements.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-2">
            <div className="group overflow-hidden rounded-[28px] bg-[#07172a]">
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1400&q=90"
                  alt="Type 1 accommodation"
                  className="h-full w-full object-cover opacity-75 transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#07172a] to-transparent" />

                <div className="absolute bottom-7 left-7">
                  <span className="rounded-full bg-[#d6a84f] px-4 py-2 text-xs font-bold text-white">
                    TYPE 1
                  </span>

                  <h3 className="mt-4 text-3xl font-semibold text-white">
                    Comfortable Stay
                  </h3>
                </div>
              </div>

              <div className="p-7">
                <p className="text-sm leading-7 text-white/60">
                  A comfortable accommodation option designed for couples and
                  smaller families travelling together.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs text-white/70">
                    Comfortable
                  </span>

                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs text-white/70">
                    Family Friendly
                  </span>
                </div>
              </div>
            </div>

            <div className="group overflow-hidden rounded-[28px] bg-[#faf9f5]">
              <div className="relative h-72 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90"
                  alt="Type 2 accommodation"
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                <div className="absolute bottom-7 left-7">
                  <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-[#07172a]">
                    TYPE 2
                  </span>

                  <h3 className="mt-4 text-3xl font-semibold text-white">
                    Spacious Stay
                  </h3>
                </div>
              </div>

              <div className="p-7">
                <p className="text-sm leading-7 text-slate-500">
                  A larger accommodation option designed for families and
                  groups looking for additional space during their holiday.
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="rounded-full bg-[#07172a]/5 px-4 py-2 text-xs text-slate-600">
                    More Space
                  </span>

                  <span className="rounded-full bg-[#07172a]/5 px-4 py-2 text-xs text-slate-600">
                    Family Friendly
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          SEASONS
      ========================================================= */}
      <section className="bg-[#faf9f5] px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                Holiday Categories
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Choose your holiday season.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-slate-500">
                Different holidays call for different experiences. Our Red,
                White and Blue categories help organise the way you travel.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {seasons.map((season) => (
              <div
                key={season.name}
                className={`rounded-[26px] p-8 shadow-sm ${
                  season.name === "WHITE"
                    ? "border border-slate-200 bg-white"
                    : season.color
                } ${
                  season.name === "WHITE" ? "text-[#07172a]" : "text-white"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold">{season.name}</span>

                  <span className="text-2xl">→</span>
                </div>

                <h3 className="mt-12 text-2xl font-semibold">
                  {season.title}
                </h3>

                <p
                  className={`mt-4 text-sm leading-7 ${
                    season.name === "WHITE"
                      ? "text-slate-500"
                      : "text-white/70"
                  }`}
                >
                  {season.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          25 YEAR PLANS
      ========================================================= */}
      <div id="plans">
        <MembershipTier years={25} plans={membership25} />
      </div>

      {/* =========================================================
          15 YEAR PLANS
      ========================================================= */}
      <MembershipTier years={15} plans={membership15} />

      {/* =========================================================
          AMC
      ========================================================= */}
      <section className="bg-white px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-[28px] bg-[#07172a] p-8 sm:p-10 lg:p-12">
            <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
                  Annual Maintenance
                </p>

                <h2 className="mt-4 text-3xl font-semibold text-white sm:text-4xl">
                  Membership Maintenance Charges
                </h2>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
                  Annual maintenance charges are applicable according to the
                  accommodation category selected under the membership plan.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:min-w-[500px]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Type 1
                  </p>

                  <p className="mt-3 text-2xl font-semibold text-[#e5bd63]">
                    ₹15,999
                  </p>

                  <p className="mt-1 text-xs text-white/40">+ GST / Year</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs uppercase tracking-[0.2em] text-white/45">
                    Type 2
                  </p>

                  <p className="mt-3 text-2xl font-semibold text-[#e5bd63]">
                    ₹22,999
                  </p>

                  <p className="mt-1 text-xs text-white/40">+ GST / Year</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          HOW IT WORKS
      ========================================================= */}
      <section className="px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58935]">
              Simple Process
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Your membership journey.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-4">
            {[
              [
                "01",
                "Choose Your Plan",
                "Select the membership that suits your holiday requirements.",
              ],
              [
                "02",
                "Become a Member",
                "Complete the membership process and receive your Membership ID.",
              ],
              [
                "03",
                "Plan Your Holiday",
                "Choose your destination, dates and accommodation requirements.",
              ],
              [
                "04",
                "Enjoy Your Stay",
                "Book through your membership and enjoy your holiday experience.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="relative rounded-3xl border border-slate-200 p-7"
              >
                <span className="text-sm font-bold tracking-[0.15em] text-[#d6a84f]">
                  {number}
                </span>

                <h3 className="mt-7 text-xl font-semibold">{title}</h3>

                <p className="mt-3 text-sm leading-7 text-slate-500">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BOOKING NOTE
      ========================================================= */}
      <section className="bg-[#faf9f5] px-6 py-20 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#07172a] text-xl text-[#e5bd63]">
            🔒
          </div>

          <h2 className="mt-6 text-3xl font-semibold text-[#07172a] sm:text-4xl">
            Holiday bookings are for members.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-slate-500">
            An active Membership ID is required to check availability and
            proceed with holiday bookings through Welcome Holidays
            International.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/customer/login"
              className="rounded-full border border-[#07172a] px-7 py-4 text-sm font-semibold text-[#07172a] transition hover:bg-[#07172a] hover:text-white"
            >
              Member Login
            </Link>

            <Link
              href="/contact"
              className="rounded-full bg-[#d6a84f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#c5983e]"
            >
              Become a Member
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-[#07172a] px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
              Start Your Journey
            </p>

            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              Find the membership that fits your way of travelling.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
              Explore your options today and start planning the holidays you
              have been looking forward to.
            </p>
          </div>

          <Link
            href="/contact"
            className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#d6a84f] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#c5983e]"
          >
            Enquire Now
            <span className="ml-3">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}