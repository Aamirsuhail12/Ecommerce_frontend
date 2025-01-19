
import { useContext, useEffect } from "react";
import { Mycontext } from "../../App";
import "./SignUpPage.css";
import TextField from '@mui/material/TextField';
import { Button } from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignUp = () => {

    const context = useContext(Mycontext);

    useEffect(() => {
        context.setisheaderfooterShow(false);
    }, [])
    return (
        <div className="sign flex items-center justify-center">
            <div className="bg-white w-[35%] p-10 rounded-[20px] flex flex-col gap-5">

                <h1 className="font-bold text-[25px]">Sign Up</h1>

                <form className="flex flex-col gap-5">
                    <div className="flex gap-4">
                        <div>
                            <TextField required id="standard-basic" type="text" label="Full Name" variant="standard" style={{ width: '100%' }} />
                        </div>
                        <div>
                            <TextField required id="standard-basic" type="tel" label="Contact No" variant="standard" style={{ width: '100%' }} />
                        </div>
                    </div>
                    <div>
                        <TextField required id="standard-basic" type="email" label="Email" variant="standard" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField required id="standard-basic" type="password" label="Password" variant="standard" style={{ width: '100%' }} />
                    </div>
                    <Button style={{ justifyContent: 'start', width: '50%' }}>Forgot Password?</Button>
                    <div className="flex w-full gap-5 justify-between">
                        <Button style={{width : '100%', backgroundColor: '#007bff', color: 'white', fontWeight: 'bold' }}>Create Account</Button>
                    </div>
                    <div className="font-bold">
                        Already Registered? <Link to='/signin'><Button style={{ fontWeight: 'bold' }}>Login</Button></Link>
                    </div>
                    <p className="font-semibold m-auto">Or continue with social account</p>
                    <Button style={{ border: '1px solid', fontWeight: 'bold',textTransform: 'none !important'  }}><FcGoogle style={{ marginRight: '5px', fontSize: '30px' }} /> Sign Up with Google</Button>
                </form>


            </div>
        </div>
    )
}

export default SignUp;