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

    const {formState,isFormValid,pokemonName,pokemonNameValid,onInputChange} = useForm(formData,formValidations);
    
    const [formSubmited, setFormSubmited] = useState(false);  

    const onFormSubmit = (event) => {
        event.preventDefault();
        if(formSubmited || disable) {
            nextPokemon();
            setFormSubmited(false)
        }
        else{
            setFormSubmited(true);
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
                type="text" 
                placeholder="Escribe el nombre de un pokemon"
                name="pokemonName"
              value={pokemonName}
              onChange={onInputChange}
            />
            <button  type="submit">
              Play
            </button>

        </form>
    </>
  )
}
