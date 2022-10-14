import React from "react";
import { Link } from "react-router-dom";
import { Header } from "../components/Header";
import {motion} from "framer-motion"

import '../styles/indexPage.scss'
import pikachu_2 from '../assets/img/pikachu2.png'
import pikachu_1 from '../assets/img/pikachu1.png'

export const IndexPage = () => {
  return (
    <>
      <Header />

      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 30 }}
      >

      <section className="sectionGame">
        <div className="container flex">

          <img src={pikachu_1} className="icon" alt="pikachu icon"/>

          <div>
            <div className="cardText">
              <h1 className="title">¿Quién es ese <span>Pokémon</span>?</h1>
              <Link to="/play"><div className="playButton">▶</div></Link>
            </div>
            <h4>Adivina el pokemon y captúralo para completar la pokedex</h4>
          </div>
          
          <img src={pikachu_2} className="pikachu2" alt="detective pikachu"/>
        </div>
      </section>

      <section className="sectionPokedex">
        <div className="container flex">
          <div className="cardImage">

          </div>
          <div className="cardText">
            <h1>Pokedex</h1>
          </div>          
        </div>
      </section>

        



      </motion.div>
    </>
  );
};
