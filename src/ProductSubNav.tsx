import React from "react"
import { useShoppingCart } from "./ShoppingCartState"
import SubNav from "./SubNav"
import { Columns, Column } from "react-flex-columns"
import { Link } from "react-router-dom"
import SearchBox from "./SearchBox"

const ProductSubNav = () => {
  const { getCartSize } = useShoppingCart()
  const cartSize = getCartSize()

  return (
    <SubNav>
      <Columns split middle>
        <Column>
          {cartSize ? (
            <Link to="/checkout">View Cart ({cartSize})</Link>
          ) : (
            <span>Cart is empty</span>
          )}
        </Column>
        <Column>
          <div className="align-right">
            <SearchBox placeholder="Search Products" path="/products" />
          </div>
        </Column>
      </Columns>
    </SubNav>
  )
}

export default ProductSubNav
