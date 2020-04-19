import { useReducer, useEffect } from "react"

type PromiseState<T> = {
  loading: boolean
  response: T | null
  error: Error | null
}

type PromiseAction<T> =
  | {
      type: "LOADING"
    }
  | {
      type: "RESOLVED"
      response: T | null
    }
  | {
      type: "ERROR"
      error: Error | null
    }

type PromiseReducer<T> = (
  state: PromiseState<T>,
  action: PromiseAction<T>
) => PromiseState<T>

function promiseReducer<T>(
  state: PromiseState<T>,
  action: PromiseAction<T>
): PromiseState<T> {
  switch (action.type) {
    case "LOADING":
      return { ...state, loading: true }
    case "RESOLVED":
      return {
        ...state,
        loading: false,
        response: action.response,
        error: null,
      }
    case "ERROR":
      return {
        ...state,
        loading: false,
        response: null,
        error: action.error,
      }
    default:
      throw new Error()
  }
}

function usePromise<T>(
  promise: () => Promise<T>
): [T | null, boolean, Error | null] {
  const [state, dispatch] = useReducer(promiseReducer as PromiseReducer<T>, {
    loading: false,
    response: null,
    error: null,
  })

  useEffect(() => {
    let isCurrent = true
    dispatch({ type: "LOADING" })
    promise()
      .then((response: T) => {
        if (!isCurrent) return
        dispatch({ type: "RESOLVED", response })
      })
      .catch((error: Error) => dispatch({ type: "ERROR", error }))

    return () => {
      isCurrent = false
    }
  }, [promise])

  return [state.response, state.loading, state.error]
}

export default usePromise
