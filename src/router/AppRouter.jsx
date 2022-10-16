import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { AppLayout } from '../layout/AppLayout'
import { GamePage } from '../pages/GamePage'
import { IndexPage } from '../pages/IndexPage'
import { PokedexPage } from '../pages/PokedexPage'
import { ProfilePage } from '../pages/ProfilePage'


import { AnimatePresence } from "framer-motion"
import { Loading } from '../components/auth/Loading'

export const AppRouter = () => {

  const {status, checkAuth} = useAuth();
  
  const location = useLocation();

  useEffect(() => {
    checkAuth();
  }, [])
  
  if(status === 'checking') return <Loading/>

  
  return (
    <AnimatePresence exitBeforeEnter >
    <Routes location={location} key={location.pathname}>
        {
          (status === 'authenticated') ? (
            <>
            <Route path='/play' element={<AppLayout><GamePage/></AppLayout>}/>
            <Route path='/pokedex' element={<AppLayout><PokedexPage/></AppLayout>} />
            <Route path='/profile' element={<AppLayout><ProfilePage/></AppLayout>}/>
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
    </AnimatePresence>
  )
  
}
