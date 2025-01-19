
import { useContext, useEffect } from "react";
import { Mycontext } from "../../App";
import "./SignInPage.css";
import TextField from '@mui/material/TextField';
import { Button} from "@mui/material";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const SignIn = () => {

    const context = useContext(Mycontext);

    useEffect(() => {
        context.setisheaderfooterShow(false);
    }, [])
    return (
        <div className="sign flex items-center justify-center">
            <div className="bg-white w-[35%] p-10 rounded-[20px] flex flex-col gap-5">
                <div className="h-[70px] w-[200px] m-auto bg-red-200">
                    <img className="h-full w-full" src="https://cdn.prod.website-files.com/614716f50b4f49202fdd0087/6229b0f7cf6b6325a4f9ac6d_shopify-review-shopify-ecommerce-platform%20(1).jpg" />
                </div>
                <h1 className="font-semibold text-[25px]">Sign In</h1>

                <form className="flex flex-col gap-5">
                    <div>
                        <TextField required id="standard-basic" type="email" label="Email" variant="standard" style={{ width: '100%' }} />
                    </div>
                    <div>
                        <TextField required id="standard-basic" type="password" label="Password" variant="standard" style={{ width: '100%' }} />
                    </div>
                    <Button style={{ justifyContent: 'start', width : '50%'}}>Forgot Password?</Button>
                    <div className="flex w-full gap-5 justify-between">
                        <Button style={{width : '45%',backgroundColor : '#007bff',color : 'white',fontWeight : 'bold'}}>Sign In</Button>
                      <Link to='/' style={{width : '45%'}}><Button style={{width : '100%' ,border : '1px solid #007bff'}}>Cancel</Button></Link>
                    </div>
                    <div className="font-bold">
                        Not Registered? <Link to='/signup'><Button style={{fontWeight : 'bold'}}>Sign Up</Button></Link>
                    </div>
                    <p className="font-semibold m-auto">Or continue with social account</p>
                    <Button style={{border : '1px solid',fontWeight : 'bold'}}><FcGoogle style={{marginRight : '5px',fontSize : '30px'}}/> Sign in with Google</Button>
                </form>


            </div>
        </div>
    )
}

export default SignIn;