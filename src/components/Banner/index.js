
import banner1 from '../../assets/banner1.jpg';
import Button from '@mui/material/Button';
import { FaArrowRightLong } from "react-icons/fa6";
import React from "react";
import Slider from "react-slick";
import Cart from '../Cart';


const Banner = ()=>{

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
      };
    return (
        <div className='body_ h-[500px] flex gap-6 justify-between'>
           <div>
            <img className='banner' src={banner1}/>
           </div>
           <div className='w-[70%] flex flex-col gap-7'>
              <div className='flex justify-between'>
                <div>
                    <h2 className='font-bold text-xl'>BEST SELLERS</h2>
                    <p className='opacity-50'>Do not miss the current offer untill the end of march.</p>
                </div>
                <Button style={{
                    display : 'flex',
                    justifyContent : "space-between",
                    alignItems : 'center',
                    borderRadius : '40px',
                    paddingLeft : '30px',
                    paddingRight : '30px',
                    border : "1px solid black",
                    gap : '10px',
                    color : 'black',
                }}>
                View All
                <span><FaArrowRightLong /></span>
                </Button>
              </div>
              <div>
                
              <Slider {...settings} className='products'>
             <div>
               <Cart></Cart>
            </div>
            <div>
            <Cart></Cart>
            </div>
            <div>
            <Cart></Cart>
            </div>
            <div>
            <Cart></Cart>
            </div>
            <div>
            <Cart></Cart>
            </div>
            <div>
            <Cart></Cart>
            </div>
            <div className='last-card'>
            <Cart></Cart>
            </div>
            </Slider>
              </div>
            </div>
        </div>
    )
}

export default Banner;