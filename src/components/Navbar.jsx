import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

import "../styles/navbar.scss"

export const Navbar = ({showAuth}) => {
    const {status, user, startLogout} = useAuth();
    const [showMenu, setShowMenu] = useState(false)
    const [showProfile, setShowProfile] = useState(false)

    const onClickMenu = () => {
        setShowMenu(!showMenu)
    }

    const onClickProfile = () => {
        setShowProfile(!showProfile)
    }

    const onLogout = () => {
        setShowProfile(false)
        startLogout()
    }

    const ref = useRef()

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (showProfile && ref.current && !ref.current.contains(e.target)) {
                setShowProfile(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
        document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [showProfile])

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
                    <div className='userContainer'  ref={ref}>
                            <div className='user' onClick={onClickProfile}>
                                <span>{user.displayName}</span>     
                            </div>

                            <div className={showProfile ? 'show profileMenu' : 'profileMenu'}>
                                <button onClick={onLogout}>Desconectar</button>
                            </div>
                    </div>
                ):(
                <>
                    <li className="user" onClick={() => showAuth(true)}>Comenzar</li>
                </>
                )
            }
        </ul>
        
        </div>
    </nav>

    </>
  )
}
