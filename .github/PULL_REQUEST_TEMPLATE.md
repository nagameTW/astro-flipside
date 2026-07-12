<!-- 歡迎貢獻！欄位用英文填寫即可；不確定的段落中英夾雜也沒關係，別因為語言卻步。 -->

## Description

<!-- What does this change, and why? Keep it short but complete. -->

Fixes #<!-- issue number, or delete this line -->

## Type of change

<!-- Check all that apply. -->

- [ ] Bug fix (non-breaking)
- [ ] New feature (non-breaking)
- [ ] Breaking change (existing template users must adjust something)
- [ ] Documentation / demo content
- [ ] Visual / style only
- [ ] CI / tooling

## How has this been tested?

<!-- Commands you ran and what you looked at. -->

## Screenshots

<!-- Before/after for any visual change — required, not optional.
     Delete this section for non-visual changes. -->

## Checklist

- [ ] `npm run check && npm run build && npm test` pass locally
- [ ] `python3 scripts/test_fetch_gamestats.py` passes (when `scripts/` is touched)
- [ ] No personal data introduced: see the gate in [CONTRIBUTING.md](../CONTRIBUTING.md#personal-data)
- [ ] Both `src/locales/en.ts` and `src/locales/zh-TW.ts` updated together (for any UI string change)
- [ ] Docs updated where behavior changed (README / CONTRIBUTING)
- [ ] PR title follows [Conventional Commits](https://www.conventionalcommits.org/) — it becomes the squash-merge commit message
