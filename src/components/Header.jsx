import React from 'react'
import { Link } from 'react-router-dom'
import { Navbar } from './Navbar'

export const Header = () => {
  return (
    <header>
        <h1>PokeAPP</h1>
        <Navbar/>
    </header>
  )
}
