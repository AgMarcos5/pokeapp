import React from 'react'
import { PokemonImage } from '../game/PokemonImage';

import "../../styles/pokedex/pokemonInfo.scss"

const statName = ["HP","ATK","DEF","SpA","SpD","SPD"]

export const PokemonInfo = ({pokemon,setActive}) => {

    console.log(pokemon)

    const close = () => {
        setActive(null);
    }

    if(!pokemon){
        return (
            <div className='pokemonInfoContainer'>
            </div>
        )
    }

    return (
      <div className="pokemonInfoContainer">
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
      </div>
    );
    

}
