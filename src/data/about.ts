import type {
  Section,
  TimelineEntry,
  HighlightEntry,
  CardEntry,
} from "@/data/sections";

export type Experience = {
  period: string;
  title: string;
  /** Focus areas, rendered in a tinted note block separated by rules. */
  duties: { name: string; text: string }[];
};

export type Education = {
  period: string;
  school: string;
  degree: string;
  /** Thesis title, for degrees that have one. */
  thesis?: string;
  /** What the thesis did, in a paragraph. */
  description?: string;
};

/** A dated public achievement: awards, talks, community work. */
export type Highlight = {
  date: string;
  title: string;
  detail?: string;
  /** An extra line, e.g. a project's one-line pitch. */
  note?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  year: string;
};

// Dates read `YYYY.MM`, kept short: the timeline renders them in a
// nowrap column, and a wider one squeezes the entry beside it.

export const PROFILE = {
  name: "Alex Lin",
  headline: "Acme Corp · Software Engineer",
  bio: [
    "I build things at Acme Corp. Replace this paragraph with who you are and what you do.",
    "Second paragraph: past experience, focus areas, whatever tells your story.",
  ],
};

// Placeholder résumé — obviously-fake demo content. Replace every value
// below with your own history; the shapes are what Section.astro expects.
export const EXPERIENCE: Experience[] = [
  {
    period: "2023.06 – Present",
    title: "Acme Corp · Senior Software Engineer",
    duties: [
      {
        name: "Platform Modernization",
        text: "Led the migration of a monolithic service into a set of composable APIs, cutting median response time in half.",
      },
      {
        name: "Mentorship",
        text: "Onboard and mentor new engineers on the team's architecture, tooling, and code-review norms.",
      },
    ],
  },
  {
    period: "2020.07 – 2023.05",
    title: "Northwind Traders · Software Engineer",
    duties: [
      {
        name: "Feature Delivery",
        text: "Designed and shipped customer-facing features end to end, from spec to production rollout.",
      },
    ],
  },
];

// Newest first, matching the work-experience timeline above.
export const EDUCATION: Education[] = [
  {
    period: "2016.09 – 2020.06",
    school: "State University",
    degree: "B.S. in Computer Science",
    thesis: "A Lightweight Caching Layer for Read-Heavy Web Services",
    description:
      "Measured how a small in-memory cache in front of a relational database affects tail latency under bursty read traffic.",
  },
];

// Placeholder skill tags — swap in your own stack.
export const SKILLS: string[] = [
  "TypeScript",
  "React",
  "Node.js",
  "PostgreSQL",
  "Docker",
  "AWS",
  "GraphQL",
  "CI/CD",
  "System Design",
  "Testing & QA",
];

// Career highlights, newest first.
export const HIGHLIGHTS: Highlight[] = [
  {
    date: "2025.11",
    title: "Internal Hackathon",
    detail: "1st place · Team Byte Force",
    note: "Built a demo tool for visualizing API latency in real time.",
  },
  {
    date: "2024.03",
    title: "Acme Corp Innovation Award",
    detail: "Runner-up",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "Certified Placeholder Practitioner",
    issuer: "Fictional Cloud Institute",
    year: "2024",
  },
];

// --- Section-block wiring for AboutProfessional -----------------------
// Splits a "start – end" period into its parts; a bare value (no " – ",
// e.g. a project's plain year) yields `start` only.
const splitPeriod = (period: string): { start: string; end?: string } => {
  const [start, end] = period.split(" – ");
  return { start, end };
};

// Combines a Highlight's optional `detail`/`note` into the single
// `subtitle` line the generic HighlightEntry has room for.
const joinDetail = (...parts: (string | undefined)[]): string | undefined =>
  parts.filter(Boolean).join(" · ") || undefined;

const EXPERIENCE_ENTRIES: TimelineEntry[] = EXPERIENCE.map((e) => ({
  title: e.title,
  ...splitPeriod(e.period),
  duties: e.duties,
}));

const EDUCATION_ENTRIES: TimelineEntry[] = EDUCATION.map((e) => ({
  title: e.school,
  subtitle: e.degree,
  ...splitPeriod(e.period),
  duties: e.thesis
    ? [{ name: `Thesis: ${e.thesis}`, text: e.description ?? "" }]
    : undefined,
}));

const HIGHLIGHTS_ENTRIES: HighlightEntry[] = HIGHLIGHTS.map((h) => ({
  title: h.title,
  subtitle: joinDetail(h.detail, h.note),
  date: h.date,
}));

const CERTIFICATION_CARDS: CardEntry[] = CERTIFICATIONS.map((c) => ({
  title: c.name,
  subtitle: `${c.issuer} · ${c.year}`,
  img: "",
}));

// Quick-facts strip; playful values are deliberate (this is placeholder data).
const STATS_TILES: { value: string; label: string }[] = [
  { value: "6+", label: "Years experience" },
  { value: "42", label: "Repos shipped" },
  { value: "∞", label: "Cups of coffee" },
];

const TALKS: { label: string; url: string; note?: string }[] = [
  {
    label: "Scaling Fake Systems at Acme Corp",
    url: "https://example.com/talks/scaling-fake-systems",
    note: "Acme DevCon · 2025",
  },
];

export const PROFESSIONAL_SECTIONS: Section[] = [
  // Intro paragraphs come from PROFILE.bio so the identity card and this
  // section stay in sync.
  { type: "text", title: "About", paragraphs: PROFILE.bio },
  { type: "stats", title: "By the Numbers", tiles: STATS_TILES },
  { type: "timeline", title: "Experience", entries: EXPERIENCE_ENTRIES },
  { type: "timeline", title: "Education", entries: EDUCATION_ENTRIES },
  { type: "chips", title: "Skills", items: SKILLS },
  { type: "highlights", title: "Highlights", entries: HIGHLIGHTS_ENTRIES },
  { type: "cards", title: "Certifications", cards: CERTIFICATION_CARDS },
  { type: "links", title: "Talks", links: TALKS },
];
