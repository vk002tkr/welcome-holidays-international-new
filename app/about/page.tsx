import Link from "next/link";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white text-[#07172a]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#07172a]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-[#07172a]/75" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07172a] via-[#07172a]/70 to-[#07172a]/20" />

        <div className="relative mx-auto flex min-h-[560px] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-14 bg-[#d6a84f]" />

              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e5bd63]">
                About Us
              </p>
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              More than a holiday.
              <br />

              <span className="font-light italic text-[#e5bd63]">
                It&apos;s an experience.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Welcome Holidays International is built around one simple idea —
              making every holiday more comfortable, convenient and memorable.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          INTRO
      ========================================================= */}
      <section className="px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                Who We Are
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
                Creating better ways to experience the world.
              </h2>
            </div>

            <div className="space-y-6 text-base leading-8 text-slate-600">
              <p>
                <span className="font-semibold text-[#07172a]">
                  Welcome Holidays International is a venture of YNRS Business
                  Solutions.
                </span>{" "}
                Our focus is to create meaningful holiday experiences through
                thoughtfully designed membership plans, destinations, stays
                and travel assistance.
              </p>

              <p>
                We believe that travelling should be about more than simply
                reaching a destination. It should be about spending quality
                time with family, discovering new places, taking a break from
                everyday life and creating memories that stay with you.
              </p>

              <p>
                Our approach brings together holiday planning, hospitality,
                accommodation and personalised assistance so that our members
                can enjoy their journeys with greater convenience and
                confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          OUR STORY
      ========================================================= */}
      <section className="bg-[#faf9f5] px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-2 lg:items-center">
            {/* VISUAL */}
            <div className="relative min-h-[500px] overflow-hidden rounded-[32px]">
              <img
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1400&q=90"
                alt="Beautiful travel landscape"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#07172a]/70 via-transparent to-transparent" />

              <div className="absolute bottom-7 left-7 right-7">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md">
                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e5bd63]">
                    Our Belief
                  </p>

                  <p className="mt-3 text-2xl font-medium leading-tight text-white">
                    Every journey deserves to become a good memory.
                  </p>
                </div>
              </div>
            </div>

            {/* CONTENT */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                Our Story
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
                Hospitality with a personal touch.
              </h2>

              <div className="mt-8 space-y-6 text-base leading-8 text-slate-600">
                <p>
                  Welcome Holidays International was created with the vision of
                  making quality holiday experiences easier to access and
                  simpler to plan.
                </p>

                <p>
                  From choosing where to go to deciding how you want to
                  experience your holiday, we aim to keep the process
                  straightforward and customer-focused.
                </p>

                <p>
                  Our membership-led approach allows us to build a long-term
                  relationship with our customers rather than treating every
                  holiday as just another booking.
                </p>
              </div>

              <div className="mt-9 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-3xl font-semibold text-[#07172a]">
                    01
                  </p>

                  <h3 className="mt-3 text-lg font-semibold">
                    Customer First
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Every experience begins with understanding our members.
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white p-6">
                  <p className="text-3xl font-semibold text-[#07172a]">
                    02
                  </p>

                  <h3 className="mt-3 text-lg font-semibold">
                    Experience Driven
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    We focus on the journey, not just the destination.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHAT WE DO
      ========================================================= */}
      <section className="px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58935]">
              What We Do
            </p>

            <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Everything you need for a better holiday.
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-500">
              Our services are designed to make holiday planning easier while
              giving our members more ways to discover and enjoy travel.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                number: "01",
                title: "Memberships",
                text: "Long-term holiday membership plans designed around different travel needs.",
              },
              {
                number: "02",
                title: "Destinations",
                text: "Explore destinations across India and around the world.",
              },
              {
                number: "03",
                title: "Holiday Stays",
                text: "Discover comfortable accommodation options for your journeys.",
              },
              {
                number: "04",
                title: "Travel Assistance",
                text: "Support and assistance to help make your holiday planning easier.",
              },
            ].map((item) => (
              <div
                key={item.number}
                className="group rounded-[28px] border border-slate-200 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:border-[#d6a84f] hover:shadow-[0_20px_50px_rgba(7,23,42,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#d6a84f]">
                    {item.number}
                  </span>

                  <span className="text-slate-300 transition group-hover:text-[#d6a84f]">
                    →
                  </span>
                </div>

                <h3 className="mt-10 text-xl font-semibold text-[#07172a]">
                  {item.title}
                </h3>

                <p className="mt-4 text-sm leading-7 text-slate-500">
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================
          VALUES
      ========================================================= */}
      <section className="bg-[#07172a] px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
                Our Values
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.03em] text-white sm:text-5xl">
                The principles behind every journey.
              </h2>

              <p className="mt-6 text-base leading-8 text-white/55">
                We want every interaction with Welcome Holidays International
                to feel simple, transparent and genuinely helpful.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                {
                  title: "Trust",
                  text: "Building lasting relationships through responsible and transparent service.",
                },
                {
                  title: "Comfort",
                  text: "Making the planning and travelling experience as convenient as possible.",
                },
                {
                  title: "Quality",
                  text: "Striving to deliver experiences that members can genuinely value.",
                },
                {
                  title: "Care",
                  text: "Treating every customer and every journey with personal attention.",
                },
              ].map((value) => (
                <div
                  key={value.title}
                  className="rounded-3xl border border-white/10 bg-white/[0.05] p-7"
                >
                  <div className="h-2 w-10 rounded-full bg-[#d6a84f]" />

                  <h3 className="mt-7 text-xl font-semibold text-white">
                    {value.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/50">
                    {value.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          YNRS CONNECTION
      ========================================================= */}
      <section className="px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden rounded-[32px] border border-slate-200 bg-[#faf9f5]">
            <div className="grid lg:grid-cols-[1fr_1.2fr]">
              <div className="bg-[#07172a] p-8 sm:p-12 lg:p-16">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
                  Our Foundation
                </p>

                <h2 className="mt-5 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                  Backed by YNRS Business Solutions.
                </h2>
              </div>

              <div className="p-8 sm:p-12 lg:p-16">
                <p className="text-lg leading-8 text-slate-600">
                  <span className="font-semibold text-[#07172a]">
                    Welcome Holidays International is a venture of YNRS
                    Business Solutions.
                  </span>{" "}
                  This connection gives our hospitality venture the foundation
                  of a wider business ecosystem while allowing us to remain
                  focused on what matters most — creating better holiday
                  experiences for our customers.
                </p>

                <div className="mt-8 border-l-2 border-[#d6a84f] pl-6">
                  <p className="text-sm leading-7 text-slate-500">
                    Our vision is to build a trusted holiday brand that
                    customers can return to for their travel needs, year after
                    year.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          CTA
      ========================================================= */}
      <section className="bg-[#faf9f5] px-6 py-24 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[32px] bg-[#07172a] px-7 py-16 text-center sm:px-12 lg:px-20 lg:py-20">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full border border-[#d6a84f]/20" />
            <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border border-[#d6a84f]/10" />

            <div className="relative">
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
                Start Your Journey
              </p>

              <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
                Ready to make your next holiday memorable?
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-white/55 sm:text-base">
                Explore our membership plans or speak with our team to start
                planning your next experience.
              </p>

              <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                <Link
                  href="/memberships"
                  className="rounded-full bg-[#d6a84f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#c5983e]"
                >
                  Explore Memberships
                </Link>

                <Link
                  href="/contact"
                  className="rounded-full border border-white/20 px-7 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}