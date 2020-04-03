import React from "react"
import classnames from "classnames"
import "./Avatar.scss"

type AvatarProps = {
  src: string
  size: number
  className?: string
}

const Avatar: React.FC<AvatarProps> = ({ src, size, className, ...rest }) => {
  const Component = src ? "img" : "div"
  return (
    <Component
      src={src}
      alt="Avatar"
      style={{ fontSize: `${size}rem` }}
      className={classnames("avatar", className)}
      {...rest}
    />
  )
}

export default Avatar
