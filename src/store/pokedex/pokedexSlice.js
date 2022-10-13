import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isLoading: true,
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
        onSetActivePokemon: (state, {payload}) => {
            state.activePokemon = payload
        }
            
    }
})

export const {startLoadingPokedex, setPokedex, onSetActivePokemon} = pokedexSlice.actions;

export default pokedexSlice.reducer;