import React, { useEffect, useState } from "react";
import { pokeApi } from "../api/pokeApi";
import { Bag } from "../components/game/Bag";
import { GameForm } from "../components/game/GameForm";
import { PokemonImage } from "../components/game/PokemonImage";
import { useCounter, useTrainer } from "../hooks";
import { calcExperience, getLoot, getRandomPokemon } from "../helpers";

import "../styles/game.scss"




export const GamePage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);

  // Oculta el pokemon
  const [showPokemon, setShowPokemon] = useState(false);


  const {counter: captureCombo, increment: incrementCaptureCombo , reset: resetCaptureCombo} = useCounter(0);

  // Experiencia del pokemon, al llegar a 0 es capturable
  const [exp, setExp] = useState(0);
  const [capture, setCapture] = useState(false);

  const {updateBag, useItem} = useTrainer()


  useEffect(() => {
    const storagePokemon = JSON.parse(localStorage.getItem("pkmGame"));
    if (storagePokemon) {
      setPokemon(storagePokemon);
      setExp(storagePokemon.base_experience)
      setIsLoading(false);
    } else {
      getRandomPokemon().then((pkm) => {
        setPokemon(pkm);
        setIsLoading(false);
        localStorage.setItem("pkmGame", JSON.stringify(pkm));
      });
    }
  }, []);

  const handleGuessPokemon = () => {
    setShowPokemon(true);
    incrementCaptureCombo();
  }

  const handleNextPokemon = () => {
    if(!showPokemon)  resetCaptureCombo();
    getRandomPokemon().then((pkm) => {
      setCapture(false);
      setShowPokemon(false);
      setPokemon(pkm);
      setExp(pkm.base_experience);
      setIsLoading(false);
      localStorage.setItem("pkmGame", JSON.stringify(pkm));
    });
  }

  const handleEndGame = () => {
    console.log("End game")
    if(captureCombo > 0)
    {
      const loot = getLoot(captureCombo);
      updateBag(loot);
      resetCaptureCombo();
    }
  }

  const handleThrowPokeball = (ballName) => {
    if(useItem(ballName))
    {
      const aux_exp = calcExperience(exp,ballName);
      setExp(aux_exp);

      // Capturar pokemon
      if(aux_exp <= 0){
        console.log("Pokemon capturado")
        setCapture(true);
      }
    }
  }

  const handleThrowBerry = () => {
    if(useItem('berries'))
    {
      const aux_exp = calcExperience(exp,'berries');
      setExp(aux_exp);
    }
  }


  return (
    <div className="gameContainer">
      {isLoading ? (
        <h3>cargando...</h3>
      ) : (
        <>
          <PokemonImage showPokemon={showPokemon} src={pokemon.image} />
          <GameForm 
            pokemon={pokemon} 
            guessPokemon={handleGuessPokemon}
            endGame={handleEndGame}
            nextPokemon={handleNextPokemon} 
          />
          <div>
            <h3>Pokemon adivinados: {captureCombo}</h3>
          </div>
          <Bag 
            disable={!showPokemon || capture}
            throwPokeball={handleThrowPokeball}
            throwBerry={handleThrowBerry}
            />
        </>
      )}
    </div>
  );
};
