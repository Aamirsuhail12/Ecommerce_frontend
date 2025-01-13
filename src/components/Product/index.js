
import { Dialog, Rating } from '@mui/material';
import React, { useState } from "react";
import Slider from "react-slick";
import apple_img from '../../assets/apple.jpg';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Button } from '@mui/material';
import { IoIosHeart } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import { IoClose } from "react-icons/io5";


const Product = ({ isopen, handleOpen }) => {

    const [count, setCount] = useState(1);
    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        customPaging: i => (
            <img
                className='border-2'
                src={apple_img}
                alt="apple"
            />
        ),
    };
    return (
        <Dialog className='relative product_model' open={isopen} style={{ backgroundColor: 'transparent' }} onClose={handleOpen}>
            <Button style={
                {
                    height: '40px',
                    width: '40px',
                    position: 'absolute',
                    top: '10px',
                    right: '0',
                    color: 'black',
                    fontSize: '30px',
                    borderRadius: '50%',
                    zIndex: '100'
                }
            }
                onClick={handleOpen}
            ><IoClose /></Button>

            <div className='product_dialog'>
                <div>
                    <h1 className='font-bold text-[25px]'>All Natural Italian-Style Chicken Meatballs</h1>
                    <div className='flex gap-5'>
                        <span>Brands: Welch's</span>
                        <Rating
                            value={5}
                            precision={0.5}
                        />
                        <span>REVIEW</span>
                        <span>SKU:ZU49VOR</span>
                    </div>
                </div>
                <hr className='mt-5 mb-5' />
                <div className='flex'>
                    <div className='relative md:w-5/12 h-auto'>
                        <Button
                            style={{
                                backgroundColor: ' #00BFFF',
                                color: 'white',
                                position: 'absolute',
                                top: '0px',
                                left: '10px'
                            }}
                        >28%</Button>
                        <Slider {...settings} >
                            <div>
                                <img
                                    className='mx-auto'
                                    height="200px"
                                    width="200px"
                                    src={apple_img}
                                    alt="apple"
                                />
                            </div>
                            <div className='slider_item'>
                                <img
                                    className='mx-auto'
                                    height="200px"
                                    width="200px"
                                    src={apple_img}
                                    alt="apple"
                                />
                            </div>
                            <div className='slider_item'>
                                <img
                                    className='mx-auto'
                                    height="200px"
                                    width="200px"
                                    src={apple_img}
                                    alt="apple"
                                />
                            </div>
                            <div className='slider_item'>
                                <img
                                    className='mx-auto'
                                    height="200px"
                                    width="200px"
                                    src={apple_img}
                                    alt="apple"
                                />
                            </div>
                        </Slider>
                    </div>
                    <div className='md:w-7/12 flex flex-col gap-5'>

                        <div>
                            <span><del>$9.35</del></span>
                            <span className='ml-4 text-red-800 font-bold'>$7.25</span>
                        </div>
                        <span style={{ backgroundColor: '#90EE90', color: 'green', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '90px', borderRadius: '20px', padding: '5px' }}>IN STOCK</span>
                        <p>
                            Vivamus adipiscing nist ut dolor dignissim semper.Nulia luctus malesauda tincidunt.Class aptent taciti.
                        </p>
                        <div className='flex gap-10'>
                            <div className='flex justify-center items-center gap-5'>
                                <button className='w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300'
                                    onClick={() => {
                                        if (count > 1)
                                            setCount(count - 1);
                                    }}
                                ><FaMinus /></button>
                                <span>{count}</span>
                                <button
                                    onClick={() => {
                                        setCount(count + 1);
                                    }}
                                    className='w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300'><FaPlus /></button>
                            </div>
                            <Button style={{
                                backgroundColor: 'blue',
                                color: 'white',
                                fontWeight: 'bold',
                                borderRadius: '50px',
                                paddingLeft: '40px',
                                paddingRight: '40px'
                            }}>Add to cart</Button>
                        </div>
                        <div className='flex gap-5'>
                            <Button style={{
                                border: '1px solid black',
                                color: 'black',
                                fontWeight: 'bold',
                                borderRadius: '50px',
                                paddingLeft: '10px',
                                paddingRight: '10px'
                            }}><IoIosHeart style={{
                                height: '30px',
                                width: '30px',
                                marginRight: '10px'
                            }} />Add to Wishlist</Button>
                            <Button style={{
                                border: '1px solid black',
                                color: 'black',
                                fontWeight: 'bold',
                                borderRadius: '50px',
                                paddingLeft: '10px',
                                paddingRight: '10px'
                            }}><MdCompareArrows style={{
                                height: '30px',
                                width: '30px',
                                marginRight: '10px'
                            }} />COMPARE</Button>
                            <hr></hr>
                        </div>
                    </div>
                </div>
            </div>
        </Dialog>
    )
}

export default Product;