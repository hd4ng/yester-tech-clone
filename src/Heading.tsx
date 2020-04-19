import React from "react"
import classnames from "classnames"

import { ComponentWithAs } from "./types"
import "./Heading.scss"

type HeadingProps = {
  size?: 1 | 2 | 3 | 4
}

const Heading: ComponentWithAs<"h1", HeadingProps> = ({
  as: Component = "h1",
  size = 1,
  className,
  ...rest
}) => {
  return (
    <Component
      className={classnames("heading", `size-${size}`, className)}
      {...rest}
    />
  )
}

export default Heading
