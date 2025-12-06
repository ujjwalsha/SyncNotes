import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CreatePopup from './CreatePopup';
import axios from 'axios';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import NotesPage from './NotesPage';

export default function Home() {

    const [isOpened, setIsOpened]  = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const [note, setNote] = useState([]); 
    const [Favourite, setFourite] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    useEffect(()=>{

        axios.get("http://192.168.29.174:8080/api/all")
        .then(Response => {
            console.log(Response)
            setNote(Response.data.Note)
        })
        .catch((error) =>{
            console.log(error);
        }
        )
        

    }, [isOpened])


    const handleNote = (data) =>{

        // setSelectedNote(data);

        if(location.pathname === "/")
        {
            navigate("/notes", {state: data})
        }
        else{
            navigate("/")
        }

    }

  return (

    <>
        {
            selectedNote ? (
                <NotesPage selectedNote={selectedNote}/>
            )
            :
            (

            <div className='main-container flex justify-center flex-col items-center'>
                <div className='notes flex items-center m-10 justify-between w-2/3 '>
                    <h1>Notes</h1>
                    <button 
                        onClick={() => setIsOpened((prev)=> !prev)}
                        className='bg-green-600 w-fit p-2 cursor-pointer hover:bg-green-900 rounded-sm'
                    >
                        <AddIcon></AddIcon>
                    </button>
                </div>
                <div className='flex items-start justify-start w-2/3 gap-10'>
                    <p className='text-gray-500'>{note.length}: notes</p>
                </div>

                <div className='all-notes mt-5 w-2/3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-4'>
                    
                    {
                        note.length ?
                        (
                            note.map((n) =>(
                                <div onClick={()=>handleNote(n)}  className='bg-gray-900 border  border-green-600 gap-4 cursor-pointer hover:bg-gray-800 flex flex-col  text-gray-400  p-3 rounded-sm' key={n.id}>
                                    <div className='flex justify-end'>
                                        <button 
                                            className='cursor-pointer'
                                            onClick={() => setFourite((prev) => !prev)}
                                        >
                                        <StarBorderIcon></StarBorderIcon>
                                        </button>
                                    </div>
                                
                                    <h1>{n.title}</h1>
                                    <div className='flex justify-end '>
                                        <p>{n.updatedAt}</p>
                                    </div>
                                    
                                </div>
                            ))
                        )
                        :
                        (
                            <p>Note not found</p>
                        )
                    }


                </div>

                
            </div>
            )
        }
        

        <div>
            {
                isOpened ? (
                    <CreatePopup setIsOpened={setIsOpened}  />
                )
                :
                (
                    <p></p>
                )

            }
        </div>
    </>
    
  )
}
