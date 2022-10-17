import React, { useEffect, useLayoutEffect, useMemo, useState } from 'react'
import { Loading } from '../components/auth/Loading';
import { Pagination } from '../components/pokedex/Pagination';
import { PokemonInfo } from '../components/pokedex/PokemonInfo';
import { PokemonList } from '../components/pokedex/PokemonList';
import { Search } from '../components/pokedex/Search';
import { Sort } from '../components/pokedex/Sort';

import { useCounter, usePokedex, useTrainer } from '../hooks'

import '../styles/pokedex.scss'

const sortPokemons = ["id","captured"]

export const PokedexPage = () => {

  
  const {isLoading,pokedex,activePokemon, setActivePokemon, startPokedex,updatePokedex} = usePokedex();
  const {pokemons} = useTrainer()
  const [pokemonList, setPokemonList] = useState([])
  

  // PAGINACION
  const {counter: page, decrement: prevPage ,increment: nextPage, reset: resetPage} = useCounter(1)
  const maxPokemons = 20;
  const lastPage = Math.ceil(pokemonList?.length / maxPokemons);

  // BUSCAR
  const handleSearch = (value) => {
    if(value){
      const searchPokemon = pokedex.filter( pkm => pkm.name.includes(value) && pkm.status !== 'undiscovered') 
      setPokemonList(searchPokemon);
      resetPage();
    } else{
      setPokemonList(pokedex);
    }
  }

  
  // ORDENAR
  const compareStatus = (a,b) => {
    const statusValue = (val) => {
      switch(val) {
        case 'captured' : return 2;
        case 'discovered' : return 1;
        case 'undiscovered' : return 0;
      }
    }
    return statusValue(b.status) - statusValue(a.status);
  }

  const [sort, setSort] = useState(sortPokemons[0])

  const sortedPokemons = useMemo( () => {
    switch(sort) {
      case sortPokemons[0] : return [...pokemonList]?.sort((a,b) => a.id - b.id);
      case sortPokemons[1] : return [...pokemonList]?.sort(compareStatus);
      default: return pokemonList;
    }
  }, [pokemonList,sort])


  useEffect(() => {
    startPokedex();
  }, [])

  
  useLayoutEffect(() => {
    if(!isLoading && pokemons.length > 0){
      updatePokedex();
    }
  }, [pokemons, isLoading])

  useEffect(() => {
    setPokemonList(pokedex)
  }, [pokedex])
  

  if(isLoading) return <Loading/>

  return (
    <div className="pokedexContainer">     
      <PokemonInfo pokemon={activePokemon} setActive={setActivePokemon} />
      <div className="pokedexContent">
        <Search onSearch={handleSearch} />
      {pokemonList?.length > 0 ? (
        <div className='borders'>
          <div className='filters'>
            <div className='filtersContent'>
              <Sort setSort={setSort}/>
              <Pagination
                page={page}
                lastPage={lastPage}
                prev={prevPage}
                next={nextPage}
              />
            </div>
            <div className='bgFilters'></div>
          </div>
          <PokemonList
            pokedex={sortedPokemons}
            page={page}
            maxPokemons={maxPokemons}
            activePokemon={activePokemon}
            setActivePokemon={setActivePokemon}
          />
          
        </div>
      ) : (
        <div className='borders'>
        <div className='filters'>
            <div className='filtersContent'>
            </div>
            <div className='bgFilters'></div>
          </div>
          <div className='pokemonList'>
              <p>No se encuentran pokemons...</p>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
