import { useDispatch, useSelector } from "react-redux";
import { onUpdateBag, onUseItem } from "../store/trainer/trainerSlice";

export const useTrainer = () => {
    const {isSaving, pokemons, bag} = useSelector(state => state.trainer)
    const dispatch = useDispatch();
   
    // Consumir item del inventario
    const useItem = (itemName) => {
        if(!bag[itemName]) return;
        console.log(itemName, " lanzada");
        dispatch(onUseItem({itemName, amount: -1}))
        return true;
    }

    // Actualizar mochila con el loot
    const updateBag = (loot) => {
        const auxBag = {...bag}
      console.log("Mochila anterior", bag)
      for (const item in loot) {
          const element = loot[item];
          auxBag[item] += element;
        
      }
      console.log("Mochila actualizada", auxBag)
      dispatch(onUpdateBag(auxBag));
    }

    return {
        //PROPS
        isSaving,
        pokemons,
        bag,

        //METHODS
        updateBag,
        useItem,
    }

    
}
