import { Dialog } from '@mui/material';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Mycontext } from '../../App';


const CountryDropDown = () => {

    const [isopen, setIsOpen] = useState(false);
    const [countryIndex, setcountryIndex] = useState(null);
    const [country, setcountry] = useState(null);
    const context = useContext(Mycontext);
    const [countrylist, setcountrylist] = useState([]);
    const [originalCountrylist, setoriginalCountrylist] = useState([]);

    useEffect(() => {

        setcountrylist(context.countryList);
        setoriginalCountrylist(context.countryList)
    }, [context.countryList])

    function CountryHandle(index, country_) {
        setcountryIndex(index);
        setcountry(country_);
        setIsOpen(false);
        setcountrylist(originalCountrylist);
    }

    function handleChange(e) {

        const keyword = e.target.value.toLowerCase();
        if (!keyword) {
            setcountrylist(originalCountrylist);
            return;
        }

        const list = originalCountrylist.filter((item) => {

            return item.country.toLowerCase().includes(keyword);
        })
        setcountrylist(list);
    }

    return (
        <div className='w-full h-full'>
            <Button
                sx={{
                    border: '1px solid gray',
                    width: '100%',
                    justifyContent: 'flex-start',
                    borderRadius: '10px',
                    height: '56px'
                }}
                onClick={() => { setIsOpen(true) }}
            >
                <div className="flex flex-col justify-center items-start">
                    <span className="text-gray-400">Your Location</span>
                    <span className="font-bold text-gray-800">{country === null ? 'Select Location' : country?.length <= 10 ? country : country?.substr(0, 10) + '...'}</span>
                </div>
            </Button >

            <Dialog open={isopen}
                sx={{
                    '& .MuiDialog-paper': {
                        padding: '20px',
                        borderRadius: '10px',
                        position: 'relative'
                    }
                }}
                onClose={() => { setIsOpen(false) }}>
                <Button
                    sx={{
                        minHeight: '40px',
                        minWidth: '40px',
                        height: '40px',
                        width: '40px',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        color: 'black',
                        fontSize: '30px',
                        borderRadius: '50%',
                        ":hover": {
                            backgroundColor: '#cbd5e1'
                        }
                    }}

                    onClick={() => { setIsOpen(false) }}
                ><IoClose />
                </Button>
                <h1 className='font-bold'>Choose your Delivery Location</h1>
                <p className='text-sm'>Enter your address and we will specify the offer for your area.</p>

                <div className='flex justify-between  items-center w-full h-12 border-2  px-2 my-4 rounded-[10px] bg-gray-100  '>
                    <input type='text'
                        className='w-4/5 h-4/5 outline-none border-none  bg-transparent text-black '
                        placeholder='Search for location...'
                        onChange={handleChange}
                    />
                    <Button
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            minHeight: '45px',
                            minWidth: '45px',
                            height: '45px',
                            width: '45px',
                            borderRadius: '50%',
                            backgroundColor: 'transparent',
                        }}
                    >
                        <IoSearchOutline className='font-bold text-xl text-gray-800' />
                    </Button>
                </div>

                <div className='flex flex-col items-start max-h-[300px] overflow-y-auto'>
                    <ul >
                        {
                            countrylist && countrylist?.map((item, index) => {

                                return <li key={index}><Button sx={{
                                    color: 'black',
                                    width: '100%',
                                    justifyContent: 'flex-start',
                                    ':hover': {
                                        backgroundColor: '#cbd5e1'
                                    }
                                }}
                                    onClick={() => {
                                        setIsOpen(false)
                                        CountryHandle(index, item?.country);
                                    }}
                                    className={`${countryIndex === index ? 'active' : ''}`}
                                >{item?.country}</Button></li>
                            })
                        }
                    </ul>
                </div>
            </Dialog>
        </div>
    )
}

export default CountryDropDown;