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
  name: "林曉映",
  headline: "範例科技 · 軟體工程師",
  bio: [
    "目前在範例科技寫程式。把這段換成你是誰、你在做什麼。",
    "第二段：過去的經歷、專注領域，任何能說出你故事的內容。",
  ],
};

// Placeholder résumé — obviously-fake demo content. Replace every value
// below with your own history; the shapes are what Section.astro expects.
export const EXPERIENCE: Experience[] = [
  {
    period: "2023.06 – 至今",
    title: "範例科技 · 資深軟體工程師",
    duties: [
      {
        name: "平台現代化",
        text: "主導將單體服務拆分為一組可組合的 API，將回應時間中位數縮短一半。",
      },
      {
        name: "新人帶領",
        text: "帶領並指導團隊新進工程師熟悉架構、工具與程式碼審查慣例。",
      },
    ],
  },
  {
    period: "2020.07 – 2023.05",
    title: "北風貿易 · 軟體工程師",
    duties: [
      {
        name: "功能開發交付",
        text: "從規格到正式上線，端到端設計並交付面向使用者的功能。",
      },
    ],
  },
];

// Newest first, matching the work-experience timeline above.
export const EDUCATION: Education[] = [
  {
    period: "2016.09 – 2020.06",
    school: "州立大學",
    degree: "資訊工程學系學士",
    thesis: "讀取密集型網路服務的輕量快取層設計",
    description:
      "測量在關聯式資料庫前加一層小型記憶體快取，對突發讀取流量下尾端延遲的影響。",
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
  "系統設計",
  "測試與品保",
];

// Career highlights, newest first.
export const HIGHLIGHTS: Highlight[] = [
  {
    date: "2025.11",
    title: "內部黑客松",
    detail: "第一名 · 位元大隊",
    note: "打造一個即時視覺化 API 延遲的展示工具。",
  },
  {
    date: "2024.03",
    title: "範例科技創新獎",
    detail: "亞軍",
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: "範例認證工程師",
    issuer: "虛構雲端學院",
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
    ? [{ name: `論文：${e.thesis}`, text: e.description ?? "" }]
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
  { value: "6+", label: "年資" },
  { value: "42", label: "上線 Repo 數" },
  { value: "∞", label: "喝掉的咖啡" },
];

const TALKS: { label: string; url: string; note?: string }[] = [
  {
    label: "在範例科技擴展虛構系統",
    url: "https://example.com/talks/scaling-fake-systems",
    note: "範例科技開發者大會 · 2025",
  },
];

export const PROFESSIONAL_SECTIONS: Section[] = [
  // Intro paragraphs come from PROFILE.bio so the identity card and this
  // section stay in sync.
  { type: "text", title: "關於", paragraphs: PROFILE.bio },
  { type: "stats", title: "數據一覽", tiles: STATS_TILES },
  { type: "timeline", title: "經歷", entries: EXPERIENCE_ENTRIES },
  { type: "timeline", title: "學歷", entries: EDUCATION_ENTRIES },
  { type: "chips", title: "技能", items: SKILLS },
  { type: "highlights", title: "亮點", entries: HIGHLIGHTS_ENTRIES },
  { type: "cards", title: "證照", cards: CERTIFICATION_CARDS },
  { type: "links", title: "演講", links: TALKS },
];
