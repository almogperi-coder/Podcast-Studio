import { Box, Stack, Typography } from '@mui/material'
import { usePodcastContext } from '../../context/PodcastContext'

export default function Hero() {
  const { shows, episodes } = usePodcastContext()
  const publishedCount = episodes.filter((e) => e.status === 'published').length

  const stats = [
    { label: 'Shows', value: shows.length },
    { label: 'Episodes', value: episodes.length },
    { label: 'Published', value: publishedCount },
  ]

  return (
    <Box
      sx={{
        p: { xs: 3, md: 6 },
        mb: 4,
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        background:
          'radial-gradient(circle at top left, rgba(139, 92, 246, 0.35), transparent 60%), radial-gradient(circle at bottom right, rgba(236, 72, 153, 0.25), transparent 60%)',
      }}
    >
      <Typography variant="overline" sx={{ color: 'secondary.main', letterSpacing: 2 }}>
        Your podcast factory
      </Typography>

      <Typography variant="h3" sx={{ fontWeight: 800, mt: 1 }}>
        Create shows.{' '}
        <Box
          component="span"
          sx={{
            background: 'linear-gradient(90deg, #8B5CF6, #EC4899)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
          }}
        >
          Ship episodes.
        </Box>
      </Typography>

      <Typography color="text.secondary" sx={{ mt: 2, maxWidth: 520 }}>
        Manage every show and move each episode from draft to published, all in one place.
      </Typography>

      <Stack direction="row" spacing={4} sx={{ mt: 4 }}>
        {stats.map((stat) => (
          <Box key={stat.label}>
            <Typography variant="h4">{stat.value}</Typography>
            <Typography variant="body2" color="text.secondary">
              {stat.label}
            </Typography>
          </Box>
        ))}
      </Stack>
    </Box>
  )
}