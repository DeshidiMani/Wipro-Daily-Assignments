import fetch from 'node-fetch'
import dotenv from 'dotenv'

dotenv.config()

export const fetchStockData = async (symbol) => {
  const API_KEY = process.env.STOCK_API_KEY
  const url = `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${API_KEY}`
  
  const response = await fetch(url)
  const data = await response.json()

  return {
    price: parseFloat(data['Global Quote']['05. price']),
    change: parseFloat(data['Global Quote']['10. change percent']),
  }
}
