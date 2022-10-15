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


  const {counter: captureCombo, increment: incrementCaptureCombo , reset: resetCaptureCombo, setValue: setCombo} = useCounter(0);

  // Experiencia del pokemon, al llegar a 0 es capturable
  const [exp, setExp] = useState(0);
  const [capture, setCapture] = useState(false);

  const {updateBag, useItem, capturePokemon, addPokemon} = useTrainer()


  useEffect(() => {
    const storagePokemon = JSON.parse(localStorage.getItem("pkmGame"));
    if (storagePokemon) {
      setPokemon(storagePokemon.pkm);
      setExp(storagePokemon.pkm.base_experience)
      setCombo(storagePokemon.combo)
      setIsLoading(false);
    } else {
      getRandomPokemon().then((pkm) => {
        setPokemon(pkm);
        setExp(pkm.base_experience);
        setIsLoading(false);
        localStorage.setItem("pkmGame", JSON.stringify({pkm, combo: captureCombo}));
      });
    }
  }, [])
  


  const handleGuessPokemon = () => {
    setShowPokemon(true);
    //localStorage.setItem("pkmGame", JSON.stringify({pkm: pokemon,show:true}));
    incrementCaptureCombo();
    addPokemon(pokemon);
  }

  const handleNextPokemon = () => {
    getRandomPokemon().then((pkm) => {
      setCapture(false);
      setShowPokemon(false);
      setPokemon(pkm);
      setExp(pkm.base_experience);
      setIsLoading(false);
      if(showPokemon){
        localStorage.setItem("pkmGame", JSON.stringify({pkm,combo: captureCombo}));
      }
      else {
        resetCaptureCombo();        
        localStorage.setItem("pkmGame", JSON.stringify({pkm,combo: 0}));
      }
    });
  }

  const handleEndGame = () => {
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
        setCapture(true);
        capturePokemon(pokemon);
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
       
          <PokemonImage showPokemon={showPokemon} src={pokemon.image} captureCombo={captureCombo}/>
          <div className="gameContent">

          <GameForm 
            disable={showPokemon}
            pokemon={pokemon} 
            guessPokemon={handleGuessPokemon}
            endGame={handleEndGame}
            nextPokemon={handleNextPokemon} 
          />
          <Bag 
            disable={!showPokemon || capture}
            throwPokeball={handleThrowPokeball}
            throwBerry={handleThrowBerry}
            />
          </div>
        </>
      )}
    </div>
  );
};
