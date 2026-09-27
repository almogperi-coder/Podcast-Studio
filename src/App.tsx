import ShowCard from './components/ShowCard'
import { shows } from './data/mockData'

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      {shows.map((show) => (
        <ShowCard key={show.id} show={show} />
      ))}
    </div>
  )
}