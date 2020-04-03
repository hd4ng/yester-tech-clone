import React from "react"
import { Columns, Column } from "react-flex-columns"
import "./PrimaryHeader.scss"
import { Link } from "react-router-dom"
import Logo from "./Logo"

const PrimaryHeader = () => {
  return (
    <div className="primary-header">
      <Columns gutters middle>
        <Column flex>
          <Link to="/" className="nav-logo">
            <Logo />
          </Link>
        </Column>
      </Columns>
    </div>
  )
}

export default PrimaryHeader
