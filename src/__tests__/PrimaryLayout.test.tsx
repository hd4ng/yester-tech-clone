import React from "react"
import { render as renderRTL, screen, fireEvent } from "@testing-library/react"
import { History, createMemoryHistory } from "history"
import { Router } from "react-router-dom"
import PrimaryLayout from "../PrimaryLayout"
import { AuthStateProvider } from "../AuthState"
import { ShoppingCartProvider } from "../ShoppingCartState"

window.scrollTo = jest.fn()
test("full app rendering/navigating", () => {
  render(<PrimaryLayout />)

  // url: '/'
  expect(screen.getByText(/start browsing/i)).toBeInTheDocument()

  // url: '/products'
  fireEvent.click(screen.getByText(/products/i))
  expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument()

  // url: '/login'
  fireEvent.click(screen.getByText(/login/i))
  expect(screen.getByRole("heading")).toHaveTextContent(/login/i)

  // url: '/signup'
  fireEvent.click(screen.getByText(/signup/i))
  expect(screen.getByRole("heading")).toHaveTextContent(/signup/i)
})

function render(
  ui: React.ReactElement,
  {
    route = "/",
    history = createMemoryHistory({ initialEntries: [route] }),
  }: { route?: string; history?: History } = {}
) {
  const Wrapper: React.FC = ({ children }) => {
    return (
      <AuthStateProvider>
        <ShoppingCartProvider>
          <Router history={history}>{children}</Router>
        </ShoppingCartProvider>
      </AuthStateProvider>
    )
  }

  return {
    ...renderRTL(ui, { wrapper: Wrapper }),
    history,
  }
}
