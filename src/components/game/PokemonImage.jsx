import React, { useEffect } from 'react'

export const PokemonImage = ({src, showPokemon}) => {

  useEffect(() => {
    if(showPokemon)
      console.log("Mostrar pokemon")
  }, [showPokemon])
  
  return (
    <div className='pokemonImage'>
        <img src={src} 
        className={ ` ${showPokemon ? 'show' : ''} `}
        alt="pokemon"/>
    </div>
  )
}
