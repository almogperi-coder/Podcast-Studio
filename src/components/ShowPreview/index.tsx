import { Box, Chip, Paper, Typography } from '@mui/material'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import ShowDna from '../ShowDna'
import type { NewShow } from '../../types/podcast'

type ShowPreviewProps = {
  show: NewShow
}

export default function ShowPreview(props: ShowPreviewProps) {
  const { show } = props
  const { title, niche, host, coverColor } = show

  return (
    <Box sx={{ position: { md: 'sticky' }, top: { md: 88 } }}>
      <Typography variant="overline" color="text.secondary" sx={{ letterSpacing: 2 }}>
        Live preview
      </Typography>

      <Paper
        variant="outlined"
        sx={{
          mt: 1,
          overflow: 'hidden',
          boxShadow: `0 16px 40px ${coverColor}33`,
          transition: 'box-shadow 0.3s',
        }}
      >
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

        <Box sx={{ p: 2.5 }}>
          <Chip
            label={niche || 'Niche'}
            size="small"
            sx={{ bgcolor: `${coverColor}33`, color: coverColor, fontWeight: 600 }}
          />
          <Typography variant="h5" sx={{ mt: 1.5 }}>
            {title || 'Your show title'}
          </Typography>
          <Typography variant="subtitle2" color="text.secondary">
            Hosted by {host || 'you'}
          </Typography>

          <Typography variant="subtitle2" sx={{ mt: 3, mb: 1.5 }}>
            Show DNA
          </Typography>
          <ShowDna show={show} />
        </Box>
      </Paper>
    </Box>
  )
}