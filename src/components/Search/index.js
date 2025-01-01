

import Button from '@mui/material/Button';
import { IoSearchOutline } from "react-icons/io5";
const Search = ()=>{

    return (
        <>
         <div className='search w-1/3 bg-gray-100 h-16 border-2 flex justify-between  items-center px-3 rounded-xl'>
                    <input type='text' className='w-4/5	h-4/5 bg-transparent text-black outline-none border-none' placeholder='Search for products...' />
                    <Button
                     style={{
                        height :'48px',
                        width : '48px',
                        backgroundColor : 'transparent',
                        display : 'flex',
                        justifyContent : 'center',
                        alignItems:'center',
                        borderRadius :'50%',
                    }}
                    className='bg-transparent'
                    >
                    <IoSearchOutline />
                    </Button>
               </div>
        </>
    )

}


export default Search;