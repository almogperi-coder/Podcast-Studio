import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import StatusChip from '../StatusChip'
import { usePodcastContext } from '../../context/PodcastContext'
import type { Episode } from '../../types/podcast'
import { getNextStatus, statusConfig } from '../../utils/status'

type EpisodeRowProps = {
  episode: Episode
}

export default function EpisodeRow(props: EpisodeRowProps) {
  const { episode } = props
  const { updateEpisodeStatus } = usePodcastContext()

  const nextStatus = getNextStatus(episode.status)
  const statusColor = statusConfig[episode.status].color

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        alignItems: { xs: 'stretch', sm: 'center' },
        gap: { xs: 1.5, sm: 2 },
        borderLeft: '4px solid',
        borderLeftColor: statusColor,
      }}
    >
      <Box sx={{ flexGrow: 1, minWidth: 0 }}>
        <Typography sx={{ fontWeight: 600 }}>{episode.title}</Typography>
        <Typography variant="body2" color="text.secondary">
          {episode.publishDate ? `Published ${episode.publishDate}` : 'Not published yet'}
        </Typography>
      </Box>

      <Stack
        direction="row"
        spacing={1}
        sx={{ alignItems: 'center', justifyContent: 'space-between', flexShrink: 0 }}
      >
        <StatusChip status={episode.status} />
        {nextStatus && (
          <Button
            size="small"
            variant="outlined"
            onClick={() => updateEpisodeStatus(episode.id, nextStatus)}
            sx={{
              color: statusConfig[nextStatus].color,
              borderColor: `${statusConfig[nextStatus].color}55`,
            }}
          >
            Move to {statusConfig[nextStatus].label}
          </Button>
        )}
      </Stack>
    </Paper>
  )
}