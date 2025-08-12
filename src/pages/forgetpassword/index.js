
import { useEffect } from "react";
import "./ForgetPassword.css";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { useState } from "react";
import Box from '@mui/material/Box';
import { setHeaderFooterVisibility } from "../../features/ui/uiSlice";
import { showAlert } from "../../features/alert/alertSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router";
import CircularProgress from '@mui/material/CircularProgress';

const ForgetPassword = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        email: '',
    })

    const [isloading, setIsLoading] = useState(false);

    const handleChange = async (e) => {
        setPayload({ ...payload, [e?.target?.name]: e?.target?.value })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!payload?.email) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Please Enter your email!'
            }))
            return;
        }

        try {

            setIsLoading(true);
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/send-otp`, payload);

            dispatch(showAlert({
                color: 'success',
                msg: 'OTP send successfully!'
            }))
            setIsLoading(false);
            navigate('/otp-field', { state: { email: payload.email } });

        } catch (error) {
            setIsLoading(false);
            console.log('Error in  sending otp', error);
            dispatch(showAlert({
                color: 'error',
                msg: error
            }))

        }

    }

    useEffect(() => {
        dispatch(setHeaderFooterVisibility(false));
    }, [])
    return (
        <div className="signin flex items-center justify-center">
            <div className="bg-white w-[90%] sm:w-4/5 lg:w-[35%]  p-5 rounded-[20px] flex flex-col gap-5">
                <div className="h-[70px] w-[200px] m-auto bg-red-200">
                    <img className="h-full w-full" src="https://cdn.prod.website-files.com/614716f50b4f49202fdd0087/6229b0f7cf6b6325a4f9ac6d_shopify-review-shopify-ecommerce-platform%20(1).jpg" />
                </div>
                <h1 className="font-semibold text-[25px]">Forget Password</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <TextField onChange={handleChange} required type="email" name='email' value={payload?.email} label="Email" variant="standard" style={{ width: '100%' }} />
                    </div>

                    <Box className="w-full md:w-1/2 justify-start">
                        <Button type="submit" sx={{ color: 'white', backgroundColor: '#007bff', fontWeight: 'bold' }}>

                            {
                                isloading === true ? (<>
                                    SEND OTP       <CircularProgress size={25} style={{ color: 'white', marginLeft: '5px' }} />
                                </>) :
                                    'SEND OTP'
                            }
                        </Button>
                    </Box>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassword;