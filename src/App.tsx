import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import ShowPage from './pages/ShowPage'
import PipelinePage from './pages/PipelinePage'
import NewShowPage from './pages/NewShowPage'
import { PodcastProvider } from './context/PodcastContext'
import NotFound from './components/NotFound'

export default function App() {
  return (
    <PodcastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="shows/new" element={<NewShowPage />} />
            <Route path="shows/:showId" element={<ShowPage />} />
            <Route path="pipeline" element={<PipelinePage />} />
            <Route path="*" element={<NotFound title="Page not found" message="This page doesn't exist. Let's get you back to your shows." />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PodcastProvider >
  )
}