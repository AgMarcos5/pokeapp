import React from 'react'

export const Message = ({text = ''}) => {
  return (
    <div className='gameMessage'>{text}</div>
  )
}
