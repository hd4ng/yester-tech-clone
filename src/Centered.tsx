import React from "react"
import { ComponentWithAs } from "./types"

type CenteredProps = {
  size?: number
}

const Centered: ComponentWithAs<"div", CenteredProps> = ({
  as: Component = "div",
  size = 30,
  children,
  ...rest
}) => {
  return (
    <Component
      style={{
        margin: "0 auto",
        maxWidth: `${size}rem`,
      }}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Centered
