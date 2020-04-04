import React from "react"
import { As } from "./utils"

type CenteredProps = {
  as?: As
  size?: number
}

const Centered: React.FC<CenteredProps> = ({
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
