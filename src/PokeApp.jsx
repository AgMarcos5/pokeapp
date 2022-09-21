import { usePokedex } from "./hooks"



function PokeApp() {

  const {pokedex,isLoading,activePokemon} = usePokedex();

  return (
    <div className="App">
      PokeAPP
    </div>
  )
}

export default PokeApp
