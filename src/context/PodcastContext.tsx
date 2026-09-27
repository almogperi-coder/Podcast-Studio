import { createContext, useContext, useState, type ReactNode } from 'react'
import { episodes as initialEpisodes, shows as initialShows } from '../data/mockData'
import type { Episode, EpisodeStatus, Show } from '../types/podcast'

type PodcastContextValue = {
  shows: Show[]
  episodes: Episode[]
  updateEpisodeStatus: (episodeId: string, status: EpisodeStatus) => void
}

const PodcastContext = createContext<PodcastContextValue | null>(null)

export function PodcastProvider({ children }: { children: ReactNode }) {
  const [shows] = useState<Show[]>(initialShows)
  const [episodes, setEpisodes] = useState<Episode[]>(initialEpisodes)

  function updateEpisodeStatus(episodeId: string, status: EpisodeStatus) {
    setEpisodes((current) =>
      current.map((episode) =>
        episode.id === episodeId ? { ...episode, status } : episode
      )
    )
  }

  return (
    <PodcastContext.Provider value={{ shows, episodes, updateEpisodeStatus }}>
      {children}
    </PodcastContext.Provider>
  )
}

export function usePodcastContext() {
  const context = useContext(PodcastContext)

  if (context === null) {
    throw new Error('usePodcastContext must be used within PodcastProvider')
  }

  return context
}