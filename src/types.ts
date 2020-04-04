type As<BaseProp = any> = React.ElementType<BaseProp>

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
