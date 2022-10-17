import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import { Login } from "./Login";
import { Register } from "./Register";
import { Loading } from "./Loading";
import { useAuth } from "../../hooks";

import "../../styles/auth.scss";

import gengar from "../../assets/img/auth/gengar.webp"
import gengarFalse from "../../assets/img/auth/gengarFalse.webp"
import gengarTrue from "../../assets/img/auth/gengarTrue.webp"

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

  
  
  const ref = useRef()

  useEffect(() => {
      const checkIfClickedOutside = e => {
          if (show && ref.current && !ref.current.contains(e.target)) {
            setAuthModalVisible(false)
          }
      }
      document.addEventListener("mousedown", checkIfClickedOutside)
      return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside)
      }
  }, [show])

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
    
      <motion.div 
        ref={ref}
        className="authContainer"
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
