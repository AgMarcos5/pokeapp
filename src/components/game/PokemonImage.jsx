
import "../../styles/game/pokemonImage.scss"

export const PokemonImage = ({ src, showPokemon = true, captureCombo = null, types = null, status = "" }) => {


  return (
    <div className="imageContainer">

      {
        types && (
          <div className={status === 'discovered' ?  'hide types points' : 'types points'}>
            {
              types.map( t => (
                <div className={t.type.name} key={t.type.name}></div>
              ))
            }
          </div>
        )
      }

      {
        captureCombo != null && (
          <div className="points">
            <div><span>{captureCombo}</span></div>
          </div>
        )
      }
      
      <div className="rhomb">

      <div className="pokemonImage">
        <img
          src={src}
          className={` ${showPokemon ? "show" : ""} `}
          alt="pokemon"
        />
        <div className="bgFilter"></div>
      </div>
      </div>
    </div>
  );
};
