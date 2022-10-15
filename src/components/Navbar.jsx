import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'
import { Login } from './auth/Login';
import { Register } from './auth/Register';

import "../styles/navbar.scss"

export const Navbar = () => {
    const {status, user, startLogout} = useAuth();
    const [showMenu, setShowMenu] = useState(false)

    const onClickMenu = () => {
        setShowMenu(!showMenu)
    }

  return (
    <>
    <nav>
        <div className='menuButton' onClick={onClickMenu}>M</div>

        <div className={showMenu ? 'show menuMobile' : 'menuMobile'}>

        <ul >
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/play">Juega</Link></li>
            <li><Link to="/pokedex">Pokedex</Link></li>
            
            {
                (status === 'authenticated')
                ? (
                    <>
                        <Link to="/profile">
                            <div className='user'>
                                {user.displayName}        
                            </div>
                        </Link>
                    </>
                ):(
                <>
                    <li>Comenzar</li>
                </>
                )
            }
        </ul>
        
        </div>
    </nav>

    </>
  )
}
