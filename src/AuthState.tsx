import React, {
  Reducer,
  Dispatch,
  createContext,
  useReducer,
  useCallback,
  useContext
} from "react"
import { User } from "./models"

type AuthState = {
  authenticated: boolean
  user: User
}

type AuthAction =
  | {
      type: "LOGIN"
      user: User
    }
  | { type: "LOGOUT" }

const initialState: AuthState = {
  authenticated: false,
  user: {} as User
}

type IAuthStateContext = AuthState & {
  dispatch: Dispatch<AuthAction>
}

const AuthStateContext = createContext<IAuthStateContext | undefined>(undefined)

export const AuthStateProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer<Reducer<AuthState, AuthAction>>(
    (state, action) => {
      switch (action.type) {
        case "LOGIN": {
          return { ...state, authenticated: true, user: action.user }
        }
        case "LOGOUT": {
          return initialState
        }
        default:
          return state
      }
    },
    initialState
  )

  const value = { ...state, dispatch: useCallback(dispatch, []) }

  return (
    <AuthStateContext.Provider value={value}>
      {children}
    </AuthStateContext.Provider>
  )
}

export const useAuthState = () => {
  const result = useContext(AuthStateContext)

  if (result === undefined) {
    throw new Error("useAuthState must be used within AuthStateProvider")
  }

  return result
}
