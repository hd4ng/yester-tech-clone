import React from "react"
import { Link, LinkProps } from "react-router-dom"
import { FaGamepad, FaDesktop } from "react-icons/fa"
import { GiKeyboard } from "react-icons/gi"
import { IoIosSave } from "react-icons/io"
import { MdSpeaker } from "react-icons/md"

import { As } from "./types"
import Tiles from "./Tiles"
import Centered from "./Centered"
import "./ProductCategories.scss"

export type CategoryTileProps = { icon: As } & LinkProps

export const CategoryTile: React.FC<CategoryTileProps> = ({
  children,
  icon: Icon,
  ...rest
}) => {
  return (
    <Link className="category-tile" {...rest}>
      <span className="category-icon">
        <Icon />
      </span>
      <span className="title">{children}</span>
    </Link>
  )
}

export const CategoryComputers: React.FC<LinkProps> = (props) => {
  return (
    <CategoryTile {...props} icon={FaDesktop}>
      Computers
    </CategoryTile>
  )
}

export const CategoryAccessories: React.FC<LinkProps> = (props) => {
  return (
    <CategoryTile {...props} icon={GiKeyboard}>
      Gadgets
    </CategoryTile>
  )
}

export const CategoryStorage: React.FC<LinkProps> = (props) => {
  return (
    <CategoryTile {...props} icon={IoIosSave}>
      Storage
    </CategoryTile>
  )
}

export const CategoryGaming: React.FC<LinkProps> = (props) => {
  return (
    <CategoryTile {...props} icon={FaGamepad}>
      Games
    </CategoryTile>
  )
}

export const CategoryMusic: React.FC<LinkProps> = (props) => {
  return (
    <CategoryTile {...props} icon={MdSpeaker}>
      Music
    </CategoryTile>
  )
}

const ProductCategories = () => {
  return (
    <Centered size={40}>
      <Tiles minSize={7}>
        <CategoryComputers to="/products?categories=computers" />
        <CategoryAccessories to="/products?categories=gadgets" />
        <CategoryStorage to="/products?categories=storage" />
        <CategoryGaming to="/products?categories=games" />
        <CategoryMusic to="/products?categories=music" />
      </Tiles>
    </Centered>
  )
}

export default ProductCategories
