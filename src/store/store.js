import { configureStore } from '@reduxjs/toolkit'
import authSlice from './auth/authSlice'
import pokedexSlice from './pokedex/pokedexSlice'
import trainerSlice from './trainer/trainerSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice,
    pokedex: pokedexSlice,
    trainer: trainerSlice,
  },
})