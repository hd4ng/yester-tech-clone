import React from "react"
import { useAuthState } from "./AuthState"
import Heading from "./Heading"

const Account = () => {
  const { user } = useAuthState()

  return (
    <div className="spacing">
      <Heading>My Account</Heading>
      <div>
        Welcom to your account management page, <strong>{user.name}</strong>.
        Unfortunately, I have not finish it yet 😅.
      </div>
    </div>
  )
}

export default Account
