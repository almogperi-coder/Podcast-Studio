import type { Show, Episode } from '../types/podcast'

export const shows: Show[] = [
  {
    id: 's1',
    title: 'Garden Nights',
    niche: 'Gardening',
    host: 'Nigel',
    description: 'Tips for small gardens and balconies',
    coverColor: '#10B981',
  },
  {
    id: 's2',
    title: 'Code From Zero',
    niche: 'Programming',
    host: 'Maya',
    description: 'Learning web development step by step',
    coverColor: '#3B82F6',
  },
]

export const episodes: Episode[] = [
  {
    id: 'e1',
    showId: 's1',
    title: 'Solar lights for your garden',
    status: 'published',
    publishDate: '2026-09-20',
  },
  {
    id: 'e2',
    showId: 's1',
    title: 'Growing herbs on a balcony',
    status: 'recorded',
  },
  {
    id: 'e3',
    showId: 's2',
    title: 'What is React?',
    status: 'published',
    publishDate: '2026-09-22',
  },
  {
    id: 'e4',
    showId: 's2',
    title: 'Understanding Context',
    status: 'draft',
  },
]