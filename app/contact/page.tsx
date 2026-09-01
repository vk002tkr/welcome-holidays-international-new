"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

const enquiryTypes = [
  "Membership Enquiry",
  "Holiday Booking",
  "Destination Enquiry",
  "General Enquiry",
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="bg-white text-[#07172a]">
      {/* =========================================================
          HERO
      ========================================================= */}
      <section className="relative overflow-hidden bg-[#07172a]">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=2200&q=90')",
          }}
        />

        <div className="absolute inset-0 bg-[#07172a]/75" />

        <div className="absolute inset-0 bg-gradient-to-r from-[#07172a] via-[#07172a]/70 to-transparent" />

        <div className="relative mx-auto flex min-h-[500px] max-w-7xl items-center px-6 py-24 lg:px-8">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4">
              <span className="h-px w-14 bg-[#d6a84f]" />

              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#e5bd63]">
                Welcome Holidays International
              </p>
            </div>

            <h1 className="mt-7 text-5xl font-semibold leading-[1.03] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Let&apos;s plan your
              <br />

              <span className="font-light italic text-[#e5bd63]">
                next journey.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-white/70 sm:text-lg">
              Whether you are looking for a membership, planning your next
              holiday or simply want to know more, our team is here to help.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTACT INTRO
      ========================================================= */}
      <section className="px-6 py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            {/* =====================================================
                LEFT INFORMATION
            ===================================================== */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#b58935]">
                Get In Touch
              </p>

              <h2 className="mt-5 text-4xl font-semibold leading-tight tracking-[-0.03em] sm:text-5xl">
                We&apos;d love to hear from you.
              </h2>

              <p className="mt-6 max-w-lg text-base leading-8 text-slate-500">
                Have a question about our memberships, destinations or holiday
                experiences? Send us your enquiry and our team will get back to
                you.
              </p>

              {/* CONTACT DETAILS */}
              <div className="mt-10 space-y-5">
                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff8e8] text-lg text-[#b5862c]">
                    ✉
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Email
                    </p>

                    <a
                      href="mailto:info@welcomeholidaysinternational.com"
                      className="mt-1 block break-all text-sm font-medium text-[#07172a] transition hover:text-[#b5862c]"
                    >
                      info@welcomeholidaysinternational.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff8e8] text-lg text-[#b5862c]">
                    ☎
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Phone
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#07172a]">
                      Speak with our team
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Contact details will be available here.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 rounded-2xl border border-slate-200 bg-white p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#fff8e8] text-lg text-[#b5862c]">
                    ⌖
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-400">
                      Office
                    </p>

                    <p className="mt-1 text-sm font-medium text-[#07172a]">
                      Welcome Holidays International
                    </p>

                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      A venture of YNRS Business Solutions.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* =====================================================
                CONTACT FORM
            ===================================================== */}
            <div className="rounded-[28px] bg-[#faf9f5] p-6 sm:p-8 lg:p-10">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#b58935]">
                  Send An Enquiry
                </p>

                <h3 className="mt-3 text-2xl font-semibold text-[#07172a]">
                  Tell us how we can help.
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  Fill in the details below and our team will get in touch.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-xs font-semibold text-[#07172a]"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your full name"
                    className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#07172a] outline-none transition placeholder:text-slate-400 focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/20"
                  />
                </div>

                {/* EMAIL + PHONE */}
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-semibold text-[#07172a]"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#07172a] outline-none transition placeholder:text-slate-400 focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/20"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-2 block text-xs font-semibold text-[#07172a]"
                    >
                      Phone Number <span className="text-red-500">*</span>
                    </label>

                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      placeholder="+91 XXXXX XXXXX"
                      className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#07172a] outline-none transition placeholder:text-slate-400 focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/20"
                    />
                  </div>
                </div>

                {/* ENQUIRY TYPE */}
                <div>
                  <label
                    htmlFor="enquiryType"
                    className="mb-2 block text-xs font-semibold text-[#07172a]"
                  >
                    Enquiry Type <span className="text-red-500">*</span>
                  </label>

                  <select
                    id="enquiryType"
                    name="enquiryType"
                    required
                    className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-600 outline-none transition focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/20"
                  >
                    <option value="">Select enquiry type</option>

                    {enquiryTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MEMBERSHIP ID */}
                <div>
                  <label
                    htmlFor="membershipId"
                    className="mb-2 block text-xs font-semibold text-[#07172a]"
                  >
                    Membership ID{" "}
                    <span className="font-normal text-slate-400">
                      (if applicable)
                    </span>
                  </label>

                  <input
                    id="membershipId"
                    name="membershipId"
                    type="text"
                    placeholder="Enter your Membership ID"
                    className="h-13 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-[#07172a] outline-none transition placeholder:text-slate-400 focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/20"
                  />
                </div>

                {/* MESSAGE */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-semibold text-[#07172a]"
                  >
                    Your Message <span className="text-red-500">*</span>
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us what you are looking for..."
                    className="w-full resize-none rounded-xl border border-slate-200 bg-white px-4 py-4 text-sm text-[#07172a] outline-none transition placeholder:text-slate-400 focus:border-[#d6a84f] focus:ring-2 focus:ring-[#d6a84f]/20"
                  />
                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-xl bg-[#07172a] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#10253d]"
                >
                  Send Enquiry
                  <span className="ml-3">→</span>
                </button>

                {submitted && (
                  <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
                    Thank you for contacting us. Your enquiry has been
                    received.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          MEMBERSHIP CTA
      ========================================================= */}
      <section className="px-6 pb-24 lg:px-8 lg:pb-28">
        <div className="mx-auto max-w-7xl">
          <div className="relative overflow-hidden rounded-[32px] bg-[#07172a] px-7 py-14 sm:px-12 lg:px-16 lg:py-16">
            <div className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-white/5" />

            <div className="absolute -bottom-32 right-20 h-72 w-72 rounded-full border border-[#d6a84f]/10" />

            <div className="relative flex flex-col justify-between gap-9 lg:flex-row lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#e5bd63]">
                  Not A Member Yet?
                </p>

                <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                  Make every holiday count.
                </h2>

                <p className="mt-4 max-w-xl text-sm leading-7 text-white/55">
                  Explore our membership plans and discover a better way to
                  plan your future holidays.
                </p>
              </div>

              <Link
                href="/memberships"
                className="inline-flex shrink-0 items-center justify-center rounded-full bg-[#d6a84f] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#c5983e]"
              >
                Explore Memberships
                <span className="ml-3">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================
          QUICK HELP
      ========================================================= */}
      <section className="border-t border-slate-200 bg-[#faf9f5] px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-5 md:grid-cols-3">
            <Link
              href="/memberships"
              className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b58935]">
                Memberships
              </p>

              <h3 className="mt-3 text-lg font-semibold">
                Find your membership
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Explore our available membership options.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#07172a] transition group-hover:text-[#b5862c]">
                Explore →
              </span>
            </Link>

            <Link
              href="/destinations"
              className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b58935]">
                Destinations
              </p>

              <h3 className="mt-3 text-lg font-semibold">
                Discover destinations
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Find inspiration for your next holiday.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#07172a] transition group-hover:text-[#b5862c]">
                Explore →
              </span>
            </Link>

            <Link
              href="/customer/login"
              className="group rounded-2xl bg-white p-6 ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b58935]">
                Members
              </p>

              <h3 className="mt-3 text-lg font-semibold">
                Member login
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Access your membership and holiday information.
              </p>

              <span className="mt-5 inline-block text-sm font-semibold text-[#07172a] transition group-hover:text-[#b5862c]">
                Login →
              </span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}