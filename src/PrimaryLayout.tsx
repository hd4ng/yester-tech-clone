import React, { useEffect } from "react"
import PrimaryHeader from "./PrimaryHeader"
import "./PrimaryLayout.scss"
import PrimaryFooter from "./PrimaryFooter"
import {
  Switch,
  Route,
  Redirect,
  useHistory,
  useLocation,
} from "react-router-dom"
import { useShoppingCart } from "./ShoppingCartState"
import { useAuthState } from "./AuthState"
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"
import * as api from "./api"
import Account from "./Account"
import ProductSubNav from "./ProductSubNav"

const PrimaryLayout = () => {
  const history = useHistory()
  const { authenticated, dispatch } = useAuthState()
  const { cart } = useShoppingCart()
  const { key } = useLocation()

  // Get the authenticated user
  useEffect(() => {
    let isCurrent = true
    if (!authenticated) {
      api.auth.getAuthenticatedUser().then((user) => {
        if (user && isCurrent) {
          dispatch({ type: "LOGIN", user })
        }
      })
    }

    return () => {
      isCurrent = false
    }
  }, [authenticated, dispatch])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [key])

  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
        <Route path="/products">
          <ProductSubNav />
        </Route>
        <main className="primary-content">
          <Switch>
            <Route path="/" exact></Route>
            <Route path="/signup" exact>
              <SignupForm
                onSignup={(user) => {
                  dispatch({ type: "LOGIN", user })
                  history.push("/products")
                }}
              />
            </Route>
            <Route path="/login" exact>
              <LoginForm
                onAuthenticated={(user) => {
                  dispatch({ type: "LOGIN", user })
                  history.push("/")
                }}
              />
            </Route>
            <Route path="/products"></Route>
            {cart.length > 0 && <Route path="/checkout"></Route>}
            {authenticated && (
              <Route path="/account">
                <Account />
              </Route>
            )}
            <Redirect to="/" />
          </Switch>
        </main>
        <PrimaryFooter />
      </div>
    </div>
  )
}

export default PrimaryLayout
