import React from "react"
import classnames from "classnames"

import { As } from "./utils"
import "./Heading.scss"

type HeadingProps = {
  as?: As
  size?: 1 | 2 | 3 | 4
  className?: string
}

const Heading: React.FC<HeadingProps> = ({
  as: Component = "h1",
  size = 1,
  className,
  ...rest
}) => {
  return (
    <Component
      className={classnames("headind", `size-${size}`, className)}
      {...rest}
    />
  )
}

export default Heading
