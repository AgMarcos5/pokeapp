import React from 'react'
import { Header } from '../components/Header'

import {motion} from 'framer-motion'

import "../styles/layout.scss"

export const AppLayout = ({children}) => {
  return (
    <>
    <Header size="small"/>

    <motion.div
        className='containerBg'
        key="modal"
        initial={{ opacity: 0}}
        animate={{ opacity: 1}}
        exit={{ opacity: 0 }}
        transition={{ type: "spring", stiffness: 30}}
      >
    <div className='container'>
        {children}
    </div>

    <div className='bgFilter'></div>
    
    </motion.div>
    </>
  )
}
