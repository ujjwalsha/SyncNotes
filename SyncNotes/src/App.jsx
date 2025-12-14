import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import NotesPage from './components/NotesPage'
import { Favorite } from '@mui/icons-material'
import Favourite from './components/Favourite'

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Home/></>
    },
    {
      path:"/notes",
      element: <><Navbar/><NotesPage/></>
    },
    {
      path:"/favourite",
      element:<><Navbar/><Favourite/></>
    }
  ])


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
