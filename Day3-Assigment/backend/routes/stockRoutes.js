import express from 'express'
import { fetchStockData } from '../services/stockService.js'

const router = express.Router()

router.get('/:symbol', async (req, res) => {
  try {
    const data = await fetchStockData(req.params.symbol)
    res.json(data)
  } catch (error) {
    res.status(500).json({ error: 'Error fetching stock data' })
  }
})

export default router