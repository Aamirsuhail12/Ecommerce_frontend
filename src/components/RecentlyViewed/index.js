import { useEffect, useState, useRef } from "react";
import { getAll, update } from "../../RestApi";
import Card from "../Card";
import Slider from "react-slick";

const RecentlyViewed = ({ productId }) => {

     const [products, setProducts] = useState([]);
     const sliderRef = useRef(null);

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


     const PatchedUser = async () => {
          try {
               const response = await update('http://localhost:5000/users/create/recently-viewed', { id: productId })
               

          } catch (error) {
               console.log('Error in patching user', error.response.data.msg);
          }
     }

     const getRecentlyViewedProducts = async () => {
          try {
               const response = await getAll('http://localhost:5000/users/recently-viewed');
               setProducts(response?.data?.recentlyviewedProducts?.filter(p => p._id !== productId))
               setTimeout(() => {
                    sliderRef?.current?.slickGoTo(0);
               }, 1000)

          } catch (error) {
               console.log('Error in getting recently-viewed products', error.response.data.msg);
          }
     }
     useEffect(() => {
          PatchedUser();
          getRecentlyViewedProducts();
     }, [productId])
     return (
          <div className="mt-5 mb-5">
               {
                    products.length !== 0 ?
                         <h1 className="font-semibold text-[30px]">RecentlyViewed Products</h1> : ''
               }

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
     )
}

export default RecentlyViewed;