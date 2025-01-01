
import Button from '@mui/material/Button';
import { FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";

const User = ()=>{

    return (
        <>
        <div className='user h-16 flex justify-evenly items-center w-1/6'>
                    <Button><FaUserCircle /></Button>
                    <div className='flex w-3/5 justify-between items-center '>
                        <span>$3.19</span>
                        <div className='relative '>
                        <Button
                        style={{
                            backgroundColor : '#fecaca',
                            borderRadius : '50%',
                            height : '40px',
                            width : '40px',
                            display : 'flex',
                            justifyContent : 'center',
                            alignItems :'center',
                            overflow: 'hidden', // Prevent content overflow
                            padding :'0'
                        }}
                        className='cart'
                        >
                         <IoCartOutline />
                        </Button>
                         <span className='bg-red-600 absolute [top:-6px] [right:-6px] rounded-full h-5 w-5 text-white flex justify-center items-center'>1</span>
                        </div>
                    </div>
               </div>
        </>
    )
}


export default User;