export type Focus = "Swift basics" | "SwiftUI" | "Content" | "Polish" | "Packaging";

export type LinkResource = { label: string; url: string };

export type DayPlan = {
  day: number;
  phase: string; // e.g. "Days 1–5"
  focus: Focus;

  learn: {
    goal: string;
    items: string[];
    resources?: LinkResource[];
  };

  build: {
    microGoal: string;
    tasks: string[];
  };

  log: {
    prompts: string[]; // keep same every day if you want
  };
};

const defaultLogPrompts = [
  "What I finished (1–3 bullets)",
  "What was hard (1 sentence)",
  "Next step tomorrow (1 tiny action)",
];

export const swift30IntensivePlan: DayPlan[] = [
  // Days 1–5: Swift fundamentals (move fast)
  {
  day: 1,
  phase: "Days 1–5: Swift fundamentals",
  focus: "Swift basics",
  learn: {
    goal: "Follow simple steps in Swift Playgrounds + do small study tasks (notes + recall) so you actually remember View, VStack, Text, Button, @State, and functions.",
    items: [
      "Step 0 (Open file): Swift Playgrounds → New App → open `ContentView.swift`.",
      "Step 1 (Study — 2 min): Read the template and label what each part is.",
      "  - `import SwiftUI` = enables SwiftUI",
      "  - `struct ContentView: View` = your screen",
      "  - `var body: some View` = UI goes here",

      "Step 2 (Layout): Replace template UI with `VStack(spacing: 16)`.",
      "  - Run the app: confirm items stack vertically.",
      "  - Mini test: change spacing `16 → 24` and run again.",

      "Step 3 (Text): Add `Text(\"Swift Day 1 Quiz\")` + style with `.font(.title2)` and `.fontWeight(.bold)`.",
      "  - Run the app: confirm title looks bigger.",

      "Step 4 (Study — 3 min): Write 3 quick notes (in Notes/Notion).",
      "  - What is a `View` in your own words?",
      "  - What does `VStack` do?",
      "  - What is `Text` used for?",

      "Step 5 (@State): Add `@State` variables: `score`, `feedback`, `answered`.",
      "  - Run the app: nothing changes yet (normal).",

      "Step 6 (Study — 2 min): Flashcards (quick recall).",
      "  - Card 1: `let` vs `var`?",
      "  - Card 2: What does `@State` do?",
      "  - Card 3: When does UI update in SwiftUI?",

      "Step 7 (Show state): Add `Text(feedback)` and `Text(\"Score: \\(score)\")`.",
      "  - Run the app: confirm feedback + score appear.",

      "Step 8 (Buttons): Add 2 buttons: `Button(\"let\") { ... }` and `Button(\"var\") { ... }`.",
      "  - Run the app: confirm buttons show.",

      "Step 9 (Function): Create `checkAnswer()` and call it from both buttons.",
      "  - Run the app: tap buttons → feedback changes.",

      "Step 10 (Prevent double scoring): Add `guard !answered else { return }` inside `checkAnswer()`.",
      "  - Test: tap correct answer many times → score increases only once.",

      "Step 11 (Reset): Add Reset button + `resetGame()` to reset score/feedback/answered.",
      "  - Run the app: Reset returns to start state.",

      "Step 12 (Study — 3 min): Explain aloud (or write 2 sentences).",
      "  - Explain how tapping a Button updates the UI using `@State`.",
      "  - Explain what `checkAnswer()` changes and why the screen updates.",

      "Mini exercises (5 minutes):",
      "  - Change the question text and run.",
      "  - Add a third answer button and run.",
      "  - Make feedback shorter/clearer and run.",
    ],
    resources: [
      { label: "Swift Book — The Basics (let/var, types)", url: "https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html" },
      { label: "Apple — SwiftUI Essentials (official)", url: "https://developer.apple.com/tutorials/swiftui" },
      { label: "SwiftUI Documentation", url: "https://developer.apple.com/documentation/swiftui" },
    ],
  },
  build: {
    microGoal: "Swift Playgrounds App: build the Day 1 1-question quiz screen (Text + 2 answer buttons + feedback + score + reset).",
    tasks: [
      "1) Add `@State` variables: `score`, `feedback`, `answered`.",
      "2) Build layout with `VStack(spacing: 16)` + title `Text`.",
      "3) Show the question inside a card (padding + background + corner radius).",
      "4) Add two answer buttons (`let`, `var`) that call `checkAnswer(\"...\")`.",
      "5) Add `Text(feedback)` + `Text(\"Score: \\(score)\")`.",
      "6) Add Reset button that calls `resetGame()`.",
      "7) Test flow: correct → score increases once; wrong → score doesn’t increase; reset works.",
      "8) (Optional study): Add 1 comment above each `@State` explaining what it controls.",
    ],
  },
  log: { prompts: defaultLogPrompts },
},

  {
    day: 2,
    phase: "Days 1–5: Swift fundamentals",
    focus: "Swift basics",
    learn: {
        goal: "Use comparisons + if/else confidently, and connect them to SwiftUI button logic (correct/wrong + score range message).",
        items: [
        "Where (Swift Playgrounds): Open your Day 1 App → `ContentView.swift`.",
        "Comparisons: `==` equal, `!=` not equal, `>` greater, `<` less.",
        "Boolean logic: `&&` means “both true”, `||` means “either true”.",
        "If/else pattern you’ll use today:\n  - `if condition { ... } else { ... }`",
        "Mini practice (2 minutes): Write 3 tiny conditions and predict the result before running:\n  - `3 > 2` \n  - `\"let\" == \"var\"` \n  - `(score >= 3) && (score <= 4)`",
        "SwiftUI connection: when you tap an answer button, you run `checkAnswer()` which uses if/else and updates `@State`.",
        "Goal today: add 4 more questions (total 5) and show a final “score range message” on the Result screen.",
        ],
        resources: [
        { label: "Swift Book — Control Flow (if/else)", url: "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/" },
        { label: "Swift Book — Basic Operators (comparisons, &&, ||)", url: "https://docs.swift.org/swift-book/LanguageGuide/BasicOperators.html" },
        { label: "SwiftUI Docs (Button, @State)", url: "https://developer.apple.com/documentation/swiftui" },
        ],
    },
    build: {
        microGoal: "Expand to 5 questions and show a result message based on score range (0–2, 3–4, 5).",
        tasks: [
        "1) Create a Question model (if you don’t already): `struct Question { text, answers, correctIndex, explanation }`.",
        "2) Add 4 more questions (total = 5). Keep them beginner-friendly (let/var, Int/String/Bool, print, interpolation).",
        "3) Add state for navigation: `@State var currentIndex = 0`, `@State var showResult = false`.",
        "4) Update Next logic:\n  - When user taps Next: set `answered = false`, `feedback = ...`, then `currentIndex += 1`.\n  - If `currentIndex` becomes equal to `questions.count`, set `showResult = true`.",
        "5) Create a score range message function:\n  - 0–2: “Good start — review basics and try again.”\n  - 3–4: “Nice! You’re close — keep practicing.”\n  - 5: “Perfect! Ready to add more features.”",
        "6) Show the message on a Result screen:\n  - Display `Score: X/5`\n  - Display the range message\n  - Add Restart button (reset score, index, showResult=false).",
        "7) Quick test:\n  - Try all wrong → should show 0–2 message\n  - Try 3 correct → should show 3–4 message\n  - Try all correct → should show perfect message",
        ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 3,
    phase: "Days 1–5: Swift fundamentals",
    focus: "Swift basics",
    learn: {
      goal: "Use arrays + loops to remove repetition.",
      items: [
        "Learn: arrays + for loop",
        "Practice: loop an array and print each item",
      ],
      resources: [
        { label: "Swift Book: Collection Types", url: "https://docs.swift.org/swift-book/LanguageGuide/CollectionTypes.html" },
      ],
    },
    build: {
      microGoal: "Store questions in arrays and loop to ask them.",
      tasks: [
        "Store questions/answers in arrays (or simple structs if you want)",
        "Loop through questions and update score",
        "Prevent index mistakes (keep arrays aligned)",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 4,
    phase: "Days 1–5: Swift fundamentals",
    focus: "Swift basics",
    learn: {
      goal: "Write and use functions to organize logic.",
      items: [
        "Learn: functions with parameters and return values",
        "Practice: make a function that returns Bool",
      ],
      resources: [
        { label: "Swift Book: Functions", url: "https://docs.swift.org/swift-book/LanguageGuide/Functions.html" },
      ],
    },
    build: {
      microGoal: "Refactor with checkAnswer() and cleaner scoring.",
      tasks: [
        "Create checkAnswer(userAnswer, correctAnswer) -> Bool",
        "Move scoring into a function",
        "Make code shorter + easier to read",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 5,
    phase: "Days 1–5: Swift fundamentals",
    focus: "Swift basics",
    learn: {
      goal: "Understand optionals and safe unwrapping (basic).",
      items: [
        "Learn: Optional meaning + nil",
        "Practice: if let / guard let (1 example each)",
      ],
      resources: [
        { label: "Swift Book: The Basics (Optionals)", url: "https://docs.swift.org/swift-book/LanguageGuide/TheBasics.html" },
      ],
    },
    build: {
      microGoal: "Handle unknown/empty input + restart quiz.",
      tasks: [
        "If answer is empty: show helpful message",
        "Add 'restart' flow (reset score + index)",
        "Clean final console version",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },

  // Days 6–10: SwiftUI core + working game loop
  {
    day: 6,
    phase: "Days 6–10: SwiftUI core",
    focus: "SwiftUI",
    learn: {
      goal: "Build a basic SwiftUI layout and understand Views.",
      items: [
        "Learn: Text, VStack, modifiers (font/padding)",
        "Practice: make a simple card UI",
      ],
      resources: [
        { label: "Apple Swift", url: "https://developer.apple.com/swift/" },
      ],
    },
    build: {
      microGoal: "Home screen + Start button.",
      tasks: [
        "Title + subtitle + Start button",
        "Basic theme (white + blue)",
        "Make layout clean (spacing + font sizes)",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 7,
    phase: "Days 6–10: SwiftUI core",
    focus: "SwiftUI",
    learn: {
      goal: "Use @State to update UI from buttons.",
      items: [
        "Learn: @State + Button actions",
        "Practice: counter example (increment score)",
      ],
      resources: [
        { label: "Swift Resources", url: "https://developer.apple.com/swift/resources/" },
      ],
    },
    build: {
      microGoal: "Game screen: question + 3 answers + feedback text.",
      tasks: [
        "Show question text",
        "3 answer buttons",
        "Show feedback text (Correct/Wrong)",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 8,
    phase: "Days 6–10: SwiftUI core",
    focus: "SwiftUI",
    learn: {
      goal: "Model your data with a struct.",
      items: [
        "Learn: struct Question { text, answers, correctIndex }",
        "Practice: make 2 Question objects",
      ],
    },
    build: {
      microGoal: "Replace arrays with [Question].",
      tasks: [
        "Create Question struct",
        "Create questions array",
        "Update UI to use questions[currentIndex]",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 9,
    phase: "Days 6–10: SwiftUI core",
    focus: "SwiftUI",
    learn: {
      goal: "Create simple navigation flow.",
      items: [
        "Learn: NavigationStack OR conditional views with state",
        "Practice: Home -> Game view switch",
      ],
      resources: [
        { label: "Get Ready (SSC)", url: "https://developer.apple.com/swift-student-challenge/get-ready/" },
      ],
    },
    build: {
      microGoal: "Home → Game → Result screen.",
      tasks: [
        "Result screen shows score",
        "Restart button returns to Home or resets game",
        "Make navigation smooth (no weird state)",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 10,
    phase: "Days 6–10: SwiftUI core",
    focus: "Polish",
    learn: {
      goal: "Improve UI readability with spacing/typography.",
      items: [
        "Learn: padding, frame, cornerRadius, shadow (light)",
        "Practice: make one reusable button style",
      ],
    },
    build: {
      microGoal: "Polish buttons + layout consistency.",
      tasks: [
        "Bigger tap targets",
        "Consistent spacing across screens",
        "Clear visual hierarchy (title > question > buttons)",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },

  // Days 11–15: Content scale + clarity
  {
    day: 11,
    phase: "Days 11–15: Content + clarity",
    focus: "Content",
    learn: {
      goal: "Write clear instructions and educational intent.",
      items: [
        "Learn: short UI copy principles",
        "Practice: rewrite 3 labels to be clearer",
      ],
    },
    build: {
      microGoal: "Add Help/Intro screen: how to play + what you learn.",
      tasks: [
        "Help screen accessible from Home",
        "Explain rules in 3–5 bullets",
        "Add 'Why this matters' 1–2 lines",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 12,
    phase: "Days 11–15: Content + clarity",
    focus: "SwiftUI",
    learn: {
      goal: "Randomization basics for better replay.",
      items: [
        "Learn: shuffle() and random order",
        "Practice: shuffle an array and print",
      ],
    },
    build: {
      microGoal: "Shuffle questions + Next without repeats in one run.",
      tasks: [
        "Shuffle questions at game start",
        "Next increments index safely",
        "End game when out of questions",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 13,
    phase: "Days 11–15: Content + clarity",
    focus: "SwiftUI",
    learn: {
      goal: "Refactor to keep UI clean and logic separate.",
      items: [
        "Learn: moving logic into helper methods or a simple engine",
        "Practice: extract one function from view code",
      ],
    },
    build: {
      microGoal: "Create a simple GameEngine (or helper functions).",
      tasks: [
        "Move answer checking into engine/helper",
        "Keep view focused on rendering",
        "Rename confusing variables",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 14,
    phase: "Days 11–15: Content + clarity",
    focus: "Polish",
    learn: {
      goal: "Basic accessibility for readability.",
      items: [
        "Learn: contrast, font size, labels",
        "Practice: make buttons readable at a glance",
      ],
    },
    build: {
      microGoal: "Improve text + labels + button wording.",
      tasks: [
        "Use simple English",
        "Avoid tiny text",
        "Add accessibility labels if needed",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 15,
    phase: "Days 11–15: Content + clarity",
    focus: "Content",
    learn: {
      goal: "Add educational feedback (not just right/wrong).",
      items: [
        "Learn: short explanation pattern (1–2 sentences)",
        "Practice: write 3 mini explanations",
      ],
    },
    build: {
      microGoal: "Add explanation after answers for 5+ questions.",
      tasks: [
        "Add explanation field to Question",
        "Show explanation after selecting answer",
        "Keep it short + helpful",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },

  // Days 16–20: Make it real + reliable
  {
    day: 16,
    phase: "Days 16–20: Reliability",
    focus: "Content",
    learn: {
      goal: "Design difficulty/categories simply.",
      items: [
        "Learn: use enums or simple strings for categories",
        "Practice: switch on difficulty",
      ],
    },
    build: {
      microGoal: "Add difficulty selector (Easy/Hard) switching question sets.",
      tasks: [
        "Difficulty selection on Home",
        "Load correct question list",
        "Show difficulty label during game",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 17,
    phase: "Days 16–20: Reliability",
    focus: "SwiftUI",
    learn: {
      goal: "Prevent state bugs from fast taps.",
      items: [
        "Learn: disable buttons after selection",
        "Practice: lock UI with a boolean",
      ],
    },
    build: {
      microGoal: "Prevent double-tap issues + lock answers after selection.",
      tasks: [
        "Disable buttons after one tap",
        "Add Next button only after answering",
        "Reset lock when moving to next question",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 18,
    phase: "Days 16–20: Reliability",
    focus: "SwiftUI",
    learn: {
      goal: "Light persistence (best score).",
      items: [
        "Learn: UserDefaults basics",
        "Practice: save/load an Int",
      ],
    },
    build: {
      microGoal: "Save best score + add Reset button.",
      tasks: [
        "Save best score at game end",
        "Show best score on Home",
        "Add reset best score (optional)",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 19,
    phase: "Days 16–20: Reliability",
    focus: "Packaging",
    learn: {
      goal: "Understand offline-first + contest constraints mindset.",
      items: [
        "Learn: keep app offline + light assets",
        "Practice: replace one image with SF Symbol",
      ],
    },
    build: {
      microGoal: "Remove risky features and keep everything offline.",
      tasks: [
        "No networking/auth",
        "Use SF Symbols where possible",
        "Keep assets minimal",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 20,
    phase: "Days 16–20: Reliability",
    focus: "Polish",
    learn: {
      goal: "Testing mindset: try to break your own app.",
      items: [
        "Learn: test edge cases (restart mid-game, fast taps)",
        "Practice: write a tiny test checklist",
      ],
    },
    build: {
      microGoal: "Run 5 playthroughs, fix top 2 issues.",
      tasks: [
        "Do 5 complete runs",
        "Write down issues",
        "Fix the top 2",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },

  // Days 21–25: Structure + polish
  {
    day: 21,
    phase: "Days 21–25: Structure + polish",
    focus: "SwiftUI",
    learn: {
      goal: "Keep code readable with view separation.",
      items: [
        "Learn: split views into files",
        "Practice: extract one view component",
      ],
    },
    build: {
      microGoal: "Split views: HomeView, GameView, ResultView, HelpView.",
      tasks: [
        "Create separate files",
        "Move code cleanly",
        "Ensure app still runs",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 22,
    phase: "Days 21–25: Structure + polish",
    focus: "Polish",
    learn: {
      goal: "Add one subtle animation.",
      items: [
        "Learn: withAnimation + scale/opacity",
        "Practice: animate a text change",
      ],
    },
    build: {
      microGoal: "Add one gentle animation for feedback.",
      tasks: [
        "Correct answer pop or fade",
        "Keep it subtle",
        "Make sure it doesn’t distract",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 23,
    phase: "Days 21–25: Structure + polish",
    focus: "Polish",
    learn: {
      goal: "Apply visual consistency (spacing, fonts, alignment).",
      items: [
        "Learn: create a spacing/font system",
        "Practice: reuse same padding across screens",
      ],
    },
    build: {
      microGoal: "Unify UI: spacing, fonts, colors, alignment.",
      tasks: [
        "Pick 1–2 font sizes for headings/body",
        "Use consistent padding",
        "Keep the same button style",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 24,
    phase: "Days 21–25: Structure + polish",
    focus: "Packaging",
    learn: {
      goal: "Keep project lean (remove unused stuff).",
      items: [
        "Learn: delete unused assets/files",
        "Practice: search for unused code",
      ],
    },
    build: {
      microGoal: "Remove unused assets + dead code.",
      tasks: [
        "Delete unused images",
        "Remove unused variables/functions",
        "Rebuild and verify nothing breaks",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 25,
    phase: "Days 21–25: Structure + polish",
    focus: "Content",
    learn: {
      goal: "Design a judge-friendly first impression.",
      items: [
        "Learn: make value obvious in 30 seconds",
        "Practice: write a one-line app pitch",
      ],
    },
    build: {
      microGoal: "Add Quick Start / Demo Mode.",
      tasks: [
        "A button that starts immediately",
        "Ensure instructions are still accessible",
        "Make the first screen extremely clear",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },

  // Days 26–30: Packaging + story
  {
    day: 26,
    phase: "Days 26–30: Packaging + story",
    focus: "Packaging",
    learn: {
      goal: "Prep for app playground submission structure (light).",
      items: [
        "Learn: keep entry point clear",
        "Practice: ensure project files are organized",
      ],
    },
    build: {
      microGoal: "Organize files + clean entry point for .swiftpm prep.",
      tasks: [
        "Group views/models",
        "Check naming consistency",
        "Confirm clean build/run",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 27,
    phase: "Days 26–30: Packaging + story",
    focus: "Content",
    learn: {
      goal: "Write the story: what it does, who it helps, what you learned.",
      items: [
        "Learn: short storytelling structure (problem → solution → impact)",
        "Practice: write 3 bullet points of impact",
      ],
    },
    build: {
      microGoal: "Write project notes for submission / README.",
      tasks: [
        "What it does (1–2 sentences)",
        "Who it helps (1 sentence)",
        "Hardest part + what you learned (2 bullets)",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 28,
    phase: "Days 26–30: Packaging + story",
    focus: "Polish",
    learn: {
      goal: "Execution day: no new learning, just cleanup.",
      items: ["No new learning—focus on improving what exists."],
    },
    build: {
      microGoal: "Final code cleanup + comments + rename messy variables.",
      tasks: [
        "Remove duplication",
        "Rename confusing variables",
        "Add short comments only where needed",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 29,
    phase: "Days 26–30: Packaging + story",
    focus: "Polish",
    learn: {
      goal: "Execution day: finalize UX copy and flow.",
      items: ["No new learning—focus on UX clarity."],
    },
    build: {
      microGoal: "Final UX pass: texts, labels, help screen.",
      tasks: [
        "Check all texts for clarity",
        "Ensure buttons are descriptive",
        "Make Help screen short and useful",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
  {
    day: 30,
    phase: "Days 26–30: Packaging + story",
    focus: "Packaging",
    learn: {
      goal: "Execution day: final playthrough and wrap-up.",
      items: ["No new learning—final verification."],
    },
    build: {
      microGoal: "Final full playthrough + screenshots/notes for submission.",
      tasks: [
        "Do 2 full playthroughs",
        "Take screenshots if needed",
        "Write final 3–4 sentence summary",
      ],
    },
    log: { prompts: defaultLogPrompts },
  },
];

export function getSwiftPlanDay(day: number): DayPlan | undefined {
  return swift30IntensivePlan.find((d) => d.day === day);
}
