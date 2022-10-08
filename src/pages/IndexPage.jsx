import React from "react";
import { Link } from "react-router-dom";

export const IndexPage = () => {
  return (
    <>
      <div>
      <h1>¿Quién es ese Pokemon?</h1>
        <h4>Adivina el pokemon y captúralo para completar la
         pokedex</h4>
        <Link to="/play">Jugar ahora</Link>
      </div>
    </>
  );
};
