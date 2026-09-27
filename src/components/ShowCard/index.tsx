import { Card, CardActionArea, CardContent, Chip, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import type { Show } from '../../types/podcast'

type ShowCardProps = {
  show: Show
}

export default function ShowCard(props: ShowCardProps) {
  const { show } = props
  const { id, title, niche, host, description } = show

  return (
    <Card sx={{ maxWidth: 360 }}>
      <CardActionArea component={Link} to={`/shows/${id}`}>
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
      </CardActionArea>
    </Card>
  )
}