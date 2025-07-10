
import Slider from "react-slick";
import Card from '../Card';
import { useEffect, useState, useRef } from 'react';
import { getAll } from '../../RestApi';
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { FaArrowRightLong } from "react-icons/fa6";

const FeaturedProducts = () => {

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

    const GetProducts = async () => {
        try {
            const response = await getAll(`http://localhost:5000/products?page=-1`)

            setProducts(response?.data?.products)

            setTimeout(() => {
                sliderRef?.current?.slickGoTo(0);
            }, 1000)

        } catch (error) {

            console.log('Error in getting Products', error);
        }
    }

    useEffect(() => {
        GetProducts();
    }, []);


    return (
        <div >

            <div className='flex flex-col items  gap-7'>
                <div className="flex justify-between items-center flex-wrap lg:flex-nowrap gap-3">
                    <div>
                    <h2 className='font-bold text-xl capitalize'>Special Products</h2>
                    <p className='opacity-50'>Do not miss the current offer untill the end of march.</p>
                    </div>
                    <Link to="/viewall">
                        <Button sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            borderRadius: '40px',
                            px: '30px',
                            border: '1px solid black',
                            gap: '10px',
                            color: 'black',
                        }}
                        >
                            View All
                            <span><FaArrowRightLong /></span>
                        </Button>
                    </Link>
                </div>
                <div>
                    <Slider ref={sliderRef} {...settings} className='selectedproducts'>
                        {
                            products?.map((item, index) => {

                                if (item?.isFeatured === true) {
                                    return (<div key={index}>
                                        <Card product={item} />
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

export default FeaturedProducts;

