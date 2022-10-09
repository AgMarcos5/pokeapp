import { pokeApi } from "../api/pokeApi";
import gameLoot from "../data/gameLoot.json"

export const getRandomPokemon = async () => {
    const id = Math.floor(Math.random() * 151) + 1;
    const { data } = await pokeApi.get(`/pokemon/${id}`);
    return {
      name: data.name,
      id: data.id,
      image: data.sprites.other.home["front_default"],
      base_experience: data.base_experience,
    };
};

export const getLoot = (combo) => {
    let indexLoot = 0;
    if(combo >= 20)
      indexLoot = Object.keys(gameLoot).length - 1;
    else{
      indexLoot = Object.keys(gameLoot).findIndex( i => i > combo) -1;
    }

    return Object.values(gameLoot)[indexLoot];
}



// CAPTURA DE POKEMON

const ratio = 30;
const berries = 20;
const balls = {
  pokeballs: [1,3],
  superballs: [2,4],
  ultraballs: [4,7],
  masterballs: [10,10],
}

const randomNumber = (min, max) => { 
  return Math.floor(Math.random() * (max - min) + min);
} 

export const calcExperience = (base_experience, item) => {
  if(item === 'berries'){
    return base_experience - berries
  }else {
    const [min,max] = balls[item];
    return base_experience - ratio*randomNumber(min,max)
  }
}

