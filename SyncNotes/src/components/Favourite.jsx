import { useScrollTrigger } from '@mui/material'
import axios from 'axios';
import React, { useEffect, useState } from 'react'
 import toast, {Toaster} from 'react-hot-toast'
import RemoveIcon from '@mui/icons-material/Remove';

export default function Favourite() {

    const [Favourite, setFavourite] = useState([]);
    const [Trigger, setTrigger] = useState(false);

    useEffect(() =>{
        
        const fetchFav = async() =>{
            
            try{
                const res = await axios.get("http://192.168.29.174:8080/api/favourite")
                console.log(res.data);
                setFavourite(res.data);
            }
            catch(error)
            {
                console.log("something went wrong");
                
            }
        }

        fetchFav();
    },[Trigger])


    const handleRemove = async (id) => {

        try
        {
            const res = axios.put(`http://192.168.29.174:8080/api/remove/${id}`)
            
            console.log(res);
            setTrigger((prev) => !prev);
            toast("Removed successfully!", {
                icon: '✌️',
            });
        }
        catch(error)
        {   
            console.log(error);
        }
    }



  return (
    <>
        <div className='main-container mt-20 justify-center items-center flex flex-col'>
            <div className='w-2/3 flex  flex-col gap-5'>
                {
                    Favourite.length ?
                    (
                        Favourite.map((fav) =>(
                            <div className='relative bg-gray-900 p-5 rounded-sm items-center flex gap-5' key={fav.id}>
                                    <p 
                                        className='hover:text-gray-400 cursor-pointer'
                                        onClick={() => handleNote(fav)}
                                    >{fav.title}</p>
                                    <div 
                                        className='bg-red-800 absolute right-5 rounded-sm hover:bg-red-600 cursor-pointer w-fit p-2'
                                        onClick={() => handleRemove(fav.id)}
                                    >
                                        <RemoveIcon></RemoveIcon> Remove
                                    </div>
                            </div>
                        ))
                    )
                    :
                    (
                        <p>Not Found</p>
                    )
                }
            </div>
            
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
           

        </div>
    </>
  )
}
