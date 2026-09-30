# Podcast Studio: project notes

A React + TypeScript practice project, built alongside the fullstack course (JB 45800-9).
The idea is a management app for a "podcast factory": shows, episodes, and a pipeline of episode statuses.

## Stack
- Vite 8 + React 19 + TypeScript 6
- React Router 7 (`react-router-dom`)
- MUI 9 (`@mui/material`, `@mui/icons-material`). In v9, system props like `alignItems` are passed through `sx`, not directly on the component.
- Font: Plus Jakarta Sans (Google Fonts, loaded in `index.html`)

## Conventions (same as the course labs, `23-09-React/lab_2`)
- A folder for each component or page, with an `index.tsx` inside it (`components/ShowCard/index.tsx`)
- `type` instead of `interface`
- Context = a Provider plus a custom hook that throws an error when used outside the Provider (`usePodcastContext`)
- A commit after every working step
- New component from the terminal: `mkdir src/components/X` then `touch src/components/X/index.tsx`

## Structure
```
index.html                      Google Fonts link for Plus Jakarta Sans
src/
  theme.ts                      createTheme: dark mode, palette, borderRadius 16, typography
  types/podcast.ts              EpisodeStatus, Show (incl. coverColor), Episode
  data/mockData.ts              Mock data: 2 shows (each with a coverColor), 4 episodes
  context/PodcastContext.tsx    State for shows and episodes, updateEpisodeStatus, addEpisode; episodes persisted in localStorage
  components/AddEpisodeForm/    Form under the episode list: controlled TextField + submit button, trims and validates the title
  components/AppShell/          Sticky glass AppBar (blur) + gradient logo + Container + <Outlet /> + NavLinks (Shows, Pipeline)
  components/Hero/              Home banner: radial "glow" background, gradient headline, live stats
  components/PipelineCard/      Board card: show dot + name in its coverColor (links to the show), title, "Move to <next>" button
  components/ShowCard/          Card with gradient cover in the show's coverColor, hover lift + glow, episode count
  components/StatusChip/        Chip per status (color + icon), reads statusConfig from utils/status
  pages/HomePage/               Hero + responsive Grid of ShowCards
  pages/ShowPage/               Back button, show banner, published progress bar, episodes as Paper rows, "Next status" button, AddEpisodeForm
  pages/PipelinePage/           Kanban: a column per status (colored top border, icon, count), PipelineCards, empty state
  utils/status.tsx              Single source of truth: statusConfig (label, color, icon), statusOrder, getNextStatus
  App.tsx                       PodcastProvider > BrowserRouter > Routes
  main.tsx                      ThemeProvider > CssBaseline + App
```

