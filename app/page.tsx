"use client";

import Link from "next/link";
import { useState } from "react";

const seasons = [
  {
    title: "RED",
    subtitle: "Family & Group Holidays",
    description:
      "Perfect for school holidays, college vacations and memorable family getaways.",
    image:
      "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=1200&q=85",
    color: "bg-[#ef1d2d]",
  },
  {
    title: "WHITE",
    subtitle: "Weekend Getaways",
    description:
      "Ideal for extended weekends, short breaks and quick escapes from everyday life.",
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1200&q=85",
    color: "bg-white text-[#07172a]",
  },
  {
    title: "BLUE",
    subtitle: "Holiday Escapes",
    description:
      "For those who love discovering beautiful destinations and relaxing holiday experiences.",
    image:
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85",
    color: "bg-[#1254b8]",
  },
];

const memberships25 = [
  {
    name: "RED CARD",
    type1: "₹10,20,000",
    type2: "₹14,99,000",
    dp1: "₹5,10,000",
    dp2: "₹7,49,500",
    emi1: "₹48,237",
    emi2: "₹70,890",
    theme: "red",
  },
  {
    name: "WHITE CARD",
    type1: "₹7,99,000",
    type2: "₹11,89,000",
    dp1: "₹3,99,500",
    dp2: "₹5,94,500",
    emi1: "₹37,786",
    emi2: "₹56,230",
    theme: "white",
  },
  {
    name: "PURPLE CARD",
    type1: "₹17,90,000",
    type2: "₹21,75,000",
    dp1: "₹8,95,000",
    dp2: "₹10,87,500",
    emi1: "₹27,902",
    emi2: "₹38,826",
    theme: "purple",
  },
];

const memberships15 = [
  {
    name: "RED CARD",
    type1: "₹7,15,000",
    type2: "₹9,80,000",
    dp1: "₹3,57,500",
    dp2: "₹4,90,000",
    emi1: "₹33,813",
    emi2: "₹46,345",
    theme: "red",
  },
  {
    name: "WHITE CARD",
    type1: "₹5,20,000",
    type2: "₹7,85,000",
    dp1: "₹2,60,000",
    dp2: "₹3,92,500",
    emi1: "₹24,591",
    emi2: "₹37,124",
    theme: "white",
  },
  {
    name: "BLUE CARD",
    type1: "₹3,50,000",
    type2: "₹5,25,000",
    dp1: "₹1,75,000",
    dp2: "₹2,62,500",
    emi1: "₹16,552",
    emi2: "₹24,828",
    theme: "blue",
  },
];

const destinations = [
  {
    name: "Goa",
    region: "India",
    description: "Sun, sand and vibrant vibes.",
    image:
      "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Kerala",
    region: "India",
    description: "Backwaters, nature and peace.",
    image:
      "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Rajasthan",
    region: "India",
    description: "Royal heritage and culture.",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Thailand",
    region: "International",
    description: "Exotic culture and beaches.",
    image:
      "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=900&q=85",
  },
  {
    name: "Bali",
    region: "International",
    description: "Island of gods and serenity.",
    image:
      "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=900&q=85",
  },
];

type Membership = {
  name: string;
  type1: string;
  type2: string;
  dp1: string;
  dp2: string;
  emi1: string;
  emi2: string;
  theme: string;
};

