"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getDay, loadCheckIns, swift30, type CheckIn } from "@/lib/challenges";

// ✅ Set your official dates here (Bangkok timezone +07:00)
const SUBMISSIONS_OPEN = new Date("2026-02-01T00:00:00+07:00");
const SUBMISSIONS_DEADLINE = new Date("2026-02-28T23:59:59+07:00");

export default function Swift30Page() {
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);

  useEffect(() => {
    setCheckIns(loadCheckIns(swift30.id));
  }, []);

  const completed = useMemo(
    () => checkIns.filter((c) => c.done).length,
    [checkIns]
  );

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex items-start justify-between gap-6">
          <div>
            <Link className="text-sm text-blue-600 hover:underline" href="/">
              ← Back
            </Link>

            <h1 className="mt-3 text-3xl font-semibold">{swift30.title}</h1>
            <p className="mt-1 text-slate-600">{swift30.subtitle}</p>

            <p className="mt-3 text-sm text-slate-500">
              Completed:{" "}
              <span className="font-medium text-slate-900">{completed}</span> /{" "}
              {swift30.totalDays}
            </p>
          </div>

          {/* ✅ Countdown + CTA */}
          <div className="flex flex-col items-end gap-3">
            <div className="grid gap-2">
              <CountdownMini label="SSC 2026 opens in" target={SUBMISSIONS_OPEN} />
              <CountdownMini
                label="Submission deadline in"
                target={SUBMISSIONS_DEADLINE}
              />
            </div>

            <Link
              href="/progress"
              className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 transition"
            >
              View Progress
            </Link>
          </div>
        </div>

        <div className="mt-8 grid gap-2 rounded-2xl border border-slate-200 p-4 sm:grid-cols-6">
          {Array.from({ length: swift30.totalDays }, (_, i) => i + 1).map(
            (day) => {
              const c = getDay(checkIns, day);
              const done = !!c?.done;

              return (
                <Link
                  key={day}
                  href={`/challenge/swift-30/day/${day}`}
                  className={`rounded-xl border p-3 text-sm transition hover:shadow-sm
                  ${done ? "border-blue-200 bg-blue-50" : "border-slate-200 bg-white"}
                `}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Day {day}</span>
                    <span
                      className={`text-xs ${
                        done ? "text-blue-700" : "text-slate-400"
                      }`}
                    >
                      {done ? "✓" : "—"}
                    </span>
                  </div>
                </Link>
              );
            }
          )}
        </div>

        <section className="mt-10 grid gap-6 md:grid-cols-2">
          <Card title="Rules">
            <ul className="list-disc pl-5 text-sm text-slate-700">
              {swift30.rules.map((r) => (
                <li key={r}>{r}</li>
              ))}
            </ul>
          </Card>

          <Card title="Daily template">
            <ul className="list-disc pl-5 text-sm text-slate-700">
              {swift30.dailyTemplate.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </Card>

          <Card title="Resources">
            <ul className="text-sm text-slate-700 space-y-2">
              {swift30.resources.map((res) => (
                <li key={res.url}>
                  <a
                    className="text-blue-600 hover:underline"
                    href={res.url}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {res.label}
                  </a>
                </li>
              ))}
            </ul>
          </Card>

          <Card title="Your goal">
            <p className="text-sm text-slate-700">
              Finish 30 days with consistent check-ins and a small Swift project
              you can show. Add your GitHub links in each day.
            </p>
          </Card>
        </section>
      </div>
    </main>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-6">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  );
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const diff = target.getTime() - now;
  const isPast = diff <= 0;
  const total = Math.max(diff, 0);

  const days = Math.floor(total / (1000 * 60 * 60 * 24));
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((total / (1000 * 60)) % 60);
  const seconds = Math.floor((total / 1000) % 60);

  return { isPast, days, hours, minutes, seconds };
}

function CountdownMini({ label, target }: { label: string; target: Date }) {
  const t = useCountdown(target);

  return (
    <div className="rounded-2xl border border-slate-200 px-4 py-3 text-sm">
      <p className="text-slate-600">{label}</p>
      {t.isPast ? (
        <p className="mt-1 font-semibold text-blue-700">Live now</p>
      ) : (
        <p className="mt-1 font-semibold">
          {t.days}d {t.hours}h {t.minutes}m {t.seconds}s
        </p>
      )}
    </div>
  );
}
