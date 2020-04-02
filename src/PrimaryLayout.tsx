import React from "react"
import PrimaryHeader from "./PrimaryHeader"

const PrimaryLayout: React.FC = ({ children }) => {
  return (
    <div>
      <PrimaryHeader />
      {children} Primary Layout
    </div>
  )
}

export default PrimaryLayout
