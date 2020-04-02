/**
 * Auth
 */

import { User } from "./models"

const LOCAL_STORAGE_KEY_AUTH = "yester-tech-clone-auth"

export function login(user: User) {
  localStorage.setItem(LOCAL_STORAGE_KEY_AUTH, JSON.stringify(user))
}

export function logout() {
  localStorage.removeItem(LOCAL_STORAGE_KEY_AUTH)
}

export function getAuthenticatedUser() {
  try {
    const localStorageUser = localStorage.getItem(LOCAL_STORAGE_KEY_AUTH)
    if (!localStorageUser) return
    return JSON.parse(localStorageUser)
  } catch (e) {
    return
  }
}

/**
 * Cart
 */

const LOCAL_STORAGE_KEY_CART = "yester-tech-clone-cart"

export function updateCart(cart: any) {
  localStorage.setItem(LOCAL_STORAGE_KEY_CART, cart)
}

export function getCart() {
  try {
    const cart = localStorage.getItem(LOCAL_STORAGE_KEY_CART)
    if (!cart) return
    return JSON.parse(cart)
  } catch (e) {
    return
  }
}
