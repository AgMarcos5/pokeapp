import React, { useState } from 'react'
import { PokemonItem } from './PokemonItem'



export const PokemonList = ({pokedex, page, maxPokemons}) => {

  return (
    <div className='pokemonList'>
        {
            pokedex
            ?.slice((page-1)*maxPokemons , (page-1)*maxPokemons + maxPokemons )
            .map( pkm => (
                <PokemonItem key={pkm.id} pokemon={pkm} />
            ))
        }
    </div>
  )
}
