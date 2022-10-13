import React, { useState } from 'react'
import { PokemonItem } from './PokemonItem'



export const PokemonList = ({pokedex}) => {

  return (
    <>
        {
            pokedex.map( pkm => (
                <PokemonItem key={pkm.id} pokemon={pkm} />
            ))
        }
    </>
  )
}
