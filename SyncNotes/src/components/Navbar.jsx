import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <div className='nav-container flex items-center m-5 justify-evenly'>
        <Link 
            to={"/"}
            className='logo-container'>
            <h1 className='text-2xl'>Sync<span className='text-green-600 font-semibold'>Notes</span></h1>
        </Link>

        <div className='search-container'>
            <input type="text"
                className='bg-gray-900 p-2 w-xs h-fit'
                placeholder='Search....'    
            />
            <button className='bg-green-600 cursor-pointer text-white p-2'>
                <SearchIcon></SearchIcon>
            </button>
        </div>

        <div className='auth-container flex gap-2'>
            <button className='p-2 bg-green-600 rounded-sm '>
                SignUp
            </button>

            <button className='p-2 bg-gray-900 rounded-sm'>
                Login
            </button>
        </div>
    </div>
  )
}
