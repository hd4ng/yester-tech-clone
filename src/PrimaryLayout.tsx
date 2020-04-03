import React from "react"
import PrimaryHeader from "./PrimaryHeader"
import "./PrimaryLayout.scss"
import PrimaryFooter from "./PrimaryFooter"

const PrimaryLayout = () => {
  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <main className="primary-content">Content</main>
        <PrimaryFooter />
      </div>
    </div>
  )
}

export default PrimaryLayout
