import { Navbar } from "./Navbar";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/img/logo.png";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import arrow from "../assets/img/arrow1.png"

export const Header = ({ size, executeScroll }) => {
  const [isFirstLoad, setIsFirstLoad] = useState(false);

  const prevRoute = useLocation();

  useEffect(() => {
    if (prevRoute.pathname === "/") setIsFirstLoad(true);
  }, []);

  return (
    <motion.div
      key="modal"
      initial={{ height: size === "small" ? 500 : 500 }}
      animate={{ height: size === "small" ? 500 : 910 }}
      exit={{ height: size === "small" ? 500 : 500 }}
      transition={{ type: "spring", stiffness: 30 }}
    >
      <header className={size}>
        <div className="bg"></div>
        <div className="container">
          <div className="headerPosition">
            {isFirstLoad ? (
              <motion.div
                className="navbar"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  ease: "easeIn",
                  type: "spring",
                  stiffness: 30,
                  duration: 0.3,
                }}
              >
                <img src={logo} className="logo" alt="pokeapp" />
                <Navbar />
              </motion.div>
            ) : (
              <div className="navbar">
                <img src={logo} className="logo" alt="pokeapp" />
                <Navbar />
              </div>
            )}

            <motion.div
              className="subtitle"
              initial={{ opacity: size === "small" ? 0 : 0 }}
              animate={{ opacity: size === "small" ? 0 : 1 }}
              exit={{ opacity: size === "small" ? 0 : 0 }}
            >
              <p>DESCUBRE. CAPTURA. JUEGA</p>
              <p>
                CON <span>POKEAPP</span>
              </p>
              <img src={arrow} onClick={executeScroll} alt="bajar"/>
            </motion.div>
          </div>
        </div>
      </header>
    </motion.div>
  );
};
