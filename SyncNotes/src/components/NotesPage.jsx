import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';

export default function NotesPage() {

    const location = useLocation();
    const note = location.state;

    console.log(note);
    
  return (
    <div className='flex justify-center gap-10 mt-10 items-center'>

            <div className= 'w-2/3 justify-center items-center'>
                <div className='link flex'>
                    <Link to={"/"} className='text-gray-400 flex hover:underline'>Home <span>/</span></Link>
                
            </div>

            <div className='container bg-gray-900 rounded-sm mt-10 p-5  flex gap-10 flex-col'>
                <div className='flex justify-between'>
                     <h1 className='text-xl'>{note.title}</h1>
                     <div className='hover:text-gray-600'>
                        <EditIcon></EditIcon>
                     </div>
                </div>
               
                <div className='whitespace-pre-wrap flex justify-between'>
                    {note.content}
                    <div className='cursor-pointer'>
                        <EditIcon></EditIcon>
                     </div>
                </div>
            </div>

            <div className='flex  justify-end mt-5'>
                 <button className='p-2 bg-green-600 rounded-sm '>
                    update
                </button>
            </div>

           
        </div>
        
    </div>
  )
}
