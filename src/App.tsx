import React from "react"
import { BrowserRouter } from "react-router-dom"

import { AuthStateProvider } from "./AuthState"
import { ShoppingCartProvider } from "./ShoppingCartState"
import PrimaryLayout from "./PrimaryLayout"
import "./styles/global-styles.scss"

const App = () => {
  return (
    <BrowserRouter>
      <AuthStateProvider>
        <ShoppingCartProvider>
          <PrimaryLayout />
        </ShoppingCartProvider>
      </AuthStateProvider>
    </BrowserRouter>
  )
}

export default App
