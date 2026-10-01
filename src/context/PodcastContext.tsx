import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { episodes as initialEpisodes, shows as initialShows } from '../data/mockData'
import type { Episode, EpisodeStatus, NewShow, Show } from '../types/podcast'

type PodcastContextValue = {
    shows: Show[]
    episodes: Episode[]
    updateEpisodeStatus: (episodeId: string, status: EpisodeStatus) => void
    addEpisode: (showId: string, title: string) => void
    addShow: (newShow: NewShow) => string
}

const PodcastContext = createContext<PodcastContextValue | null>(null)

const EPISODES_KEY = 'podcast-studio:episodes'
const SHOWS_KEY = 'podcast-studio:shows'

function loadEpisodes(): Episode[] {
    const saved = localStorage.getItem(EPISODES_KEY)
    if (saved === null) return initialEpisodes

    try {
        return JSON.parse(saved) as Episode[]
    } catch {
        return initialEpisodes
    }
}

function loadShows(): Show[] {
    const saved = localStorage.getItem(SHOWS_KEY)
    if (saved === null) return initialShows

    try {
        return JSON.parse(saved) as Show[]
    } catch {
        return initialShows
    }
}

export function PodcastProvider({ children }: { children: ReactNode }) {
    const [shows, setShows] = useState<Show[]>(loadShows)
    const [episodes, setEpisodes] = useState<Episode[]>(loadEpisodes)

    useEffect(() => {
        localStorage.setItem(EPISODES_KEY, JSON.stringify(episodes))
    }, [episodes])

    useEffect(() => {
        localStorage.setItem(SHOWS_KEY, JSON.stringify(shows))
    }, [shows])

    function updateEpisodeStatus(episodeId: string, status: EpisodeStatus) {
        setEpisodes((current) =>
            current.map((episode) =>
                episode.id === episodeId
                    ? {
                        ...episode,
                        status,
                        publishDate:
                            status === 'published'
                                ? new Date().toISOString().slice(0, 10)
                                : episode.publishDate,
                    }
                    : episode
            )
        )
    }

    function addEpisode(showId: string, title: string) {
        const newEpisode: Episode = {
            id: crypto.randomUUID(),
            showId,
            title,
            status: 'draft',
        }
        setEpisodes((current) => [...current, newEpisode])
    }

    function addShow(newShow: NewShow): string {
        const id = crypto.randomUUID()
        setShows((current) => [...current, { id, ...newShow }])
        return id
    }

    return (
        <PodcastContext.Provider value={{ shows, episodes, updateEpisodeStatus, addEpisode, addShow }}>
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