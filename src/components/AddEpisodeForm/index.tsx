import { useState, type FormEvent } from 'react'
import { Button, Paper, Stack, TextField } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { usePodcastContext } from '../../context/PodcastContext'

type AddEpisodeFormProps = {
  showId: string
}

export default function AddEpisodeForm(props: AddEpisodeFormProps) {
  const { showId } = props
  const { addEpisode } = usePodcastContext()
  const [title, setTitle] = useState('')

  const trimmedTitle = title.trim()

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (trimmedTitle === '') return

    addEpisode(showId, trimmedTitle)
    setTitle('')
  }

  return (
    <Paper component="form" onSubmit={handleSubmit} variant="outlined" sx={{ p: 2, mt: 3 }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5}>
        <TextField
          label="New episode title"
          size="small"
          fullWidth
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <Button type="submit" variant="contained" startIcon={<AddIcon />} disabled={trimmedTitle === ''} sx={{ flexShrink: 0 }}>
          Add episode
        </Button>
      </Stack>
    </Paper>
  )
}