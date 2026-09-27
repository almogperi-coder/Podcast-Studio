import { Button, Chip, List, ListItem, ListItemText, Stack, Typography } from '@mui/material'
import StatusChip from '../../components/StatusChip'
import { useParams } from 'react-router-dom'
import { usePodcastContext } from '../../context/PodcastContext'
import type { EpisodeStatus } from '../../types/podcast'

const statusOrder: EpisodeStatus[] = ['draft', 'scripted', 'recorded', 'published']

function getNextStatus(status: EpisodeStatus): EpisodeStatus | null {
    const index = statusOrder.indexOf(status)
    return statusOrder[index + 1] ?? null
}

export default function ShowPage() {
    const { shows, episodes, updateEpisodeStatus } = usePodcastContext()
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
                {showEpisodes.map((episode) => {
                    const nextStatus = getNextStatus(episode.status)

                    return (
                        <ListItem key={episode.id} divider>
                            <ListItemText
                                primary={episode.title}
                                secondary={episode.publishDate ?? 'Not published yet'}
                            />
                            <Stack direction="row" spacing={1} sx={{ alignItems: 'center' }}>
                                <StatusChip status={episode.status} />
                                {nextStatus && (
                                    <Button
                                        size="small"
                                        variant="contained"
                                        onClick={() => updateEpisodeStatus(episode.id, nextStatus)}
                                    >
                                        → {nextStatus}
                                    </Button>
                                )}
                            </Stack>
                        </ListItem>
                    )
                })}
            </List>
        </>
    )
}