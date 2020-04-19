import React, { useCallback } from "react"
import { Columns, Column } from "react-flex-columns"
import { useParams } from "react-router-dom"

import * as api from "./api"
import usePromise from "./usePromise"
import Heading from "./Heading"
import Quantity from "./Quantity"
import Tiles from "./Tiles"
import StarRatings from "./StarRatings"
import ProductImage from "./ProductImage"
import ShoppingCartButton from "./ShoppingCartButton"
import { useShoppingCart } from "./ShoppingCartState"
import ProductTile from "./ProductTile"

const ProductProfile = () => {
  const { productId: productIdFromUrl } = useParams()
  let productId = parseInt(productIdFromUrl || "", 10)

  // Cart
  const { addToCart, updateQuantity, getQuantity } = useShoppingCart()
  const quantity = getQuantity(productId)

  // Get Product
  const getProduct = useCallback(() => api.products.getProduct(productId), [
    productId,
  ])
  const [product] = usePromise(getProduct)

  if (!product) return <div>Loading...</div>

  return (
    <div className="spacing">
      <Columns gutters>
        <Column>
          <ProductImage src={product.imagePath} alt={product.name} size={15} />
        </Column>
        <Column flex className="spacing">
          <Heading>{product.name}</Heading>
          <StarRatings rating={product.rating} />
          <hr />
          <Columns split>
            <Column>
              <div className="text-small">
                <div>
                  <strong>Price: ${product.price.toFixed(2)}</strong>
                </div>
                <div>Brand: {product.brand}</div>
                <div>Category: {product.category}</div>
                <div>Condition: {product.condition}</div>
              </div>
            </Column>
            <Column className="spacing-small">
              <ShoppingCartButton
                onClick={() =>
                  addToCart(productId + "", product.name, product.price)
                }
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
          <p>{product.description}</p>
        </Column>
      </Columns>

      {Array.isArray(product.relatedProducts) && (
        <>
          <hr />
          <div>
            <Heading as="h2" size={4}>
              Related Products
            </Heading>
            <Tiles>
              {product.relatedProducts.map((productId) => (
                <ProductTile key={productId} productId={productId} />
              ))}
            </Tiles>
          </div>
        </>
      )}
    </div>
  )
}

export default ProductProfile
