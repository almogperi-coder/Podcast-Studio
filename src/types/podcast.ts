export type EpisodeStatus = 'draft' | 'scripted' | 'recorded' | 'published'

export type ShowTone = 'friendly' | 'expert' | 'energetic' | 'calm' | 'witty'

export type Show = {
  id: string
  title: string
  niche: string
  host: string
  description: string
  coverColor: string
  audience: string
  tone: ShowTone
  hostPersona: string
}

export type NewShow = Omit<Show, 'id'>

export type Episode = {
  id: string
  showId: string
  title: string
  status: EpisodeStatus
  publishDate?: string
}