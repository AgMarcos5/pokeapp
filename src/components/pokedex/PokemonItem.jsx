import React from 'react'

export const PokemonItem = ({pokemon, setActive, activePokemon}) => {

  const handleSetActive = () => {
    if(pokemon.status !== 'undiscovered')
      setActive(pokemon)
  }


  return (
    <div className='pokemonItem'>
      
    <div 
      className={`${pokemon.status} ${(activePokemon === pokemon) ? 'selected' : '' }`}
      onClick={handleSetActive}
    >
        <img src={pokemon.icon} alt={pokemon.name} />
    </div>
    </div>
  )
}
