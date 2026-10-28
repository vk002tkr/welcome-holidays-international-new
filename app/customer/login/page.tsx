
"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    // Frontend is ready. Authentication will be connected next.
    setMessage("Your login form is ready. Authentication setup is the next step.");
    setLoading(false);
  }

  return (
    <section className="min-h-[75vh] bg-[#f8f7f3] px-4 py-12 sm:px-6 sm:py-16 lg:py-20">
      <div className="mx-auto grid w-full max-w-6xl overflow-hidden rounded-[28px] border border-[#e9e4d9] bg-white shadow-[0_24px_80px_rgba(7,23,42,0.08)] lg:grid-cols-2">
        <div className="relative flex min-h-[280px] flex-col justify-between overflow-hidden bg-[#0b2239] p-7 text-white sm:p-10 lg:min-h-[650px] lg:p-14">
          <div
            className="pointer-events-none absolute inset-0 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 15% 10%, #b68a43 0%, transparent 38%), radial-gradient(ellipse at 90% 90%, #397d91 0%, transparent 45%)",
            }}
          />

          <div className="relative z-10">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#e0c28a]">
              Welcome Holidays
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.4em] text-white/65">
              International
            </p>
          </div>

          <div className="relative z-10 my-10 max-w-md">
            <div className="mb-6 h-px w-16 bg-[#d6b16e]" />
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#e0c28a]">
              Your next chapter begins here
            </p>
            <h1 className="mt-5 text-4xl font-light leading-[1.15] tracking-tight sm:text-5xl">
              The world is waiting
              <span className="block font-semibold">for you.</span>
            </h1>
            <p className="mt-5 max-w-sm text-sm leading-7 text-white/70">
              Access your holiday membership, explore inspiring destinations
              and start planning your next memorable escape.
            </p>
          </div>

          <div className="relative z-10 flex items-center gap-3 border-t border-white/15 pt-5">
            <span className="text-xl text-[#e0c28a]">✦</span>
            <p className="text-xs leading-5 text-white/65">
              Discover more. Travel further. Make every holiday count.
            </p>
          </div>
        </div>

        <div className="flex items-center justify-center px-6 py-10 sm:px-12 sm:py-14 lg:px-14">
          <div className="w-full max-w-md">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#a57b36]">
              Member access
            </p>

            <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#0b2239] sm:text-4xl">
              Welcome back
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-500">
              Sign in to continue your holiday journey.
            </p>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5">
              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {message && (
                <div
                  role="status"
                  className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900"
                >
                  {message}
                </div>
              )}

              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-[#26384a]"
                >
                  Membership ID
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="whi-00xxxx"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                  className="w-full rounded-xl border border-[#e1ddd4] bg-white px-4 py-3.5 text-sm text-[#0b2239] outline-none transition placeholder:text-slate-400 focus:border-[#b38a45] focus:ring-4 focus:ring-[#b38a45]/10"
                />
              </div>

              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-[#26384a]"
                  >
                    Password
                  </label>

                  <Link
                    href="/forgot-password"
                    className="text-xs font-semibold text-[#9b7538] transition hover:text-[#0b2239]"
                  >
                    Forgot password?
                  </Link>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    required
                    className="w-full rounded-xl border border-[#e1ddd4] bg-white px-4 py-3.5 pr-20 text-sm text-[#0b2239] outline-none transition placeholder:text-slate-400 focus:border-[#b38a45] focus:ring-4 focus:ring-[#b38a45]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute inset-y-0 right-3 my-auto rounded-md px-2 text-xs font-semibold text-slate-500 hover:text-[#0b2239]"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-full bg-[#0b2239] px-6 py-4 text-xs font-bold uppercase tracking-[0.17em] text-white transition hover:bg-[#173b5c] focus:outline-none focus:ring-4 focus:ring-[#0b2239]/15 disabled:opacity-60"
              >
                {loading ? "Please wait..." : "Sign in"}
                {!loading && <span aria-hidden="true">→</span>}
              </button>
            </form>

            <div className="my-7 flex items-center gap-4">
              <div className="h-px flex-1 bg-[#e9e4d9]" />
              <span className="text-[10px] uppercase tracking-[0.18em] text-slate-400">
                Welcome Holidays
              </span>
              <div className="h-px flex-1 bg-[#e9e4d9]" />
            </div>

            <p className="text-center text-sm text-slate-500">
              Not a member yet?{" "}
              <Link
                href="/register"
                className="font-semibold text-[#9b7538] hover:text-[#0b2239]"
              >
                Create an account
              </Link>
            </p>

            <p className="mt-8 text-center text-xs leading-5 text-slate-400">
              Your holiday experiences, all in one place.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
