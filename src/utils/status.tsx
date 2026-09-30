import EditNoteIcon from '@mui/icons-material/EditNote'
import DescriptionIcon from '@mui/icons-material/Description'
import MicIcon from '@mui/icons-material/Mic'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import type { ReactElement } from 'react'
import type { EpisodeStatus } from '../types/podcast'

type StatusConfig = {
  label: string
  color: string
  icon: ReactElement
}

export const statusConfig: Record<EpisodeStatus, StatusConfig> = {
  draft: { label: 'Draft', color: '#94A3B8', icon: <EditNoteIcon /> },
  scripted: { label: 'Scripted', color: '#F59E0B', icon: <DescriptionIcon /> },
  recorded: { label: 'Recorded', color: '#EC4899', icon: <MicIcon /> },
  published: { label: 'Published', color: '#10B981', icon: <CheckCircleIcon /> },
}

export const statusOrder: EpisodeStatus[] = ['draft', 'scripted', 'recorded', 'published']

export function getNextStatus(status: EpisodeStatus): EpisodeStatus | null {
  const index = statusOrder.indexOf(status)
  return statusOrder[index + 1] ?? null
}