import React, { useEffect, useState } from 'react'
import { Pagination } from '../components/pokedex/Pagination';
import { PokemonList } from '../components/pokedex/PokemonList';
import { Search } from '../components/pokedex/Search';
import { getPokemonData } from '../helpers/pokedex';
import { useCounter, usePokedex, useTrainer } from '../hooks'
import '../styles/pokedex.scss'


const sortPokemons = ["id","capturados"]


export const PokedexPage = () => {

  const {isLoading,pokedex,setActivePokemon, startPokedex,updatePokedex} = usePokedex();
  const {pokemons} = useTrainer()

  const [sort, setSort] = useState(sortPokemons[0])

  
  const {counter: page, decrement: prevPage ,increment: nextPage} = useCounter(1)

  const maxPokemons = 20;
  const lastPage = Math.ceil(pokedex?.length / maxPokemons);


  useEffect(() => {
    if(pokemons.length > 0){
      updatePokedex();
    }
    else{
      startPokedex()
    }
  }, [pokemons])
  
  
  return (
    <div className='pokedexContainer'>
      <div>
        <Search />
        <Pagination page={page} lastPage={lastPage} prev={prevPage} next={nextPage}/>
      </div>
      <PokemonList pokedex={pokedex} page={page} maxPokemons={maxPokemons}/>

    </div>
  )
}
