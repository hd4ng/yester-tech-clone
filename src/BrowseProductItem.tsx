import React from "react"
import { Link } from "react-router-dom"
import { Columns, Column } from "react-flex-columns"

import Heading from "./Heading"
import Quantity from "./Quantity"
import StarRatings from "./StarRatings"
import ProductImage from "./ProductImage"
import ShoppingCartButton from "./ShoppingCartButton"
import { useShoppingCart } from "./ShoppingCartState"
import "./BrowseProductItem.scss"

type BrowseProductItemProps = {
  productId: number
  name: string
  price: number
  imagePath: string
  year?: string
  condition?: string
  brand?: string
  category?: string
  rating: number
}

const BrowseProductItem: React.FC<BrowseProductItemProps> = ({
  productId,
  name,
  price,
  imagePath,
  year = "unknown",
  condition = "n/a",
  brand = "n/a",
  category = "n/a",
  rating,
}) => {
  // Cart
  const { addToCart, updateQuantity, getQuantity } = useShoppingCart()
  const quantity = getQuantity(productId)

  return (
    <Columns gutters className="browse-product-item">
      <Column>
        <ProductImage src={imagePath} alt={name} />
      </Column>
      <Column flex className="spacing-small">
        <Heading as="h1" size={3}>
          <Link to={`/products/${productId}`}>
            {name} ({year})
          </Link>
        </Heading>
        <StarRatings rating={rating} />
        <div className="horizontal-spacing">
          <span>Price:</span>
          <strong>${price.toFixed(2)}</strong>
        </div>
        <div className="text-small horizontal-spacing">
          <span>Brand: {brand}</span>
          <span>Category: {category}</span>
          <span>Condition: {condition}</span>
        </div>
      </Column>
      <Column className="spacing-small">
        <ShoppingCartButton
          onClick={() => addToCart(productId + "", name, price)}
          quantity={quantity}
        />
        {quantity > 0 && (
          <div className="align-right">
            <Quantity
              onChange={(q) => updateQuantity(productId + "", q)}
              quantity={quantity}
            />
          </div>
        )}
      </Column>
    </Columns>
  )
}

export default BrowseProductItem
