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
  context/PodcastContext.tsx    State for shows and episodes, updateEpisodeStatus
  components/AppShell/          Sticky glass AppBar (blur) + gradient logo + Container + <Outlet />
  components/Hero/              Home banner: radial "glow" background, gradient headline, live stats
  components/ShowCard/          Card with gradient cover in the show's coverColor, hover lift + glow, episode count
  components/StatusChip/        Chip per status (color + icon) from a Record<EpisodeStatus, StatusConfig>
  pages/HomePage/               Hero + responsive Grid of ShowCards
  pages/ShowPage/               Back button, show banner, published progress bar, episodes as Paper rows, "Next status" button
  App.tsx                       PodcastProvider > BrowserRouter > Routes
  main.tsx                      ThemeProvider > CssBaseline + App
```

## Routes
- `/`: HomePage
- `/shows/:showId`: ShowPage ("Show not found" if the id doesn't exist)

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

## What's done
- Status pipeline: draft → scripted → recorded → published (`getNextStatus` in ShowPage)
- Moving an episode to `published` sets `publishDate` to today's date
- Design session (Sep 28, 2026), steps 1 to 6: theme + font, glass AppBar, Hero with live stats, show cards grid, StatusChip, ShowPage redesign

## Ideas for next steps
- Design cleanup: move repeated colors into the theme (the brand gradient is duplicated in AppShell and Hero; `#151524` is hardcoded in ShowCard and ShowPage), and export `statusConfig` so the "Next status" button can use its label and color
- Small polish: "1 episodes" pluralization, check the layout on a phone-width window
- A form for adding a new episode (useState, onChange); a new show with a coverColor picker
- Saving to localStorage so data survives a refresh (useEffect)
- EpisodePage: a page for a single episode
- Later on: a server, an LLM for writing scripts, TTS, and an RSS feed

## Working with Claude
- The dev server runs in its own terminal (`npm run dev`, port 5173); git and everything else run in a second terminal
- Almog types the code himself, step by step, with an explanation for every part
- Claude checks work by reading files and looking at the page in Chrome (localhost:5173), and does not run git commands in the project (they can leave a stale `.git/index.lock`)
