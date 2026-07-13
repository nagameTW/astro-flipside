export type Project = {
  name: string;
  description: string;
  tech: string[];
  url: string;
};

// Demo entries — replace with your own projects. Rendered by /projects/.
export const PROJECTS: Project[] = [
  {
    name: "這個範本",
    description: "你現在看到的這個會翻面的個人網站。",
    tech: ["Astro", "TypeScript"],
    url: "https://github.com/your-name/astro-flipside",
  },
  {
    name: "歌詞本",
    description: "把手寫歌詞整理成可以分享的網頁，支援段落標記和押韻高亮。",
    tech: ["Astro", "CSS"],
    url: "https://github.com/your-name/lyrics-book",
  },
  {
    name: "demo 架",
    description: "錄音 demo 的整理架，按日期和調性歸檔，附試聽波形。",
    tech: ["TypeScript", "Web Audio"],
    url: "https://github.com/your-name/demo-shelf",
  },
];
