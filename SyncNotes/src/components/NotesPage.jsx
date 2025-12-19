import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import EditIcon from '@mui/icons-material/Edit';
import axios from 'axios';
import toast, {Toaster} from 'react-hot-toast'

export default function NotesPage() {

    const location = useLocation();
    const note = location.state;

    console.log(note);

    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(note.title);
    const [content, setContent] = useState(note.content);


    const handleUpdate =  async () =>{
        
        try
        {
            const res = await axios.put(`http://192.168.29.174:8080/api/notes/${note.id}`,
                                {
                                    title,
                                    content
                                });
            console.log(res);
            setIsEditing((prev) => !prev)

            toast("Updated", {
                    icon: '✌️',
                    style:{
                        background:"green",
                        color:"white"
                    }
             });
            
        }
        catch(error)
        {
            console.log(error);
        }
    } 


    
  return (
    <div className='flex justify-center gap-10 mt-10 items-center'>

            <div className= 'w-2/3 justify-center items-center'>
                <div className='link flex'>
                    <Link to={"/"} className='text-gray-400 flex hover:underline'>Home <span>/</span></Link>
            </div>

            <div className='container bg-gray-900 rounded-sm mt-10 p-5  flex gap-10 flex-col'>
                <div className='flex items-center gap-2 justify-between'>
                    {
                        !isEditing ?
                        (
                            <h1 className='text-xl'>{title}</h1>
                        )
                        :
                        (
                            <input 
                                type="text" 
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className='bg-transparent border-green-600 outline-0 border w-full text-xl p-2'
                            />
                        )
                    }
                     
                     <div 
                        className='hover:text-gray-600 cursor-pointer bg-green-400 p-1 rounded-sm right-0'
                        onClick={() => setIsEditing((prev) => !prev)}
                     >
                        <EditIcon></EditIcon>
                     </div>
                </div>
               
                <div className='whitespace-pre-wrap gap-2 flex justify-between'>
                    
                    {
                        !isEditing ?
                        (
                            <p>{content}</p>
                        )
                        :
                        (
                            <textarea 
                                name="" id=""
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                className='w-full p-2  h-80 bg-transparent border border-green-600  h-xs'
                            ></textarea>
                        )
                    }



                    <div 
                        className='hover:text-gray-600 cursor-pointer bg-green-400 p-1 rounded-sm h-fit'
                        onClick={() => setIsEditing((prev) => !prev)}
                    >
                        <EditIcon></EditIcon>
                     </div>
                </div>
            </div>

            <div className='flex  justify-end mt-5'>
                {
                    isEditing && (
                        <button 
                            className='p-2 bg-green-600 rounded-sm cursor-pointer'
                            onClick={handleUpdate}
                        >
                        Update
                        </button>
                    )
                }
                
            </div>
        </div>

        <Toaster
            position="top-center"
            reverseOrder={false}
        />
        
    </div>
  )
}
