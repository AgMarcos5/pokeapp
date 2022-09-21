import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isLoading: false,
    pokedex: [],
    activePokemon: null,
}

export const pokedexSlice = createSlice({
    name: 'pokedex',
    initialState,
    reducers: {
        startLoadingPokedex: (state) => {
            state.isLoading = true;
        },
        setPokedex: (state, {payload})=>{
            state.pokedex = payload;
            state.isLoading = false;
        },
            
    }
})

export const {startLoadingPokedex, setPokedex} = pokedexSlice.actions;

export default pokedexSlice.reducer;