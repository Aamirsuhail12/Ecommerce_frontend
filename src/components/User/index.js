
import Button from '@mui/material/Button';
import * as React from 'react';
import { useEffect } from 'react';
import { IoCartOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { FaUserPlus } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { FiLogOut } from "react-icons/fi";
import { showAlert } from '../../features/alert/alertSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, logout } from '../../features/user/userAPI';
import { FaHeart } from "react-icons/fa";

const User = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const user = useSelector((state) => state.user);

    console.log('user',user);

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

    const Logout = async () => {
        try {
            await dispatch(logout()).unwrap();
            dispatch(showAlert({
                color: 'success',
                msg: 'Logout successfull...'
            }))

            navigate('/');
        } catch (error) {
            dispatch(showAlert({
                color: 'error',
                msg: error?.message || "Error in logout"
            }))
        }
    }

    useEffect(() => {
        dispatch(fetchUser());
    }, [])
    return (
        <>
            <div className='flex  justify-end items-center gap-2 w-full h-full '>

                {
                    user.isLogin === true ?

                        <div>
                            <Button
                                id="basic-button"
                                aria-controls={open ? 'basic-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                onClick={handleClick}
                                style={{ color: 'black' }}
                            >
                                <div className='flex justify-center items-center h-10 w-10 rounded-full border-2 border-blue-700   capitalize '>{user?.item?.image ? <img className='h-10 w-10 rounded-full border-[1px] border-blue-700' src={user?.item?.image} alt='Image Not Found' /> : user?.item?.name?.substr(0, 2)}</div>
                                <div className='flex flex-col items-start ml-2 leading-tight'>
                                    <span className='font-bold normal-case hidden sm:block'>{user?.item?.name?.length > 15 ? user?.item?.name?.substr(0,15) + '...': user?.item?.name}</span>
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
                                <Link to='/my-account'><MenuItem sx={{ gap: 1.5 }} onClick={handleClose}><FaUserPlus className='text-base opacity-70' />My Account</MenuItem></Link>
                                <Link to='/wishlist'> <MenuItem sx={{ gap: 1.5 }} onClick={handleClose}><FaHeart className='text-base opacity-70' />My WishList</MenuItem></Link>
                                <Link to='/orders'><MenuItem sx={{ gap: 1.5 }} onClick={handleClose}><RiLockPasswordFill className='text-base opacity-70' />My Orders</MenuItem></Link>
                                <MenuItem sx={{ gap: 1.5 }} onClick={() => {

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
                    <span className='flex justify-center items-center h-5 w-5 absolute -top-1 -right-1 rounded-full text-white bg-red-600'>{user?.isLogin === true ? user?.item?.cart?.length : '0'}</span>
                </div>
                </Link>
            </div>
        </>
    )
}


export default User;