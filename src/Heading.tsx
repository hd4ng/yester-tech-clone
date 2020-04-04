import React from "react"
import classnames from "classnames"

import { PropsWithAs } from "./types"
import "./Heading.scss"

type HeadingProps = {
  size?: 1 | 2 | 3 | 4
}

const Heading: React.FC<PropsWithAs<"h1", HeadingProps>> = ({
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
