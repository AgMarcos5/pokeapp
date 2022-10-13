
import { useDispatch, useSelector } from 'react-redux'
import { pokeApi } from '../api/pokeApi';
import { getPokemonData } from '../helpers/pokedex';
import { onSetActivePokemon, setPokedex, startLoadingPokedex } from '../store/pokedex/pokedexSlice';
import { getPokedex } from '../store/pokedex/thunks';

export const usePokedex = () => {
    const {isLoading, pokedex, activePokemon} = useSelector(state => state.pokedex)
    const {pokemons} = useSelector(state => state.trainer)
    
    const dispatch = useDispatch();
   
    /*
    const startPokedex = () => {
        dispatch(getPokedex())
    }
    */

    const startPokedex = async () => {
        dispatch(startLoadingPokedex);
        const {data} = await pokeApi.get('/pokemon?limit=151&offset=0');

        const promises = data.results.map( async (pokemon) => {
            return await getPokemonData(pokemon.name)
          })
        const results = await Promise.all(promises);
        console.log(results)
        console.log(pokemons)
        dispatch(setPokedex(results))
    }
    
    const setActivePokemon = (id) => { 
        dispatch(onSetActivePokemon(id)) 
    }


    return {
        isLoading,
        pokedex,
        activePokemon,

        startPokedex,
        setActivePokemon,
    }
}
