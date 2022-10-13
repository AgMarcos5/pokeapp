import React from 'react'

export const PokemonItem = ({pokemon, setActive}) => {

  const handleSetActive = () => {
    if(pokemon.status !== 'undiscovered')
      setActive(pokemon)
  }


  return (
    <div 
      className={`pokemonItem ${pokemon.status}`}
      onClick={handleSetActive}
    >
        <img src={pokemon.icon} alt={pokemon.name} />
    </div>
  )
}
