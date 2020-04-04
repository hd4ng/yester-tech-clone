import React from "react"
import PrimaryHeader from "./PrimaryHeader"
import "./PrimaryLayout.scss"
import PrimaryFooter from "./PrimaryFooter"
import { Switch, Route, Redirect, useHistory } from "react-router-dom"
import { useShoppingCart } from "./ShoppingCartState"
import { useAuthState } from "./AuthState"
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm"

const PrimaryLayout = () => {
  const history = useHistory()
  const { authenticated, dispatch } = useAuthState()
  const { cart } = useShoppingCart()
  return (
    <div className="primary-layout">
      <div>
        <PrimaryHeader />
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
                onAuthenticated={(user) => dispatch({ type: "LOGIN", user })}
              />
            </Route>
            <Route path="/products"></Route>
            {cart.length > 0 && <Route path="/checkout"></Route>}
            {authenticated && <Route path="/account"></Route>}
            <Redirect to="/" />
          </Switch>
        </main>
        <PrimaryFooter />
      </div>
    </div>
  )
}

export default PrimaryLayout
