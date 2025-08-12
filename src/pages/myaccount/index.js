



import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux'
import { changePassword, editProfile, fetchUser } from '../../features/user/userAPI';
import { FaUserCircle } from "react-icons/fa";
import axios from 'axios';
import { showAlert } from '../../features/alert/alertSlice';
import { useState, useEffect } from 'react';
import CircularProgress from '@mui/material/CircularProgress';


//Tabs start

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}
//Tabs end

const MyAccount = () => {


    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const status = useSelector((state) => state?.user?.status);
    const [data, setData] = useState({
        name: '',
        phone: '',
        image: '',
        email: '',
    });
    const [passwordData, setPasswordData] = useState({
        password: '',
        newpassword: '',
        confirmpassword: ''
    })
    const [isloading, setIsloading] = useState(false);

    const [value, setValue] = useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const UploadImage = async (e) => {

        const payload = new FormData();
        payload.append('images', e?.target?.files?.[0]);
        try {
            dispatch(showAlert({
                color: 'success',
                msg: 'image uploading...'
            }))
            setIsloading(true);
            const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/uploads`, payload)
            setData({ ...data, image: response?.data?.urls?.[0] });
            setIsloading(false);
            dispatch(showAlert({
                color: 'success',
                msg: 'image upload successfully!'
            }))
        } catch (error) {
            setIsloading(false)
            console.log('Error in uploading image')
            dispatch(showAlert({
                color: 'error',
                msg: 'Error in image uploading..'
            }))
        }
    }

    const handleInputChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    };

    const handlePasswordChange = (e) => {
        setPasswordData({
            ...passwordData,
            [e.target.name]: e.target.value
        })
    }

    const handlePasswordSubmit = async (e) => {
        e.preventDefault();

        if (passwordData?.password === '') {
            dispatch(showAlert({
                color: 'error',
                msg: 'Password is required'
            }))
            return;
        }

        if (passwordData?.newpassword === '') {
            dispatch(showAlert({
                color: 'error',
                msg: 'New password is required'
            }))
            return;
        }

        if (passwordData?.confirmpassword === '') {
            dispatch(showAlert({
                color: 'error',
                msg: 'Confirm password is required'
            }))
            return;
        }

        if (passwordData?.newpassword !== passwordData?.confirmpassword) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Password and Confirm Password are not matched'
            }))
            return;
        }

        try {

            await dispatch(changePassword(passwordData)).unwrap();
            dispatch(showAlert({
                color: 'success',
                msg: 'Password changed successfully!'
            }))

            setPasswordData({
                password: '',
                newpassword: '',
                confirmpassword: ''
            })
        } catch (error) {
            dispatch(showAlert({
                color: 'error',
                msg: error
            }))
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data?.name === '') {
            dispatch(showAlert({
                color: 'error',
                msg: 'Name is required'
            }))
            return;
        }

        if (data?.phone === '') {
            dispatch(showAlert({
                color: 'error',
                msg: 'Phone no is required'
            }))
            return;
        }

        try {
            await dispatch(editProfile(data)).unwrap();
            dispatch(showAlert({
                color: 'success',
                msg: "Update user profile successfully!"
            }))
        } catch (error) {
            dispatch(showAlert({
                color: 'error',
                msg: error === 'No token. unauthorized' ? 'Please Login' : error
            }))
        }
    }


    const custumSetData = () => {
        setData({
            ...data,
            name: user?.item?.name || '',
            phone: user?.item?.phone || '',
            image: user?.item?.image || '',
            email: user?.item?.email || '',
        })
    }
    useEffect(() => {
        dispatch(fetchUser())
    }, [])

    useEffect(() => {
        custumSetData()
    }, [user?.item])

    return (
        <div className="space shadow p-2 md:p-5">
            <h1 className='font-bold text-[20px] md:text-[30px]'>My Account</h1>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Edit Profile" {...a11yProps(0)} style={{ fontWeight: 'bold', textTransform: 'none' }} />
                        <Tab label="Change Password" {...a11yProps(1)} style={{ fontWeight: 'bold', textTransform: 'none' }} />
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0} >
                    <div className='flex items-center flex-col md:flex-row  gap-5'>
                        <div className='w-full md:w-4/12'>
                            <div className='flex justify-center items-center flex-col  flex-wrap'>
                                {
                                    data?.image ?
                                        <img className='rounded-full h-[120px] w-[120px] border-[2px] border-solid border-blue-400' src={data?.image} alt='Image Not Found' />
                                        :
                                        <FaUserCircle className='text-[100px]' />
                                }
                                <div className='w-52 h-8 md:h-12 relative flex justify-center items-center border-2 border-blue-500'>
                                    <div className='w-52 h-8  md:h-12 absolute'>
                                        <TextField onChange={UploadImage} type='file' className='w-full h-8 md:h-12  z-50 opacity-0' id="outlined-basic" variant="outlined" />
                                    </div>
                                    <div className='w-52 h-8 md:h-12 absolute flex justify-center items-center'>
                                        <div className='w-full h-8 md:h-12 flex justify-center items-center'>
                                            {
                                                isloading === true ? (<>
                                                    Image Upload
                                                    <CircularProgress size={20} style={{ color: 'black', marginLeft: '5px' }} />
                                                </>) :
                                                    'Image Upload'
                                            }

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='w-full  md:w-8/12'>
                            <form onSubmit={handleSubmit} className='flex flex-col md:flex-row flex-wrap gap-5'>
                                <div>
                                    <TextField onChange={handleInputChange} value={data?.name} className='w-full' id="outlined-basic" name='name' label="Full Name" variant="outlined" />

                                </div>
                                <div>
                                    <TextField name='email' value={data?.email} className='w-full' id="outlined-basic" label="Email" variant="outlined" disabled />
                                </div>
                                <div>

                                    <TextField onChange={handleInputChange} name='phone' value={data?.phone} className='w-full' label="Phone no" variant="outlined" />
                                </div>

                                <Button onSubmit={handleSubmit} type='submit' sx={{ color: 'white', textTransform: 'none', fontWeight: 'bold', backgroundColor: '#3B82F6', paddingLeft: '10px', paddingRight: '10px', borderRadius: '20px' }}>
                                    {
                                        status === 'loading' ? (<>
                                            Save<CircularProgress size={20} style={{ marginLeft: '5px', color: 'white' }} />
                                        </>) :
                                            'Save'
                                    }
                                </Button>
                            </form>
                        </div>
                    </div>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    <div className='w-full '>
                        <form onSubmit={handlePasswordSubmit} className='flex  justify-center md:items-center flex-col md:flex-row flex-wrap gap-5'>
                            <div>
                                <TextField onChange={handlePasswordChange} value={passwordData?.password} className='w-full' id="outlined-basic" name='password' label="Password" variant="outlined" />

                            </div>
                            <div>
                                <TextField onChange={handlePasswordChange} value={passwordData?.newpassword} name='newpassword' className='w-full' id="outlined-basic" label="New Password" variant="outlined" />
                            </div>
                            <div>

                                <TextField onChange={handlePasswordChange} value={passwordData?.confirmpassword} name='confirmpassword' className='w-full' label="Confirm Password" variant="outlined" />
                            </div>

                            <Button onSubmit={handlePasswordSubmit} type='submit' sx={{ color: 'white', textTransform: 'none', fontWeight: 'bold', backgroundColor: '#3B82F6', paddingLeft: '10px', paddingRight: '10px', borderRadius: '20px' }}>
                                {
                                    status === 'loading' ? (<>
                                        Submit<CircularProgress size={20} style={{ marginLeft: '5px', color: 'white' }} />
                                    </>) :
                                        'Submit'
                                }
                            </Button>

                        </form>
                    </div>
                </CustomTabPanel>

            </Box>
        </div>
    )
}

export default MyAccount;
