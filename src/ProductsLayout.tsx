import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"

import ProductSidebar from "./ProductSidebar"
import "./ProductsLayout.scss"

const ProductsLayout = () => {
  return (
    <div className="products-layout">
      <ProductSidebar />
    </div>
  )
}

export default ProductsLayout
