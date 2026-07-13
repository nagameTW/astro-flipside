<div align="center">

[![CI](https://img.shields.io/github/actions/workflow/status/nagameTW/astro-flipside/ci.yml?label=CI&style=for-the-badge)](https://github.com/nagameTW/astro-flipside/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/license-MIT-2F3741?style=for-the-badge)](LICENSE)
![Astro](https://img.shields.io/badge/Astro-5-BC52EE?style=for-the-badge&logo=astro&logoColor=white)
[![Tocas UI](https://img.shields.io/badge/Tocas_UI-1F2430?style=for-the-badge)](https://tocas-ui.com/)
![i18n](https://img.shields.io/badge/i18n-%E7%B9%81%E9%AB%94%E4%B8%AD%E6%96%87%20%7C%20English-2F3741?style=for-the-badge)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-2F3741?style=for-the-badge)](CONTRIBUTING.md)

<img src="public/favicon.svg" alt="Flipside logo" width="80" height="80">

<h3 align="center">Flipside</h3>

<p align="center">
  翻個面，認識另一個你。
  <br />
  <br />
  <a href="https://nagametw.github.io/astro-flipside/">線上示範</a>
  ·
  <a href="../../issues/new/choose">回報問題</a>
  ·
  <a href="../../issues/new/choose">功能許願</a>
  <br />
  README in <strong>繁體中文</strong> / <a href="docs/README.en.md">English</a>
</p>

</div>

<details>
  <summary>目錄</summary>
  <ol>
    <li><a href="#-關於-flipside">關於 Flipside</a></li>
    <li><a href="#-快速開始">快速開始</a></li>
    <li><a href="#-功能總覽">功能總覽</a></li>
    <li><a href="#-指令">指令</a></li>
    <li><a href="#-專案結構">專案結構</a></li>
    <li><a href="#-部署">部署</a></li>
    <li><a href="#-語言">語言</a></li>
    <li><a href="#-路線圖">路線圖</a></li>
    <li><a href="#-參與貢獻">參與貢獻</a></li>
    <li><a href="#-授權">授權</a></li>
    <li><a href="#-聯絡">聯絡</a></li>
    <li><a href="#-致謝">致謝</a></li>
  </ol>
</details>

## 🪙 關於 Flipside

白天，你穿梭在信件與會議中，用名片上的職稱介紹自己，夜晚，你練琴、打球，或者換上一個只有同好才知道的 ID 上線。

兩個都是你，卻很少同時出現在同一個地方。

多數個人網站只有一種版型、一種敘事方式，於是我們總得取捨。要展現專業，還是分享熱愛？最終，只能讓其中一面代表自己。

但，何必妥協。

就像一枚硬幣，正面是專業，反面是熱愛。兩面都是真實的自己，只需要翻個面，讓訪客從不同角度認識你。

這就是 Flipside，一個簡潔、中文友善的 Astro 主題。它基於我的個人網站專案，移除了所有私人內容，保留開發過程中累積的設計思考，整理成一個可以直接使用的網站起點，希望讓更多人能打造一個既能展現專業，也能保留個人特色的專屬空間。

<img src="docs/hero.jpg" alt="Flipside 頁面總覽，包含 Work 與 Life 兩面、相簿、文章列表、程式碼區塊與暗色主題">

### 🛠️ 使用技術

- [Astro](https://astro.build/) — 靜態輸出的網站框架
- [Tocas UI](https://tocas-ui.com/) — 為中文設計的 UI 框架
- [Expressive Code](https://expressive-code.com/) — 程式碼區塊
- [Pagefind](https://pagefind.app/) — 純靜態全文搜尋

## 🚀 快速開始

**1. 建立你的 repo**

點上方 **Use this template**，或用 GitHub CLI：

```bash
gh repo create my-site --template nagameTW/astro-flipside --public --clone
```

repo 的名字決定網址。叫 `<帳號>.github.io`，網站就在 `https://<帳號>.github.io/`。叫其他名字，例如 `my-site`，網站就在 `https://<帳號>.github.io/my-site/`。

**2. 本機跑起來**

```bash
cd my-site
npm install
npm run dev     # 開 http://localhost:4321，改檔即時更新
```

**3. 填你的網址**

編輯 `src/config.ts` 最上面兩欄，照第 1 步的網址填：

```ts
site: "https://<帳號>.github.io",
base: "/my-site", // repo 叫 <帳號>.github.io 的話，這裡留 ""
```

**4. 開啟 GitHub Pages**

到 repo 的 **Settings → Pages**，把 **Source** 選成 **GitHub Actions**。設一次就好。

**5. 部署**

```bash
git add -A
git commit -m "first deploy"
git push        # Actions 自動建置，約一分鐘後網站上線
```

之後每次 push 到 `main` 都會自動重新部署。部署後如果樣式或圖片全部消失，回第 3 步檢查 `base`。內容怎麼加，照著[新增內容](#-新增內容)的三個範例就行；`src/config.ts` 的其餘欄位都有註解。範例內容讀完就可以刪。

想部署到 Netlify、Vercel 或 Cloudflare Pages 也可以。模板是純靜態輸出，匯入 repo 就能用，`base` 留 `""`，做法見 [Astro 部署指南](https://docs.astro.build/en/guides/deploy/)。

## ✍️ 新增內容

三種內容各有固定位置：文章在 `src/content/blog/`，專案在 `src/data/projects.ts`，相簿在 `src/data/gallery.ts`。存檔後 `npm run dev` 立刻更新。

**寫一篇文章**

在 `src/content/blog/` 新增 `.md` 或 `.mdx` 檔，圖片放在文章旁邊、用相對路徑引用：

```md
---
title: "文章標題"
description: "列表與搜尋結果顯示的摘要" # 可省略
pubDate: "2026-07-13"
updatedDate: "2026-07-20" # 可省略
heroImage: "./cover.jpg" # 可省略；文章頁大圖，兼列表縮圖
tags: ["life", "music"] # 可省略
draft: true # 草稿只在 dev 顯示，建置自動排除
---

內文就是一般 Markdown。相對路徑的圖片 `![說明](./photo.jpg)` 會自動轉
webp 並產生響應式尺寸；程式碼區塊、表格、目錄、標籤都是內建。
```

範例文章「功能總覽」（`src/content/blog/kitchen-sink-zh.md`）示範了所有支援的排版，對照著寫最快。

**加一個專案**

在 `src/data/projects.ts` 的 `PROJECTS` 陣列加一筆：

```ts
{
  name: "專案名稱",
  description: "一句話說明。",
  tech: ["Astro", "TypeScript"],       // 顯示成技術標籤
  url: "https://github.com/you/repo",  // 整個區塊都連到這裡
  img: cover,                          // 可省略；檔案頂部 import 的圖或 https URL
},
```

**加一張照片**

圖檔放進 `src/assets/gallery/`，在 `src/data/gallery.ts` import 後加一筆：

```ts
{
  src: photo,                        // import 的圖或 https URL
  alt: "給讀屏器與搜尋引擎的描述",   // 必填
  caption: "圖下與燈箱顯示的說明",   // 可省略
},
```

陣列順序就是顯示順序。

## ✨ 功能總覽

**首頁**

- 大字標語、網站拼貼圖，加上關於、文章、相簿、專案的預覽區塊與深色收尾
- 每個區塊底色交替，內容隨著捲動一段一段浮現

**會翻面的關於頁**

- Work/Life 切換鈕，附 3D 大頭貼翻轉動畫
- 兩個面都用同一組九種通用內容區塊組成，型別名稱是 text、chips、kv、timeline、highlights、cards、stats、links 和 markdown
- Work 面資料在 `src/data/about.ts`，Life 面資料在 `src/data/life.ts`

**部落格**

- Expressive Code 程式碼區塊，有檔名標籤、行號和 diff 標記高亮
- 自動產生的目錄會跟著捲動，另外有標題錨點和中英文皆準確的閱讀時間估算
- Pagefind 全文搜尋，純靜態，不需要伺服器
- 標籤與標籤索引頁、分頁、文章間的上一篇與下一篇導覽
- RSS feed
- 在 frontmatter 設 `draft: true` 的草稿只會在 `astro dev` 顯示，正式建置與 RSS 都會自動排除
- frontmatter 的 `heroImage` 一魚兩吃，同一張圖也會當作部落格列表裡該篇文章的縮圖

**相簿**

- Pinterest 風格的 masonry 版面，用 CSS 多欄排版，照片保留原本的長寬比
- 資料驅動，檔案放 `src/assets/gallery/`，在 `src/data/gallery.ts` import 後列出，自動轉 webp 與產生響應式尺寸
- 點圖片會用燈箱放大顯示

**專案**

- 作品集頁面：名稱、說明、技術標籤、連結和封面圖，資料在 `src/data/projects.ts`
- 3 欄格線、整個區塊都可以點，每 9 筆換頁；每頁筆數在 `src/config.ts` 的 `pageSize` 調

**全站共用**

- 換頁不重載，頁面之間平滑轉場
- 滾輪帶緩衝的平滑捲動，設定減少動態的使用者自動改回原生行為
- 暗色模式跟隨系統設定，也可以手動切換並記住選擇
- 內建 en 與 zh-TW 介面字串，改一個設定值就能全部切換
- KaTeX 數學公式、Mermaid 圖表和 giscus 留言是選用的功能旗標，預設關閉，關閉時不佔任何 bundle 大小
- 支援 GitHub project page 的 base 路徑
- 完全靜態輸出，零密鑰、零伺服器
- 每一頁的行動版 Lighthouse 都是滿分：效能、無障礙、最佳實踐、SEO 四項各 100

## 🧰 指令

所有指令都在專案根目錄的終端機執行：

| 指令              | 說明                                             |
| :---------------- | :----------------------------------------------- |
| `npm run dev`     | 在 `localhost:4321` 啟動本機開發伺服器           |
| `npm run build`   | 建置正式版網站到 `dist/`，再用 Pagefind 建立索引 |
| `npm run preview` | 在本機預覽正式版建置結果                         |
| `npm run check`   | 對專案做型別檢查                                 |
| `npm test`        | 執行 `plugins/*.test.mjs` 的單元測試             |
| `npm run fmt`     | 用 Prettier 格式化程式碼                         |

## 🗂️ 專案結構

```
src/
├── components/    # Astro 元件：Navbar、Footer、FaceToggle、blocks/ 等
├── content/blog/  # ← 部落格文章（.md / .mdx）
├── data/          # ← 關於／Life 頁內容、相簿、作品集、獎盃牆
├── layouts/       # Layout.astro、BlogPost.astro
├── locales/       # en.ts／zh-TW.ts 介面字串字典
├── pages/         # 路由：首頁、關於、部落格、標籤、相簿、專案、RSS、sitemap
├── styles/        # global.css
├── utils/         # 閱讀時間、時間軸、URL 工具函式
└── config.ts      # ← 網站設定的唯一來源
```

三個箭頭標示的地方，是你架設新站時真正要編輯的內容。其餘都是範本內部的實作細節。

## 🚢 部署

`.github/workflows/deploy.yml` 會執行 `npm run check && npm run build`，再透過 GitHub Pages 原生的 Actions 部署發布，每次推上 `main` 都會觸發。只需要設定一次，位置在 **Settings → Pages → Build and deployment → Source: GitHub Actions**。

`src/config.ts` 裡的 `site` 和 `base` 要跟部署方式對應：

| 部署方式         | Repo 名稱          | `site`                       | `base`           | 結果網址                                |
| ---------------- | ------------------ | ---------------------------- | ---------------- | --------------------------------------- |
| Project page     | 任意               | `"https://<user>.github.io"` | `"/<repo-name>"` | `https://<user>.github.io/<repo-name>/` |
| 使用者／組織首頁 | `<user>.github.io` | `"https://<user>.github.io"` | `""`             | `https://<user>.github.io/`             |

這個 repo 本身就是以 project page 的方式部署，線上示範在 <https://nagametw.github.io/astro-flipside/>。

## 🌐 語言

介面只認一種語言，預設是 `"zh-TW"`。想改成英文的話，把 `src/config.ts` 的 `locale` 設成 `"en"` 即可，內建字串會整批切換。兩份字典都在 `src/locales/`。要加新語言，複製 `en.ts` 的 key 照著填就行。

## 🗺️ 路線圖

已經做完的大項目：首頁入口頁、`/projects/` 作品集頁、全站搜尋、四頁滿分的 Lighthouse。接下來想做什麼、還有哪些已知問題，都放在 [open issues](../../issues)，也歡迎你提。

## 🤝 參與貢獻

歡迎 issue 和 PR。回報問題或提功能想法請走 [issue 表單](../../issues/new/choose)。小修正可以直接開 PR，較大的改動建議先開 issue 討論方向，確認再動手。

開發環境、專案結構與慣例見 [CONTRIBUTING.md](CONTRIBUTING.md)。PR 表單會引導你填寫其餘內容。CI 跑的就是你在本地能跑的那三個檢查：`npm run check && npm run build && npm test`。

## 📄 授權

MIT。詳見 [LICENSE](LICENSE)。

## 📫 聯絡

作者是 [nagameTW](https://github.com/nagameTW)，專案住在 <https://github.com/nagameTW/astro-flipside>。

## 🙏 致謝

以 [Tocas UI](https://tocas-ui.com/) 打底。部落格的骨架依循 Astro 官方 blog starter 的做法。
