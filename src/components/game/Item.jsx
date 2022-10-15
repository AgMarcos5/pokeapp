import React from 'react'
import { useTrainer } from '../../hooks'


export const Item = ({value,throwItem}) => {

    const handleOnClick = () =>{
      throwItem(value.name)
    }

  return (
    <button onClick={handleOnClick}>
      <img src={value.src} alt={value.name} />
    </button>
  )
}
