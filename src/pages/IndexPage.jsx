import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {motion, useScroll, useTransform  } from "framer-motion"

import { Header } from "../components/Header";
import { AuthModal } from "../components/auth/AuthModal";
import { Footer } from "../components/Footer";
import { useAuth } from "../hooks";

import '../styles/indexPage.scss'

// IMAGES
import pikachu_2 from '../assets/img/pikachu2.webp'
import pikachu_1 from '../assets/img/pikachu1.webp'
import rotomImg from '../assets/img/rotom.gif'
import cardPokedex from '../assets/img/pokedexcard.webp'
import cardItems from '../assets/img/cardItems.webp'
import cardPokemons from '../assets/img/cardPokemons.webp'
import { InViewComponent } from "../components/InViewComponent";


export const IndexPage = () => {
  
  const {status} = useAuth();

  const refScroll = useRef()
  const executeScroll = () => refScroll.current.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const [authModalVisible, setAuthModalVisible] = useState(false);

  
  // PARALLAX
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [200, 1300], [-150, 0])

  useEffect(() => {
    if(status === 'authenticated')
      setAuthModalVisible(false)
  }, [status])
  

  return (
    <>
      
      {
          (status === 'not-authenticated') && (
              <AuthModal show={authModalVisible} setAuthModalVisible={setAuthModalVisible}/>
          )
      }
      <div className={authModalVisible ? 'modal' : ''}>
        
      <Header executeScroll={executeScroll} showAuth={setAuthModalVisible}/>

      <div ref={refScroll}></div>
      <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 30 }}
      >
      <div className="contentBG" >

       
          
        <section className="sectionGame" >

          <div className="sectionGameBgContainer">
            <motion.div style={{ y }} className="sectionGameBg"></motion.div>
          </div>

          <div className="container flex">

            <img src={pikachu_1} className="icon" alt="pikachu icon"/>
            <InViewComponent>
            <div>
              <div className="cardText">
                <h1 className="title">¿Quién es ese <span>Pokémon</span>?</h1>
                <Link to="/play">
                  <div className="playButton">
                    <span>▶</span>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                  </div>
                </Link>
              </div>
            </div>
            </InViewComponent>
            <img src={pikachu_2} className="pikachu2" alt="detective pikachu"/>
          </div>
        </section>

        <section className="sectionInfo">
          <div className="container flex">

          <InViewComponent>
            <div className="card">
                <div className="cardImg">
                  <img src={cardPokemons} alt=""/>
                </div>
              <div className="content">
                <h1>Juega</h1>
                <h4>Adivina los nombres y registra en la Pokedex</h4>
              </div>
            </div>
          </InViewComponent>
            
          <InViewComponent>
            <div className="card">
              <div className="cardImg">
                  <img src={cardItems} alt=""/>
                </div>
              <div className="content">
                
                <h1>Captura</h1>
                <h4>Lanza pokeballs y bayas para capturar</h4>
              </div>
            </div>
          </InViewComponent>

          </div>
        </section>


        <InViewComponent>
        <section className="sectionPokedex">
          <div className="container flex">
          <div className="cardImageContainer">
            <img src={cardPokedex} className="cardImage" alt="card"/>
          </div>
            <div className="cardText">
              <img src={rotomImg} alt="rotomdex"/>
              <h2>Consulta información de tus Pokémon favoritos en la 
              <Link to="/pokedex"><span> Pokedex </span></Link>
              </h2>
            </div>          
          </div>
        </section>
        </InViewComponent>

        <Footer/>
      </div>
      </motion.div>

      </div>
    </>
  );
};
