import { useDispatch, useSelector } from "react-redux";
import { onAddPokemon, onUpdateBag, onUseItem } from "../store/trainer/trainerSlice";

export const useTrainer = () => {
    const {isSaving, pokemons, bag} = useSelector(state => state.trainer)
    const dispatch = useDispatch();
   
    // Consumir item del inventario
    const useItem = (itemName) => {
        if(!bag[itemName]) return;
        dispatch(onUseItem({itemName, amount: -1}))
        return true;
    }

    // Actualizar mochila con el loot
    const updateBag = (loot) => {
        const auxBag = {...bag}
      for (const item in loot) {
          const element = loot[item];
          auxBag[item] += element;
        
      }
      dispatch(onUpdateBag(auxBag));
    }

    // Agregar pokemon descubierto
    const addPokemon = (pokemon) => {
      const first_appearance = new Date();
      const auxPokemon = {
        ...pokemon,
        first_appearance,
        captured: false,
        captured_date: null,
        captured_count: 0,
      }
      dispatch(onAddPokemon(auxPokemon))
    }

    // Agregar pokemon capturado
    const capturePokemon = (pokemon) => {
      const {id} = pokemon;

    }


    return {
        //PROPS
        isSaving,
        pokemons,
        bag,

        //METHODS
        updateBag,
        useItem,
        addPokemon,
        capturePokemon,
    }

    
}
