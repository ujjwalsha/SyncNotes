import React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';

export default function Navbar() {
  return (
    <div className='nav-container flex items-center m-5 justify-evenly'>

        <Link 
            to={"/"}
            className='logo-container'>
            <h1 className='text-2xl'>Sync<span className='text-green-600 font-semibold'>Notes</span></h1>
        </Link>

        <div className='search-container flex gap-3'>
            <div>
                <input type="text"
                className='bg-gray-900 p-2 w-xs h-fit'
                placeholder='Search....'    
                />
            <button className='bg-green-600 cursor-pointer text-white p-2'>
                <SearchIcon></SearchIcon>
            </button>
            </div>
            
        </div>

        <div className='auth-container flex gap-2'>

            <Link 
                to={"/favourite"}
                className='bg-gray-900 items-center cursor-pointer hover:bg-gray-800 justify-center p-2 rounded-sm text-sm flex gap-1'
            >
                <FavoriteIcon fontSize='small'></FavoriteIcon> Favourite
            </Link>
            
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
