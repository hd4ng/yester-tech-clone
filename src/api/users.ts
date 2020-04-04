import { post } from "./utils"
import { User } from "../models"

export function registerUser(data: Omit<User, "id">): Promise<User> {
  return post("/users", data)
}
