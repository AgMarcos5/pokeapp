import React from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'
import { Login } from './auth/Login';
import { Register } from './auth/Register';

export const Navbar = () => {
    const {status, user, startLogout} = useAuth();

  return (
    <>
    <nav>
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/play">Play</Link></li>
            <li><Link to="/pokedex">Pokedex</Link></li>
            {
                (status === 'authenticated')
                ? (
                    <>
                        <Link to="/profile"><h3>{user.displayName}</h3></Link>
                        <button onClick={startLogout}>desconectar</button>
                    </>
                ):(
                <>
                    <li>Login</li>
                    <li>Register</li>
                </>
                )
            }
        </ul>
    </nav>
    
    {
        (status === 'not-authenticated') && (
            <>
                <Login/>
                <Register/>
            </>
        )
    }

    </>
  )
}
