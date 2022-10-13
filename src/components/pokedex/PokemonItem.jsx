import React from 'react'

export const PokemonItem = ({pokemon}) => {
  return (
    <div>
        <img src={pokemon.icon} alt={pokemon.name} />
    </div>
  )
}
