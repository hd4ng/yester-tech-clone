import React from "react"

export type As<BaseProp = any> = React.ElementType<BaseProp>

export type PropsWithAs<
  ComponentType extends As,
  ComponentProps
> = ComponentProps &
  Omit<
    React.ComponentPropsWithRef<ComponentType>,
    "as" | keyof ComponentProps
  > & {
    as?: ComponentType
  }

export interface ComponentWithAs<ComponentType extends As, ComponentProps> {
  // These types are a bit of a hack, but cover us in cases where the `as` prop
  // is not a JSX string type. Makes the compiler happy so 🤷‍♂️
  <TT extends As>(
    props: PropsWithAs<TT, ComponentProps>
  ): React.ReactElement | null
}
