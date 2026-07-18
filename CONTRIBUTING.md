# 貢獻指南

Feel free to write in English.

感謝你願意為這個範本貢獻。

## 開發環境設置

```bash
npm install
npm run dev
```

開 PR 之前，先在本機跑一次 CI 會跑的檢查：

```bash
npm run check && npm run build && npm test
```

`npm audit` 目前應該回報 0 筆問題（Astro 7 升級後已清空）。若有新的
安全性建議，dependabot 每週會追蹤（`.github/dependabot.yml`）；只影響
建置工具的項目可以等例行更新，不要用 `--force` 硬升。

## 專案地圖

- `src/config.ts`：網站設定的唯一來源（標題、導覽列、功能旗標、社群連結）。
  大多數客製化都從這裡開始。
- `src/locales/en.ts`、`src/locales/zh-TW.ts`：所有內建介面字串，一個語言
  一份字典。`src/config.ts` 的 `SITE.locale` 決定載入哪一份。
- `src/data/*.ts`：內容資料，work/life 的「關於」文案（`about.ts`、
  `life.ts`）、作品集項目（`projects.ts`），以及共用的區塊內容型別定義
  （`sections.ts`）。
- `src/components/blocks/*.astro`：兩個「關於」面共用的通用內容區塊
  （text、chips、timeline、cards、stats 等），資料來自
  `src/data/sections.ts` 的項目。細節見下方〈慣例〉。
- `plugins/*.mjs`：建置期的 remark 外掛（Mermaid fence、閱讀時間），
  每個都有對應的 `*.test.mjs`。

## 慣例

- commit 訊息和 PR 標題使用 [Conventional Commits](https://www.conventionalcommits.org/)
  （`feat:`、`fix:`、`docs:` 等）。
- 一個改動一個分支；PR 開向 `main`。
- 區塊維持資料驅動：區塊元件從 `src/data/*.ts` 拿內容，資料是空的就什麼都
  不渲染（例如 `Cards.astro` 裡的 `cards.length > 0 && (...)`）。不要把
  內容寫死在區塊元件裡。
- 介面字串的改動要**同時**更新 `src/locales/en.ts` 和
  `src/locales/zh-TW.ts`，放在同一個 PR 裡。任何一份字典悄悄落後另一份，
  都算是一個 bug。
- commit 訊息、PR 標題與內文、分支名稱**不得包含任何 AI 工具的署名或
  痕跡**：不加 `Co-authored-by` 的 AI 署名、不留工具產生的會話連結或
  簽名列（例如 `Claude-Session:`、`Generated with ...`）。用什麼工具寫
  code 都可以，但進到 git 歷史的資訊只留人。

## Pull request

小修正可以直接開 PR。功能或行為變更請先開 issue，討論好方向再動手。PR
表單會請你填描述、變更類型、測試方式，視覺變更要附前後對照截圖；PR
標題遵循 Conventional Commits，因為它會成為 squash-merge 後的 commit
message。

## 個人資料

這個範本內建的示範內容是刻意假造的（見 `src/data/life.ts`），確保範本
維護者的個人資訊不會外流到你的 fork 裡。請不要在 `src/`、`public/`、
`.github/`、`package.json` 或 `astro.config.mjs` 底下的任何地方，加入
真實姓名、雇主／組織關係、電話號碼、政府或帳號 ID，或是真人社群／遊戲
帳號的連結。

以下是這項檢查的簡化、可直接執行版本（能抓到不小心留下的真實社群連結；
維護者審查時還會額外檢查幾個沒有列在這裡的專屬識別資訊）：

```bash
grep -rniE "steamcommunity|gravatar|instagram|facebook" src/ public/ .github/ package.json astro.config.mjs
```

任何比對到的結果都應該是廠商／通用參照（例如
`public/vendor/tocas/tocas.min.css` 裡的圖示 class 名稱），絕不能是真實
的個人頁面連結。

## `.mdx` 內容的信任層級

部落格文章可以是 `.md` 或 `.mdx`。跟 `.md` 不同，`.mdx` 檔案在建置時會
以 JavaScript/JSX 執行，所以新增或修改 `.mdx` 檔案的 PR，需要跟原始碼
變更一樣的程式碼層級審查，不能只當內容改動略讀過去。（這個範本的示範
文章刻意全部使用 `.md`。）

## 視覺檢查

```bash
npm run build && npm run preview
```

打開印出來的本機網址，檢查你改動到的頁面：亮色＋暗色主題都看一遍，
如果動到介面字串，兩種語言都要看。
