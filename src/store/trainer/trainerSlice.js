import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isSaving: false,
    pokemons: [],
    bag: {
        pokeballs: 5,
        superballs: 1,
        ultraballs: 1,
        masterballs: 1,
        berries: 1,
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
        onUseItem: (state, {payload}) => {
            const {itemName, amount} = payload;
            state.bag[itemName] += amount;
            state.isSaving = false;
        },     
        onUpdateBag: (state, {payload}) => {
            state.bag = payload;
        },
        onUpdatePokemon: (state, {payload}) => {
            state.pokemons = state.pokemons.map ( pkm => {
                if(pkm.id === payload.id) return payload;
                return pkm;
            })
            state.isSaving = false;
        }    
    }
})

export const { startSavingTrainer, onAddPokemon, onUseItem, onUpdateBag, onUpdatePokemon} = trainerSlice.actions;

export default trainerSlice.reducer;