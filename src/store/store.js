import { configureStore } from '@reduxjs/toolkit'
import pokedexSlice from './pokedex/pokedexSlice'

export const store = configureStore({
  reducer: {
    pokedex: pokedexSlice,
  },
})