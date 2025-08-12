
import Slider from "react-slick";
import Card from '../Card';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../features/product/productAPI";

const SelectedProducts = () => {

  
  const filter = useSelector((state) => state.filter);
  const products = useSelector((state) => state.products.items);
  const sliderRef = useRef(null);
  const dispatch = useDispatch();

  var settings = {
    centerMode: false,
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



  useEffect(() => {
    dispatch(fetchProducts(filter));
  }, [filter]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      sliderRef?.current?.slickGoTo(0);
    }, 300);

    return () => clearTimeout(timeout);
  }, [products])


  return (
    <div >

      <div className='flex flex-col items  gap-7'>
        <div>
          <h2 className='font-bold text-xl capitalize'>{filter?.category} Products</h2>
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