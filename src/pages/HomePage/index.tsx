import { Button, Grid, Stack, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { Link } from 'react-router-dom'
import ShowCard from '../../components/ShowCard'
import Hero from '../../components/Hero'
import { usePodcastContext } from '../../context/PodcastContext'

export default function HomePage() {
  const { shows } = usePodcastContext()

  return (
    <>
      <Hero />
      <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h4">My Shows</Typography>
        <Button component={Link} to="/shows/new" variant="contained" startIcon={<AddIcon />}>
          New show
        </Button>
      </Stack>
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