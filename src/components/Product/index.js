
import { Dialog, Rating } from '@mui/material';
import React, { useState } from "react";
import Slider from "react-slick";
import apple_img from '../../assets/apple.jpg';

import { Button } from '@mui/material';
import { IoIosHeart } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import CountHandle from '../CountHandle';


const Product = ({ isopen, handleOpen, product }) => {


    var settings = {
        dots: true,
        infinite: false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        customPaging: i => (

            <img
                src={product.images[i]}
                alt="Image not found"
                className="w-full h-full object-cover"
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
                    <h1 className='font-bold text-[25px]'>{product.name}</h1>
                    <div className='flex gap-5'>
                        <span>Brands: {product.brand}</span>
                        <Rating
                            value={product.rating}
                            precision={0.5}
                        />

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
                        >{product.discount}%</Button>
                        <Slider {...settings} >
                            {
                                product.images && product.images.map((url) => {

                                    return (
                                        <div>
                                            <img
                                                className='mx-auto'
                                                height="200px"
                                                width="200px"
                                                src={url}
                                                alt="Image not found"
                                            />
                                        </div>
                                    )
                                })
                            }
                        </Slider>
                    </div>
                    <div className='md:w-7/12 flex flex-col gap-5'>

                        <div>
                            <span><del>${product.oldPrice}</del></span>
                            <span className='ml-4 text-red-800 font-bold'>${product.price}</span>
                        </div>
                        <span style={{ backgroundColor: '#90EE90', color: 'green', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '200px', borderRadius: '20px', padding: '5px' }}>IN STOCK</span>
                        <p>
                            {product.description}
                        </p>


                        <div className='flex gap-3'>{
                            product.RAM && product.RAM.map((ram) => {

                                return (
                                    <div className='bg-blue-600 text-white px-2 py-[2px] font-semibold rounded-full'>{ram}</div>
                                )
                            })}
                        </div>

                        <div className='flex gap-3'>{
                            product.weight && product.weight.map((w) => {

                                return (
                                    <div className='bg-blue-600 text-white px-2 py-[2px] font-semibold rounded-full'>{w}</div>
                                )
                            })}
                        </div>

                        <div className='flex gap-3'>{
                            product.size && product.size.map((s) => {

                                return (
                                    <div className='bg-blue-600 text-white px-2 py-[2px] font-semibold rounded-full'>{s}</div>
                                )
                            })}
                        </div>


                        <div className='flex gap-10'>
                            <CountHandle />
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