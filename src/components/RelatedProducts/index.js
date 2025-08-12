
import Card from "../Card";
import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { getAll } from "../../RestApi";
const RelatedProducts = ({ product }) => {

     const sliderRef = useRef(null);
     const [filter, setFilter] = useState({
          'name': '',
          'category': '',
          'subcategory': '',
          '_id': ''
     });


     const [products, setProducts] = useState([]);

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

     const GetRelatedProducts = async () => {

          try {

               const response = await getAll(`${process.env.REACT_APP_SERVER_URL}/products?page=-1&filter=${encodeURIComponent(JSON.stringify(filter))}`);

               setProducts(response?.data?.products)
               setTimeout(() => {
                    sliderRef?.current?.slickGoTo(0);
               }, 300)

          } catch (error) {
               console.log('Error in getting products', error);
          }
     }

     useEffect(() => {

          if (product && product?.name && product?.category && product?.category?.name && product?.subcategory &&
               product?.subcategory?.subcategory && product?.brand
          ) {
               setFilter({
                    '_id': product?._id,
                    'category': product?.category?.name,
                    'subcategory': product?.subcategory?.subcategory,
                    'brand': product?.brand
               })
          }
     }, [product])


     useEffect(() => {
          GetRelatedProducts();

     }, [filter])
     return (
          <div className="mt-5 mb-5">
               {
                    products.length !== 0 ?
                         <h1 className="font-semibold text-[30px]">Related Products</h1> : ''
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

export default RelatedProducts;