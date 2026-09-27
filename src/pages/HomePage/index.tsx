import { Grid, Typography } from '@mui/material'
import ShowCard from '../../components/ShowCard'
import Hero from '../../components/Hero'
import { usePodcastContext } from '../../context/PodcastContext'

export default function HomePage() {
  const { shows } = usePodcastContext()

  return (
    <>
      <Hero />
      <Typography variant="h4" gutterBottom>
        My Shows
      </Typography>
      <Grid container spacing={3}>
        {shows.map((show) => (
          <Grid key={show.id} size={{ xs: 12, sm: 6, md: 4 }}>
            <ShowCard show={show} />
          </Grid>
        ))}
      </Grid>
    </>
  )
}