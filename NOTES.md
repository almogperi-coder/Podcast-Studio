# Podcast Studio: project notes

A React + TypeScript practice project, built alongside the fullstack course (JB 45800-9).
The idea is a management app for a "podcast factory": shows, episodes, and a pipeline of episode statuses.

## Stack
- Vite 8 + React 19 + TypeScript 6
- React Router 7 (`react-router-dom`)
- MUI 9 (`@mui/material`, `@mui/icons-material`). In v9, system props like `alignItems` are passed through `sx`, not directly on the component.

## Conventions (same as the course labs, `23-09-React/lab_2`)
- A folder for each component or page, with an `index.tsx` inside it (`components/ShowCard/index.tsx`)
- `type` instead of `interface`
- Context = a Provider plus a custom hook that throws an error when used outside the Provider (`usePodcastContext`)
- A commit after every working step

## Structure
```
src/
  types/podcast.ts              EpisodeStatus, Show, Episode
  data/mockData.ts              Mock data: 2 shows, 4 episodes
  context/PodcastContext.tsx    State for shows and episodes, updateEpisodeStatus
  components/AppShell/          AppBar + Container + <Outlet />
  components/ShowCard/          Clickable card linking to /shows/:id
  pages/HomePage/               List of shows
  pages/ShowPage/               Show details, episodes, "Next status" button
  App.tsx                       PodcastProvider > BrowserRouter > Routes
  main.tsx                      CssBaseline
```

## Routes
- `/`: HomePage
- `/shows/:showId`: ShowPage ("Show not found" if the id doesn't exist)

## What's done
- Status pipeline: draft → scripted → recorded → published (`getNextStatus` in ShowPage)
- Moving an episode to `published` sets `publishDate` to today's date

## Ideas for next steps
- A custom design: ThemeProvider with a color palette, a grid of cards, status icons, a hero screen
- A form for adding a new episode (useState, onChange)
- Saving to localStorage so data survives a refresh (useEffect)
- EpisodePage: a page for a single episode
- Later on: a server, an LLM for writing scripts, TTS, and an RSS feed

## Working with Claude
- The dev server runs in its own terminal (`npm run dev`, port 5173); git and everything else run in a second terminal
- Almog types the code himself, step by step, with an explanation for every part
