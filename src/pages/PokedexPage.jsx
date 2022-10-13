import React, { useEffect, useState } from 'react'
import { Pagination } from '../components/pokedex/Pagination';
import { PokemonList } from '../components/pokedex/PokemonList';
import { Search } from '../components/pokedex/Search';
import { getPokemonData } from '../helpers/pokedex';
import { usePokedex, useTrainer } from '../hooks'


const sortPokemons = ["id","capturados"]


export const PokedexPage = () => {

  const {isLoading,pokedex,setActivePokemon, startPokedex} = usePokedex();
  const {pokemons} = useTrainer()

  const [sort, setSort] = useState(sortPokemons[0])
  const maxPokemons = 20;

  useEffect(() => {
    startPokedex();
  }, [pokemons])
  
  return (
    <div>
      <div>
        <Search/>
        <Pagination/>
      </div>
      <PokemonList pokedex={pokedex}/>

    </div>
  )
}
