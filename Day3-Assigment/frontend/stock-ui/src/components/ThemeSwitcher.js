import { useState } from 'react'
import '../styles/ThemeSwitcher.css'

const ThemeSwitcher = () => {
  const [darkMode, setDarkMode] = useState(false)

  const toggleTheme = () => {
    setDarkMode(!darkMode)
    document.body.classList.toggle('dark-theme', !darkMode)
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {darkMode ? 'Light Mode' : 'Dark Mode'}
    </button>
  )
}

export default ThemeSwitcher
