import { Box, Card, CardActionArea, CardContent, Chip, Typography } from '@mui/material'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import { Link } from 'react-router-dom'
import { usePodcastContext } from '../../context/PodcastContext'
import type { Show } from '../../types/podcast'

type ShowCardProps = {
  show: Show
}

export default function ShowCard(props: ShowCardProps) {
  const { show } = props
  const { id, title, niche, host, description, coverColor } = show
  const { episodes } = usePodcastContext()
  const episodeCount = episodes.filter((e) => e.showId === id).length

  return (
    <Card
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        transition: 'transform 0.25s, box-shadow 0.25s',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: `0 16px 40px ${coverColor}55`,
        },
      }}
    >
      <CardActionArea component={Link} to={`/shows/${id}`} sx={{ height: '100%' }}>
        <Box
          sx={{
            height: 140,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${coverColor}, #151524)`,
          }}
        >
          <PodcastsIcon sx={{ fontSize: 64, color: 'rgba(255, 255, 255, 0.85)' }} />
        </Box>

        <CardContent>
          <Chip
            label={niche}
            size="small"
            sx={{ bgcolor: `${coverColor}33`, color: coverColor, fontWeight: 600 }}
          />
          <Typography variant="h5" sx={{ mt: 1.5 }}>
            {title}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Hosted by {host}
          </Typography>
          <Typography variant="body2" sx={{ mt: 1 }}>
            {description}
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 2 }}>
            {episodeCount}    {episodeCount === 1 ? 'episode' : 'episodes'}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}