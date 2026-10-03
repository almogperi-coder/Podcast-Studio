import { Box, Button, Chip, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { Link, useParams } from 'react-router-dom'
import EpisodeRow from '../../components/EpisodeRow'
import AddEpisodeForm from '../../components/AddEpisodeForm'
import ShowDna from '../../components/ShowDna'
import EpisodesEmptyState from '../../components/EpisodesEmptyState'
import { usePodcastContext } from '../../context/PodcastContext'
import NotFound from '../../components/NotFound'


export default function ShowPage() {
  const { shows, episodes } = usePodcastContext()
  const { showId } = useParams()

  const show = shows.find((s) => s.id === showId)
  const showEpisodes = episodes.filter((e) => e.showId === showId)

  if (!show) {
    return (
      <NotFound
        title="Show not found"
        message="Shows are saved in the browser they were created in, so a link from another device won't open them yet."
      />
    )
  }

  const publishedCount = showEpisodes.filter((e) => e.status === 'published').length
  const hasEpisodes = showEpisodes.length > 0
  const progress = hasEpisodes ? (publishedCount / showEpisodes.length) * 100 : 0

  return (
    <>
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        All shows
      </Button>

      <Box
        sx={{
          p: { xs: 3, md: 5 },
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
          background: `linear-gradient(135deg, ${show.coverColor}, #151524 75%)`,
        }}
      >
        <Box
          sx={{
            width: 96,
            height: 96,
            flexShrink: 0,
            borderRadius: 2,
            display: { xs: 'none', sm: 'flex' },
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(255, 255, 255, 0.15)',
          }}
        >
          <PodcastsIcon sx={{ fontSize: 56 }} />
        </Box>

        <Box>
          <Chip
            label={show.niche}
            size="small"
            sx={{ bgcolor: 'rgba(255, 255, 255, 0.2)', fontWeight: 600 }}
          />
          <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
            {show.title}
          </Typography>
          <Typography sx={{ opacity: 0.85 }}>
          Hosted by {show.host}
          {show.description && ` · ${show.description}`}
          </Typography>
        </Box>
      </Box>

      <Paper variant="outlined" sx={{ mt: 3, p: { xs: 2, sm: 3 } }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
          <AutoAwesomeIcon sx={{ color: 'secondary.main' }} />
          <Typography variant="h6">Show DNA</Typography>
        </Stack>
        <ShowDna show={show} />
      </Paper>

      {hasEpisodes ? (
        <>
          <Box sx={{ mt: 4 }}>
            <Stack direction="row" sx={{ justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="h6">Episodes ({showEpisodes.length})</Typography>
              <Typography color="text.secondary">
                {publishedCount} of {showEpisodes.length} published
              </Typography>
            </Stack>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 8,
                borderRadius: '4px',
                bgcolor: 'rgba(255, 255, 255, 0.08)',
                '& .MuiLinearProgress-bar': { bgcolor: '#10B981', borderRadius: '4px' },
              }}
            />
          </Box>

          <Stack spacing={1.5} sx={{ mt: 3 }}>
            {showEpisodes.map((episode) => (
              <EpisodeRow key={episode.id} episode={episode} />
            ))}
          </Stack>
        </>
      ) : (
        <EpisodesEmptyState color={show.coverColor} />
      )}

      <AddEpisodeForm showId={show.id} />
    </>
  )
}