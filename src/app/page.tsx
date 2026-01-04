"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadCheckIns, swift30, type CheckIn } from "@/lib/challenges";

export default function Home() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

  useEffect(() => {
    setCheckIns(loadCheckIns(swift30.id));
  }, []);

  const completed = useMemo(
    () => checkIns.filter((c) => c.done).length,
    [checkIns]
  );

  const pct = Math.round((completed / swift30.totalDays) * 100);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-3">
          <p className="text-sm font-medium text-blue-600">Current Challenge</p>
          <h1 className="text-4xl font-semibold tracking-tight">{swift30.title}</h1>
          <p className="text-slate-600">{swift30.subtitle}</p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          <Stat label="Days completed" value={`${completed} / ${swift30.totalDays}`} />
          <Stat label="Progress" value={`${pct}%`} />
          <Stat label="Today" value={new Date().toLocaleDateString()} />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold">Go to the 30-day board</h2>
              <p className="text-slate-600 text-sm">
                Click a day, check-in, and keep your streak alive.
              </p>
            </div>
            <Link
              className="rounded-xl bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 transition"
              href="/challenge/swift-30"
            >
              Open Challenge
            </Link>
          </div>

          <div className="mt-6 h-2 w-full rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{ width: `${pct}%` }}
            />
          </div>
        </div>

      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <p className="text-sm text-slate-600">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}
