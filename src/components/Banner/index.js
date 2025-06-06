
import banner1 from '../../assets/banner1.jpg';
import Button from '@mui/material/Button';
import { FaArrowRightLong } from "react-icons/fa6";
import React from "react";
import Slider from "react-slick";
import Cart from '../Cart';
import { useEffect } from 'react';
import { getAll } from '../../RestApi';
import { useContext } from 'react';
import { Mycontext } from '../../App';
import { useState } from 'react';


const Banner = () => {


  const [products, setProducts] = useState([]);
  const mycontext = useContext(Mycontext);
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true
  };

  const GetProducts = async () => {
    try {
      const response = await getAll(`http://localhost:5000/products?page=-1`)

      const products = response.data.products.filter((product) => {
        return product.category.name === mycontext.filter
      }
      )
      setProducts(products)


    } catch (error) {

      console.log('Error in getting Products', error);
    }
  }


  useEffect(() => {
    GetProducts();
  }, [mycontext.filter]);


  return (
    <div className='body_ h-[500px] flex gap-6 justify-between pt-[20px]'>
      <div>
        <img className='banner' src={banner1} />
      </div>
      <div className='w-[70%] flex flex-col gap-7 '>
        <div className='flex justify-between'>
          <div>
            <h2 className='font-bold text-xl capitalize'>{mycontext.filter} Products</h2>
            <p className='opacity-50'>Do not miss the current offer untill the end of march.</p>
          </div>
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
        </div>
        <div>

          <Slider {...settings} className='products'>
            {
              products && products.map((item) => {


                return (<div>
                  <Cart product={item} />
                </div>)
              })
            }

          </Slider>
        </div>
      </div>
    </div>
  )
}

export default Banner;