import React, { memo } from 'react'
import './button.css';
function Button({onClick,className,children}) {
  return (
    <button className={`button-btn ${className}`} onClick={()=>onClick && onClick()}>{children}</button>
  )
}

export default memo(Button)