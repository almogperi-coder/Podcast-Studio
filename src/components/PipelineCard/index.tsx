import { Box, Button, Paper, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { usePodcastContext } from '../../context/PodcastContext'
import type { Episode } from '../../types/podcast'
import { getNextStatus, statusConfig } from '../../utils/status'

type PipelineCardProps = {
  episode: Episode
}

export default function PipelineCard(props: PipelineCardProps) {
  const { episode } = props
  const { shows, updateEpisodeStatus } = usePodcastContext()

  const show = shows.find((s) => s.id === episode.showId)
  const nextStatus = getNextStatus(episode.status)
  const showColor = show?.coverColor ?? '#94A3B8'

  return (
    <Paper
      sx={{
        p: 1.5,
        bgcolor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'border-color 0.2s',
        '&:hover': { borderColor: showColor },
      }}
    >
      {show && (
        <Box
          component={Link}
          to={`/shows/${show.id}`}
          sx={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 0.75,
            fontSize: 12,
            fontWeight: 600,
            color: showColor,
            textDecoration: 'none',
          }}
        >
          <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: showColor }} />
          {show.title}
        </Box>
      )}

      <Typography sx={{ fontWeight: 600, mt: 0.5 }}>{episode.title}</Typography>

      {nextStatus ? (
        <Button
          size="small"
          variant="outlined"
          fullWidth
          onClick={() => updateEpisodeStatus(episode.id, nextStatus)}
          sx={{
            mt: 1.5,
            color: statusConfig[nextStatus].color,
            borderColor: `${statusConfig[nextStatus].color}55`,
          }}
        >
          Move to {statusConfig[nextStatus].label}
        </Button>
      ) : (
        <Typography variant="caption" color="text.secondary">
          Published {episode.publishDate}
        </Typography>
      )}
    </Paper>
  )
}