<!-- Feel free to write in English. -->

## 說明

<!-- 這個改動做了什麼、為什麼要做？簡短但完整地描述。 -->

Fixes #<!-- 填入 issue 編號，或刪掉這行 -->

## 變更類型

<!-- 勾選所有符合的項目。 -->

- [ ] Bug 修正（不影響相容性）
- [ ] 新功能（不影響相容性）
- [ ] 破壞性變更（現有範本使用者需要跟著調整）
- [ ] 文件／範例內容
- [ ] 視覺／樣式調整
- [ ] CI／工具

## 如何測試？

<!-- 你跑了哪些指令、檢查了什麼。 -->

## 截圖

<!-- 任何視覺變更都要附上前後對照截圖，這不是選填。
     非視覺變更可以刪掉這一節。 -->

## 檢查清單

- [ ] `npm run check && npm run build && npm test` 本機皆通過
- [ ] 沒有引入個人資料：見 [CONTRIBUTING.md](../CONTRIBUTING.md#個人資料) 的檢查項目
- [ ] 若改動任何介面字串，`src/locales/en.ts` 和 `src/locales/zh-TW.ts` 已在同一個 PR 內一起更新
- [ ] 行為變更時已更新對應文件（README／CONTRIBUTING）
- [ ] PR 標題符合 [Conventional Commits](https://www.conventionalcommits.org/) 規範，因為它會成為 squash-merge 後的 commit message
