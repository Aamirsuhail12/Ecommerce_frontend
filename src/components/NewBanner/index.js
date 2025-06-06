
import banner1 from '../../assets/banner1.jpg';
import Button from '@mui/material/Button';
import { FaArrowRightLong } from "react-icons/fa6";
import React from "react";
import Slider from "react-slick";
import Cart from '../Cart';
import { Link } from 'react-router-dom';


const NewBanner = (props) => {

  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true
  };
  return (
    <div className='body_ h-[500px] pt-2 flex gap-6 justify-between'>
      <div>
        <img className='banner' src={banner1} />
      </div>
      <div className='w-[70%] flex flex-col gap-7'>
        <div className='flex justify-between'>
          <div>
            <h2 className='font-bold text-xl'>NEW PRODUCTS</h2>
            <p className='opacity-50'>Do not miss the current offer untill the end of march.</p>
          </div>
          <Link to="/viewall">
            <Button style={{
              display: 'flex',
              justifyContent: "space-between",
              alignItems: 'center',
              borderRadius: '40px',
              paddingLeft: '30px',
              paddingRight: '30px',
              border: "1px solid black",
              gap: '10px',
              color: 'black',
            }}>
              View All
              <span><FaArrowRightLong /></span>
            </Button>
          </Link>
        </div>
        <div>

          <Slider {...settings} className='products'>
            {
              props.productList && props.productList.map((item) => {

                if (item.isFeatured === true) {
                  return (<div>
                    <Cart product={item} />
                  </div>)
                }
              })
            }


          </Slider>
        </div>
      </div>
    </div>
  )
}

export default NewBanner;