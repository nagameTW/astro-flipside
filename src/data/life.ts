import type { Section, CardEntry } from "@/data/sections";
import { TROPHIES } from "@/data/trophies";

/** Shared by both faces. */
export const AVATAR = "/avatar.svg";

// Casual self-intro — obviously-fake demo persona.
const INTRO = [
  "範例科技下班之後，鍵盤後面的那個人。",
  "喜歡玩遊戲、聽音樂，還有偶爾不太成功的下廚實驗。",
  "還在尋找一個能撐過一個月的興趣。",
];

// Interests as tags (like the Work face's Skills).
const INTERESTS = [
  "遊戲",
  "音樂",
  "烹飪",
  "攝影",
  "桌遊",
  "健行",
  "動漫",
  "閱讀",
];

// Placeholder gear cards, machine first then peripherals.
const GEAR: { label: string; item: string; icon: string }[] = [
  {
    label: "處理器",
    item: "通用 8 核心 CPU",
    icon: "is-microchip-icon",
  },
  { label: "記憶體", item: "32 GB RAM", icon: "is-memory-icon" },
  {
    label: "鍵盤",
    item: "機械軸體，觸感軸",
    icon: "is-keyboard-icon",
  },
];

const TROPHY_CARDS: CardEntry[] = TROPHIES.map((trophy) => ({
  title: trophy.caption,
  img: trophy.src,
}));

// Freeform catch-all — demonstrates the markdown block (list + bold text).
const MISC_BODY = `有些話沒有適合的區塊可以放，這一區就是留給那些內容的。

**最近在玩的東西：**

- 週末的機器人小專案
- 學做酸種麵包（做得不太好）
- 第三次重看同一部喜歡的影集`;

export const PERSONAL_SECTIONS: Section[] = [
  { type: "text", title: "關於", paragraphs: INTRO },
  { type: "chips", title: "興趣", items: INTERESTS },
  { type: "cards", title: "戰績", cards: TROPHY_CARDS },
  {
    type: "kv",
    title: "裝備",
    rows: GEAR.map((g) => ({ label: g.label, value: g.item, icon: g.icon })),
  },
  { type: "markdown", title: "其他", body: MISC_BODY },
];
