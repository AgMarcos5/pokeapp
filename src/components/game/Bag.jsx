import React, { useState } from 'react'
import { useTrainer } from '../../hooks'
import { Item } from './Item';

import pokeball from "../../assets/img/game/pokeball.png"
import superball from "../../assets/img/game/superball.png"
import ultraball from "../../assets/img/game/ultraball.png"
import masterball from "../../assets/img/game/masterball.png"
import berry from "../../assets/img/game/berry.png"

import arrow from "../../assets/img/arrow1.png"

import "../../styles/bag.scss"

const items = [
  {
    name: "pokeballs",
    src: pokeball
  },
  {
    name: "superballs",
    src: superball
  },
  {
    name: "ultraballs",
    src: ultraball
  },
  {
    name: "masterballs",
    src: masterball
  },
]

export const Bag = ({disable, throwPokeball, throwBerry}) => {

  const {bag,isSaving} = useTrainer();

  const [listItems, setListItems] = useState(items)
  const [selectedItem, setSelectedItem] = useState(0)


  const prevClick = () => {
    setSelectedItem(getPrevItem(selectedItem))
  }

  const nextClick = () => {
    setSelectedItem(getNextItem(selectedItem))
  }

  const getPrevItem = (index) => {
    if(index === 0) return 3;
    return index -1;
  }

  const getNextItem = (index) => {
    if(index === 3) return 0;
    return index+1;
  }

  return (
    <div className={disable ? 'disable bag' : 'bag'}>
      <div className='bagContent'>
        <button className="prev arrow" onClick={() => prevClick()}>
                      <img src={arrow} alt="anterior"/>
        </button>
        <div className="pokeballsContainer">
              <div className='disabledItem'>
                <Item value={listItems[getPrevItem(selectedItem)]} throwItem={throwPokeball}/>
              </div>

              <div className='selectedItem'>
              <Item value={listItems[selectedItem]} throwItem={throwPokeball}/>
              <span>x{bag[listItems[selectedItem].name]}</span>
              </div>

              <div className='disabledItem'>
              <Item value={listItems[getNextItem(selectedItem)]} throwItem={throwPokeball}/>
              </div>
        </div>
        <button className="next arrow" onClick={() => nextClick()}>
          <img src={arrow} alt="siguiente"/>
        </button>

        <div className='selectedItem'>
          <Item value={{name: "berries", src: berry}} throwItem={throwBerry}/>
          <span>x{bag.berries}</span>
        </div>
      </div>


    <div className='bagBGFilter'></div>
    </div>
  )
}
