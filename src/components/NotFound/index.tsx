import { Box, Button, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import { Link } from 'react-router-dom'

type NotFoundProps = {
  title: string
  message: string
}

export default function NotFound(props: NotFoundProps) {
  const { title, message } = props

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, textAlign: 'center' }}>
      <PodcastsIcon sx={{ fontSize: 56, color: 'text.disabled' }} />
      <Typography variant="h4" sx={{ mt: 2 }}>
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mx: 'auto', maxWidth: 440 }}>
        {message}
      </Typography>
      <Button component={Link} to="/" variant="contained" startIcon={<ArrowBackIcon />} sx={{ mt: 3 }}>
        Back to all shows
      </Button>
    </Box>
  )
}