# Validation — Imperial Gala replacement

Validated on 2026-11-06 on Windows, Node 24.19.0, pnpm 11.25.0.

- `pnpm build`: PASS; optimized Next.js production build and built-in TypeScript check.
- `pnpm typecheck`: PASS.
- `pnpm test`: 5 tests passed, 0 failed. Exhaustive traversal verifies 720 complete choice sequences across all 10 scenes, valid replayable saves at every step, and termination. Additional checks cover evidence-dependent endings, isolated character knowledge, invalid actions, save tampering, and all three role interpolations.
- Production browser smoke in headless Microsoft Edge: PASS at 390×900 and 1440×900. Both exercise role customization, six decisions through an ending, reload/resume, court and journal, save download and import, and reset. No page errors or horizontal overflow in the tested journey. Hidden import control checked.
- Visual inspection: desktop onboarding and court, mobile narrative and ending. Fixed a visible file-picker regression found during inspection. Palace artwork and portraits are CSS illustration/silhouettes; production character art is not included.
- `git diff --check`: PASS.

Scope limits: browser automation exercises one complete route per viewport; exhaustive route coverage is at engine level. No live AI, arbitrary free-text actions, account sync, audio, or deployment. Playtime is an estimate. Original reference conversation returned message placeholders for prior assistant designs; no MVP archive was supplied. The user's current product brief drove this replacement.

Preview uses port 3001 because port 3000 was already occupied; the existing service was left running.
