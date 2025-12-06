import { useState } from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home'
import Navbar from './components/Navbar'
import NotesPage from './components/NotesPage'

function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<><Navbar/><Home/></>
    },
    {
      path:"/notes",
      element: <><Navbar/><NotesPage/></>
    }
  ])


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
