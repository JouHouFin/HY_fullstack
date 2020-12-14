import React from 'react'

export const Notification = ({ notification }) => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  
  if (notification) {
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
  return null
}
