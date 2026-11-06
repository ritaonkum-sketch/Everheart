# Validation — 2026-11-06

Environment: Windows, Node 24.19.0, pnpm 11.25.0, Next.js 16.4.5, React 19.3.1.

- Production build: PASS, static `/` and `/_not-found` generated.
- TypeScript: PASS, `tsc --noEmit`.
- Story tests: PASS, 4 tests, 0 failures. Covers all four choice paths, invalid and terminal choices, malformed saves, and valid story links.
- Production browser smoke checks in headless Microsoft Edge: PASS at 390 × 900 and 1440 × 900. Covers name entry, beginning the story, first choice, reload and resume, second choice, ending, reset confirmation, no horizontal overflow at the ending, and no uncaught page errors.
- Default Playwright browser launch initially failed because its bundled Chromium was absent. The same smoke test then passed using installed Microsoft Edge (`PLAYWRIGHT_CHANNEL=msedge`).
- Credential pattern scan of source/config files: no matches for the checked private-key, GitHub token, OpenAI key, or API-key assignment patterns. No environment files included.

Run the optional browser check with `node tests/browser-smoke.mjs` after installing Playwright and starting the production server at 127.0.0.1:3000. Set `PLAYWRIGHT_CHANNEL=msedge` to use installed Edge; `PLAYWRIGHT_MODULE` can point to an external Playwright installation.

Limitations: automated browser checks are not a full accessibility audit or visual design review. No real mobile device, account/backend, AI service, or deployment was tested. This repository started empty; no earlier starter archive was available.
