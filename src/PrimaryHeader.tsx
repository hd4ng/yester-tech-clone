import React from "react"
import { Columns, Column } from "react-flex-columns"
import { Link, NavLink } from "react-router-dom"
import { MdShoppingCart } from "react-icons/md"
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuLink,
} from "@reach/menu-button"
import { useAuthState } from "./AuthState"
import { useShoppingCart } from "./ShoppingCartState"
import Logo from "./Logo"
import Avatar from "./Avatar"
import * as api from "./api"
import "./PrimaryHeader.scss"
import "@reach/menu-button/styles.css"

const PrimaryHeader = () => {
  const { authenticated, dispatch, user } = useAuthState()
  const { getCartSize } = useShoppingCart()
  const cartSize = getCartSize()

  const handleLogout = () => {
    api.auth.logout().then(() => dispatch({ type: "LOGOUT" }))
  }

  return (
    <div className="primary-header">
      <Columns gutters middle>
        <Column flex>
          <Link to="/" className="nav-logo">
            <Logo />
          </Link>
        </Column>
        <Column className="spacing-small vertical-middle">
          <nav className="horizontal-spacing-large align-right flex-parent flex-align-center">
            <NavLink to="/" exact className="primary-nav-item">
              Home
            </NavLink>
            <NavLink to="/products" className="primary-nav-item">
              Products
            </NavLink>
            {cartSize > 0 && (
              <NavLink to="checkout" className="primary-nav-item nav-cart">
                <MdShoppingCart />
                <span className="label">{cartSize}</span>
              </NavLink>
            )}
            {authenticated ? (
              <Menu>
                <MenuButton className="primary-nav-item reset-button">
                  <Avatar src={user && user.avatarUrl} size={1.5} />
                </MenuButton>
                <MenuList className="nav-user-dropdown">
                  <MenuLink to="/account" as={Link}>
                    My account
                  </MenuLink>
                  <MenuItem onSelect={handleLogout}>Logout</MenuItem>
                </MenuList>
              </Menu>
            ) : (
              <>
                <NavLink to="/login" className="primary-nav-item">
                  Login
                </NavLink>
                <NavLink to="/signup" className="primary-nav-item">
                  Signup
                </NavLink>
              </>
            )}
          </nav>
        </Column>
      </Columns>
    </div>
  )
}

export default PrimaryHeader
