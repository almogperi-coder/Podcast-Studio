import { Chip, List, ListItem, ListItemText, Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { usePodcastContext } from '../../context/PodcastContext'

export default function ShowPage() {
    const { shows, episodes } = usePodcastContext()
  const { showId } = useParams()

  const show = shows.find((s) => s.id === showId)
  const showEpisodes = episodes.filter((e) => e.showId === showId)

  if (!show) {
    return <Typography variant="h5">Show not found</Typography>
  }

  return (
    <>
      <Chip label={show.niche} color="primary" size="small" />
      <Typography variant="h4" sx={{ mt: 1 }}>
        {show.title}
      </Typography>
      <Typography color="text.secondary" gutterBottom>
        Hosted by {show.host}
      </Typography>

      <Typography variant="h6" sx={{ mt: 3 }}>
        Episodes ({showEpisodes.length})
      </Typography>
      <List>
        {showEpisodes.map((episode) => (
          <ListItem key={episode.id} divider>
            <ListItemText
              primary={episode.title}
              secondary={episode.publishDate ?? 'Not published yet'}
            />
            <Chip label={episode.status} size="small" variant="outlined" />
          </ListItem>
        ))}
      </List>
    </>
  )
}