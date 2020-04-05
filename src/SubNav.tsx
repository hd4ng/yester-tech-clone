import React from "react"

import "./SubNav.scss"

const SubNav: React.FC = ({ children }) => {
  return <nav className="sub-nav">{children}</nav>
}

export default SubNav
