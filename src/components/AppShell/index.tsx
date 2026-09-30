import { AppBar, Box, Button, Container, Toolbar, Typography } from '@mui/material'
import PodcastsIcon from '@mui/icons-material/Podcasts'
import { Link, NavLink, Outlet } from 'react-router-dom'

const navLinkStyle = {
  color: 'text.secondary',
  '&.active': { color: 'text.primary', bgcolor: 'rgba(139, 92, 246, 0.15)' },
}

export default function AppShell() {
  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          bgcolor: 'rgba(11, 11, 20, 0.7)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Toolbar>
          <Box
            component={Link}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', gap: 1, textDecoration: 'none' }}
          >
            <PodcastsIcon sx={{ color: 'secondary.main' }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                background: 'linear-gradient(90deg, #8B5CF6, #EC4899)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
              }}
            >
              Podcast Studio
            </Typography>
          </Box>

          <Box sx={{ ml: 'auto', display: 'flex', gap: 1 }}>
            <Button component={NavLink} to="/" end sx={navLinkStyle}>
              Shows
            </Button>
            <Button component={NavLink} to="/pipeline" sx={navLinkStyle}>
              Pipeline
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 3 }}>
        <Outlet />
      </Container>
    </>
  )
}