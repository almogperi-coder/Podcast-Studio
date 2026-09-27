import { Chip } from '@mui/material'
import EditNoteIcon from '@mui/icons-material/EditNote'
import DescriptionIcon from '@mui/icons-material/Description'
import MicIcon from '@mui/icons-material/Mic'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import type { ReactElement } from 'react'
import type { EpisodeStatus } from '../../types/podcast'

type StatusConfig = {
  label: string
  color: string
  icon: ReactElement
}

const statusConfig: Record<EpisodeStatus, StatusConfig> = {
  draft: { label: 'Draft', color: '#94A3B8', icon: <EditNoteIcon /> },
  scripted: { label: 'Scripted', color: '#F59E0B', icon: <DescriptionIcon /> },
  recorded: { label: 'Recorded', color: '#EC4899', icon: <MicIcon /> },
  published: { label: 'Published', color: '#10B981', icon: <CheckCircleIcon /> },
}

type StatusChipProps = {
  status: EpisodeStatus
}

export default function StatusChip(props: StatusChipProps) {
  const { status } = props
  const { label, color, icon } = statusConfig[status]

  return (
    <Chip
      icon={icon}
      label={label}
      size="small"
      sx={{
        bgcolor: `${color}22`,
        color,
        fontWeight: 600,
        border: '1px solid',
        borderColor: `${color}55`,
        '& .MuiChip-icon': { color },
      }}
    />
  )
}