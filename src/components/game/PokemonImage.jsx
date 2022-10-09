export const PokemonImage = ({src, showPokemon}) => {

  
  return (
    <div className='pokemonImage'>
        <img src={src} 
        className={ ` ${showPokemon ? 'show' : ''} `}
        alt="pokemon"/>
    </div>
  )
}
