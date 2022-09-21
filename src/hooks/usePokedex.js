import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { onSetActivePokemon } from '../store/pokedex/pokedexSlice';
import { getPokedex } from '../store/pokedex/thunks';

export const usePokedex = () => {
    const {isLoading, pokedex, activePokemon} = useSelector(state => state.pokedex)
    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(getPokedex())
    }, [])
    
    const setActivePokemon = (id) => { dispatch(onSetActivePokemon(id)) }

    return {
        isLoading,
        pokedex,
        activePokemon,
        setActivePokemon,
    }
}
