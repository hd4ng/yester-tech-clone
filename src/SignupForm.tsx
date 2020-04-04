import React, { useState } from "react"
import { User } from "./models"
import * as api from "./api"
import Centered from "./Centered"
import { Columns, Column } from "react-flex-columns"
import Avatar from "./Avatar"
import Heading from "./Heading"

const SignupForm: React.FC<{ onSignup: (user: User) => void }> = ({
  onSignup,
}) => {
  const [useGitHub, setUseGitHub] = useState(true)
  const [username, setUsername] = useState("")
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [avatarUrl, setAvatarUrl] = useState("")
  const [showPassword, setShowPassword] = useState(false)

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const user = { username, name, password, avatarUrl }
    api.users.registerUser(user).then((user) => {
      if (typeof onSignup === "function") {
        onSignup(user)
      }
    })
  }

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  function searchGitHub() {
    api.auth.getGitHubUser(username).then((user) => {
      if (user) {
        setName(user.name || "")
        setAvatarUrl(user.avatar_url || "")
      }
    })
  }

  return (
    <Centered className="spacing">
      <Columns gutters>
        <Column>
          <Avatar size={4} src={avatarUrl} />
        </Column>
        <Column flex className="spacing-small">
          <Heading>Signup</Heading>
          <div>
            <label>
              <input
                type="checkbox"
                defaultChecked={useGitHub}
                onChange={() => setUseGitHub(!useGitHub)}
              />{" "}
              Use Github
            </label>
          </div>
        </Column>
      </Columns>

      <form onSubmit={handleSubmit} className="spacing">
        <Columns gutters middle>
          <Column flex>
            <div className="form-field">
              <input
                aria-label="username"
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                value={username}
                type="text"
                placeholder={useGitHub ? "GitHub Username" : "Username"}
                onKeyPress={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === "Enter" && useGitHub) {
                    event.preventDefault()
                    searchGitHub()
                  }
                }}
              />
            </div>
          </Column>
          {useGitHub && (
            <Column>
              <button type="button" className="button" onClick={searchGitHub}>
                Search
              </button>
            </Column>
          )}
        </Columns>
        <div className="form-field">
          <input
            aria-label="password"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            value={password}
            type={showPassword ? "text" : "password"}
            placeholder={
              useGitHub
                ? "Create a YesterTech Password (Not GitHub)"
                : "Password"
            }
          />
          <label>
            <input
              onChange={handleShowPassword}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{" "}
            show password
          </label>
        </div>
        <div className="form-field">
          <input
            aria-label="name"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setName(e.target.value)
            }
            value={name}
            type="text"
            placeholder="Full Name"
            disabled={useGitHub}
          />
        </div>
        <div className="form-field">
          <input
            aria-label="avatar-url"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAvatarUrl(e.target.value)
            }
            value={avatarUrl}
            type="text"
            placeholder="Avatar URL: https://"
            disabled={useGitHub}
          />
        </div>
        <footer>
          <button type="submit" className="button">
            Signup
          </button>
        </footer>
      </form>
    </Centered>
  )
}

export default SignupForm
