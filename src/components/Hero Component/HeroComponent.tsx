import './hero.css'
import { Link } from 'react-router-dom'

type HeroProps = {
  onLoginClick?: () => void
  guestName?: string
}

function Hero({ onLoginClick, guestName }: HeroProps) {
  const shortName = guestName?.trim().split(' ')[0]

  return (
    <section className="hero" id="home">
      <nav className="hero-nav" aria-label="Main navigation">
        <Link to="/home" className="hero-brand" aria-label="PatHotelia home">
          <span className="hero-brand-mark" aria-hidden="true" />
          <span className="hero-brand-text">
            <span>Luxury Collection</span>
            <strong>PatHotelia</strong>
          </span>
        </Link>

        <div className="hero-nav-links">
          <a href="#home">Home</a>
          <a href="#room-collections">Suites</a>
          <a href="#experience">Experience</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="hero-nav-actions">
          {shortName ? (
            <span className="hero-nav-guest">Welcome, {shortName}</span>
          ) : (
            <button
              type="button"
              className="btn btn-secondary hero-nav-login"
              onClick={onLoginClick}
              aria-label="Open login"
            >
              Sign In
            </button>
          )}
        </div>
      </nav>

      <div className="hero-content">
        <span className="hero-label">Curated Coastal Luxury</span>
        <h1 className="hero-title">A serene five-star stay by the sea</h1>
        <p className="hero-subtitle">
          Discover signature rooms, effortless booking, and thoughtful service
          designed for modern guests who value comfort and elegance.
        </p>

        <div className="hero-cta-group">
          <a href="#room-collections" className="btn btn-primary hero-cta">
            Explore Rooms
          </a>
          {!shortName && (
            <button type="button" className="btn btn-ghost hero-cta" onClick={onLoginClick}>
              Create Guest Account
            </button>
          )}
        </div>

        <div className="hero-stats" aria-label="Hotel highlights">
          <div className="hero-stat">
            <strong>4.9 / 5</strong>
            <span>Average guest rating</span>
          </div>
          <div className="hero-stat">
            <strong>24/7</strong>
            <span>Concierge support</span>
          </div>
          <div className="hero-stat">
            <strong>15 min</strong>
            <span>Fast online check-in</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