## Routes
- `/`: HomePage
- `/shows/:showId`: ShowPage ("Show not found" if the id doesn't exist)
- `/pipeline`: PipelinePage

## Design system
- Background `#0B0B14`, paper `#151524`
- Brand gradient: `linear-gradient(90deg, #8B5CF6, #EC4899)` (primary purple, secondary pink)
- Show colors: Garden Nights `#10B981` (green), Code From Zero `#3B82F6` (blue)
- Status colors: draft `#94A3B8` (EditNote), scripted `#F59E0B` (Description), recorded `#EC4899` (Mic), published `#10B981` (CheckCircle)
- Tricks learned:
  - Gradient text: gradient `background` + `backgroundClip: 'text'` + `WebkitBackgroundClip: 'text'` + `color: 'transparent'`
  - Hex alpha: append 2 chars to a hex color (`${color}55` ≈ 33%, `${color}33` ≈ 20%, `${color}22` ≈ 13%)
  - In `sx`, a number `borderRadius` is multiplied by the theme's 16 (`2` = 32px); a string (`'4px'`) is used as-is
  - Responsive values: `{ xs: ..., sm: ..., md: ... }`; Grid has 12 columns (`size={{ xs: 12, sm: 6, md: 4 }}`)
  - `'&:hover'` + `transition` for animated hover; `'& .MuiChip-icon'` to style an inner MUI part
  - `CssBaseline` must sit inside `ThemeProvider`

## React patterns learned
- Adding to state: `setEpisodes((current) => [...current, newEpisode])`, a new array (spread), never `push`
- `crypto.randomUUID()` for unique ids
- Controlled input: `value={title}` + `onChange={(event) => setTitle(event.target.value)}`
- `Paper component="form"` renders a real `<form>`, so Enter submits; `event.preventDefault()` stops the page reload
- Derived value instead of extra state: `const trimmedTitle = title.trim()`, recalculated every render
- Early return as a guard: `if (trimmedTitle === '') return`, plus `disabled` on the button for the UX
- Ternary inside JSX (an expression, not an `if`): `{count === 1 ? 'episode' : 'episodes'}`
- localStorage: lazy initializer `useState(loadEpisodes)` (runs once) + `useEffect(() => save, [episodes])`; `JSON.parse` in try/catch
- Reset demo data: in the browser console `localStorage.clear()` then refresh (key: `podcast-studio:episodes`)
- Refactor to a shared module (`utils/status.tsx`, `.tsx` because it holds JSX); named exports/imports
- CSS Grid for columns: `gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }`
- `show?.coverColor ?? '#94A3B8'` (optional chaining + nullish coalescing)
- `NavLink` adds an `active` class (style with `'&.active'`); `end` on the `/` link so it only matches exactly

## What's done
- Status pipeline: draft → scripted → recorded → published (`getNextStatus` in `utils/status.tsx`)
- Moving an episode to `published` sets `publishDate` to today's date
- Design session (Sep 28, 2026), steps 1 to 6: theme + font, glass AppBar, Hero with live stats, show cards grid, StatusChip, ShowPage redesign
- Add-episode session (Sep 30, 2026): `addEpisode` in the Context, `AddEpisodeForm` on ShowPage (new episodes start as `draft`), title trimming and validation, "1 episode" pluralization in ShowCard
- Product vision (Sep 30, 2026): the product is an "AI co-producer" for niche/business podcasts, not another audio generator. Full vision, roadmap (4 phases with gates), feature list and pricing hypothesis live in the Claude doc "Podcast Studio: Product Vision & Roadmap"
- Sprint 1 of Phase 1 (Sep 30, 2026): episodes persist in localStorage, status config moved to `utils/status.tsx`, Pipeline Board (`/pipeline`) with PipelineCard, nav links in the AppBar

## Next up (Phase 1: live demo)
- Show DNA: a form for a new show (title, niche, host, description, coverColor, audience, tone); persist shows in localStorage too
- Deploy to Vercel so the demo has a real URL (gate for Phase 1: live URL + 3 people tried it)
- Episode Studio: a page per episode (script, notes, checklist)
- Consistency Streak: weekly goal + publishing calendar
- Mobile polish: ShowPage episode rows are cramped at phone width (title wraps into many lines)

## Ideas for next steps
- Design cleanup: move repeated colors into the theme (the brand gradient is duplicated in AppShell and Hero; `#151524` is hardcoded in ShowCard and ShowPage); the ShowPage "→ next" button could use `statusConfig` label and color like PipelineCard does
- Small polish: a blank line before `<AddEpisodeForm />` in ShowPage
- Deleting or renaming an episode; an empty state ("No episodes yet") on ShowPage for a show with no episodes
- Later phases (see the vision doc): backend + auth, AI Co-producer (scripts, Topic Radar, Repurpose Pack) via the server only, then Stripe, Public Show Page, Hebrew/English

## Working with Claude
- The dev server runs in its own terminal (`npm run dev`, port 5173); git and everything else run in a second terminal
- Almog types the code himself, step by step, with an explanation for every part
- Instructions go click by click (Cmd+P to open a file, Ctrl+G to jump to a line), editing from the bottom of the file up so line numbers don't shift, with an explanation table and commit commands at the end of every step
- Before giving longer code, Claude checks it on a copy of the project with `tsc -p tsconfig.app.json --noEmit`
- If localhost:5173 shows an error page, the dev server has stopped: Ctrl+C in terminal 1, then `npm run dev` again
- `git add .` is fine here (`node_modules` and `.DS_Store` are in `.gitignore`); run `git status` first to see what goes in
- Claude checks work by reading files and looking at the page in Chrome (localhost:5173), and does not run git commands in the project (they can leave a stale `.git/index.lock`)
