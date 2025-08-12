
import { useEffect } from "react";
import TextField from '@mui/material/TextField';
import { Button, getPaperUtilityClass } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { useDispatch } from "react-redux";
import { setHeaderFooterVisibility } from "../../features/ui/uiSlice";
import { showAlert } from "../../features/alert/alertSlice";

import axios from "axios";
const ResetPassword = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email;
    const dispatch = useDispatch();
    const [payload, setPayload] = useState({
        newpassword: '',
        confirmpassword: ''
    })
    const [isloading, setIsLoading] = useState(false);

    const handleChange = async (e) => {
        setPayload({ ...payload, [e?.target?.name]: e?.target?.value })
    }

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!payload?.newpassword) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Please Enter your new password!'
            }))
            return;
        }

        if (!payload?.confirmpassword) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Please Enter your confirm password!'
            }))
            return;
        }

        if (payload?.newpassword !== payload?.confirmpassword) {
            dispatch(showAlert({
                color: 'error',
                msg: 'New password and confirm password are not matched'
            }))
            return;
        }

        try {
            setIsLoading(true)
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/reset-password`, { email, password: payload.newpassword });
            setIsLoading(false)
            dispatch(showAlert({
                color: 'success',
                msg: 'password reset successfully!'
            }))

            setPayload({
                newpassword: '',
                confirmpassword: ''
            })

            navigate('/signin')
        } catch (error) {

            setIsLoading(false)
            console.log('Error in resetting password', error);
            dispatch(showAlert({
                color: 'error',
                msg: error?.response?.data?.msg
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
                <h1 className="font-semibold text-[25px]">Reset Password</h1>

                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div>
                        <TextField onChange={handleChange} required type="password" name='newpassword' value={payload?.newpassword} label="New Password" variant="standard" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField onChange={handleChange} required type="password" name="confirmpassword" value={payload?.confirmpassword} autoComplete="new-password" label="Confirm Password" variant="standard" style={{ width: '100%' }} />
                    </div>
                    <Box className="w-full md:w-1/2 justify-start">
                        <Button type="submit" sx={{ color: 'white', backgroundColor: '#007bff', fontWeight: 'bold' }}>
                            {
                                isloading === true ? (<> Reset Password <CircularProgress size={20} style={{ color: 'white', marginLeft: '5px' }} /></>) : ' Reset Password'
                            }

                        </Button>
                    </Box>

                </form>
            </div>
        </div>
    )
}

export default ResetPassword;