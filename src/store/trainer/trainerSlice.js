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

export const trainerSlice = createSlice({
    name: 'trainer',
    initialState,
    reducers: {
        startSavingTrainer: (state) => {
            state.isSaving = true;
        },
        onLoadTrainer: (state, {payload}) => {
            state.pokemons = payload.pokemons;
            state.bag = payload.bag;
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

export const { startSavingTrainer, onLoadTrainer, onAddPokemon, onUseItem, onUpdateBag, onUpdatePokemon} = trainerSlice.actions;

export default trainerSlice.reducer;