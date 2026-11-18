# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

```bash
npm run dev          # dev server on http://localhost:3000 (Turbopack)
npm run build        # production build
npm run lint         # ESLint (next core-web-vitals + typescript configs)
npx tsc --noEmit     # typecheck; there is no separate script for it
```

There is no test framework set up yet.

## Stack

- Next.js 16.4 (App Router), React 19.3, TypeScript (strict), Tailwind CSS v4.
- Version-specific API questions go to `node_modules/next/dist/docs/`, not memory. For example, `next/image` uses `preload` in place of the deprecated `priority`.
- `next.config.ts` enables `cacheComponents` and `partialPrefetching`. Tailwind runs through the `@tailwindcss/turbopack` loader configured there; there is no PostCSS config.
- Import alias `@/*` maps to the repo root.

## Architecture

PhotoChain is a social photo-challenge app: a chain is an ordered list of entries, and each entry's photo answers the previous entry's challenge and sets a new `challenge` for the next participant. The newest entry's challenge is the "current" open one.

- `types/photo-chain.ts`: domain model (`PhotoChain`, `ChainEntry`, `Photo`, `User`). `entries` are ordered oldest to newest, and `createdAt` is an ISO date string.
- `data/mock-chain.ts`: the only data source so far, static mock data. Its photos are placeholder SVGs in `public/photos/`, rendered with `next/image` `unoptimized`.
- `app/page.tsx` composes `components/` (Header, CurrentChallenge, PhotoChain → PhotoCard). All components are Server Components; there is no client state yet.

## Styling conventions

- The page background comes from the `--background`/`--foreground` CSS variables in `app/globals.css`, not utility classes on `<body>`. That body rule is unlayered, so it overrides Tailwind utilities. UI that has to blend with the page, like the `ring-zinc-50`/`dark:ring-zinc-950` around timeline badges, assumes those variables are zinc-50 and zinc-950.
- Dark mode uses Tailwind's default `prefers-color-scheme` `dark:` variant.
- Heading ids for `aria-labelledby` come from `useId()` so components can be rendered more than once on a page.

## Environment notes

- Windows machine. Python is not installed, so use Node for scripted file edits.
- `.claude/launch.json` defines a `dev` preview config (port 3000).

## README.md

Please read if you need more info: @README.md