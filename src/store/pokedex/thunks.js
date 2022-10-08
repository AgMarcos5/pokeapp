import { pokeApi } from "../../api/pokeApi";
import { setPokedex, startLoadingPokedex } from "./pokedexSlice"

export const getPokedex = () => {
    return async ( dispatch ) => {
        dispatch(startLoadingPokedex);
        const {data} = await pokeApi.get('/pokemon?limit=151&offset=0');
        dispatch(setPokedex(data.results))
    }
}

