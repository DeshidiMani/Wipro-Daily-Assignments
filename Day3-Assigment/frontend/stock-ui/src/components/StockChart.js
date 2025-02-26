import { useEffect, useState } from 'react'
import { Line } from 'react-chartjs-2'
import axios from 'axios'
import '../styles/StockChart.css'

const StockChart = ({ symbol }) => {
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    if (symbol) {
      axios.get(`https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=your_api_key`)
        .then(response => {
          const data = response.data['Time Series (5min)']
          if (data) {
            setChartData(
              Object.keys(data).map(time => ({
                time,
                price: parseFloat(data[time]['1. open'])
              }))
            )
          }
        })
        .catch(error => console.error('Error fetching chart data:', error))
    }
  }, [symbol])

  return (
    <div className="stock-chart">
      {chartData.length > 0 && (
        <Line
          data={{
            labels: chartData.map(d => d.time),
            datasets: [
              {
                label: `Stock Price of ${symbol}`,
                data: chartData.map(d => d.price),
                borderColor: 'blue',
                borderWidth: 2,
              },
            ],
          }}
        />
      )}
    </div>
  )
}

export default StockChart
