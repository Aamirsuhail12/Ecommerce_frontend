
import { useContext, useEffect, useState } from "react";
import { Mycontext } from "../../App";
import "./SignUpPage.css";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { create } from "../../RestApi";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { setHeaderFooterVisibility } from "../../features/ui/uiSlice";
import { useDispatch, useSelector } from "react-redux";
import { showAlert, closeAlert } from "../../features/alert/alertSlice";
import { signUp } from "../../features/user/userAPI";
const SignUp = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);

    const [payload, setPayload] = useState({
        name: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        isAdmin: false
    })

    const handleChange = async (e) => {
        setPayload({
            ...payload,
            [e?.target.name]: e?.target?.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!payload?.name || !payload?.phone || !payload?.email || !payload?.password || !payload?.confirmPassword) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Please fill all the details'
            }))

            return;
        }

        if(payload.phone.length > 10){
            dispatch(showAlert({
                color : 'error',
                msg : 'Phone no should be 10 digits without symbols'
            }))
            return;
        }

        if (payload?.password !== payload?.confirmPassword) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Confirm Password does not matched!'
            }))

            return;
        }

        try {
        
            await dispatch(signUp(payload)).unwrap();
            dispatch(showAlert({
                color: 'success',
                msg: 'Register Successful!'
            }))

            setPayload({
                name: '',
                phone: '',
                email: '',
                password: '',
                confirmPassword: '',
                isAdmin: false
            })
            navigate('/');

        } catch (error) {
            console.log('Error in Sign Up', error);
            dispatch(showAlert({
                color: 'error',
                msg: error || "Error in Creating account"
            }))

        }

    }

    useEffect(() => {
        dispatch(setHeaderFooterVisibility(false));
    }, [])
    return (
        <div className="signup flex items-center justify-center">
            <div className="bg-white w-[90%] sm:w-4/5 lg:w-[35%]  p-5 rounded-[20px] flex flex-col gap-5">

                <h1 className="font-bold text-[25px]">Sign Up</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="flex gap-4">
                        <div className="w-[48%]">
                            <TextField onChange={handleChange} required type="text" name="name" value={payload?.name} label="Full Name" variant="standard" style={{ width: '100%' }} />
                        </div>
                        <div className="w-[48%]">
                            <TextField onChange={handleChange} required type="tel" name="phone" value={payload?.phone} label="Contact No" variant="standard" style={{ width: '100%' }} />
                        </div>
                    </div>
                    <div>
                        <TextField onChange={handleChange} required type="email" name="email" value={payload?.email} label="Email" variant="standard" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField onChange={handleChange} required type="password" name="password" value={payload?.password} autoComplete="new-password" label="Password" variant="standard" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField onChange={handleChange} required type="password" name="confirmPassword" value={payload?.confirmPassword} autoComplete="new-password" label="Confirm Password" variant="standard" style={{ width: '100%' }} />
                    </div>
                    <Box className="justify-start w-full lg:w-1/2">
                        <Button >Forgot Password?</Button>
                    </Box>
                    <div className="flex w-full gap-5 justify-between">
                        {
                            user.status === 'loading' ?
                                <Button type="submit" sx={{
                                    width: '100%',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}
                                >Create Account
                                    <Box sx={{ display: 'flex' }}>
                                        <CircularProgress size={30} style={{ color: 'white', marginLeft: '10px' }} />
                                    </Box>
                                </Button> :
                                <Button type="submit" sx={{
                                    width: '100%',
                                    backgroundColor: '#007bff',
                                    color: 'white',
                                    fontWeight: 'bold',
                                }}
                                >Create Account</Button>
                        }
                    </div>
                    <div className="font-bold">
                        Already Registered? <Link to='/signin'><Button style={{ fontWeight: 'bold' }}>Login</Button></Link>
                    </div>
                    <p className="font-semibold m-auto">Or continue with social account</p>
                    <Button sx={{
                        border: '1px solid',
                        fontWeight: 'bold',
                        textTransform: 'none',
                        '&': {
                            textTransform: 'none !important', // to preserve the !important
                        }
                    }}
                    ><FcGoogle className="mr-[5px] text-[30px]" /> Sign Up with Google</Button>
                </form>


            </div>
        </div>
    )
}

export default SignUp;