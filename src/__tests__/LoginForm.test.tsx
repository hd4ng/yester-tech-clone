import React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import LoginForm from "../LoginForm"
import * as api from "../api/auth"

jest.mock("../api/auth")

const onAuthenticated = jest.fn()
const mockApi = api as jest.Mocked<typeof api>
const mockUser = {
  id: "1",
  name: "huy",
  avatarUrl: "http://...",
  username: "huydang",
  password: "123",
}

afterEach(() => {
  jest.clearAllMocks()
})

test("hide/show password", () => {
  render(<LoginForm onAuthenticated={onAuthenticated} />)
  const showPasswordCheckbox = screen.getByRole("checkbox")
  const passwordInput = screen.getByPlaceholderText(/password/i)

  expect(showPasswordCheckbox).not.toBeChecked()
  expect(passwordInput).toHaveAttribute("type", "password")

  fireEvent.click(showPasswordCheckbox)

  expect(showPasswordCheckbox).toBeChecked()
  expect(passwordInput).toHaveAttribute("type", "text")
})

test("call onAuthenticated when clicking on login button", async () => {
  mockApi.login.mockResolvedValue(mockUser)
  render(<LoginForm onAuthenticated={onAuthenticated} />)

  fireEvent.change(screen.getByPlaceholderText(/username/i), {
    target: { value: mockUser.username },
  })
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: mockUser.password },
  })
  fireEvent.click(screen.getByRole("button"))

  delete mockUser.password

  await waitFor(() => {
    expect(onAuthenticated).toHaveBeenCalledTimes(1)
    expect(onAuthenticated).toHaveBeenCalledWith(mockUser)
  })
})
