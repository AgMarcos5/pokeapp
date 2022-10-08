import React from 'react'
import { Header } from '../components/Header'

export const AppLayout = ({children}) => {
  return (
    <div className='container'>
    <Header/>
        {children}
    </div>
  )
}
