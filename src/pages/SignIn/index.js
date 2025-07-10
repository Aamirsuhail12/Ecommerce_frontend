
import { useContext, useEffect } from "react";
import { Mycontext } from "../../App";
import "./SignInPage.css";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { create } from "../../RestApi";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const SignIn = () => {

    const context = useContext(Mycontext);
    const navigate = useNavigate();

    const [isloading, setIsloading] = useState(false);
    const [payload, setPayload] = useState({
        email: '',
        password: ''
    })

    const handleChange = async (e) => {
        setPayload({ ...payload, [e?.target?.name]: e?.target?.value })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!payload?.email || !payload?.password) {
            context?.setalertBox({
                open: true,
                color: 'error',
                msg: 'Please fill all details!'
            });
            return;
        }

        try {
            setIsloading(true);
            const response = await create('http://localhost:5000/auth/signin', payload);
            context.setalertBox({
                open: true,
                color: 'success',
                msg: response?.data?.msg
            })
            setPayload({
                email: '',
                password: ''
            })
            setIsloading(false)
            navigate('/')

        } catch (error) {
            setIsloading(false)
            console.log('Error in Sign In', error);
            context.setalertBox({
                open: true,
                color: 'error',
                msg: error?.response?.data?.msg
            })
        }

    }

    useEffect(() => {
        context.setisheaderfooterShow(false);
    }, [])
    return (
        <div className="signin flex items-center justify-center">
            <div className="bg-white w-[90%] sm:w-4/5 lg:w-[35%]  p-5 rounded-[20px] flex flex-col gap-5">
                <div className="h-[70px] w-[200px] m-auto bg-red-200">
                    <img className="h-full w-full" src="https://cdn.prod.website-files.com/614716f50b4f49202fdd0087/6229b0f7cf6b6325a4f9ac6d_shopify-review-shopify-ecommerce-platform%20(1).jpg" />
                </div>
                <h1 className="font-semibold text-[25px]">Sign In</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <TextField onChange={handleChange} required type="email" name='email' value={payload?.email} label="Email" variant="standard" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField onChange={handleChange} required type="password" name="password" value={payload?.password} autoComplete="new-password" label="Password" variant="standard" style={{ width: '100%' }} />
                    </div>
                    <Box className="w-full md:w-1/2 justify-start">
                        <Button >Forgot Password?</Button>
                    </Box>

                    <div className="flex w-full gap-5 justify-between">
                        {
                            isloading === true ?
                                <Button type="submit" sx={{ width: '45%', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' }}>Sign In
                                    <Box sx={{ display: 'flex' }}>
                                        <CircularProgress size={30} style={{ color: 'white', marginLeft: '10px' }} />
                                    </Box></Button> :
                                <Button type="submit" sx={{ width: '45%', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' }}>Sign In</Button>
                        }
                        <Link to='/' style={{ width: '45%' }}><Button sx={{ width: '100%', border: '1px solid #007bff' }}
                        >Cancel</Button></Link>
                    </div>
                    <div className="font-bold">
                        Not Registered? <Link to='/signup'><Button style={{ fontWeight: 'bold' }}>Sign Up</Button></Link>
                    </div>
                    <p className="font-semibold m-auto">Or continue with social account</p>
                    <Button sx={{ border: '1px solid', fontWeight: 'bold' }}><FcGoogle className="mr-[5px] text-[30px]" /> Sign in with Google</Button>
                </form>


            </div>
        </div>
    )
}

export default SignIn;