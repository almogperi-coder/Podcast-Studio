export type EpisodeStatus = 'draft' | 'scripted' | 'recorded' | 'published'

export type Show = {
  id: string
  title: string
  niche: string
  host: string
  description: string
}

export type Episode = {
  id: string
  showId: string
  title: string
  status: EpisodeStatus
  publishDate?: string
}