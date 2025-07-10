

import Button from '@mui/material/Button';
import { IoSearchOutline } from "react-icons/io5";
const Search = () => {

    return (
        <>
            <div className='flex justify-between   items-center w-full h-full  border-2  px-3 rounded-xl bg-gray-100  relative'>
                <input type='text' className='outline-none border-none w-4/5 h-full bg-transparent text-black ' placeholder='Search for products...' />
                <Button
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '48px',
                        minWidth: '48px',
                        height: '48px',
                        width: '48px',
                        borderRadius: '50%',
                        backgroundColor: 'transparent',
                        position: 'absolute',
                        top: '10%',
                        right: '8px',
                        '&:hover' :{
                            backgroundColor : '#e5e7eb'
                        }
                    }}

                >
                    <IoSearchOutline className=' h-8 w-8 text-black' />
                </Button>
            </div>
        </>
    )

}


export default Search;