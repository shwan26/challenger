"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { getDay, loadCheckIns, swift30, upsertCheckIn, type CheckIn } from "@/lib/challenges";
import { getSwiftPlanDay } from "@/content/swift30Plan";


export default function DayPage() {
  const params = useParams<{ day: string }>();
  const router = useRouter();
  const day = Number(params.day);

  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const existing = useMemo(() => getDay(checkIns, day), [checkIns, day]);

  const [done, setDone] = useState(false);
  const [minutes, setMinutes] = useState<number>(30);
  const [link, setLink] = useState("");
    const [finished, setFinished] = useState("");
    const [hard, setHard] = useState("");
    const [nextStep, setNextStep] = useState("");


  const plan = getSwiftPlanDay(day);


  useEffect(() => {
    const loaded = loadCheckIns(swift30.id);
    setCheckIns(loaded);
  }, []);

  useEffect(() => {
    if (!existing) return;
    setDone(existing.done);
    setMinutes(existing.minutes ?? 30);
    setLink(existing.link ?? "");
    setFinished(existing.finished ?? "");
    setHard(existing.hard ?? "");
    setNextStep(existing.nextStep ?? "");
  }, [existing]);


  if (!Number.isFinite(day) || day < 1 || day > swift30.totalDays) {
    return (
      <main className="min-h-screen bg-white px-6 py-12">
        <div className="mx-auto max-w-xl">
          <p className="text-slate-600">Invalid day.</p>
          <Link className="text-blue-600 hover:underline" href="/challenge/swift-30">Back</Link>
        </div>
      </main>
    );
  }

  function save() {
    const next = upsertCheckIn(swift30.id, {
        day,
        done,
        minutes: done ? minutes : 0,
        link: link.trim(),
        date: new Date().toISOString(),

        finished: finished.trim(),
        hard: hard.trim(),
        nextStep: nextStep.trim(),
        });

    setCheckIns(next);
    router.push("/challenge/swift-30");
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="mx-auto max-w-3xl px-6 py-12 text-[15px] sm:text-[16px]">
        <Link className="text-sm text-blue-600 hover:underline" href="/challenge/swift-30">
            ← Back to board
        </Link>

        <div className="mt-4">
            <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight">Day {day}</h1>
            <p className="mt-2 text-slate-600">
            Follow today’s plan, then log your check-in below.
            </p>
        </div>

        {plan ? (
            <div className="mt-8 rounded-3xl border border-slate-200 bg-slate-50/40 p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                <div>
                <p className="text-sm font-semibold text-blue-700">{plan.phase}</p>
                <h2 className="mt-1 text-xl sm:text-2xl font-semibold">Today’s Plan (1 hour)</h2>
                <p className="mt-1 text-slate-600">Focus: <span className="font-medium text-slate-800">{plan.focus}</span></p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm">
                <p className="text-slate-500">Time split</p>
                <p className="mt-1 font-semibold text-slate-900">15m Learn · 40m Build · 5m Log</p>
                </div>
            </div>

            {/* Learn */}
            <section className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6">
                <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Learn <span className="text-slate-500 font-normal">(15m)</span></h3>
                </div>
                <p className="mt-2 text-slate-700">{plan.learn.goal}</p>

                <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-2">
                {renderNestedBullets(plan.learn.items)}
                </ul>

                {plan.learn.resources?.length ? (
                <div className="mt-5">
                    <p className="text-sm font-semibold text-slate-700">Resources</p>
                    <ul className="mt-2 space-y-2">
                    {plan.learn.resources.map((r) => (
                        <li key={r.url}>
                        <a
                            className="inline-flex items-center gap-2 text-blue-700 hover:underline"
                            href={r.url}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <span>↗</span>
                            <span>{r.label}</span>
                        </a>
                        </li>
                    ))}
                    </ul>
                </div>
                ) : null}
            </section>

            {/* Build */}
            <section className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6">
                <h3 className="text-lg font-semibold">Build <span className="text-slate-500 font-normal">(40m)</span></h3>
                <p className="mt-2 text-slate-700">
                <span className="font-semibold">Micro-goal:</span> {plan.build.microGoal}
                </p>

                <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-2">
                {renderSteps(plan.build.tasks)}
                </ul>
            </section>

            {/* Log */}
            <section className="rounded-2xl bg-white border border-slate-200 p-5 sm:p-6">
                <h3 className="text-lg font-semibold">Log <span className="text-slate-500 font-normal">(5m)</span></h3>
                <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-2">
                {plan.log.prompts.map((x) => (
                    <li key={x} className="leading-relaxed">{x}</li>
                ))}
                </ul>
            </section>
            </div>
        ) : null}

        {/* Check-in form */}
        <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
                <h2 className="text-xl sm:text-2xl font-semibold">Daily Check-in</h2>
                <p className="mt-1 text-slate-600">Keep it short. Consistency wins.</p>
            </div>

            <label className="flex items-center gap-3 rounded-2xl border border-slate-200 px-4 py-3">
                <input
                type="checkbox"
                checked={done}
                onChange={(e) => setDone(e.target.checked)}
                className="h-5 w-5"
                />
                <span className="font-medium">Completed today</span>
            </label>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Minutes</label>
                <input
                type="number"
                min={0}
                value={minutes}
                onChange={(e) => setMinutes(Number(e.target.value))}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                disabled={!done}
                />
                {!done ? (
                <p className="text-xs text-slate-500">Tip: check “Completed today” to enable minutes.</p>
                ) : null}
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Link (GitHub / demo) — optional</label>
                <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="https://github.com/..."
                />
            </div>
            </div>

            <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">What I finished (1–3 bullets)</label>
            <textarea
                value={finished}
                onChange={(e) => setFinished(e.target.value)}
                rows={5}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder={`- Built...\n- Learned...\n- Fixed...`}
            />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">What was hard (1 sentence)</label>
                <input
                value={hard}
                onChange={(e) => setHard(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Example: Understanding @State updates was tricky."
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Next step tomorrow (1 tiny action)</label>
                <input
                value={nextStep}
                onChange={(e) => setNextStep(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-200"
                placeholder="Example: Add 2 questions and a Next button."
                />
            </div>
            </div>

            <button
            onClick={save}
            className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-white font-semibold hover:bg-blue-700 transition"
            >
            Save check-in
            </button>
        </div>
        </div>

    </main>
  );
}

function renderNestedBullets(items: string[]) {
  // Groups lines starting with "  - " or "- " as sub-items of the previous main bullet
  const grouped: { text: string; sub: string[] }[] = [];

  for (const raw of items) {
    const isSub = raw.startsWith("  - ") || raw.startsWith("- ");
    if (isSub) {
      const cleaned = raw.replace(/^(\s{0,2}-\s)/, ""); // remove "  - " or "- "
      if (!grouped.length) {
        grouped.push({ text: "", sub: [cleaned] });
      } else {
        grouped[grouped.length - 1].sub.push(cleaned);
      }
    } else {
      grouped.push({ text: raw, sub: [] });
    }
  }

  return (
    <ul className="mt-4 list-disc pl-5 text-slate-700 space-y-2">
      {grouped.map((g, idx) => (
        <li key={idx} className="leading-relaxed">
          {g.text}
          {g.sub.length > 0 ? (
            <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
              {g.sub.map((s) => (
                <li key={s} className="leading-relaxed">
                  {s}
                </li>
              ))}
            </ul>
          ) : null}
        </li>
      ))}
    </ul>
  );
}


function renderInlineCode(text: string) {
  // Split by `code` segments and render code nicely
  const parts = text.split(/(`[^`]+`)/g);

  return parts.map((part, i) => {
    if (part.startsWith("`") && part.endsWith("`")) {
      const code = part.slice(1, -1);
      return (
        <code
          key={i}
          className="rounded-md bg-slate-100 px-1.5 py-0.5 font-mono text-[0.95em] text-slate-900"
        >
          {code}
        </code>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

function renderSteps(items: string[]) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((raw) => {
        const m = raw.match(/^(\d+)\)\s*(.*)$/); // "1) blah"
        const step = m?.[1];
        const rest = m?.[2] ?? raw;

        return (
          <li key={raw} className="flex gap-3 leading-relaxed text-slate-700">
            {step ? (
              <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">
                {step}
              </span>
            ) : (
              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-slate-300" />
            )}

            <span>{renderInlineCode(rest)}</span>
          </li>
        );
      })}
    </ul>
  );
}
