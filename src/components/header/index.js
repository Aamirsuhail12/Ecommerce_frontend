
import eCommerceImage from '../../assets/ecommerce.webp';
import CountryDropDown from '../CountryDropDown';
import User from '../User'
import Search from '../Search';
import NavBar from '../NavBar';
import { FaBars } from "react-icons/fa6";
import { Button, Box } from '@mui/material';
import SideBarForMobile from '../SideBarForMobile';
import { useState } from 'react';
const Header = () => {

    const [open, setOpen] = useState(false);
    const toggleDrawer = (newOpen) => () => {
        console.log('toggle');
        setOpen(newOpen);
    };

    console.log('Header');
    return (
        <div>
            <div className="flex flex-col items-center justify-start w-full min-h-24 md:min-h-32 lg:min-h-40 ">
                <div className="flex justify-center items-center text-center p-5  w-full text-white bg-blue-700">
                    <p>Due to the <b>COVID 19</b> epidemic, orders may be processed with a slight delay.</p>
                </div>

                <div className=" flex justify-between items-center gap-3 h-[56px] px-2 py-8 sm:px-8 md:py-12 md:px-12 w-full">
                    <div className="flex flex-col justify-center items-center h-[56px] w-1/5 bg-white">
                        <img src={eCommerceImage} alt="eCommerceImage" className='hidden md:block h-full w-full' />
                        <Box className='block sm:hidden'>
                            <Button
                                onClick={() => {
                                    setOpen(true);
                                }}
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    minHeight: '48px',
                                    minWidth: '48px',
                                    height: '48px',
                                    width: '48px',
                                    borderRadius: '50%',

                                }}
                            ><FaBars className='text-black text-[30px]' /></Button></Box>
                    </div>

                    <div className='h-[56px]  lg:w-1/4 xl:w-1/5  lg:max-w-1/4 xl:max-w-1/5 hidden lg:block'>
                        <CountryDropDown></CountryDropDown>
                    </div>

                    <div className=' h-[56px] w-[30%] md:w-2/5 hidden md:block'>

                        <Search></Search>
                    </div>

                    <div className=' h-[56px] w-1/2 md:w-[30%] lg:w-1/5'>
                        <User></User>
                    </div>
                </div>

            </div>
            <div className="space max-w-full ">
                <NavBar></NavBar>
            </div>
            <SideBarForMobile open={open} toggleDrawer={toggleDrawer} />
        </div>
    )
}

export default Header;