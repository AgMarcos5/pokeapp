import React, { useEffect, useState } from "react";
import { Login } from "./Login";
import { Register } from "./Register";

import { AnimatePresence, motion } from "framer-motion";

import "../../styles/auth.scss";
import { useAuth } from "../../hooks";
import { Loading } from "./Loading";

import gengar from "../../assets/img/auth/gengar.jpg"
import gengarFalse from "../../assets/img/auth/gengarFalse.jpg"
import gengarTrue from "../../assets/img/auth/gengarTrue.jpg"

const gengarState = {
  "initial" : gengar,
  "valid" : gengarTrue,
  "invalid" : gengarFalse,
}

export const AuthModal = ({show, setAuthModalVisible}) => {

  const { status, isLoading } = useAuth();
  const [page, setPage] = useState("login")
  const [authState, setAuthState] = useState("initial")

  const handleSetPage = (page) => {
    setPage(page)
    setAuthState("initial")
  }

  const handleAuthState = (state) => {
    if(state === 'valid'){
      if( status === 'authenticated'){
        setAuthState('valid');
      } else{
        setAuthState('initial');
      }
    }
    else {
      setAuthState('invalid');
    }
  }

  const handleClose = () => {
    handleSetPage("login")
    setAuthModalVisible(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
        key="modal"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
      
    <div className="authBg">
    
      <motion.div className="authContainer"
        key="modal"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        exit={{ y: 100 }}
        transition={{ type: "spring", stiffness: 30 }}
      >

        <button className="close" onClick={handleClose}>X</button>


            {
              isLoading && (
                <div className="authLoading">
                  <Loading />
                </div>
              )
            }
            <div>
              <img src={gengarState[authState]} alt="gengar"/>
            </div>

          {
            page === 'login' ? (
              <div>
                <Login setAuthState={handleAuthState}/>
                <div className="link"><span onClick={() => handleSetPage("register")}>Crear una cuenta</span></div>
              </div>
            ) : 
            (
              <div>
                <Register setAuthState={handleAuthState}/>
                <div className="link"><span onClick={() => handleSetPage("login")}>Ya tengo una cuenta</span></div>
              </div>
            )
          }

      </motion.div>
    </div>
    
    </motion.div>
      )}
    </AnimatePresence>
      
    
  );
};
