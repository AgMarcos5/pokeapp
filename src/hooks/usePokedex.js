

import { useDispatch, useSelector } from 'react-redux'
import { pokeApi } from '../api/pokeApi';
import { getPokemonData } from '../helpers/pokedex';
import { onSetActivePokemon, setPokedex, startLoadingPokedex } from '../store/pokedex/pokedexSlice';

export const usePokedex = () => {
    const {isLoading, pokedex, activePokemon} = useSelector(state => state.pokedex)
    const {pokemons} = useSelector(state => state.trainer)
    const dispatch = useDispatch();

    const startPokedex = async () => {
        dispatch(startLoadingPokedex);
        const {data} = await pokeApi.get('/pokemon?limit=151&offset=0');

        const promises = data.results.map( async (pokemon) => {
            return await getPokemonData(pokemon.name)
          })
        const results = await Promise.all(promises);
        dispatch(setPokedex(results))
    }

    const updatePokedex = () => {
        if(pokemons.length){
            dispatch(startLoadingPokedex);
            
            const auxPokedex = pokedex.map( pkm => {
                const pokemonCaptured = pokemons.find(p => p.id === pkm.id)
                if(pokemonCaptured){
                    const newPokemon = {
                        ...pkm, 
                        captured_count: pokemonCaptured.captured_count,
                        captured_date: pokemonCaptured.captured_date,
                        first_appearance: pokemonCaptured.first_appearance,
                    }

                    if(pokemonCaptured.captured_count){
                        return {...newPokemon, status: 'captured'}
                    }
                    else {
                        return {...newPokemon, status: 'discovered'}
                    }
                }
                return pkm;
            })

            dispatch(setPokedex(auxPokedex))
        }
    }
    
    const setActivePokemon = (id) => { 
        dispatch(onSetActivePokemon(id)) 
    }


    return {
        isLoading,
        pokedex,
        activePokemon,

        startPokedex,
        updatePokedex,
        setActivePokemon,
    }
}
