# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # dev server with Turbopack, http://localhost:3000
pnpm build         # static export to out/, also type-checks
pnpm lint          # ESLint
pnpm format        # Prettier, also sorts Tailwind classes
pnpm tsc --noEmit  # type-check only
```

- pnpm is the package manager, pinned through `packageManager` in `package.json`. Don't use npm or add a `package-lock.json`.

- There is no test framework and there are no tests.
- Next.js docs matching the installed version are in `node_modules/next/dist/docs/`. This version has breaking changes, so read the relevant guide before writing Next-specific code.
- `next build` can rewrite `tsconfig.json` (`jsx`, `include`, formatting), so check for that before committing.
- `typescript` stays on 6.x because `typescript-eslint` doesn't support TS 7 yet. The `minimatch` override in `pnpm-workspace.yaml` keeps `pnpm audit` clean, since the ESLint plugins still request vulnerable versions.

## Deployment

`.github/workflows/deploy.yml` publishes to GitHub Pages on every push to `main`. `next.config.ts` sets `output: "export"`, so server features (API routes, server actions, `next start`) aren't available. The workflow takes `PAGES_BASE_PATH` from the repo's Pages settings: `/un-results` on `github.io`, and empty once the custom domain `rbm.unfck.org` is set. Any hand-written URL to a file in `public/` must allow for this base path.

## Architecture

This is a Next.js App Router app with three static routes (`/`, `/about`, `/resources`): a nudge from people working at the UN toward stronger results-based management (RBM). `package.json` is the source of truth for versions. Keep it minimal: the tone is artsy, guerrilla public tech. It's constructive and from the inside, never anti-UN or sneering, and it must not read as an official UN site.

`app/page.tsx` renders one fixed sentence template:

> **[UN ENTITY]** _verb_ ## **[OUTPUT]** resulting in ## \_\_\_

The blinking line on the baseline is deliberate: it's an invitation to name the outcome, so don't fill it in. Both `##` are wrapped in the local `Annotation` component, which labels them as output and outcome indicators. The verb slot is `components/WordCarousel.tsx`, the only client component. The thesis line lives in `lib/site.ts`, `app/about/page.tsx` is linked discreetly from the footer, and it links to `app/resources/page.tsx`, a list of official sources kept as data in that file. Only add sources whose content you've checked.

- **RBM terms:** copy must follow the UNDG RBM Handbook (2011), linked from the about page. RBM is a management strategy that uses evidence on results for decisions, so don't describe it as measurement. Outputs, outcomes and impact are all results, while activities are not. The carousel verbs are what the handbook calls "action language"; the blank asks for "change language".
- **Verbs:** add or remove them in `lib/action_words.json`. They're shuffled on load, so the order in the file has no visible effect.
- **Carousel motion:** words appear in random order. Each one rises from below and fades in, then drifts up and fades away, so faded words only ever show above the current one. Plain CSS transitions on `transform` and `opacity` are enough, so don't add an animation library.
- **Hydration:** `WordCarousel` must render a fixed order on the server, with no word visible, and shuffle in a timer started from `useEffect`. Never read `Date` or `Math.random` during render, because this has already caused a hydration error once.

## Styling

- Tailwind v4 is configured in CSS, in `app/globals.css`. There is no `tailwind.config` file. Consult https://tailwindcss.com/docs/ rather than relying on older Tailwind knowledge.
- There's no component or icon library, on purpose: plain Tailwind classes only. Keep dependencies to a minimum.
- Use the theme colors from `globals.css`: the UN palette (`un-blue`, `un-red`, `un-gray`, etc.) and the few semantic tokens (`background`, `foreground`, `muted-foreground`, `border`). Only `un-blue` is in use so far. There's no dark mode.
- **Fonts:** Roboto Mono is the UN standard's monospace, and the look is minimal hacker. `app/layout.tsx` self-hosts it with `next/font/google`, `globals.css` maps it to `font-mono`, and `body` applies it, so everything is Roboto Mono. Don't use inline `fontFamily` styles. If you need Roboto too, load it the same way.

## Conventions

- Understand the overall page structure before making isolated changes.
- Don't create parallel infrastructure. Prefer global solutions, and don't hardcode values where they'd be hard to find.
- Left-align content and keep a clear design hierarchy. The hero sentence is currently centered.
