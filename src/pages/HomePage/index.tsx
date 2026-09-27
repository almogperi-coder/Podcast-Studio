import { Stack, Typography } from '@mui/material'
import ShowCard from '../../components/ShowCard'
import { shows } from '../../data/mockData'

export default function HomePage() {
  return (
    <>
      <Typography variant="h4" gutterBottom>
        My Shows
      </Typography>
      <Stack spacing={2}>
        {shows.map((show) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </Stack>
    </>
  )
}