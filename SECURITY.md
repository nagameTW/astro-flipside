# Security Policy

## Supported versions

Only the latest commit on `main` is supported. There are no maintained
release branches.

## Reporting a vulnerability

Please report security vulnerabilities using GitHub's private vulnerability
reporting instead of a public issue: open this repository's **Security** tab
→ **Report a vulnerability**. This lets us discuss and fix the issue before
it's public.

Don't file a public issue or PR for a suspected vulnerability.

## `.mdx` posts

`.mdx` blog posts execute as JavaScript/JSX at build time, unlike plain
`.md`. A PR that adds or changes an `.mdx` file needs the same code-level
review trust as a source-code change, not a content-only skim. (This
template's own demo posts are intentionally all `.md`.)
