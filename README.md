# Everheart — The Imperial Gala

A mobile-first, authored Galactic Empire living-novel vertical slice. Customize your name, pronouns, attire, and one of three story-compatible backgrounds; enter the Imperial Gala and navigate Vance Stirling, Lord Aldric Vane, and Lady Seraphine's competing loyalties.

## Play locally

Requires Node 22+ and pnpm 11. From this repository:

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm start --port 3001
```

Open http://127.0.0.1:3001. Use `pnpm dev --port 3001` for development. A localhost link is available only on the machine running the server. No public site has been deployed.

## What is playable

Ten authored scenes, three private investigation routes, an optional intimate dance, three final strategies, and four political outcomes (exposure succeeds or fails depending on your evidence). A playthrough visits six to eight scenes; 720 choice sequences terminate. Expect roughly 5–10 minutes per route, with alternate routes available by restarting. Backgrounds personalize your stakes and observations; they do not lock players out of the chapter. Attire changes interface accents. Pronouns are recorded in your identity; the prose directly addresses you.

Relationships track each character separately. Court records show only private facts shared with that character; the journal records decisions and immediate consequences. Court motivations are supplied as reader guidance. Not every relationship produces a romantic response. Vance remains a powerful, restrained fleet commander with his own moral boundary.

## Saves

Version 2 saves persist in localStorage on this browser and origin. Export/import JSON for backups or moving devices. Imports are size limited and replay-validated; edited totals, impossible histories, and obsolete formats are rejected. Storage failure leaves the session playable and directs you to export. Old v1 saves are preserved under their original key but cannot be continued in the replacement chapter. New journey and import replacement ask before replacing progress.

## Presentation and portrait assets

The orbital palace and silhouettes are local CSS artwork; there are no remote image or font dependencies. Character silhouettes are deliberate placeholders for licensed art. `app/character-portrait.tsx` provides an explicit per-character portrait map, responsive crop, accessible naming, and automatic silhouette fallback if an asset fails. Add licensed files under `public/portraits/` and map `vance`, `aldric`, and `seraphine` to their URLs. Do not add unlicensed images or private URLs.

## Scripted, not AI

No model calls, server credentials, accounts, or free-text simulation are configured. The UI labels AI storytelling as a future feature. `lib/provider.mjs` defines the deterministic provider and a per-character context boundary. A future server provider must authorize requests, keep API keys server-side, pass only the addressed character's known facts, validate returned actions, and define moderation and cost controls. No arbitrary text box is presented as if it could understand actions.

## Verify

```sh
pnpm test
pnpm typecheck
pnpm build
```

With a production server running, `node tests/browser-smoke.mjs` checks mobile and desktop onboarding, decisions, ending, save reload, court, journal, export/import, reset, errors, and overflow. Set `PLAYWRIGHT_MODULE` to an installed Playwright package, `PLAYWRIGHT_CHANNEL=msedge` if using Edge, and optionally `BASE_URL` (default http://127.0.0.1:3001).

No original MVP archive was present in the supplied workspace or retrieved conversation. This expands the existing development branch. No deployment, secrets, or Pocket Paramour changes are included.
