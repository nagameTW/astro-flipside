import type { Section, CardEntry } from "@/data/sections";
import { TROPHIES } from "@/data/trophies";

/** Shared by both faces. */
export const AVATAR = "/avatar.svg";

// Casual self-intro — obviously-fake demo persona.
const INTRO = [
  "The person behind the keyboard once Acme Corp clocks out for the day.",
  "Into games, music, and cooking experiments that don't always work out.",
  "Still looking for a hobby that sticks for more than a month.",
];

// Interests as tags (like the Work face's Skills).
const INTERESTS = [
  "Gaming",
  "Music",
  "Cooking",
  "Photography",
  "Board Games",
  "Hiking",
  "Anime",
  "Reading",
];

// Placeholder gear cards, machine first then peripherals.
const GEAR: { label: string; item: string; icon: string }[] = [
  {
    label: "Processor",
    item: "Generic 8-core CPU",
    icon: "is-microchip-icon",
  },
  { label: "Memory", item: "32 GB RAM", icon: "is-memory-icon" },
  {
    label: "Keyboard",
    item: "Mechanical, tactile switches",
    icon: "is-keyboard-icon",
  },
];

const TROPHY_CARDS: CardEntry[] = TROPHIES.map((trophy) => ({
  title: trophy.caption,
  img: trophy.src,
}));

// Freeform catch-all — demonstrates the markdown block (list + bold text).
const MISC_BODY = `Sometimes there's no clean block for what I want to say — that's what this one is for.

**Currently tinkering with:**

- A weekend robotics side-quest
- Learning to bake sourdough (badly)
- Rewatching a favorite show for the third time`;

export const PERSONAL_SECTIONS: Section[] = [
  { type: "text", title: "About", paragraphs: INTRO },
  { type: "chips", title: "Interests", items: INTERESTS },
  // music/steam/osu self-hide until gamestats.json is populated — see
  // src/data/gamestats.ts and the README for enabling the fetch workflow.
  { type: "music" },
  { type: "steam" },
  { type: "osu" },
  { type: "cards", title: "Highlights", cards: TROPHY_CARDS },
  {
    type: "kv",
    title: "Gear",
    rows: GEAR.map((g) => ({ label: g.label, value: g.item, icon: g.icon })),
  },
  { type: "markdown", title: "Anything Else", body: MISC_BODY },
];
