import React from 'react'

export const PokemonInfo = ({pokemon,setActive}) => {

    const close = () => {
        setActive(null);
    }

    if(pokemon){
        return (
            <div>
            <div>{pokemon.name}</div>
            <button onClick={close}>cerrar</button>
            </div>
          )
    }

    return <h3>Selecciona un pokemon</h3>
}
