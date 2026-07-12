# 安全政策

Feel free to write in English.

## 支援版本

只支援 `main` 上最新的 commit，沒有另外維護的釋出分支。

## 回報安全漏洞

請透過 GitHub 的私下漏洞回報功能回報安全漏洞，不要開公開 issue：進入
這個 repo 的 **Security** 分頁 → **Report a vulnerability**。這樣我們
可以在漏洞公開之前先討論並修復。

請不要為疑似的安全漏洞開公開 issue 或 PR。

## `.mdx` 文章

跟純 `.md` 不同，`.mdx` 部落格文章在建置時會以 JavaScript/JSX 執行。
新增或修改 `.mdx` 檔案的 PR，需要跟原始碼變更一樣的程式碼層級審查，
不能只當內容改動略讀過去。（這個範本自己的示範文章刻意全部使用
`.md`。）
