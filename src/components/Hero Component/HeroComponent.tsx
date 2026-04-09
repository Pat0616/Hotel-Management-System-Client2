import './hero.css'
import { Link } from 'react-router-dom'

type HeroProps = {
  onLoginClick?: () => void
}

function Hero({ onLoginClick }: HeroProps) {
  return (
    <section className="hero">

      {/* ── Top Navigation ── */}
      <nav className="hero-nav" aria-label="Main navigation">
        <div className="hero-nav-links">
          <Link to="/home">Home</Link>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
        </div>
        <button
          type="button"
          className="hero-nav-login"
          onClick={onLoginClick}
          aria-label="Open login"
        >
          Login
        </button>
      </nav>

      {/* ── Hero Content ── */}
      <div className="hero-content">
        <h1 className="hero-title">Hotel &amp; Resort</h1>
        <p className="hero-subtitle">
          Experience a refined escape where modern minimalist design
          meets the deep cultural soul of Sorsogon
        </p>
        <Link to="/home" className="hero-cta">
          Book Now
        </Link>
      </div>

    </section>
  )
}

export default Hero
