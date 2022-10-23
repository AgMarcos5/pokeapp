import React, { useEffect, useState } from "react";
import toast from 'react-hot-toast';
import { useAnimationControls } from "framer-motion";

import { Bag } from "../components/game/Bag";
import { GameForm } from "../components/game/GameForm";
import { PokemonImage } from "../components/game/PokemonImage";
import { CustomToaster } from "../components/game/CustomToaster";
import { Loading } from "../components/auth/Loading";
import { pokeballAnimation, pokemonAnimation } from "../components/game/animations";

import { useCounter, useTrainer } from "../hooks";
import { calcExperience, getLoot, getRandomPokemon } from "../helpers";

import "../styles/game.scss"
import { useViewport } from "../hooks/useViewport";




export const GamePage = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState(null);

  // Oculta el pokemon
  const [showPokemon, setShowPokemon] = useState(false);


  const {counter: captureCombo, increment: incrementCaptureCombo , reset: resetCaptureCombo, setValue: setCombo} = useCounter(0);

  // Experiencia del pokemon, al llegar a 0 es capturable
  const [exp, setExp] = useState(0);
  const [capture, setCapture] = useState(false);
  const [throwingBall, setThrowingBall] = useState(false)

  const {updateBag, useItem, capturePokemon, addPokemon} = useTrainer()

  // ANIMACION CAPTURA POKEMON
  const pokemonControls = useAnimationControls()
  const pokeballControls = useAnimationControls()


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
      
      pokeballControls.start(pokeballAnimation["fin"])
      pokemonControls.start(pokemonAnimation["salir"])
      
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

  const {width} = useViewport()

  const sequence = async () => {
    if(width<475){
      await pokeballControls.start(pokeballAnimation["lanzarMobile"])
      await pokemonControls.start(pokemonAnimation["capturar"])
      await pokeballControls.start(pokeballAnimation["girarMobile"])
    } else{ 
      await pokeballControls.start(pokeballAnimation["lanzar"])
      await pokemonControls.start(pokemonAnimation["capturar"])
      await pokeballControls.start(pokeballAnimation["girar"])
    }
  }

  const handleThrowPokeball = (ballName) => {
    if(useItem(ballName))
    {
      const aux_exp = calcExperience(exp,ballName);
      setExp(aux_exp);

      // animacion lanzar pokeball
      sequence();
      
      // deshabilitar items
      setThrowingBall(true)
      
      setTimeout(() => {
        // Capturar pokemon
        if(aux_exp <= 0){
          setCapture(true);
          capturePokemon(pokemon);
          localStorage.removeItem('pkmGame');
          toast.success(`Capturaste a ${pokemon.name}!`)
        }
        else {
          pokemonControls.start(pokemonAnimation["salir"])
          pokeballControls.start(pokeballAnimation["fin"])
          toast.error(`${pokemon.name} escapó!`)
        }
        setThrowingBall(false)
        // animacion fin
      }, 7000);

      
    }
  }

  const handleThrowBerry = () => {
    if(throwingBall) return;
    if(useItem('berries'))
    {
      const aux_exp = calcExperience(exp,'berries');
      setExp(aux_exp);
    }
  }


  return (
    <div className="gameContainer">
      {isLoading ? (
        <Loading/>
      ) : (
        <>
          <CustomToaster/>
          <PokemonImage controls={pokemonControls} showPokemon={showPokemon} src={pokemon.image} captureCombo={captureCombo}/>
          
          <div className="gameContent">


          <GameForm 
            disable={showPokemon}
            throwingBall={throwingBall}
            pokemon={pokemon} 
            guessPokemon={handleGuessPokemon}
            endGame={handleEndGame}
            nextPokemon={handleNextPokemon} 
          />

          <Bag 
            controls={pokeballControls}
            disable={!showPokemon || capture || throwingBall}
            isPokemonVisible={showPokemon}
            throwPokeball={handleThrowPokeball}
            throwBerry={handleThrowBerry}
            />
          </div>

        </>
      )}
    </div>
  );
};
