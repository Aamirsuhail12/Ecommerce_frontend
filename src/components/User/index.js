
import Button from '@mui/material/Button';
import { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { IoCartOutline } from "react-icons/io5";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import { Link } from "react-router-dom";


const User = () => {

    const [isopen, setisopen] = useState(false);
    return (
        <>
            <div className='user h-16 flex justify-evenly items-center w-1/6'>
                <Button><FaUserCircle /></Button>
                <div className='flex w-3/5 justify-between items-center '>
                    <span>$3.19</span>
                    <div className='relative '>
                        <Button
                            className='cart_'
                        >
                            <IoCartOutline />
                        </Button>
                        <span className='bg-red-600 absolute [top:4px] [right:4px] rounded-full h-5 w-5 text-white flex justify-center items-center'>1</span>
                    </div>
                    <div className='relative'>
                        <Button onClick={() => {
                            setisopen(!isopen);
                        }}><PiDotsThreeVerticalBold />
                        </Button>
                        {
                            isopen &&( <div className='bg-white shadow z-50 text-black absolute w-[120px] right-0 border-2'>
                                <Link to='/signin'>  <Button style={{ color: 'black', fontWeight: 'bold', width: '100%' }}>Log in</Button></Link>
                                <Link to='/logout'>  <Button style={{ color: 'black', fontWeight: 'bold', width: '100%' }}>Log out</Button></Link>
                            </div>)
                        }

                    </div>
                </div>
            </div>
        </>
    )
}


export default User;