function MembershipCards({
  memberships,
  years,
}: {
  memberships: Membership[];
  years: number;
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {memberships.map((membership, index) => {
        const isWhite = membership.theme === "white";

        return (
          <div
            key={`${membership.name}-${membership.theme}-${years}-${index}`}
            className={`overflow-hidden rounded-[22px] shadow-2xl ${
              membership.theme === "red"
                ? "bg-[#ef2633] text-white"
                : membership.theme === "purple"
                  ? "bg-[#4B0082] text-white"
                  : membership.theme === "blue"
                    ? "bg-[#173fbb] text-white"
                    : "bg-white text-[#07172a]"
            }`}
          >
            <div
              className={`border-b px-7 py-5 ${
                isWhite ? "border-[#d5a846]" : "border-white/20"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p
                    className={`text-lg font-bold ${
                      isWhite ? "text-[#b5862c]" : "text-white"
                    }`}
                  >
                    {membership.name}
                  </p>

                  <p
                    className={`mt-1 text-[10px] uppercase tracking-[0.2em] ${
                      isWhite ? "text-slate-400" : "text-white/60"
                    }`}
                  >
                    Welcome Holidays International
                  </p>
                </div>

                <span
                  className={`rounded-full px-3 py-1 text-[10px] font-bold ${
                    isWhite
                      ? "bg-[#f7f0df] text-[#977126]"
                      : "bg-white/10 text-white"
                  }`}
                >
                  {years} YEARS
                </span>
              </div>
            </div>

            <div className="p-7">
              <div className="grid grid-cols-[1.35fr_1fr_1fr] gap-2 border-b border-current/10 pb-4 text-[11px] font-bold uppercase">
                <span>Category</span>
                <span>Type-1</span>
                <span>Type-2</span>
              </div>

              <div className="mt-5 space-y-5 text-sm">
                <div className="grid grid-cols-[1.35fr_1fr_1fr] gap-2">
                  <span className="font-bold">Price {years} Years</span>
                  <span>{membership.type1}</span>
                  <span>{membership.type2}</span>
                </div>

                <div className="grid grid-cols-[1.35fr_1fr_1fr] gap-2">
                  <span className="font-bold">DP%</span>
                  <span>50%</span>
                  <span>50%</span>
                </div>

                <div className="grid grid-cols-[1.35fr_1fr_1fr] gap-2">
                  <span className="font-bold">DP</span>
                  <span>{membership.dp1}</span>
                  <span>{membership.dp2}</span>
                </div>

                <div className="grid grid-cols-[1.35fr_1fr_1fr] gap-2">
                  <span className="font-bold">12 EMI 13.5%</span>
                  <span>{membership.emi1}</span>
                  <span>{membership.emi2}</span>
                </div>
              </div>

              <Link
                href="/memberships"
                className={`mt-8 flex items-center justify-center rounded-full px-5 py-3.5 text-sm font-semibold transition ${
                  isWhite
                    ? "bg-[#07172a] text-white hover:bg-[#122a44]"
                    : "bg-white text-[#07172a] hover:bg-slate-100"
                }`}
              >
                View Membership
                <span className="ml-2">→</span>
              </Link>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function MembershipSection({
  years,
  memberships,
  backgroundImage,
  showAmc,
}: {
  years: number;
  memberships: Membership[];
  backgroundImage: string;
  showAmc?: boolean;
}) {
  return (
    <section className="relative overflow-hidden bg-[#07172a] px-6 py-24 lg:px-8 lg:py-28">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-25"
        style={{ backgroundImage: `url('${backgroundImage}')` }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-[#07172a]/55 via-[#07172a]/90 to-[#07172a]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="text-center">
          <div className="mx-auto inline-flex rounded-xl border border-[#d6a84f] bg-white px-7 py-3 shadow-xl">
            <h2 className="text-2xl font-bold text-[#10235d] sm:text-3xl">
              {years} YEAR MEMBERSHIP
            </h2>
          </div>

          <p className="mt-5 text-xs font-semibold uppercase tracking-[0.35em] text-[#e5bd63]">
            Choose your membership card
          </p>
        </div>

        <div className="mt-14">
          <MembershipCards memberships={memberships} years={years} />
        </div>

        {showAmc ? (
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-full border-4 border-[#d9e3ff] bg-[#06343e] px-7 py-5 text-center text-white shadow-xl">
              <p className="text-sm font-semibold">
                Type 1 - AMC will be charged every year
              </p>
              <p className="mt-1 text-sm font-semibold">
                INR. 15999 + GST.
              </p>
            </div>

            <div className="rounded-full border-4 border-[#d9e3ff] bg-[#06343e] px-7 py-5 text-center text-white shadow-xl">
              <p className="text-sm font-semibold">
                Type 2 - AMC will be charged every year
              </p>
              <p className="mt-1 text-sm font-semibold">
                INR. 22999 + GST.
              </p>
            </div>
          </div>
        ) : (
          <div className="mt-10 grid gap-4 border-t border-white/10 pt-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              "25 Years of Trust",
              "Flexible Holiday Options",
              "Value for Money",
              "Lifetime Relationship",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white/5 px-5 py-4 text-center"
              >
                <p className="text-sm font-semibold text-white">{item}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function BookingCard() {
  const [membershipId, setMembershipId] = useState("");
  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("2");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(false);

    if (!membershipId.trim()) {
      setError("Membership ID is required to check availability.");
      return;
    }

    setError("");
    setSubmitted(true);
  }

  return (
    <section className="relative z-30 px-5 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="overflow-hidden rounded-[24px] bg-white shadow-[0_20px_70px_rgba(7,23,42,0.18)] ring-1 ring-slate-200">
          <div className="grid lg:grid-cols-[245px_1fr]">
            <div className="relative overflow-hidden bg-[#07172a] px-7 py-8 text-white">
              <div className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full border border-white/10" />
              <div className="absolute -bottom-5 -right-5 h-20 w-20 rounded-full border border-white/10" />

              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#d6a84f] text-xl text-[#07172a]">
                  ✦
                </div>

                <h2 className="mt-5 text-xl font-semibold">
                  Book Your Holiday
                  <br />
                  with Membership
                </h2>

                <p className="mt-4 text-sm leading-6 text-white/60">
                  Holiday bookings are available exclusively for active
                  members.
                </p>

                <div className="mt-7 flex items-start gap-2 text-xs text-[#e5bd63]">
                  <span>🔒</span>
                  <span>Membership required</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit}>
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
                  <div>
                    <label
                      htmlFor="membershipId"
                      className="mb-2 block text-xs font-semibold text-[#07172a]"
                    >
                      Membership ID <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="membershipId"
                      name="membershipId"
                      value={membershipId}
                      onChange={(event) => {
                        setMembershipId(event.target.value);
                        setError("");
                        setSubmitted(false);
                      }}
                      placeholder="Enter Membership ID"
                      required
                      className={`h-12 w-full rounded-xl border bg-slate-50 px-4 text-sm outline-none transition placeholder:text-slate-400 focus:bg-white ${
                        error
                          ? "border-red-400 ring-2 ring-red-100"
                          : "border-slate-200 focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/20"
                      }`}
                    />

                    {error && (
                      <p className="mt-2 text-[11px] font-medium text-red-500">
                        {error}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="destination"
                      className="mb-2 block text-xs font-semibold text-[#07172a]"
                    >
                      Destination <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="destination"
                      name="destination"
                      value={destination}
                      onChange={(event) => setDestination(event.target.value)}
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none focus:border-[#d6a84f] focus:bg-white focus:ring-2 focus:ring-[#d6a84f]/20"
                    >
                      <option value="">Select Destination</option>

                      {destinations.map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="checkIn"
                      className="mb-2 block text-xs font-semibold text-[#07172a]"
                    >
                      Check-in <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="checkIn"
                      name="checkIn"
                      type="date"
                      value={checkIn}
                      onChange={(event) => setCheckIn(event.target.value)}
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none focus:border-[#d6a84f] focus:bg-white focus:ring-2 focus:ring-[#d6a84f]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="checkOut"
                      className="mb-2 block text-xs font-semibold text-[#07172a]"
                    >
                      Check-out <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="checkOut"
                      name="checkOut"
                      type="date"
                      value={checkOut}
                      onChange={(event) => setCheckOut(event.target.value)}
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none focus:border-[#d6a84f] focus:bg-white focus:ring-2 focus:ring-[#d6a84f]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="guests"
                      className="mb-2 block text-xs font-semibold text-[#07172a]"
                    >
                      Guests <span className="text-red-500">*</span>
                    </label>

                    <select
                      id="guests"
                      name="guests"
                      value={guests}
                      onChange={(event) => setGuests(event.target.value)}
                      required
                      className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 text-sm text-slate-600 outline-none focus:border-[#d6a84f] focus:bg-white focus:ring-2 focus:ring-[#d6a84f]/20"
                    >
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5 Guests</option>
                      <option value="6">6 Guests</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex flex-col gap-4 rounded-xl bg-[#fff8e8] p-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 text-[#b5862c]">✦</span>

                    <div>
                      <p className="text-xs font-medium text-slate-700">
                        You must be an active member to book any holiday.
                      </p>

                      <p className="mt-1 text-[11px] text-slate-500">
                        Don&apos;t have a membership?
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 sm:flex-row">
                    <Link
                      href="/memberships"
                      className="rounded-lg border border-[#07172a] px-5 py-2.5 text-center text-xs font-semibold text-[#07172a] transition hover:bg-[#07172a] hover:text-white"
                    >
                      Become a Member
                    </Link>

                    <button
                      type="submit"
                      disabled={!membershipId.trim()}
                      className="rounded-lg bg-[#d6a84f] px-6 py-2.5 text-xs font-bold text-white transition hover:bg-[#bd913b] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      Check Availability
                    </button>
                  </div>
                </div>

                {submitted && (
                  <div className="mt-4 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-xs font-medium text-green-700">
                    Membership ID received. Availability checking will be
                    connected to the membership and booking system later.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative flex min-h-[720px] items-end overflow-hidden bg-[#061426] lg:min-h-[780px]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2400&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-[#061426]/30" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#061426]/90 via-[#061426]/55 to-[#061426]/10" />

        <div className="absolute inset-x-0 bottom-0 h-72 bg-gradient-to-t from-[#061426]/75 to-transparent" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-40 lg:px-8 lg:pb-32">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-4">
              <span className="h-px w-12 bg-[#d6a84f]" />

              <span className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e8c778]">
                A World of Holidays
              </span>
            </div>

            <h1 className="text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-white sm:text-6xl lg:text-8xl">
              Your Holidays.
              <br />

              <span className="font-light italic text-[#e5bd63]">
                Your World.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-white/80 sm:text-lg">
              Discover beautiful destinations, premium stays and memorable
              holiday experiences with Welcome Holidays International.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/memberships"
                className="inline-flex items-center justify-center rounded-full bg-[#d6a84f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#c5983e]"
              >
                Explore Memberships
                <span className="ml-3">→</span>
              </Link>

              <Link
                href="/destinations"
                className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/5 px-7 py-4 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
              >
                Explore Destinations
              </Link>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-2 gap-5 border-t border-white/20 pt-6 sm:grid-cols-4">
            {[
              ["Premium Stays", "Handpicked for you"],
              ["Multiple Destinations", "India & international"],
              ["Member Benefits", "More value, every time"],
              ["Dedicated Support", "Here for your journey"],
            ].map(([title, description]) => (
              <div key={title}>
                <p className="text-sm font-semibold text-white">{title}</p>
                <p className="mt-1 text-xs text-white/55">{description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          BOOKING CARD
      ========================================================= */}
      <BookingCard />

      {/* =========================================================
          ABOUT US
      ========================================================= */}
      <section className="bg-white px-6 py-24 lg:px-8 lg:py-32">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-[2rem]">
              <img
                src="https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=90"
                alt="Luxury holiday resort"
                className="h-[500px] w-full object-cover"
              />
            </div>

            <div className="absolute -bottom-7 right-5 rounded-2xl bg-[#07172a] px-7 py-5 text-white shadow-2xl sm:right-8">
              <p className="text-3xl font-semibold text-[#e5bd63]">25+</p>

              <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-white/60">
                Years of Holidays
              </p>
            </div>
          </div>

          <div className="lg:pl-8">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58935]">
              About Welcome Holidays
            </p>

            <h2 className="mt-5 max-w-2xl text-4xl font-semibold leading-tight tracking-[-0.03em] text-[#07172a] sm:text-5xl">
              Your journey to better holidays starts here.
            </h2>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-600">
              At Welcome Holidays International, we believe a holiday should
              be more than just a few days away from home. It should be an
              opportunity to reconnect, explore something new and create
              memories that stay with you.
            </p>

            <div className="mt-5 rounded-2xl border border-[#e6d3a4] bg-[#fffaf0] p-5">
              <p className="text-sm font-semibold leading-6 text-[#07172a]">
                Welcome Holidays International is a venture of{" "}
                <span className="text-[#b5862c]">
                  YNRS Business Solutions
                </span>
                .
              </p>
            </div>

            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-600">
              Our holiday membership approach is designed to give families and
              travellers a rewarding way to plan their vacations, discover new
              destinations and enjoy memorable stays.
            </p>

            <div className="mt-9 grid grid-cols-3 gap-5 border-t border-slate-200 pt-7">
              <div>
                <p className="text-2xl font-semibold text-[#07172a]">25+</p>
                <p className="mt-1 text-xs text-slate-500">
                  Years of experience
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold text-[#07172a]">50+</p>
                <p className="mt-1 text-xs text-slate-500">
                  Destinations
                </p>
              </div>

              <div>
                <p className="text-2xl font-semibold text-[#07172a]">1</p>
                <p className="mt-1 text-xs text-slate-500">
                  Lifetime of memories
                </p>
              </div>
            </div>

            <Link
              href="/about"
              className="mt-9 inline-flex items-center rounded-full bg-[#07172a] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#10253d]"
            >
              Discover Our Story
              <span className="ml-3">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =========================================================
          CHOICE OF SEASONS
      ========================================================= */}
      <section className="bg-[#faf9f5] px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58935]">
              Choose Your Holiday
            </p>

            <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#07172a] sm:text-5xl">
              Choice of Seasons
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
              Choose the holiday experience that fits the way you love to
              travel.
            </p>
          </div>

          <div className="mt-14 grid gap-7 md:grid-cols-3">
            {seasons.map((season) => (
              <div
                key={season.title}
                className="group overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-200 transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="relative h-[340px] overflow-hidden">
                  <img
                    src={season.image}
                    alt={season.title}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  <div className="absolute inset-x-0 bottom-0">
                    <div className={`px-6 py-4 ${season.color}`}>
                      <div className="flex items-center justify-between">
                        <p className="text-2xl font-semibold tracking-wide">
                          {season.title}
                        </p>

                        <span className="text-xl">→</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-sm font-semibold text-[#07172a]">
                    {season.subtitle}
                  </p>

                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    {season.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          25 YEAR MEMBERSHIP
      ========================================================= */}
      <MembershipSection
        years={25}
        memberships={memberships25}
        backgroundImage="https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=2200&q=80"
      />

      
      {/* =========================================================
          POPULAR DESTINATIONS
      ========================================================= */}
      <section className="bg-white px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                Explore The World
              </p>

              <h2 className="mt-4 text-4xl font-semibold tracking-[-0.03em] text-[#07172a] sm:text-5xl">
                Popular Destinations
              </h2>

              <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
                Handpicked destinations for unforgettable holidays across India
                and beyond.
              </p>
            </div>

            <Link
              href="/destinations"
              className="inline-flex w-fit items-center rounded-full border border-[#d6a84f] px-6 py-3 text-sm font-semibold text-[#07172a] transition hover:bg-[#07172a] hover:text-white"
            >
              View All Destinations
              <span className="ml-2">→</span>
            </Link>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {destinations.map((destination) => {
              const destinationHref =
                destination.name === "Goa"
                  ? "/destinations/domestic/goa"
                  : destination.name === "Kerala"
                    ? "/destinations/domestic/kerala"
                    : destination.name === "Bali"
                      ? "/destinations/international/bali"
                      : destination.region === "International"
                        ? "/destinations/international"
                        : "/destinations/domestic";

              return (
                <Link
                  href={destinationHref}
                  key={destination.name}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-lg font-semibold text-white">
                            {destination.name}
                          </p>

                          <p className="mt-0.5 text-[9px] font-semibold uppercase tracking-[0.15em] text-white/70">
                            {destination.region}
                          </p>
                        </div>

                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-sm">
                          →
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="text-xs leading-5 text-slate-500">
                      {destination.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="bg-[#07172a] px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-10 md:flex-row md:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
              Start Your Journey
            </p>

            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              Your next holiday starts here.
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-white/55">
              Become a member and unlock a world of memorable holiday
              experiences.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/memberships"
              className="rounded-full bg-[#d6a84f] px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-[#c5983e]"
            >
              Explore Memberships
            </Link>

            <Link
              href="/+917838679191"
              className="rounded-full border border-white/25 px-7 py-4 text-center text-sm font-semibold text-white transition hover:bg-white/10"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}