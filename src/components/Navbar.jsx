import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'

export const Navbar = () => {
    const {status, user} = useAuth();

  return (
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/play">Play</Link></li>
            <li><Link to="/pokedex">Pokedex</Link></li>
            {
                (status === 'authenticated')
                ? (
                    <Link to="/profile"><h3>Temdi5</h3></Link>
                ):(
                <>
                    <li>Login</li>
                    <li>Register</li>
                </>
                )
            }
        </ul>
    </nav>
  )
}
