import React from 'react'

export const PokemonItem = ({pokemon}) => {

  return (
    <div className={`pokemonItem ${pokemon.status}`}>
        <img src={pokemon.icon} alt={pokemon.name} />
    </div>
  )
}
