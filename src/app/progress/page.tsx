"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { loadCheckIns, swift30, type CheckIn } from "@/lib/challenges";

export default function ProgressPage() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

  useEffect(() => {
    setCheckIns(loadCheckIns(swift30.id));
  }, []);

  const completedDays = useMemo(() => checkIns.filter((c) => c.done).length, [checkIns]);
  const totalMinutes = useMemo(
    () => checkIns.reduce((sum, c) => sum + (c.done ? (c.minutes ?? 0) : 0), 0),
    [checkIns]
  );

  const pct = Math.round((completedDays / swift30.totalDays) * 100);

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <Link className="text-sm text-blue-600 hover:underline" href="/challenge/swift-30">
          ← Back
        </Link>

        <h1 className="mt-3 text-3xl font-semibold">Progress</h1>
        <p className="mt-1 text-slate-600 text-sm">Your Swift 30 tracking overview.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          <Stat label="Completion" value={`${pct}%`} />
          <Stat label="Days done" value={`${completedDays} / ${swift30.totalDays}`} />
          <Stat label="Total minutes" value={`${totalMinutes}`} />
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 p-6">
          <h2 className="text-lg font-semibold">Recent check-ins</h2>
          <div className="mt-4 space-y-3">
            {checkIns
              .filter((c) => c.done)
              .sort((a, b) => (b.day ?? 0) - (a.day ?? 0))
              .slice(0, 6)
              .map((c) => (
                <div key={c.day} className="rounded-xl border border-slate-200 p-4">
                  <div className="flex items-center justify-between">
                    <p className="font-medium">Day {c.day}</p>
                    <p className="text-sm text-slate-500">{c.minutes ?? 0} min</p>
                  </div>
                  {c.link ? (
                    <a className="mt-2 inline-block text-sm text-blue-600 hover:underline" href={c.link} target="_blank" rel="noreferrer">
                      Open link
                    </a>
                  ) : null}
                </div>
              ))}

            {completedDays === 0 ? (
              <p className="text-sm text-slate-600">No check-ins yet. Start with Day 1.</p>
            ) : null}
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
