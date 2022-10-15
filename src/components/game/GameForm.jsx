import React, { useState } from 'react'
import { useForm } from '../../hooks'


const formData = {
    pokemonName: ""
}
const formValidations = {
    pokemonName: [
        [(value) => value.length > 0, "Escribe el nombre de un pokemon!"],
    ]
}

const compareStrings = (str1, str2) => {
    return str1.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase() === str2.replace(/[^a-zA-Z0-9 ]/g, '').toUpperCase()
}

export const GameForm = ({disable, pokemon, guessPokemon, endGame, nextPokemon}) => {

    const {formState,isFormValid,pokemonName,pokemonNameValid,onInputChange, onResetForm} = useForm(formData,formValidations);
    
    const [formSubmited, setFormSubmited] = useState(false);  



    const onFormSubmit = (event) => {
        event.preventDefault();
        if(formSubmited || disable) {
            nextPokemon();
            setFormSubmited(false)
        }
        else{
            setFormSubmited(true);
            onResetForm()
            if(compareStrings(pokemonName,pokemon.name))
            {
                guessPokemon();
            }
            else{
                endGame();
                nextPokemon();
                setFormSubmited(false);
            }
        }
    }

  return (
    <>
        <form onSubmit={onFormSubmit}>
            <input 
                className={formSubmited ? 'disable' : ''}
                disabled={formSubmited}
                autoComplete="off"
                type="text" 
                placeholder="Escribe el nombre de un pokemon"
                name="pokemonName"
              value={pokemonName}
              onChange={onInputChange}
            />
            <button  className={formSubmited ? 'nextPokemon' : ''} type="submit">
              {formSubmited ? 'Siguiente Pokemon' : 'Juega'}
            </button>

        </form>
    </>
  )
}
