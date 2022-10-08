import React from 'react'
import { useTrainer } from '../../hooks'

export const Item = ({name,throwItem}) => {

    const handleOnClick = () =>{
      throwItem(name)
    }

  return (
    <button onClick={handleOnClick}>{name}</button>
  )
}
