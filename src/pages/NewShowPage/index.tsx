import { useState, type FormEvent } from 'react'
import { Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { Link, useNavigate } from 'react-router-dom'
import ColorSwatches from '../../components/ColorSwatches'
import TonePicker from '../../components/TonePicker'
import ShowPreview from '../../components/ShowPreview'
import { usePodcastContext } from '../../context/PodcastContext'
import type { NewShow, ShowTone } from '../../types/podcast'
import { coverColors } from '../../utils/showOptions'

export default function NewShowPage() {
  const { addShow } = usePodcastContext()
  const navigate = useNavigate()

  const [title, setTitle] = useState('')
  const [niche, setNiche] = useState('')
  const [host, setHost] = useState('')
  const [description, setDescription] = useState('')
  const [coverColor, setCoverColor] = useState(coverColors[0])
  const [audience, setAudience] = useState('')
  const [tone, setTone] = useState<ShowTone>('friendly')
  const [hostPersona, setHostPersona] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const draft: NewShow = {
    title: title.trim(),
    niche: niche.trim(),
    host: host.trim(),
    description: description.trim(),
    coverColor,
    audience: audience.trim(),
    tone,
    hostPersona: hostPersona.trim(),
  }

  const errors = {
    title: draft.title === '' ? 'Give your show a name' : '',
    niche: draft.niche === '' ? 'What is the show about?' : '',
    host: draft.host === '' ? 'Who hosts the show?' : '',
    audience: draft.audience === '' ? 'Who is this show for?' : '',
  }
  const isValid = Object.values(errors).every((message) => message === '')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitted(true)
    if (!isValid) return

    const id = addShow(draft)
    navigate(`/shows/${id}`)
  }

  return (
    <>
      <Button component={Link} to="/" startIcon={<ArrowBackIcon />} sx={{ mb: 2 }}>
        All shows
      </Button>

      <Typography variant="overline" sx={{ display: 'block', color: 'secondary.main', letterSpacing: 2 }}>
        New show
      </Typography>
      <Typography variant="h4">Create your show</Typography>
      <Typography color="text.secondary" sx={{ mt: 1, mb: 4, maxWidth: 560 }}>
        Start with the basics, then add the Show DNA. It teaches your AI co-producer who the show is for and how it
        should sound.
      </Typography>

      <Box component="form" onSubmit={handleSubmit} noValidate>
        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Stack spacing={3}>
              <Paper variant="outlined" sx={{ p: { xs: 2.5, sm: 3 } }}>
                <Typography variant="h6" sx={{ mb: 2.5 }}>
                  Basics
                </Typography>

                <Stack spacing={2.5}>
                  <TextField
                    label="Show title"
                    required
                    fullWidth
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    error={submitted && errors.title !== ''}
                    helperText={submitted ? errors.title : ''}
                  />

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <TextField
                      label="Niche"
                      placeholder="Gardening, Fintech, Parenting..."
                      required
                      fullWidth
                      value={niche}
                      onChange={(event) => setNiche(event.target.value)}
                      error={submitted && errors.niche !== ''}
                      helperText={submitted ? errors.niche : ''}
                    />
                    <TextField
                      label="Host"
                      required
                      fullWidth
                      value={host}
                      onChange={(event) => setHost(event.target.value)}
                      error={submitted && errors.host !== ''}
                      helperText={submitted ? errors.host : ''}
                    />
                  </Stack>

                  <TextField
                    label="Description"
                    placeholder="One line that sells the show"
                    fullWidth
                    multiline
                    minRows={2}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                  />

                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      Cover color
                    </Typography>
                    <ColorSwatches value={coverColor} onChange={setCoverColor} />
                  </Box>
                </Stack>
              </Paper>

              <Paper
                variant="outlined"
                sx={{
                  p: { xs: 2.5, sm: 3 },
                  borderColor: 'rgba(139, 92, 246, 0.4)',
                  background: 'radial-gradient(circle at top right, rgba(139, 92, 246, 0.15), transparent 60%)',
                }}
              >
                <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                  <AutoAwesomeIcon sx={{ color: 'secondary.main' }} />
                  <Typography variant="h6">Show DNA</Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5, mb: 2.5 }}>
                  The AI uses this for every outline, script and title, so it sounds like you.
                </Typography>

                <Stack spacing={2.5}>
                  <TextField
                    label="Target audience"
                    placeholder="Who listens, and what do they need from the show?"
                    required
                    fullWidth
                    multiline
                    minRows={2}
                    value={audience}
                    onChange={(event) => setAudience(event.target.value)}
                    error={submitted && errors.audience !== ''}
                    helperText={submitted ? errors.audience : ''}
                  />

                  <Box>
                    <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
                      Tone
                    </Typography>
                    <TonePicker value={tone} onChange={setTone} />
                  </Box>

                  <TextField
                    label="Host persona"
                    placeholder="How does the host come across? A patient mentor, a curious beginner..."
                    fullWidth
                    multiline
                    minRows={2}
                    value={hostPersona}
                    onChange={(event) => setHostPersona(event.target.value)}
                  />
                </Stack>
              </Paper>

              <Stack direction="row" spacing={1.5} sx={{ justifyContent: 'flex-end' }}>
                <Button component={Link} to="/" color="inherit">
                  Cancel
                </Button>
                <Button type="submit" variant="contained" size="large" startIcon={<AddIcon />}>
                  Create show
                </Button>
              </Stack>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <ShowPreview show={draft} />
          </Grid>
        </Grid>
      </Box>
    </>
  )
}