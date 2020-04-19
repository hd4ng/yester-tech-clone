import React from "react"

type ProductFilterItemProps = {
  item: string
  selected?: boolean
  onChange?: (item: string) => void
}

const ProductFilterItem: React.FC<ProductFilterItemProps> = ({
  item,
  selected = false,
  onChange,
  children,
}) => {
  return (
    <div className="no-wrap">
      <label>
        <input
          type="checkbox"
          onChange={
            onChange
              ? (e: React.ChangeEvent<HTMLInputElement>) =>
                  onChange(e.target.name)
              : undefined
          }
          checked={onChange ? selected : undefined}
          name={item}
        />{" "}
        <span>{children}</span>
      </label>
    </div>
  )
}

export default ProductFilterItem
