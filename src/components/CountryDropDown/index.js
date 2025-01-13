import { containerClasses, Dialog } from '@mui/material';
import Button from '@mui/material/Button';
import { useContext, useEffect, useState } from 'react';
import { FaAngleDown } from "react-icons/fa6";
import { IoSearchOutline } from "react-icons/io5";
import { IoClose } from "react-icons/io5";
import { Mycontext } from '../../App';


const CountryDropDown = () => {

    const [isopen,setIsOpen] = useState(false);
    const [countryIndex,setcountryIndex] = useState(null);
    const [country,setcountry] = useState(null);
    const context = useContext(Mycontext);
    // console.log("drop ",context.countryList)
    const [countrylist,setcountrylist] = useState([]);
    const [originalCountrylist,setoriginalCountrylist] = useState([]);
    
    useEffect(()=>{

        setcountrylist(context.countryList);
        setoriginalCountrylist(context.countryList)
    },[context.countryList])
    function CountryHandle(index,country_)
    {
        setcountryIndex(index);
        setcountry(country_);
        setIsOpen(false);
        setcountrylist(originalCountrylist);
    }

   function handleChange(e){

     const keyword = e.target.value.toLowerCase();
     if(!keyword)
    {
        setcountrylist(originalCountrylist);
        return;
    }

     const list = originalCountrylist.filter((item)=>{
        
        return item.country.toLowerCase().includes(keyword);
     })
     setcountrylist(list);
   }
    
    return (
        <>
        <Button className="countrydrop"
                style={{
                    border: '2px solid gray',
                    borderRadius: '6px',
                    width: '250px',
                    height: '64px',
                    paddingTop: '16px',
                    paddingBottom: '16px',
                    paddingLeft: '16px',
                    paddingRight: '16px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
                onClick={()=>{setIsOpen(true)}}
                >
            <div className="flex flex-col items-start">
                <span className="text-gray-400">Your Location</span>
                <span className="font-bold">{country === null ? 'Select Location'  : country.length  <= 10 ? country : country.substr(0,10) + '...' }</span>
            </div>
            <span><FaAngleDown /></span>
        </Button >

        <Dialog open={isopen} className='locationModel'  onClose={()=>{setIsOpen(false)}}>
            <Button style={
            {
                height:'40px',
                width : '40px',
                position : 'absolute',
                top:'10px',
                right:'0',
                color:'black',
                fontSize:'30px',
                borderRadius : '50%',
            }
            }
            onClick={()=>{setIsOpen(false)}}
            ><IoClose /></Button>
            <h1>Choose your Delivery Location</h1>
            <p className='my-3'>Enter your address and we will specify the offer for your area.</p>
            
            <div className='search w-100 bg-gray-100 h-12 border-2 flex justify-between  items-center px-3 rounded-xl'>
                    <input type='text' 
                    className='w-4/5	h-4/5 bg-transparent text-black outline-none border-none' 
                    placeholder='Search for products...' 
                    onChange={handleChange}
                    />
                    <Button
                     style={{
                        height :'48px',
                        width : '48px',
                        backgroundColor : 'transparent',
                        display : 'flex',
                        justifyContent : 'center',
                        alignItems:'center',
                        borderRadius :'50%',
                    }}
                    className='bg-transparent'
                    >
                    <IoSearchOutline />
                    </Button>
            </div>

            <ul className='countrylist'>
            {
                countrylist && countrylist.map((item,index)=>{

                return <li key={index}><Button onClick={()=>{
                    setIsOpen(false)
                    CountryHandle(index,item.country);
                }}
                className={`${countryIndex === index ? 'active' : ''}`}
                >{item.country}</Button></li> 
                })
            }
            </ul>
        </Dialog>
        </>
    )
}

export default CountryDropDown;