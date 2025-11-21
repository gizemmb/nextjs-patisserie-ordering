import React from 'react'

const Title = ({children,addClass}) => {
  return (
    <div className={`${addClass} font-crimson-text font-bold`}> {children}</div>
  )
}

export default Title