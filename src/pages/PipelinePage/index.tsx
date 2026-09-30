import { Box, Chip, Paper, Stack, Typography } from '@mui/material'
import PipelineCard from '../../components/PipelineCard'
import { usePodcastContext } from '../../context/PodcastContext'
import { statusConfig, statusOrder } from '../../utils/status'

export default function PipelinePage() {
  const { episodes } = usePodcastContext()

  return (
    <>
      <Typography variant="h4">Pipeline</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        Every episode from every show, by stage
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
          gap: 2,
          alignItems: 'start',
        }}
      >
        {statusOrder.map((status) => {
          const { label, color, icon } = statusConfig[status]
          const columnEpisodes = episodes.filter((e) => e.status === status)

          return (
            <Paper key={status} variant="outlined" sx={{ p: 1.5, borderTop: `3px solid ${color}` }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 1.5, color }}>
                {icon}
                <Typography sx={{ fontWeight: 700, flexGrow: 1 }}>{label}</Typography>
                <Chip label={columnEpisodes.length} size="small" />
              </Stack>

              <Stack spacing={1}>
                {columnEpisodes.map((episode) => (
                  <PipelineCard key={episode.id} episode={episode} />
                ))}
                {columnEpisodes.length === 0 && (
                  <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', py: 2 }}>
                    Nothing here yet
                  </Typography>
                )}
              </Stack>
            </Paper>
          )
        })}
      </Box>
    </>
  )
}