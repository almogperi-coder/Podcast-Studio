import type { ShowTone } from '../types/podcast'

type ToneConfig = {
  label: string
  hint: string
}

export const toneConfig: Record<ShowTone, ToneConfig> = {
  friendly: { label: 'Friendly', hint: 'Warm and casual, like talking to a friend' },
  expert: { label: 'Expert', hint: 'Clear, precise and confident' },
  energetic: { label: 'Energetic', hint: 'Fast, upbeat and full of energy' },
  calm: { label: 'Calm', hint: 'Slow, thoughtful and relaxing' },
  witty: { label: 'Witty', hint: 'Smart humor and sharp takes' },
}

export const toneOrder: ShowTone[] = ['friendly', 'expert', 'energetic', 'calm', 'witty']

export const coverColors: string[] = [
  '#8B5CF6',
  '#EC4899',
  '#EF4444',
  '#F97316',
  '#F59E0B',
  '#10B981',
  '#06B6D4',
  '#3B82F6',
]