import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getPokedex } from '../store/pokedex/thunks';

export const usePokedex = () => {
    const {isLoading, pokedex, activePokemon} = useSelector(state => state.pokedex)
    const dispatch = useDispatch();
   
    useEffect(() => {
        dispatch(getPokedex())
    }, [])
    

    return {
        isLoading,
        pokedex,
        activePokemon,
    }
}
