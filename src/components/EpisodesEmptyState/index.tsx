import { Fragment } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import MicIcon from '@mui/icons-material/Mic'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import StatusChip from '../StatusChip'
import { statusOrder } from '../../utils/status'

type EpisodesEmptyStateProps = {
  color: string
}

export default function EpisodesEmptyState(props: EpisodesEmptyStateProps) {
  const { color } = props

  return (
    <Box
      sx={{
        mt: 4,
        px: { xs: 2.5, sm: 5 },
        py: { xs: 4, sm: 5 },
        textAlign: 'center',
        borderRadius: 2,
        border: '2px dashed',
        borderColor: `${color}55`,
        background: `radial-gradient(circle at top, ${color}22, transparent 70%)`,
      }}
    >
      <Box
        sx={{
          width: 64,
          height: 64,
          mx: 'auto',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: `${color}22`,
          color,
          boxShadow: `0 0 0 8px ${color}11`,
        }}
      >
        <MicIcon sx={{ fontSize: 32 }} />
      </Box>

      <Typography variant="h5" sx={{ mt: 2.5 }}>
        Add your first episode
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mx: 'auto', maxWidth: 440 }}>
        Give it a working title below. Every episode starts as a draft and moves through four stages until it's live.
      </Typography>

      <Stack
        direction="row"
        sx={{ mt: 3, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: { xs: 1, sm: 0.5 } }}
      >
        {statusOrder.map((status, index) => (
          <Fragment key={status}>
            {index > 0 && <ChevronRightIcon fontSize="small" sx={{ color: 'text.disabled', display: { xs: 'none', sm: 'block' } }} />}
            <StatusChip status={status} />
          </Fragment>
        ))}
      </Stack>
    </Box>
  )
}