import { useState } from 'react'
import '../styles/StockInput.css'

const StockInput = ({ onStockChange }) => {
  const [symbol, setSymbol] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (symbol) {
      onStockChange(symbol)
      setSymbol('') // Clear input after submission
    }
  }

  return (
    <form className="stock-input-form" onSubmit={handleSubmit}>
      <input 
        type="text" 
        value={symbol} 
        onChange={(e) => setSymbol(e.target.value)} 
        placeholder="Enter Stock Symbol" 
        required 
      />
      <button type="submit">Fetch</button>
    </form>
  )
}

export default StockInput
