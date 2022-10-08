import React from 'react'
import { useTrainer } from '../../hooks'
import { Item } from './Item';

export const Bag = ({disable, throwPokeball, throwBerry}) => {

  const {bag,isSaving} = useTrainer();

  return (
    <div className={disable ? 'disable bag' : 'bag'}>
      <ul>
        <li><Item name="pokeballs" throwItem={throwPokeball}/> {bag.pokeballs}</li>
        <li><Item name="superballs" throwItem={throwPokeball}/> {bag.superballs}</li>
        <li><Item name="ultraballs" throwItem={throwPokeball}/> {bag.ultraballs}</li>
        <li><Item name="masterballs" throwItem={throwPokeball}/> {bag.masterballs}</li>
        <li><Item name="berries" throwItem={throwBerry}/> {bag.berries}</li>
      </ul>
    </div>
  )
}
