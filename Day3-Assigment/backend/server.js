import express from 'express'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import stockRoutes from './routes/stockRoutes.js'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
})

app.use(cors())
app.use(express.json())
app.use('/api/stocks', stockRoutes)

io.on('connection', (socket) => {
  console.log('Client connected')
  socket.on('subscribeStock', async ({ symbol }) => {
    console.log(`Subscribed to ${symbol}`)
    setInterval(async () => {
      try {
        const { price, change } = await fetchStockData(symbol)
        socket.emit('stockUpdate', { price, change })
      } catch (error) {
        console.error('Error fetching stock data:', error)
      }
    }, 60000)
  })
})

const PORT = process.env.PORT || 3000
httpServer.listen(PORT, () => console.log(`Server running on port ${PORT}`))