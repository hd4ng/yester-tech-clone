import React from "react"
import { Switch, Route, Redirect } from "react-router-dom"

import ProductSidebar from "./ProductSidebar"
import BrowseProducts from "./BrowseProducts"
import ProductProfile from "./ProductProfile"
import "./ProductsLayout.scss"

const ProductsLayout = () => {
  return (
    <div className="products-layout">
      <ProductSidebar />
      <div>
        <Switch>
          <Route path="/products" exact>
            <BrowseProducts />
          </Route>
          <Route path="/products/:productId">
            <ProductProfile />
          </Route>
          <Redirect to="/products" />
        </Switch>
      </div>
    </div>
  )
}

export default ProductsLayout
