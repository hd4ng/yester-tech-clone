import React, { useReducer } from "react"
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useHistory,
} from "react-router-dom"
import { CheckoutFields } from "./models/checkout"
import Centered from "./Centered"

// Route Targets
import ViewCart from "./ViewCart"
import CheckoutBilling from "./CheckoutBilling"
import CheckoutReview from "./CheckoutReview"

type CheckoutState = {
  sameAsBilling: boolean
  fields: CheckoutFields
}

type CheckoutAction = {
  type: "SUBMIT_BILLING"
  sameAsBilling: boolean
  fields: any
}

const Checkout = () => {
  const match = useRouteMatch()
  const history = useHistory()

  const [state, dispatch] = useReducer(
    (state: CheckoutState, action: CheckoutAction) => {
      switch (action.type) {
        case "SUBMIT_BILLING":
          const { sameAsBilling, fields } = action
          return { ...state, sameAsBilling, fields }

        default:
          return state
      }
    },
    { sameAsBilling: false, fields: {} }
  )

  const handleBillingSubmit = (sameAsBilling: boolean, fields: any) => {
    dispatch({ type: "SUBMIT_BILLING", sameAsBilling, fields })
    history.push(`${match.path}/review`)
  }

  return (
    <Centered>
      <Switch>
        <Route path={`${match.path}/cart`} exact>
          <ViewCart />
        </Route>
        <Route path={`${match.path}/billing`}>
          <CheckoutBilling
            onSubmit={handleBillingSubmit}
            defaultSameAsBilling={state.sameAsBilling}
            defaultFields={state.fields}
          />
        </Route>
        {Object.keys(state.fields).length > 0 && (
          <Route path={`${match.path}/review`}>
            <CheckoutReview
              sameAsBilling={state.sameAsBilling}
              fields={state.fields}
            />
          </Route>
        )}
        <Redirect to={`${match.path}/cart`} />
      </Switch>
    </Centered>
  )
}

export default Checkout
