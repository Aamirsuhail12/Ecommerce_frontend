
import Button from '@mui/material/Button';
import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { create, get } from '../../RestApi';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaUserPlus } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { Mycontext } from '../../App';


const User = () => {

    const context = useContext(Mycontext);
    const navigate = useNavigate()
    //menu start
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event?.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    //menu end

    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState(null);

    const Logout = async () => {
        try {

            const response = await create('http://localhost:5000/auth/logout', {});

            if (response?.data?.success) {
                setUser(null);
                setIsLogin(false);
                context.setTotalCart(0)
                context.setalertBox({
                    open: true,
                    color: 'success',
                    msg: response?.data?.msg
                })
                navigate('/')
            }
        } catch (error) {
            console.log('Error in logout', error);
            context.setalertBox({
                open: true,
                color: 'error',
                msg: error?.response?.data?.msg
            })
        }
    }

    const getProfile = async () => {
        try {

            const response = await get('http://localhost:5000/users/profile');


            if (response?.data?.isLogin) {
                setIsLogin(true);
                setUser(response?.data?.user);
                context.setTotalCart(response?.data?.user?.cart?.length)
            }
        } catch (error) {
            console.log('Error in getting profile of user', error)
        }
    }
    useEffect(() => {
        getProfile();
    }, [])
    return (
        <>
            <div className='flex  justify-end items-center gap-2 w-full h-full '>

                {
                    isLogin === true ?

                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                style={{ color: 'black' }}
                            >
                                <div className='flex justify-center items-center h-10 w-10 rounded-full border-2 border-blue-700  capitalize '>{user?.name?.substr(0, 2)}</div>
                                <div className='flex flex-col items-start ml-2 leading-tight'>
                                    <span className='font-bold normal-case hidden sm:block'>{user?.name}</span>
                                    {/* <span className='normal-case'>{user?.email}</span> */}
                                </div>
                            </Button>
                            <Menu
                                id="basic-menu"
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                slotProps={{
                                    list: {
                                        'aria-labelledby': 'basic-button',
                                    },
                                }}
                            >
                                <MenuItem sx={{gap : 1.5}} onClick={handleClose}><FaUserPlus className='text-base opacity-70' />My Account</MenuItem>
                                <MenuItem sx={{gap : 1.5}} onClick={handleClose}><RiLockPasswordFill className='text-base opacity-70' /> Reset Password</MenuItem>
                                <MenuItem sx={{gap : 1.5}} onClick={() => {

                                    handleClose()
                                    Logout();
                                }
                                }><FiLogOut className='text-base opacity-70' />Logout</MenuItem>
                            </Menu>
                        </div>
                        :
                        <Link to='/signin'>
                            <Button
                                sx={{
                                    paddingX: '20px',
                                    borderRadius: '30px',
                                    fontWeight: 'bold',
                                    backgroundColor: '#00BFFF',
                                    color: 'white'
                                }}
                            >Sign In</Button>
                        </Link>
                }
                <Link to='/cart'><div className='relative'>
                    <Button
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            border: '1px solid #fecaca',
                            minHeight: '40px',
                            minWidth: '40px',
                            height: '40px',
                            width: '40px',
                            borderRadius: '50%',
                            backgroundColor: '#fee2e2'

                        }}
                    >
                        <IoCartOutline className='font-bold text-[28px] sm:text-[35px] text-gray-700' />
                    </Button>
                    <span className='flex justify-center items-center h-5 w-5 absolute -top-1 -right-1 rounded-full text-white bg-red-600'>{context?.totalCart}</span>
                </div>
                </Link>
            </div>
        </>
    )
}


export default User;