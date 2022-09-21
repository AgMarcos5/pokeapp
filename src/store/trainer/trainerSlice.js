import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSaving: false,
    pokemons: [],
    bag: {
        pokeballs: 5,
        superballs: 0,
        ultraballs: 0,
        masterballs: 0,
        berries: 0,
    }
}

/*
pokemon = {
    name: 'nombre',
    id: 1,
    first_appearance: 123456,
    captured: false,
    captured_date: 123456,
    captured_count: 0,
}
*/

export const trainerSlice = createSlice({
    name: 'trainer',
    initialState,
    reducers: {
        startSavingTrainer: (state) => {
            state.isSaving = true;
        },
        onAddPokemon: (state, {payload}) => {
            state.pokemons.push(payload);
            state.isSaving = false;
        },
        updateBag: (state, {payload}) => {
            const {itemName, amount} = payload;
            state.bag[itemName] += amount;
            state.isSaving = false;
        },     
        updatePokemon: (state, {payload}) => {
            state.pokemons = state.pokemons.map ( pkm => {
                if(pkm.id === payload.id) return payload;
                return pkm;
            })
            state.isSaving = false;
        }    
    }
})

export const { startSavingTrainer, onAddPokemon, updateBag, updatePokemon} = trainerSlice.actions;

export default trainerSlice.reducer;