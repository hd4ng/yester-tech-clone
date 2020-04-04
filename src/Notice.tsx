import React from "react"
import classnames from "classnames"

type NoticeProps = {
  type: "error" | "success"
}

const Notice: React.FC<NoticeProps> = ({ children, type = "error" }) => {
  return (
    <div className={classnames("notice", `notice-type-${type}`)}>
      {children}
    </div>
  )
}

export default Notice
