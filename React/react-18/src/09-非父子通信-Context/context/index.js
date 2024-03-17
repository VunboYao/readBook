import React from 'react'
export const UserContext = React.createContext()

// 有默认值的context
export const HasDefaultContext = React.createContext({
  color: 'defaultValue-blue',
  size: 10,
})
