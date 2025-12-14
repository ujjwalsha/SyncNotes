import React from 'react'
import ClearIcon from '@mui/icons-material/Clear';
import axios from 'axios';
import { useState } from 'react';
import toast, {Toaster} from 'react-hot-toast'
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';

function CreatePopup({setIsOpened}) {


    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    const AddHandle = async () =>{
    
        try
        {
             const res =  await axios.post("http://192.168.29.174:8080/api/create",
                            {title, content},
                            {
                                headers:{
                                    "Content-Type":"application/json"
                                },
                            })

            console.log(res.data);

                toast("successfull", {
                    icon: '✌️',
                 });
                            
                    
        }
        catch(error)
        {
            console.log(error);
            
        }

        setTitle("");
        setContent("");
       

    }



  return (

    <>
        <div className='border-green-600 border-[.1px] absolute top-1/15 flex rounded-sm left-1/8 flex-col gap-10 p-5 w-3/4 backdrop-blur-lg'>
            
            <div className='flex items-end justify-end'>
                    <button 
                        onClick={() =>  setIsOpened((prev) => !prev)}
                        className='flex w-fit item-end justify-end font-semibold cursor-pointer text-green-600 '>
                        <ClearIcon fontSize='large'></ClearIcon>
                    </button>
            </div>
            

            <div className='title flex  gap-10'>

                <div className='w-1/2 flex flex-col justify-center items-center'>
                    <ReceiptLongIcon sx={{fontSize:100}}
                    ></ReceiptLongIcon>
                </div>


                <div className='flex flex-col w-3/2 gap-10'>
                    <input type="text" 
                    value={title}
                    className='bg-gray-900 p-2 ' placeholder='Title......'
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea 
                    value={content}
                    className='w-full p-2  h-80 bg-gray-900 h-xs'
                    placeholder='Type.....'
                    onChange={(e) => setContent(e.target.value)}
                    
                ></textarea>

                <div className='flex items-end justify-end'>
                    <button 
                        onClick={AddHandle}
                        className='button hover:bg-green-900 cursor-pointer  flex w-fit items-end p-2 bg-green-600 '>
                        create
                    </button>
                </div>

           
                </div>
               
            </div>

        
            
        </div>

        <Toaster
            position="top-center"
            reverseOrder={false}
        />
    </>
    
  )
}

export default CreatePopup