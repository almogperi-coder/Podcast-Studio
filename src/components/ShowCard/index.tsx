import { Card, CardContent, Chip, Typography } from '@mui/material'
import type { Show } from '../../types/podcast'

type ShowCardProps = {
  show: Show
}

export default function ShowCard(props: ShowCardProps) {
  const { show } = props
  const { title, niche, host, description } = show

  return (
    <Card sx={{ maxWidth: 360 }}>
      <CardContent>
        <Chip label={niche} color="primary" size="small" />
        <Typography variant="h5" sx={{ mt: 1 }}>
          {title}
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Hosted by {host}
        </Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  )
}