import React from "react"
import {
  render,
  screen,
  cleanup,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from "@testing-library/react"
import SignupForm from "../SignupForm"
import * as apiAuth from "../api/auth"
import * as apiUsers from "../api/users"
import { User } from "../models"

jest.mock("../api/auth")
jest.mock("../api/users")

const noop = () => {}
const mockUser: User = {
  id: "1",
  avatarUrl: "http://avatar-url.com",
  name: "Huy Dang",
  username: "huy",
  password: "123",
}

afterEach(cleanup)

const mockApiAuth = apiAuth as jest.Mocked<typeof apiAuth>
const mockApiUsers = apiUsers as jest.Mocked<typeof apiUsers>
const mockGetGitHubUser = mockApiAuth.getGitHubUser
const mockRegisterUser = mockApiUsers.registerUser

test("toggles Use GitHub checkbox", () => {
  render(<SignupForm onSignup={noop} />)
  const useGitHubCheckbox = screen.getByLabelText("use-github")

  // Checked by default
  expect(useGitHubCheckbox).toHaveAttribute("checked")

  // expect(screen.getByText(/search/i)).toBeInTheDocument()
  const searchButton = screen.getByText(/search/i)
  const nameInput = screen.getByLabelText("name")
  const avatarUrlInput = screen.getByLabelText("avatar-url")

  expect(nameInput).toBeDisabled()
  expect(avatarUrlInput).toBeDisabled()

  // Uncheck use github
  fireEvent.click(useGitHubCheckbox)

  waitForElementToBeRemoved(searchButton)
  expect(nameInput).not.toBeDisabled()
  expect(avatarUrlInput).not.toBeDisabled()
})

test("changes github username", async () => {
  render(<SignupForm onSignup={noop} />)
  mockGetGitHubUser.mockResolvedValue({
    name: mockUser.username,
    avatar_url: mockUser.avatarUrl,
  })

  fireEvent.change(screen.getByLabelText("username"), {
    target: { value: mockUser.username },
  })
  fireEvent.click(screen.getByText(/search/i))

  await waitFor(() =>
    expect(mockGetGitHubUser).toHaveBeenCalledWith(mockUser.username)
  )
  expect(screen.getByLabelText("name")).toHaveValue(mockUser.username)
  expect(screen.getByLabelText("avatar-url")).toHaveValue(mockUser.avatarUrl)
  expect(screen.getByAltText(/avatar/i)).toHaveAttribute(
    "src",
    mockUser.avatarUrl
  )
})

test("toggles show password checkbox", () => {
  render(<SignupForm onSignup={noop} />)

  const showPasswordCheckbox = screen.getByLabelText("show-password")
  const passwordInput = screen.getByLabelText("password")

  expect(showPasswordCheckbox).not.toHaveAttribute("checked")
  expect(passwordInput).toHaveAttribute("type", "password")

  fireEvent.click(showPasswordCheckbox)
  expect(passwordInput).toHaveAttribute("type", "text")
})

test("changes avatar url will update avatar image", () => {
  render(<SignupForm onSignup={noop} />)
  fireEvent.change(screen.getByLabelText("avatar-url"), {
    target: { value: mockUser.avatarUrl },
  })
  expect(screen.getByAltText(/avatar/i)).toHaveAttribute(
    "src",
    mockUser.avatarUrl
  )
})

test("calls 'onSignup' prop on signup button click", async () => {
  const onSignup = jest.fn()
  mockRegisterUser.mockResolvedValue(mockUser)
  render(<SignupForm onSignup={onSignup} />)

  fireEvent.click(screen.getByLabelText("signup"))
  await waitFor(() => expect(onSignup).toHaveBeenCalled())
})
