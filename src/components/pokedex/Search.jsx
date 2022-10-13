import React, { useState } from 'react'
import { getPokemonData } from '../../helpers/pokedex';

export const Search = () => {

  const [search, setSearch] = useState('');

  const onInputChange = (e) => {
    setSearch(e.target.value);
  }

  const onFormSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const data = await getPokemonData(search);
    } catch (error) {
      console.log("pokemon no existe")
    }
  }

  return (
    <div>
    <form onSubmit={onFormSubmit}>
      <input 
        placeholder='Buscar pokemon...'
        onChange={onInputChange}
      />
      <button
        type='submit'
      >
        Buscar
      </button>

    </form>
    </div>
  )
}
