import React from "react"
import PrimaryHeader from "./PrimaryHeader"
import "./PrimaryLayout.scss"

const PrimaryLayout: React.FC = ({ children }) => {
  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        {children} Primary Layout
      </div>
    </div>
  )
}

export default PrimaryLayout
