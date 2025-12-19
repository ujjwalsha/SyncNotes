import React, { useEffect, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import CreatePopup from './CreatePopup';
import axios from 'axios';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import NotesPage from './NotesPage';
import toast, {Toaster} from 'react-hot-toast'
import ClearIcon from '@mui/icons-material/Clear';
import StarIcon from '@mui/icons-material/Star';


export default function Home() {

    const [isOpened, setIsOpened]  = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    const [note, setNote] = useState([]); 
    const [selectedNote, setSelectedNote] = useState(null);
    const [deletePop, setDeletePop] = useState(false);
    const [deleteTrigger, setDeleteTrigger] = useState(false);
    const [id, setId] = useState("");
    const [FavId, setFavId] = useState([]);

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
        

    }, [isOpened, deleteTrigger])


    const handleNote = (data) =>{

        if(location.pathname === "/")
        {
            navigate("/notes", {state: data})
        }
        else{
            navigate("/")
        }

    }


    const handleDelete = async () =>{
       
        try
        {
             const res = await axios.delete(`http://192.168.29.174:8080/api/delete/${id}`)
             console.log(res);
             setDeleteTrigger((prev)=> !prev);
             setDeletePop((prev) => !prev);
             toast(res.data.message, {
                    icon: '✌️',
                    style:{
                        background:"green",
                        color:"white"
                    }
                 });
        }
        catch(error)
        {
            console.log("error");
            
        }
    }

    const handleDeleteTrigger = (id) =>{
        setDeletePop((prev)=> !prev)
        setId(id);
    }

    const handleFavourite = (id) =>{

        setFavId(id);
        handleFav(id);

    }

    const isFavourite = (id) =>  FavId.includes(id);



    const handleFav = async (id) =>{


        try{
            const res = await axios.post(`http://192.168.29.174:8080/api/favourite/${id}`)
            console.log(res);
            setFavId(res.data)
            
            toast("Added Favourite", {
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
                        <AddIcon
                        ></AddIcon>
                    </button>
                </div>
                <div className='flex items-start justify-start w-2/3 gap-10'>
                    <p className='text-gray-500'>{note?.length}: notes</p>
                </div>

                <div className='all-notes mt-5 w-2/3  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-4'>
                    
                    {
                        note.length ?
                        (
                            note.map((n) =>(

                                  <div className='relative group' key={n.id}>
                                        <div className='absolute right-0 p-2 flex justify-end'>
                                                <button 
                                                    className='cursor-pointer hover:shadow-2xs'
                                                    onClick={() => handleFavourite(n.id)}
                                                >
                                                {
                                                    isFavourite(n.id)  ? 
                                                    <StarIcon
                                                        sx={{color:'green'}}
                                                    ></StarIcon>
                                                    :
                                                    <StarBorderIcon
                                                        sx={{color:'green'}}
                                                    ></StarBorderIcon>
                                                }
                                                
                                                </button>
                                        </div>

                                        <div onClick={()=>handleNote(n)}  className='bg-gray-900 border   border-green-600 gap-4 cursor-pointer hover:bg-gray-800 flex flex-col  text-gray-400 p-6 h-full rounded-sm' key={n.id}>
                                            
                                            <h1>{n.title}</h1>
                                            <div className='flex justify-end '>
                                                
                                                <p>{n.updatedAt}</p>
                                            </div>
                                        </div>

                                        <div className='absolute left-1 bottom-1 opacity-0 group-hover:opacity-100'>
                                            <button 
                                                onClick={() => handleDeleteTrigger(n.id)}
                                                className='cursor-pointer'
                                            >
                                                <DeleteIcon
                                                    sx={{color:'green'}}
                                                ></DeleteIcon>
                                            </button>
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

        <div className=''>
            {
                deletePop ?
                (
                    <div className=' top-[30%] left-[35%] rounded-sm absolute backdrop-blur-xl border-green-600 border-[.1px]  p-5 w-1/3 h-1/3'>
                        <div 
                            className='flex justify-end'
                            onClick={() => setDeletePop((prev)=> !prev)}
                        >
                                <ClearIcon fontSize='large'></ClearIcon>
                        </div>
                        <div className='flex flex-col gap-10 justify-center items-center'>
                            <div className='border-green-600  w-fit'>
                                <p className='text-7xl'>🫣</p>
                            </div>

                            <div className='flex gap-5'>
                                <button
                                    className='bg-gray-900 p-2 rounded-sm' 
                                    onClick={handleDelete}
                                >Delete Parmanently</button>
                                <button
                                    className='bg-green-600 p-2 rounded-sm'
                                >Move to Trash</button>
                            </div>
                        </div>
                        
                    </div>
                )
                :
                (
                    <p></p>
                )
            }
        </div>

         <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </>
    
  )
}
