import React from 'react'
import StockDashboard from './components/StockDashboard'
import ThemeSwitcher from './components/ThemeSwitcher'
import "bootstrap/dist/css/bootstrap.min.css";

import './styles/App.css'

function App() {
  return (
    <div>
      <ThemeSwitcher />
      <StockDashboard />
    </div>
  )
}

export default App


