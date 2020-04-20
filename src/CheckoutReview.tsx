import React, { Fragment } from "react"
import { CheckoutFields } from "./models/checkout"
import { useShoppingCart } from "./ShoppingCartState"
import Heading from "./Heading"
import { MdShoppingCart } from "react-icons/md"
import { Columns, Column } from "react-flex-columns"
import { Link } from "react-router-dom"
import { FaAngleLeft } from "react-icons/fa"

type CheckoutReviewProps = {
  sameAsBilling: boolean
  fields: CheckoutFields
}

const CheckoutReview: React.FC<CheckoutReviewProps> = ({
  sameAsBilling,
  fields,
}) => {
  const { cart, getCartTotal } = useShoppingCart()

  const placeOrder = () => {
    console.log(fields)
  }

  return (
    <div className="spacing">
      <Heading>
        <MdShoppingCart /> Review Your Order
      </Heading>

      <Columns>
        <Column className="spacing-small" flex>
          <Heading as="h2" size={4}>
            Billing Address
          </Heading>
          <span>{fields.billingName}</span>
          <br />
          <span>{fields.billingAddress}</span>
          <br />
          {/* Exercise doesn't have all the same form fields */}
          {fields.billingCity && (
            <span>
              {fields.billingCity}, {fields.billingState} {fields.billingPostal}
            </span>
          )}
        </Column>
        <Column className="spacing-small" flex>
          <Heading as="h2" size={4}>
            Shipping Address
          </Heading>
          {sameAsBilling ? (
            <em>Same As Billing</em>
          ) : (
            <Fragment>
              <span>{fields.shippingName}</span>
              <br />
              <span>{fields.shippingAddress}</span>
              <br />
              {/* Exercise doesn't have all the same form fields */}
              {fields.shippingCity && (
                <span>
                  {fields.shippingCity}, {fields.shippingState}{" "}
                  {fields.shippingPostal}
                </span>
              )}
            </Fragment>
          )}
        </Column>
      </Columns>

      <hr />
      <Heading as="h2" size={2}>
        Items
      </Heading>

      <div className="spacing-small">
        {cart.map((item) => (
          <Fragment key={item.productId}>
            <Columns gutters middle>
              <Column flex>
                <span className="no-wrap">
                  {item.name} ({item.quantity})
                </span>
              </Column>
              <Column>${(item.price * item.quantity).toFixed(2)}</Column>
            </Columns>
            <hr />
          </Fragment>
        ))}
      </div>

      <div className="align-right">
        <strong>Total: ${getCartTotal().toFixed(2)}</strong>
      </div>

      <Columns split>
        <Column>
          <Link className="button" to="/checkout/billing">
            <FaAngleLeft />
            <span>Billing</span>
          </Link>
        </Column>
        <Column>
          <button className="button cta-button" onClick={placeOrder}>
            Place Order
          </button>
        </Column>
      </Columns>
    </div>
  )
}

export default CheckoutReview
