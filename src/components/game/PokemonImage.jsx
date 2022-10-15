export const PokemonImage = ({ src, showPokemon, captureCombo }) => {
  return (
    <div className="imageContainer">
      <div className="points">
        <div><span>{captureCombo}</span></div>
      </div>
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
