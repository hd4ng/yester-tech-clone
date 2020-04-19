export type Product = {
  id: number
  name: string
  description: string
  imagePath: string
  inventory: number
  price: number
  year: string
  condition: Condition
  brand: Brand
  category: Category
  relatedProducts: number[]
  rating: number
}

export type Category =
  | "Games"
  | "Gadgets"
  | "Music"
  | "Storage"
  | "Toys"
  | "Computers"
export type Brand =
  | "Nintendo"
  | "Google"
  | "Rio"
  | "Sony"
  | "Iomega"
  | "Bellmark"
  | "Hasbro"
  | "Sawyer’s"
  | "Apple"
  | "Emmett Brown Custom Manufacturing"
  | "Epic Records."
type Condition = "Excellent" | "Good" | "Fair" | "Poor"
