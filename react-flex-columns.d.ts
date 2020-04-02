declare module "react-flex-columns" {
  interface ColumnsProps {
    className?: string
    middle?: boolean
    gutterSize?: number
    gutters?: boolean
    split?: boolean
    reverse?: boolean
    stack?: boolean
  }
  declare const Columns: React.FC<ColumnsProps>

  interface ColumnProps {
    className?: string
    gutterUnit?: number
    stack?: boolean
    split?: boolean
    size?: number
    flex?: boolean
    align?: "left" | "right" | "center"
  }
  declare const Column: React.FC<ColumnProps>
}
