import { Chip } from '@mui/material'
import type { EpisodeStatus } from '../../types/podcast'
import { statusConfig } from '../../utils/status'

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