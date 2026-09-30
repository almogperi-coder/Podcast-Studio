import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppShell from './components/AppShell'
import HomePage from './pages/HomePage'
import ShowPage from './pages/ShowPage'
import PipelinePage from './pages/PipelinePage'
import { PodcastProvider } from './context/PodcastContext'

export default function App() {
  return (
    <PodcastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppShell />}>
            <Route index element={<HomePage />} />
            <Route path="shows/:showId" element={<ShowPage />} />
            <Route path="pipeline" element={<PipelinePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </PodcastProvider >
  )
}