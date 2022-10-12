import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { CheckingAuth } from '../components/auth/CheckingAuth'
import { useAuth } from '../hooks/useAuth'
import { GamePage } from '../pages/GamePage'
import { IndexPage } from '../pages/IndexPage'
import { PokedexPage } from '../pages/PokedexPage'
import { ProfilePage } from '../pages/ProfilePage'

export const AppRouter = () => {

  const {status, checkAuth} = useAuth();

  useEffect(() => {
    checkAuth();
  }, [])
  
  if(status === 'checking') return <CheckingAuth/>

  
  return (
    <Routes>
        {
          (status === 'authenticated') ? (
            <>
            <Route path='/play' element={<GamePage/>}/>
            <Route path='/pokedex' element={<PokedexPage/>} />
            <Route path='/profile' element={<ProfilePage/>}/>
            <Route path='/*' element={<Navigate to="/"/>}/>
            </>
          ) :
          (
            <>
            <Route path='/' element={<IndexPage/>}/>
            <Route path='/*' element={<Navigate to="/"/>}/>
            </>
          )
        }
        <Route path='/' element={<IndexPage/>}/>
    </Routes>
  )
  
}
