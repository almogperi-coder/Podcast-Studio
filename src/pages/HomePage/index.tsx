import { Stack, Typography } from '@mui/material'
import ShowCard from '../../components/ShowCard'
import Hero from '../../components/Hero'
import { usePodcastContext } from '../../context/PodcastContext'

export default function HomePage() {
    const { shows } = usePodcastContext() 
    return <>
      <Hero />
      <Typography variant="h4" gutterBottom>
        My Shows
      </Typography>
      <Stack spacing={2}>
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </Stack>
    </>
  
}