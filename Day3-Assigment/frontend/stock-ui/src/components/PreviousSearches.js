import { useRef } from 'react'
import '../styles/PreviousSearches.css'

const PreviousSearches = () => {
  const previousSearchesRef = useRef([])

  const addSearch = (symbol) => {
    if (!previousSearchesRef.current.includes(symbol)) {
      previousSearchesRef.current = [...previousSearchesRef.current, symbol]
    }
  }

  return (
    <div className="previous-searches">
      <h3>Previous Searches</h3>
      <ul>
        {previousSearchesRef.current.map((symbol, index) => (
          <li key={index}>{symbol}</li>
        ))}
      </ul>
    </div>
  )
}

export default PreviousSearches
