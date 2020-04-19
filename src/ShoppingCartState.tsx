import React, {
  Reducer,
  useReducer,
  createContext,
  useContext,
  useEffect,
} from "react"
import * as storage from "./localStorage"
import { Cart } from "./models"

type ShoppingCartState = {
  cart: Cart
}

type ShoppingCartAction =
  | {
      type: "ADD"
      productId: string
      name: string
      price: number
    }
  | {
      type: "UPDATE"
      productId: string
      quantity: number
    }
  | {
      type: "REMOVE"
      productId: string
    }

const shoppingCardReducer: Reducer<ShoppingCartState, ShoppingCartAction> = (
  state,
  action
) => {
  switch (action.type) {
    case "ADD": {
      const found = state.cart.find(
        (p) => p.productId === parseInt(action.productId, 10)
      )
      if (!found) {
        return {
          ...state,
          cart: state.cart.concat({
            productId: parseInt(action.productId, 10),
            quantity: 1,
            name: action.name || "",
            price: action.price || 0,
          }),
        }
      } else {
        return state
      }
    }
    case "UPDATE": {
      let cart
      if (action.quantity > 0) {
        cart = state.cart.map((product) => {
          return product.productId === parseInt(action.productId, 10)
            ? { ...product, quantity: action.quantity }
            : product
        })
      } else {
        cart = state.cart.filter(
          (product) => product.productId !== parseInt(action.productId, 10)
        )
      }
      return { ...state, cart }
    }
    case "REMOVE": {
      const c = state.cart
      const index = c.findIndex(
        (p) => p.productId === parseInt(action.productId, 10)
      )
      const updatedCart = [...c.slice(0, index), ...c.slice(index + 1)]
      return { ...state, cart: updatedCart }
    }

    default:
      return state
  }
}

type IShoppingCartContext = ShoppingCartState & {
  addToCart: (productId: string, name: string, price: number) => void
  updateQuantity: (productId: string, quantity: number) => void
  removeFromCart: (productId: string) => void
  getQuantity: (productId: number) => number
  getCartSize: () => number
  getCartTotal: () => number
}

const ShoppingCartContext = createContext<IShoppingCartContext | undefined>(
  undefined
)

export const ShoppingCartProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(shoppingCardReducer, {
    cart: storage.getCart() || [],
  })

  const value: IShoppingCartContext = {
    ...state,
    addToCart(productId, name, price) {
      debugger
      dispatch({ type: "ADD", name, price, productId })
    },
    updateQuantity(productId, quantity) {
      dispatch({ type: "UPDATE", productId, quantity })
    },
    removeFromCart(productId) {
      dispatch({ type: "REMOVE", productId })
    },
    getQuantity(productId) {
      if (!Array.isArray(state.cart)) return 0
      return (state.cart.filter((p) => p.productId === productId)[0] || {})
        .quantity
    },
    getCartSize() {
      if (!Array.isArray(state.cart)) return 0
      return state.cart.reduce((size, item) => size + item.quantity, 0)
    },
    getCartTotal() {
      if (!Array.isArray(state.cart)) return 0
      return state.cart.reduce(
        (total, item) => total + item.quantity * item.price,
        0
      )
    },
  }

  return <ShoppingCartContext.Provider value={value} children={children} />
}

export function useShoppingCart() {
  const cartState = useContext(ShoppingCartContext)

  if (cartState === undefined) {
    throw new Error("useShoppingCart must be used within ShoppingCartProvider")
  }

  useEffect(() => {
    storage.updateCart(cartState.cart)
  }, [cartState.cart])

  return cartState
}
