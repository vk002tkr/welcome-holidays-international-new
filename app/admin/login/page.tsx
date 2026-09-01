"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        "/api/admin/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Unable to login."
        );
      }

      router.push("/admin/properties/new");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to login."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#f5f2eb] px-5 py-10 text-[#07172a]">
      <div className="w-full max-w-[480px]">

        <div className="mb-8 text-center">
          <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#b58935]">
            Welcome Holidays International
          </p>

          <h1 className="mt-4 text-4xl font-light tracking-[-0.05em]">
            Admin Login
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Sign in to manage destinations and properties.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-[24px] border border-[#e4dfd5] bg-white p-7 shadow-[0_12px_40px_rgba(7,23,42,0.07)] sm:p-9"
        >
          {error && (
            <div className="mb-6 rounded-[12px] border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.12em] text-slate-500">
            Admin Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            placeholder="Enter admin password"
            autoComplete="current-password"
            required
            className="w-full rounded-[12px] border border-[#ddd8ce] px-4 py-3 text-sm outline-none transition focus:border-[#b58935]"
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-[#07172a] px-6 py-4 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-[#102a44] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In →"}
          </button>
        </form>
      </div>
    </main>
  );
}