
import Slider from "react-slick";
import Card from '../Card';
import { useEffect, useContext, useState, useRef } from 'react';
import { getAll } from '../../RestApi';
import { Mycontext } from '../../App';

const SelectedProducts = () => {

  const [products, setProducts] = useState([]);
  const sliderRef = useRef(null);

  const mycontext = useContext(Mycontext);
  var settings = {
    centerMode : false,
    dots: false,
    infinite: false,
    speed: 500,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1536, // Tailwind `2xl`
        settings: {
          slidesToShow: 6,
        },
      },
      {
        breakpoint: 1280, // Tailwind `xl`
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 1024, // Tailwind `lg`
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, // Tailwind `md`
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 640, // Tailwind `sm`
        settings: {
          slidesToShow: 2,
        },
      },
    ]

  };

  const GetProducts = async () => {
    try {
      const response = await getAll(`http://localhost:5000/products?page=-1`)

      const products = response?.data?.products?.filter((product) => {
        return product?.category?.name === mycontext?.filter
      }
      )
      setProducts(products)

      setTimeout(() => {
        sliderRef?.current?.slickGoTo(0);
      }, 1000)

    } catch (error) {

      console.log('Error in getting Products', error);
    }
  }

  useEffect(() => {
    GetProducts();
  }, [mycontext?.filter]);


  return (
    <div >

      <div className='flex flex-col items  gap-7'>
        <div>
          <h2 className='font-bold text-xl capitalize'>{mycontext?.filter} Products</h2>
          <p className='opacity-50'>Do not miss the current offer untill the end of march.</p>
        </div>
        <div>
          <Slider ref={sliderRef} {...settings} className='selectedproducts'>
            {
              products?.map((item, index) => {

                return (<div key={index}>
                  <Card product={item} />
                </div>)
              })
            }
          </Slider>
        </div>
      </div>
    </div>
  )
}

export default SelectedProducts;