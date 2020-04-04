import React from "react"
import { PropsWithAs } from "./types"

type CenteredProps = {
  size?: number
}

const Centered: React.FC<PropsWithAs<"div", CenteredProps>> = ({
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
