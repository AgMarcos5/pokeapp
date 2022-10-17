import React from 'react'
import { PokemonImage } from '../game/PokemonImage';
import rotomdex from "../../assets/img/pokedex/rotomdex.png"

import "../../styles/pokedex/pokemonInfo.scss"
import { AnimatePresence, motion } from "framer-motion";

const statName = ["HP","ATK","DEF","SpA","SpD","SPD"]

export const PokemonInfo = ({pokemon,setActive}) => {

    const close = () => {
        setActive(null);
    }

    return (
      <div className='pokemonInfoContainer'>
      
        <AnimatePresence exitBeforeEnter>
        {pokemon ? 
        (
          <motion.div
              key="pokedexInfo"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
          >
            <div className="pokemonInfo">
            <div className="flex">
              <div>#{pokemon.id}</div>
              <div>{pokemon.name}</div>
              <button className="close" onClick={close}>
                x
              </button>
            </div>

            <div className="flex">
              <div className="stats">
                {pokemon.stats.map((s, i) => (
                  <div className={pokemon.status === 'discovered' ?  'hide stat' : 'stat'} key={s.stat.name}>
                    <div className="statName">{statName[i]}</div>
                    <div className="statValue">
                      {pokemon.status === 'discovered' ?  '??' : s.base_stat}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <PokemonImage src={pokemon.image} types={pokemon.types} status={pokemon.status}/>
          </motion.div>
        )
        :
        (
          
          <motion.div
              key="pokedexIntro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
          >
            <div className='logo'>
                <div className='subtitle'>Pokedex</div>
                <img src={rotomdex} alt="rotom"/>
            </div>
          </motion.div>
        )
        }
        </AnimatePresence>
      </div>
    )

    

}
