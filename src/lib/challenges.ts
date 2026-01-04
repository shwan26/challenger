export type CheckIn = {
  day: number;
  done: boolean;
  minutes?: number;
  link?: string;
  date?: string; // ISO

  finished?: string;
  hard?: string;
  nextStep?: string;
};

export type Challenge = {
  id: string;
  title: string;
  subtitle: string;
  totalDays: number;
  rules: string[];
  resources: { label: string; url: string }[];
  dailyTemplate: string[];
};

export const swift30: Challenge = {
  id: "swift-30",
  title: "Swift Intensive",
  subtitle: "30 Days — daily building + consistency",
  totalDays: 30,
  rules: [
    "Do at least 30 minutes daily.",
    "Log a short note each day.",
    "Build small, ship daily.",
  ],
  resources: [
    { label: "Swift.org Documentation", url: "https://www.swift.org/documentation/" },
    { label: "Apple Swift Book", url: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/" },
    { label: "Hacking with Swift (optional)", url: "https://www.hackingwithswift.com/" },
  ],
  dailyTemplate: [
    "Learn (15 minutes): read docs / watch videos",
    "Build (40 minutes): code something",
    "Log (5 minutes): what you learned + next step",
  ],
};

const key = (id: string) => `challenge:${id}:checkins`;

export function loadCheckIns(id: string): CheckIn[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(key(id));
    return raw ? (JSON.parse(raw) as CheckIn[]) : [];
  } catch {
    return [];
  }
}

export function saveCheckIns(id: string, checkIns: CheckIn[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key(id), JSON.stringify(checkIns));
}

export function upsertCheckIn(id: string, checkIn: CheckIn) {
  const existing = loadCheckIns(id);
  const next = existing.filter((c) => c.day !== checkIn.day).concat(checkIn);
  saveCheckIns(id, next);
  return next;
}

export function getDay(checkIns: CheckIn[], day: number) {
  return checkIns.find((c) => c.day === day);
}
