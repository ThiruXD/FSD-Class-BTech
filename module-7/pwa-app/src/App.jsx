import { useState, useEffect } from 'react'
import Header from './components/Header'
import NewsCard from './components/NewsCard'
import CountryFilter from './components/CountryFilter'
import InstallPrompt from './components/InstallPrompt'
import PWABadge from './PWABadge'
import './App.css'

function App() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [country, setCountry] = useState('in,us')
  const [error, setError] = useState(null)

  const API_KEY = import.meta.env.VITE_MEDIASTACK_API_KEY

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await fetch(
          `https://api.mediastack.com/v1/news?access_key=${API_KEY}&countries=${country}&languages=en&limit=24`
        )
        const data = await response.json()
        if (data.data) {
          setNews(data.data)
        } else {
          setError('Failed to fetch news. Please check your API key or limit.')
        }
      } catch (err) {
        setError('An error occurred while fetching news.')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [country])

  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <section className="controls">
          <CountryFilter currentCountry={country} onFilterChange={setCountry} />
        </section>

        {loading ? (
          <div className="status-container">
            <span className="loader"></span>
            <p>Curating top stories for you...</p>
          </div>
        ) : error ? (
          <div className="status-container">
            <div className="error-icon">⚠️</div>
            <p>{error}</p>
          </div>
        ) : (
          <div className="news-grid">
            {news.map((article, index) => (
              <NewsCard key={article.url + index} article={article} />
            ))}
          </div>
        )}
      </main>

      <PWABadge />
      <InstallPrompt />
    </div>
  )
}

export default App
