import React from 'react'
import { useAuth } from '../hooks';

export const ProfilePage = () => {
  
  const {status, user, startLogout} = useAuth();

  return (
    <div>
    
    <button onClick={startLogout}>Desconectar</button>
    </div>
  )
}
