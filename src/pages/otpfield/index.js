import { useState, useEffect } from 'react';
import PinField from 'react-pin-field';
import { useDispatch } from 'react-redux';
import { setHeaderFooterVisibility } from '../../features/ui/uiSlice';
import { Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';
import { showAlert } from '../../features/alert/alertSlice';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';

const OtpField = () => {

    const location = useLocation();
    const email = location.state?.email;
    const dispatch = useDispatch();
    const [pin, setPin] = useState('');
    const navigate = useNavigate();
    const [isloading1, setIsLoading1] = useState(false);
    const [isloading2, setIsLoading2] = useState(false);

    const handleChange = (value) => {
        setPin(value);
    };

    const handleComplete = (val) => {
        setPin(val);
    };

    const verifyOTP = async () => {

        try {
            setIsLoading1(true)
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/verify-otp`, { email, otp: pin });
            dispatch(showAlert({
                color: 'success',
                msg: 'OTP verified successfully!'
            }))
            setPin('');
            setIsLoading1(false)
            navigate('/reset-password', { state: { email} });

        } catch (error) {
            setIsLoading1(false)
            dispatch(showAlert({
                color: 'error',
                msg: error?.response?.data?.msg || 'OTP not verified'
            }))
        }
    }


    const resendOTP = async () => {

        if (!email) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Please Enter your email!'
            }))
            return;
        }

        try {
            setIsLoading2(true)
            const response = await axios.patch(`${process.env.REACT_APP_SERVER_URL}/users/send-otp`, { email });

            setIsLoading2(false)
            dispatch(showAlert({
                color: 'success',
                msg: 'OTP resend successfully!'
            }))

        } catch (error) {
            setIsLoading2(false)
            console.log('Error in  re sending otp', error);
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
            <div className="bg-white w-[90%] sm:w-4/5 lg:w-[35%]  p-5 rounded-[20px] flex flex-col justify-center items-center gap-3">

                <h1 className="font-semibold text-[25px]">OTP verification</h1>
                <p>Enter OTP send to your email</p>
                <p className='font-bold'>{email}</p>
                <div>
                    <PinField
                        length={6}
                        onChange={handleChange}
                        onComplete={handleComplete}
                        autoFocus
                        inputMode="numeric"
                        style={{
                            width: 40,
                            height: 40,
                            margin: 5,
                            fontSize: 24,
                            borderRadius: 6,
                            border: '1px solid #ccc',
                            textAlign: 'center',
                        }}
                    />
                </div>
                <div className='w-full flex gap-3'>
                    <Button onClick={verifyOTP} sx={{ width: '48%', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' }}>
                        {
                            isloading1 === true ? (<>Verify OTP<CircularProgress size={25} style={{ color: 'white', marginLeft: '5px' }} /></>) : 'Verify OTP'
                        }

                    </Button>
                    <Button onClick={resendOTP} sx={{ width: '48%', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' }}>
                        {
                            isloading2 === true ? (<>Resend OTP<CircularProgress size={25} style={{ color: 'white', marginLeft: '5px' }} /></>) : 'Resend OTP'
                        }

                    </Button>
                </div>
            </div>
        </div>
    )

};

export default OtpField;
