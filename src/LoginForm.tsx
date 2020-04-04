import React, { useState } from "react"
import { FaSignInAlt, FaExclamationCircle } from "react-icons/fa"

import { User } from "./models"
import * as api from "./api"
import Centered from "./Centered"
import Heading from "./Heading"
import Notice from "./Notice"

type LoginFormProps = {
  onAuthenticated: (user: User) => void
}

const LoginForm: React.FC<LoginFormProps> = ({ onAuthenticated }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    api.auth
      .login(username, password)
      .then((user) => {
        if (typeof onAuthenticated === "function") {
          onAuthenticated(user)
        }
      })
      .catch((error) => {
        setError(error)
        setLoading(false)
      })
  }

  function handleShowPassword() {
    setShowPassword(!showPassword)
  }

  return (
    <Centered className="spacing">
      <Heading>Login</Heading>
      <form onSubmit={handleLogin} className="spacing">
        {error && (
          <Notice type="error">
            <FaExclamationCircle />
            <span>{error}</span>
          </Notice>
        )}
        <div className="form-field">
          <input
            aria-label="username"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            type="text"
            placeholder="Username"
            required
          />
        </div>
        <div className="form-field">
          <input
            aria-label="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
          />
          <label>
            <input
              aria-label="show-password"
              onChange={handleShowPassword}
              defaultChecked={showPassword}
              className="passwordCheckbox"
              type="checkbox"
            />{" "}
            show password
          </label>
        </div>

        <footer>
          <button aria-label="login" type="submit" className="button">
            {!loading ? (
              <>
                <FaSignInAlt /> <span>Login</span>
              </>
            ) : (
              <span>Loading...</span>
            )}
          </button>
        </footer>
      </form>
    </Centered>
  )
}

export default LoginForm
