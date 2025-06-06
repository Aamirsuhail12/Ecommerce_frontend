
import Cart from "../Cart";
import { Button } from '@mui/material';
import React from "react";
import Slider from "react-slick";

const RelativeProducts = ({title})=>{

    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows : true,
        autoplay : false,
        autoplaySpeed: 2000, 
      };
    return (
        <div className="mt-5 mb-5">
        <h1 className="font-semibold text-[30px]">{title}</h1>
        <Slider {...settings}>
          <div>
              {/* <Cart/> */}
         </div>
         <div>
              {/* <Cart/> */}
         </div>
         <div>
              {/* <Cart/> */}
         </div>
         <div>
              {/* <Cart/> */}
         </div>
        
        </Slider>
        </div>
    )
}

export default RelativeProducts;