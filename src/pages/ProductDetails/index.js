


import { Rating } from '@mui/material';
import React, { useState } from "react";
import Slider from "react-slick";
import apple_img from '../../assets/apple.jpg';
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Button } from '@mui/material';
import { IoIosHeart } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import RelatedProducts from '../../components/RelatedProducts';

const ProductDetails = () => {

    const [Btn, setBtn] = useState(null);
    const [Btn1, setBtn1] = useState(null);

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


    function handleRender() {
        if (Btn1 === 0)
            return <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.

                $20 discount for your first order

                Join our newsletter and get...
                Join our email subscription now to get updates on
                promotions and coupons.

                Your Email Address
            </p>

        if (Btn1 === 1)
            return <table
                style={{
                    border: '1px solid black',
                    width: '100%',
                }}
            >
                <tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Stand Up</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>35″L x 24″W x 37-45″H(front to back wheel)</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Stand Up</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>35″L x 24″W x 37-45″H(front to back wheel)</td>
                </tr><tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Stand Up</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>35″L x 24″W x 37-45″H(front to back wheel)</td>
                </tr><tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Stand Up</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>35″L x 24″W x 37-45″H(front to back wheel)</td>
                </tr><tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Stand Up</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>35″L x 24″W x 37-45″H(front to back wheel)</td>
                </tr><tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Stand Up</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>35″L x 24″W x 37-45″H(front to back wheel)</td>
                </tr><tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Stand Up</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>35″L x 24″W x 37-45″H(front to back wheel)</td>
                </tr><tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Stand Up</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>35″L x 24″W x 37-45″H(front to back wheel)</td>
                </tr><tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Stand Up</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>35″L x 24″W x 37-45″H(front to back wheel)</td>
                </tr><tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Stand Up</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>35″L x 24″W x 37-45″H(front to back wheel)</td>
                </tr><tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Stand Up</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>35″L x 24″W x 37-45″H(front to back wheel)</td>
                </tr><tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Stand Up</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>35″L x 24″W x 37-45″H(front to back wheel)</td>
                </tr>

            </table>

        if (Btn1 === 2)
            return <div className='w-[70%] flex flex-col gap-5'>

                <h3 className='font-semibold text-[25px]'>Customer questions & answers</h3>
                <div className='flex items-start justify-between'>
                    <ul>
                        <li>Ali jutt</li>
                        <li>2024-12-09</li>
                        <li>best</li>
                    </ul>
                    <Rating
                        value={5}
                        precision={0.5}
                    />
                </div>
                <hr className=' border-[1px] border-gray-300' />

                <form>
                    <h3 className='font-semibold text-[25px]  mb-4'>Add a review</h3>
                    <textarea className='h-[200px] w-full shadow p-5 rounded-[10px] outline-none' placeholder='Write a Review'></textarea>
                </form>
                <Rating
                        value={5}
                        precision={0.5}
                    />
                <Button style={{
                    width : '180px',
                    backgroundColor : 'blue',
                    color : 'white',
                    borderRadius : '30px',
                    fontWeight : 'bold',
                    padding : '10px 0px',
                    marginTop : '20px',
                    marginBottom : '20px'
                }}>Submit Review</Button>
            </div>;
    }

    return (
        <div className='product_dialog body_ shadow'>
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

                    <div className='flex gap-5 items-center'>
                        <h4>Size/Weight:</h4>
                        <ul className='flex gap-5'>
                            <li
                                className={`border-2 px-3 py-1  ${Btn === 0 ? 'active' : ''}`}
                                onClick={() => {
                                    setBtn(0)
                                }}
                            ><a>50g</a></li>
                            <li
                                className={`border-2 px-3 py-1  ${Btn === 1 ? 'active' : ''}`}
                                onClick={() => {
                                    setBtn(1)
                                }}
                            ><a>100g</a></li>
                            <li
                                className={`border-2 px-3 py-1 ${Btn === 2 ? 'active' : ''}`}
                                onClick={() => {
                                    setBtn(2)
                                }}
                            ><a>200g</a></li>
                            <li
                                className={`border-2 px-3 py-1 ${Btn === 3 ? 'active' : ''}`}
                                onClick={() => {
                                    setBtn(3)
                                }}
                            ><a>400g</a></li>
                            <li
                                className={`border-2 px-3 py-1 ${Btn === 4 ? 'active' : ''}`}
                                onClick={() => {
                                    setBtn(4)
                                }}
                            ><a>500g</a></li>
                        </ul>
                    </div>
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

            <div className='bg-[#f7f2ff] info mt-12 p-10 rounded-[20px] border-2'>
                <div className='flex items-center gap-5 mb-10'>
                    <Button
                        onClick={() => {
                            setBtn1(0);
                        }}
                        className={`${Btn1 === 0 ? 'active' : ''}`}
                        style={{
                            color: 'black',
                            fontWeight: 'bold',
                            borderRadius: '50px',
                            paddingLeft: '40px',
                            paddingRight: '40px',
                            border: '1px solid black'
                        }}>Description</Button>
                    <Button
                        className={`${Btn1 === 1 ? 'active' : ''}`}
                        onClick={() => {
                            setBtn1(1);
                        }}
                        style={{
                            color: 'black',
                            fontWeight: 'bold',
                            borderRadius: '50px',
                            paddingLeft: '40px',
                            paddingRight: '40px',
                            border: '1px solid black'
                        }}>Additional Info</Button>
                    <Button
                        className={`${Btn1 === 2 ? 'active' : ''}`}
                        onClick={() => {
                            setBtn1(2);
                        }}
                        style={{
                            color: 'black',
                            fontWeight: 'bold',
                            borderRadius: '50px',
                            paddingLeft: '40px',
                            paddingRight: '40px',
                            border: '1px solid black'
                        }}>Reviews (1)</Button>
                </div>
                {
                    handleRender()
                }
            </div>

            <RelatedProducts title='Related Products'/>
            <RelatedProducts title='Recently Viewed Products'/>
        </div>
    )
}

export default ProductDetails;