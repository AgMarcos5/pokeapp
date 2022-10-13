import { pokeApi } from "../../api/pokeApi";
import { getPokemonData } from "../../helpers/pokedex";
import { setPokedex, startLoadingPokedex } from "./pokedexSlice"

export const getPokedex = () => {
    return async ( dispatch ) => {
        dispatch(startLoadingPokedex);
        const {data} = await pokeApi.get('/pokemon?limit=151&offset=0');

        const promises = data.results.map( async (pokemon) => {
            return await getPokemonData(pokemon.name)
          })
        const results = await Promise.all(promises);
        dispatch(setPokedex(results))
    }
}

