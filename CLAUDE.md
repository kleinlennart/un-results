# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev           # dev server with Turbopack, http://localhost:3000
pnpm build         # static export to out/, also type-checks
pnpm lint          # ESLint
pnpm tsc --noEmit  # type-check only
```

- pnpm is the package manager, pinned through `packageManager` in `package.json`. Don't use npm or add a `package-lock.json`.

- There is no test framework and there are no tests.
- `next build` can rewrite `tsconfig.json` (`jsx`, `include`, formatting), so check for that before committing.
- `typescript` stays on 6.x because `typescript-eslint` doesn't support TS 7 yet. The `minimatch` override in `pnpm-workspace.yaml` keeps `pnpm audit` clean, since the ESLint plugins still request vulnerable versions.

## Deployment

`.github/workflows/deploy.yml` publishes to GitHub Pages on every push to `main`. `next.config.ts` sets `output: "export"`, so server features (API routes, server actions, `next start`) aren't available. The site is served from a subpath set through `PAGES_BASE_PATH`, so any hand-written URL to a file in `public/` must include the base path.

## Architecture

This is a Next.js App Router app with a single static route, for UN results-based management (RBM). `package.json` is the source of truth for versions.

`app/page.tsx` renders one fixed sentence template:

> **[UN ENTITY]** _verb_ ## **[OUTPUT]** resulting in ### **[OUTCOME]**.

The `##` and `###` placeholders are wrapped in the local `Annotation` component, which labels them as output and outcome indicators. The verb slot is `components/WordCarousel.tsx`, the only client component.

- **Verbs:** add or remove them in `lib/action_words.json`. `lib/carousel-words.ts` sorts them alphabetically, so the order in the JSON file has no effect.
- **Hydration:** `WordCarousel` must render index 0 on the server and pick its time-based starting word in `useEffect`. Never read `Date` or `Math.random` during render, because this has already caused a hydration error once.

## Styling

- Tailwind v4 is configured in CSS, in `app/globals.css`. There is no `tailwind.config` file. Consult https://tailwindcss.com/docs/ rather than relying on older Tailwind knowledge.
- Use the theme colors from `globals.css`: the UN palette in `@theme` (`un-blue`, `un-red`, `un-gray`, etc.) and the shadcn semantic tokens (`background`, `muted-foreground`, etc.).
- **Fonts:** the `@theme inline` block overrides the Roboto `--font-sans` with `--font-geist-sans`, and sets `--font-mono` to `--font-geist-mono`, but nothing loads or defines those Geist variables. The compiled default font family therefore points at an undefined variable, and `page.tsx` sets Roboto and Roboto Mono through inline `fontFamily` styles to compensate. Text outside those inline styles doesn't get Roboto. The Geist mention in `README.md` is create-next-app boilerplate.
- **shadcn/ui:** `components.json` is configured (new-york, neutral, lucide), but `components/ui` doesn't exist yet. Prefer shadcn components and install them with `pnpm dlx shadcn@latest add <component>`.
- UN logos are in `public/images` in horizontal and stacked layouts, in black, colour and white, as SVG, PNG and EPS.

## Conventions

- Understand the overall page structure before making isolated changes.
- Don't create parallel infrastructure. Prefer global solutions, and don't hardcode values where they'd be hard to find.
- Left-align content and keep a clear design hierarchy. The hero sentence is currently centered.
