# Everheart

Mobile-first, local Galactic Empire story demo built with Next.js. Customize an imperial envoy, make two consequential choices, and reach one of two closing messages across four choice paths. Pronouns are saved and shown in the player header. Trust and influence reflect your decisions.

## Run

Use Node.js 22 or newer and pnpm 11. Run `pnpm install --frozen-lockfile`, then `pnpm dev`. Open http://127.0.0.1:3000. For a production build use `pnpm build`, then `pnpm start`.

## Checks

`pnpm test` checks story paths, links, invalid choices, and malformed saves. `pnpm typecheck` checks TypeScript. `pnpm build` compiles the production app.

## Scope

This is a new starter: no earlier MVP archive was available. Progress is stored in this browser's localStorage, with graceful fallback when storage is unavailable. Reset asks before replacing progress. No accounts, backend, database, AI calls, payment handling, credentials, or deployment are configured. Fonts use optional Google Fonts with system fallbacks. Future story and account storage require a server-side design.
