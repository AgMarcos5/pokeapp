import { pokeApi } from "../api/pokeApi";

export const getPokemonData = async (pokemonName) => {
    try {
        const { data } = await pokeApi.get(`/pokemon/${pokemonName}`);
        return {
        name: data.name,
        id: data.id,
        icon: data.sprites.front_default, 
        image: data.sprites.other.home.front_default,
        types: data.types,
        status: 'undiscovered' // 'discovered' 'captured'
        };
    } catch (error) {
        console.log("error: el pokemon no existe")
    }
    
};