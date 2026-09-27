import ShowCard from './components/ShowCard'
import { shows } from './data/mockData'

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <ShowCard show={shows[0]} />
    </div>
  )
}