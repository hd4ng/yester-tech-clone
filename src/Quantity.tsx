import React from "react"
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa"
import "./Quantity.scss"

type QuantityProps = {
  quantity: number
  onChange: (value: number) => void
}

const Quantity: React.FC<QuantityProps> = ({ onChange, quantity = 1 }) => {
  const subtrack = () => {
    if (quantity > 0) {
      onChange(quantity - 1)
    }
  }

  const add = () => {
    onChange(quantity + 1)
  }

  const handleChange = (value: string) => {
    const int = parseInt(value, 10)
    // disallow non-numeric values
    if (!isNaN(int)) {
      onChange(int)
    }
  }

  const handleInputBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value.trim() === "") {
      onChange(0)
    }
  }

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // keep cursor from going back/forth
    event.preventDefault()
    if (event.key === "ArrowUp") {
      add()
    } else if (event.key === "ArrowDown") {
      subtrack()
    }
  }

  return (
    <div className="quantity-picker">
      <div>
        <div>
          <button type="button" className="icon-button" onClick={subtrack}>
            <FaMinusCircle />
          </button>
        </div>
        <div className="input-container">
          <input
            type="text"
            aria-label="quantity"
            value={quantity}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleChange(e.target.value)
            }
            onBlur={handleInputBlur}
            onKeyDown={handleInputKeyDown}
          />
        </div>
        <div>
          <button type="button" className="icon-button" onClick={subtrack}>
            <FaPlusCircle />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Quantity
