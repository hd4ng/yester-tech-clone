import React from "react"
import { Link } from "react-router-dom"
import "./Hero.scss"

const Hero = () => {
  return (
    <div className="hero">
      <div className="message">
        <div className="title">Vintage Tech from the 80's and 90's</div>
        <Link to="/products" className="button cta-button">
          Start Browsing
        </Link>
      </div>
    </div>
  )
}

export default Hero
