import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"

import ProductSidebar from "./ProductSidebar"
import "./ProductsLayout.scss"
import BrowseProducts from "./BrowseProducts"

const ProductsLayout = () => {
  return (
    <div className="products-layout">
      <ProductSidebar />
      <div>
        <Switch>
          <Route path="/products">
            <BrowseProducts />
          </Route>
          <Redirect to="/products" />
        </Switch>
      </div>
    </div>
  )
}

export default ProductsLayout
