import { configureStore } from '@reduxjs/toolkit'
import pokedexSlice from './pokedex/pokedexSlice'
import trainerSlice from './trainer/trainerSlice'

export const store = configureStore({
  reducer: {
    pokedex: pokedexSlice,
    trainer: trainerSlice,
  },
})