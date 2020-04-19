import React from "react"
import classnames from "classnames"

import "./ProductImage.scss"

type ProductImageProps = { size?: number } & React.ImgHTMLAttributes<
  HTMLImageElement
>

const ProductImage: React.FC<ProductImageProps> = ({
  size = 7,
  className,
  ...rest
}) => {
  return (
    <img
      className={classnames("product-image", className)}
      style={{ fontSize: `${size}rem` }}
      alt={rest.alt || ""}
      {...rest}
    />
  )
}

export default ProductImage
