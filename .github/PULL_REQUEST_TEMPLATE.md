<!-- 中英文皆可。 / Both Chinese and English are welcome. -->

## 說明 / Description

<!-- 這個改動做了什麼、為什麼要做？簡短但完整地描述。
     What does this change do, and why? Brief but complete. -->

Fixes #<!-- 填入 issue 編號，或刪掉這行 / issue number, or delete this line -->

## 變更類型 / Type of change

<!-- 勾選所有符合的項目。 / Check all that apply. -->

- [ ] Bug 修正（不影響相容性） / Bug fix (non-breaking)
- [ ] 新功能（不影響相容性） / New feature (non-breaking)
- [ ] 破壞性變更（現有範本使用者需要跟著調整） / Breaking change (existing template users must adjust)
- [ ] 文件／範例內容 / Docs or example content
- [ ] 視覺／樣式調整 / Visual or style tweak
- [ ] CI／工具 / CI or tooling

## 如何測試？ / How was this tested?

<!-- 你跑了哪些指令、檢查了什麼。
     Which commands you ran, what you checked. -->

## 截圖 / Screenshots

<!-- 任何視覺變更都要附上前後對照截圖，這不是選填。非視覺變更可以刪掉這一節。
     Before/after screenshots are required for any visual change — not optional.
     Delete this section for non-visual changes. -->

## 檢查清單 / Checklist

- [ ] `npm run check && npm run build && npm test` 本機皆通過 / All pass locally
- [ ] 沒有引入個人資料：見 [CONTRIBUTING.md](../CONTRIBUTING.md#個人資料) 的檢查項目 / No personal data introduced: see the CONTRIBUTING.md checklist
- [ ] 若改動任何介面字串，`src/locales/en.ts` 和 `src/locales/zh-TW.ts` 已在同一個 PR 內一起更新 / Any UI-string change updates both locale dictionaries in the same PR
- [ ] 行為變更時已更新對應文件（README／CONTRIBUTING） / Docs (README / CONTRIBUTING) updated for behavior changes
- [ ] PR 標題符合 [Conventional Commits](https://www.conventionalcommits.org/) 規範，因為它會成為 squash-merge 後的 commit message / PR title follows Conventional Commits — it becomes the squash-merge commit message
