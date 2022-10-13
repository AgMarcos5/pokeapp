import React, { useEffect, useState } from 'react'
import { Pagination } from '../components/pokedex/Pagination';
import { PokemonInfo } from '../components/pokedex/PokemonInfo';
import { PokemonList } from '../components/pokedex/PokemonList';
import { Search } from '../components/pokedex/Search';
import { getPokemonData } from '../helpers/pokedex';
import { useCounter, usePokedex, useTrainer } from '../hooks'
import '../styles/pokedex.scss'


const sortPokemons = ["id","captured"]


export const PokedexPage = () => {

  
  const {isLoading,pokedex,activePokemon, setActivePokemon, startPokedex,updatePokedex} = usePokedex();
  const {pokemons} = useTrainer()
  
  const [pokemonList, setPokemonList] = useState(null)
  
  // ORDENAR
  const [sort, setSort] = useState(sortPokemons[0])

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


  useEffect(() => {
    if(pokemons.length > 0){
      updatePokedex();
    }
    else{
      startPokedex()
    }
  }, [pokemons])

  useEffect(() => {
    setPokemonList(pokedex)
  }, [pokedex])
  

  if(isLoading) return <h1>Cargando...</h1>

  return (
    <div className="pokedexContainer">
      <div>
        <PokemonInfo pokemon={activePokemon} setActive={setActivePokemon} />
      </div>
      <div>
        <Search onSearch={handleSearch} />
      </div>
      {pokemonList?.length > 0 ? (
        <>
          <div>
            <Pagination
              page={page}
              lastPage={lastPage}
              prev={prevPage}
              next={nextPage}
            />
          </div>
          <PokemonList
            pokedex={pokemonList}
            page={page}
            maxPokemons={maxPokemons}
            setActivePokemon={setActivePokemon}
          />
        </>
      ) : (
        <h1>No se encuentran pokemons...</h1>
      )}
    </div>
  );
}
