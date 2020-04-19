import queryString from "query-string"
import { get, getRaw, post } from "./utils"
import { Product, Category, Brand } from "../models"

export async function getProducts(
  search: any = {},
  page = 1
): Promise<{ products: Product[]; totalResults: number }> {
  // If setting up this search object seems a little bit weird, we're
  // just conforming to the funky API or JSON-Server
  search = {
    ...search,
    _limit: 10,
    _page: page,
    page: undefined,
    category: search.categories ? search.categories.split(",") : undefined,
    brand: search.brands ? search.brands.split(",") : undefined,
    condition: search.conditions ? search.conditions.split(",") : undefined,
  }

  const query = queryString.stringify(search || {})

  const res = await getRaw(`/products?${query}`)
  const products = await res.json()

  return {
    products,
    totalResults: parseInt(res.headers.get("x-total-count") ?? "0", 10),
  }
}

export function getProduct(productId: number): Promise<Product> {
  return get(`/products/${productId}`)
}

export function addProduct(data: Product): Promise<Product> {
  return post(`/products`, data)
}

export function getMetaData() {
  return get("/products").then((products: Product[]) => {
    const categories = products.reduce(
      (c: Category[], p) => c.concat([p.category || ""]),
      []
    )
    const brands = products.reduce(
      (b: Brand[], p) => b.concat([p.brand || ""]),
      []
    )

    return {
      categories: [...new Set(categories)],
      brands: [...new Set(brands)],
    }
  })
}
