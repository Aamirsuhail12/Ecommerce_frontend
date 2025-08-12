
import React from 'react';
import { Rating } from '@mui/material';
import { useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Button } from '@mui/material';
import { IoIosHeart } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import RelatedProducts from '../../components/RelatedProducts';
import { useParams } from 'react-router';
import { useEffect } from 'react';
import RecentlyViewed from '../../components/RecentlyViewed';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import _Swiper from '../../components/Swiper';
import { useDispatch, useSelector } from 'react-redux';
import { showAlert } from '../../features/alert/alertSlice';
import { fetchProduct } from '../../features/product/productAPI';
import { addCart } from '../../features/user/userAPI';
import { addReview, getReview } from '../../features/review/reviewAPI';
import { addWishList } from '../../features/user/userAPI';
import { FaRupeeSign } from "react-icons/fa";

import { MdBrandingWatermark } from "react-icons/md";
import { BiCategory } from "react-icons/bi";
import { TbCategoryPlus } from "react-icons/tb";
import { MdDescription } from "react-icons/md";
import { FcRating } from "react-icons/fc";
import { MdPriceCheck } from "react-icons/md";
import { RiDiscountPercentFill } from "react-icons/ri";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { BiSolidMemoryCard } from "react-icons/bi";
import { GiWeight } from "react-icons/gi";
import { RxFontSize } from "react-icons/rx";
import { FaProductHunt } from "react-icons/fa6";

const ProductDetails = () => {

    const dispatch = useDispatch();
    const product = useSelector((state) => state?.products?.singleItem);
    const status = useSelector((state) => state.products.status);
    const reviews = useSelector((state) => state.review);
    const [ramSelected, setRamSelected] = useState(null);
    const [weightSelected, setWeightSelected] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(null);
    const [Btn1, setBtn1] = useState(null);
    const sectionRef = useRef(null);
    const [count, setCount] = useState(1);
    const { id } = useParams();

    const [reviewForm, setReviewForm] = useState({
        productId: id,
        review: '',
        rating: 2
    })

    const [cart, setCart] = useState({
        product: id,
        quantity: 1,
        size: '',
        weight: '',
        RAM: ''
    })


    const handleAddWishList = async () => {
        try {
            await dispatch(addWishList(id)).unwrap();
            dispatch(showAlert({
                color: 'success',
                msg: 'Product added to wishlist successfully!'
            }))

        } catch (error) {
            dispatch(showAlert({
                color: 'error',
                msg: error === 'Request failed with status code 409' ? 'product already added to list' : error = 'Request failed with status code 401' ? 'Please login to continue' : error

            }))
        }
    }
    const handleCount = async (count) => {
        setCount(count)
        setCart({
            ...cart,
            quantity: count
        })
    }
    const AddRAM = async (idx, val) => {
        setRamSelected(idx);
        setCart({
            ...cart,
            RAM: val
        })
    }

    const AddWeight = async (idx, val) => {
        setWeightSelected(idx)
        setCart({
            ...cart,
            weight: val
        })
    }
    const AddSize = async (idx, val) => {
        setSizeSelected(idx)
        setCart({
            ...cart,
            size: val
        })
    }

    const GetProduct = async () => {
        dispatch(fetchProduct(id));
    }

    const AddToCart = async () => {

        if (!cart?.product) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Product id is required'
            }))

            return;
        }
        if (!cart?.quantity) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Quantity is required'
            }))
            return;
        }
        if (product?.RAM?.length > 0 && cart?.RAM === '') {
            dispatch(showAlert({
                color: 'error',
                msg: 'Product RAM is required'
            }))

            return;
        }
        if (product?.weight?.length > 0 && cart?.weight === '') {
            dispatch(showAlert({
                color: 'error',
                msg: 'Product Weight is required'
            }))

            return;
        }
        if (product?.size?.length > 0 && cart?.size === '') {
            dispatch(showAlert({
                color: 'error',
                msg: 'Product size is required'
            }))

            return;
        }
        try {

            await dispatch(addCart(cart)).unwrap();
            dispatch(showAlert({
                color: 'success',
                msg: "Product added to cart successfull!"
            }))

            setCart({
                product: id,
                quantity: 1,
                size: '',
                weight: '',
                RAM: ''
            })
            setSizeSelected(null);
            setWeightSelected(null);
            setRamSelected(null);
            setCount(1)
        } catch (error) {
            console.log('Error in adding product to cart', error);
            dispatch(showAlert({
                color: 'error',
                msg: error === 'No token. unauthorized' ? 'Please login to continue' : error

            }))
        }
    }

    const getReviews = async (id) => {
        dispatch(getReview(id))
    }

    useEffect(() => {

        setBtn1(null);
        GetProduct();
        setSizeSelected(null);
        setWeightSelected(null);
        setRamSelected(null);
        // window.scrollTo({ top: 250, behavior: 'smooth' });//top : 250px
        sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });

        setCart({
            product: id,
            quantity: 1,
            size: '',
            weight: '',
            RAM: ''
        })
        getReviews(id);
    }, [id])

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!reviewForm.productId || !reviewForm.rating || !reviewForm.review) {
            dispatch(showAlert({
                color: 'error',
                msg: 'Please fill all details'
            }))
        }

        try {
            await dispatch(addReview(reviewForm)).unwrap();
            dispatch(showAlert({
                color: 'success',
                msg: 'added review successfully!'
            }))

            setReviewForm({
                productId: id,
                rating: 2,
                review: ''
            })
        } catch (error) {
            dispatch(showAlert({
                color: 'error',
                msg: error === 'Request failed with status code 401' ? 'Please Login' : error
            }))
            console.log('Error in adding review', error);
        }
    }

    function handleRender() {
        if (Btn1 === 0)
            return <p>{product?.description}</p>

        if (Btn1 === 1)
            return <table
                style={{
                    border: '1px solid black',
                    width: '100%',
                }}
            >


                <tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Product Name</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>{product?.name}</td>
                </tr>

                <tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Description</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>{product?.description}</td>
                </tr>

                <tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Brand</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>{product?.brand}</td>
                </tr>

                <tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Price</td>
                    <td style={{ borderBottom: '1px solid black', width: '100%', padding: '15px 10px' }} className='flex justify-start items-center '><FaRupeeSign />{product?.price}</td>
                </tr>

                <tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Old Price</td>
                    <td style={{ width: '100%', padding: '15px 10px' }} className='flex justify-start items-center text-red-500'><FaRupeeSign /><del>{product?.oldPrice}</del></td>
                </tr>

                <tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Category</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>{product?.category?.name}</td>
                </tr>

                <tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Sub Category</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>{product?.subcategory?.subcategory}</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>countInStock</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>{product?.countInStock}</td>
                </tr>
                <tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Rating</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }}>{product?.rating}</td>
                </tr>

                <tr>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Discount</td>
                    <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px' }} ><span className='bg-green-500 text-white py-[2px] px-3 rounded-[20px]'>{product?.discount}% off</span></td>
                </tr>

                {
                    product?.RAM?.length > 0 &&
                    <tr>
                        <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>RAM</td>
                        <td style={{ border: '1px solid black', width: '100%', padding: '15px 10px' }} className='flex items-center gap-5'>
                            {
                                product?.RAM?.map((r, index) => {
                                    return (
                                        <div className='bg-blue-500 text-white py-[2px] px-3 rounded-[20px]'>{r}</div>
                                    )
                                })
                            }
                        </td>
                    </tr>
                }


                {
                    product?.weight?.length > 0 &&
                    <tr>
                        <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>weight</td>
                        <td style={{ border: '1px solid black', width: '100%', padding: '15px 10px' }} className='flex items-center gap-5'>
                            {
                                product?.weight?.map((w, index) => {
                                    return (
                                        <div className='bg-blue-500 text-white py-[2px] px-3 rounded-[20px]'>{w}</div>
                                    )
                                })
                            }
                        </td>
                    </tr>
                }

                {
                    product?.size?.length > 0 &&
                    <tr>
                        <td style={{ border: '1px solid black', width: '50%', padding: '15px 10px', fontWeight: 'bold' }}>Size</td>
                        <td style={{ border: '1px solid black', width: '100%', padding: '15px 10px' }} className='flex items-center gap-5 h-full'>
                            {
                                product?.size?.map((s, index) => {
                                    return (
                                        <div className='bg-blue-500 text-white py-[2px] px-3 rounded-[20px]'>{s}</div>
                                    )
                                })
                            }
                        </td>
                    </tr>
                }


            </table>

        if (Btn1 === 2)
            return <div className='w-[100%%] flex flex-col justify-start items-start gap-5'>

                <h3 className='font-semibold text-[20px]'>Customer questions & answers</h3>
                {
                    [...reviews?.item]?.reverse()?.map((r, index) => {
                        return <div key={index} className='w-full md:w-1/2 flex items-start justify-between bg-white text-black p-2 rounded-[10px]'>
                            <ul>
                                <li>{r?.userName}</li>
                                <li>{r?.date?.substr(0, 10)}</li>
                                <li>{r?.review}</li>
                            </ul>
                            <Rating
                                value={r?.rating}
                                precision={0.5}
                            />
                        </div>
                    })
                }

                <hr className=' border-[1px] border-gray-300' />

                <form onSubmit={handleSubmit}>
                    <h3 className='font-semibold text-[25px]  mb-4'>Add a review</h3>
                    <Rating
                        name="simple-controlled"
                        value={reviewForm?.rating}
                        onChange={(event, newValue) => {
                            setReviewForm({ ...reviewForm, rating: newValue });
                        }}
                    />
                    <textarea
                        onChange={(e) => {

                            setReviewForm({ ...reviewForm, review: e.target.value });
                        }}
                        name='review' value={reviewForm?.review} className='h-[200px] w-full shadow p-5 rounded-[10px] outline-none' placeholder='Write a Review'></textarea>
                    {
                        reviews.status === 'loading' ? <Button
                            type='submit'
                            style={{
                                width: '180px',
                                backgroundColor: 'blue',
                                color: 'white',
                                borderRadius: '30px',
                                fontWeight: 'bold',
                                padding: '10px 0px',
                                marginTop: '20px',
                                marginBottom: '20px'
                            }}>Submit Review  <Box sx={{ display: 'flex' }}>
                                <CircularProgress size={25} className='ml-4' style={{ color: 'white' }} />
                            </Box></Button> :
                            <Button
                                type='submit'
                                style={{
                                    width: '180px',
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    borderRadius: '30px',
                                    fontWeight: 'bold',
                                    padding: '10px 0px',
                                    marginTop: '20px',
                                    marginBottom: '20px'
                                }}>Submit Review</Button>
                    }

                </form>
            </div>;
    }

    return (
        <div ref={sectionRef} className='relative py-4 space shadow'>
            <div>
                <h1 className='font-bold text-[25px]'>{product?.name}</h1>
                <div className='flex gap-5'>
                    <span>Brands: {product?.brand}</span>
                    <Rating
                        value={Number(product?.rating)}
                        precision={0.5}
                    />
                </div>
            </div>
            <hr className='mt-5 mb-5' />
            <div className='flex justify-between items-start flex-wrap md:flex-nowrap  gap-8'>
                <div className='relative w-full md:w-5/12 mb-[10px] md:mb-[150px]'>

                    <_Swiper product={product}></_Swiper>

                </div>
                <div className='w-full  md:w-7/12 flex flex-col items-start gap-5 '>

                    <div className='flex items-center gap-3 md:gap-10 lg:gap-15'>
                        <div className='flex items-center gap-3'>
                            <span><FaProductHunt style={{ fontSize: '25px' }} /></span>
                            <span>Name</span>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>:</div>
                            <div className='font-bold'>{product?.name}</div>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 md:gap-10 lg:gap-15'>
                        <div className='flex items-center gap-3'>
                            <span><MdBrandingWatermark style={{ fontSize: '25px' }} /></span>
                            <span>Brand</span>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>:</div>
                            <div>{product?.brand}</div>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 md:gap-10 lg:gap-15'>
                        <div className='flex items-center gap-3'>
                            <span><BiCategory style={{ fontSize: '25px' }} /></span>
                            <span>Category</span>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>:</div>
                            <div>{product?.category?.name}</div>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 md:gap-10 lg:gap-15'>
                        <div className='flex items-center gap-3'>
                            <span><TbCategoryPlus style={{ fontSize: '25px' }} /></span>
                            <span>Sub category</span>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>:</div>
                            <div>{product?.subcategory?.subcategory}</div>
                        </div>
                    </div>


                    <div className='flex items-center gap-3 md:gap-10 lg:gap-15'>
                        <div className='flex items-center gap-3'>
                            <span><MdDescription style={{ fontSize: '25px' }} /></span>
                            <span>Description</span>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>:</div>
                            <div>{product?.description}</div>
                        </div>
                    </div>


                    <div className='flex items-center gap-3 md:gap-10 lg:gap-15'>
                        <div className='flex items-center gap-3'>
                            <span><FcRating style={{ fontSize: '25px' }} /></span>
                            <span>rating</span>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>:</div>
                            <div>{product?.rating}</div>
                        </div>
                    </div>

                    <div className='flex items-center gap-3 md:gap-10 lg:gap-15'>
                        <div className='flex items-center gap-3'>
                            <span><MdPriceCheck style={{ fontSize: '25px' }} /></span>
                            <span>price</span>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>:</div>
                            <div className='flex items-center text-red-700'><FaIndianRupeeSign /><span ><del>{product?.oldPrice}</del></span></div>
                            <div className='flex items-center font-bold'><FaIndianRupeeSign /><span>{product?.price}</span></div>

                        </div>
                    </div>

                    <div className='flex items-center gap-3 md:gap-10 lg:gap-15'>
                        <div className='flex items-center gap-3'>
                            <span><RiDiscountPercentFill style={{ fontSize: '25px' }} /></span>
                            <span>discount</span>
                        </div>
                        <div className='flex items-center gap-5'>
                            <div>:</div>
                            <div className='bg-[#90EE90] px-4 py-[3px] rounded-[20px]'>{product?.discount}% off</div>
                        </div>
                    </div>

                    {
                        product?.RAM?.length > 0 &&
                        <div className='flex items-center gap-3 md:gap-10 lg:gap-15'>
                            <div className='flex items-center gap-3'>
                                <span><BiSolidMemoryCard style={{ fontSize: '25px' }} /></span>
                                <span>RAM</span>
                            </div>
                            <div className='flex items-center gap-5'>
                                <div>:</div>
                                <div className='flex gap-3 flex-wrap lg:flex-nowrap items-center'>{
                                    product?.RAM?.map((ram, index) => {

                                        return (
                                            <div onClick={() => AddRAM(index, ram)} key={index} className={`${index === ramSelected ? 'active' : ''} ${index !== ramSelected ? 'hover:bg-gray-200' : ''} hover:cursor-pointer  border-[1px] border-blue-800 px-2 py-[2px] font-semibold rounded-full`}>{ram}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    }

                    {
                        product?.weight?.length > 0 &&
                        <div className='flex items-center gap-3 md:gap-10 lg:gap-15'>
                            <div className='flex items-center gap-3'>
                                <span><GiWeight style={{ fontSize: '25px' }} /></span>
                                <span>weight</span>
                            </div>
                            <div className='flex items-center gap-5'>
                                <div>:</div>
                                <div className='flex gap-3 flex-wrap lg:flex-nowrap items-center'>{
                                    product?.weight?.map((w, index) => {

                                        return (
                                            <div onClick={() => AddWeight(index, w)} key={index} className={`${index === weightSelected ? 'active' : ''} ${index !== weightSelected ? 'hover:bg-gray-200' : ''} hover:cursor-pointer  border-[1px] border-blue-800  px-2 py-[2px] font-semibold rounded-full`}>{w}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>

                    }


                    {
                        product?.size?.length > 0 &&
                        <div className='flex items-center gap-3 md:gap-10 lg:gap-15'>
                            <div className='flex items-center gap-3'>
                                <span><RxFontSize style={{ fontSize: '25px' }} /></span>
                                <span>size</span>
                            </div>
                            <div className='flex items-center gap-5'>
                                <div>:</div>


                                <div className='flex gap-3 flex-wrap lg:flex-nowrap items-center'>{
                                    product?.size?.map((s, index) => {

                                        return (
                                            <div onClick={() => AddSize(index, s)} key={index} className={`${index === sizeSelected ? 'active' : ''} ${index !== sizeSelected ? 'hover:bg-gray-200' : ''} hover:cursor-pointer  border-[1px] border-blue-800 px-2 py-[2px] font-semibold rounded-full`}>{s}</div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    }



                    <div className='flex gap-10 flex-wrap lg:flex-nowrap items-center'>
                        <div className='flex justify-center items-center gap-5'>
                            <button className='w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300'
                                onClick={() => {
                                    if (count > 1)
                                        handleCount(count - 1);
                                }}
                            ><FaMinus /></button>
                            <span>{count}</span>
                            <button
                                onClick={() => {
                                    handleCount(count + 1);
                                }}
                                className='w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300'>
                                <FaPlus /></button>
                        </div>
                        {
                            status === 'loading'
                                ?
                                <Button sx={{
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderRadius: '50px',
                                    px: {
                                        sm: '10px',
                                        md: '20px',
                                        lg: '40px'
                                    },
                                    py: {
                                        sm: '5px',
                                        md: '10px'
                                    }
                                }}>
                                    Add to cart <Box sx={{ display: 'flex' }}>
                                        <CircularProgress size={25} className='ml-4 text-white' />
                                    </Box></Button>
                                :
                                <Button onClick={(e) => {
                                    e.stopPropagation();
                                    AddToCart()
                                }}
                                    sx={{
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        borderRadius: '50px',
                                        px: '40px',
                                        py: '10px'
                                    }}

                                >Add to cart</Button>
                        }

                    </div>
                    <div className='flex gap-5 flex-wrap lg:flex-nowrap items-center'>
                        <Button
                            onClick={handleAddWishList}
                            sx={{
                                border: '1px solid black',
                                color: 'black',
                                fontWeight: 'bold',
                                borderRadius: '50px',
                                px: '10px'
                            }}>
                            <IoIosHeart className='h-[15px] md:h-[30px] w-[15px] md:w-[30px] mr-[10px]'
                            />Add to Wishlist</Button>
                        <Button sx={{
                            border: '1px solid black',
                            color: 'black',
                            fontWeight: 'bold',
                            borderRadius: '50px',
                            px: '10px'
                        }}>
                            <MdCompareArrows className='h-[30px] w-[30px] mr-[10px]' />COMPARE
                        </Button>
                        <hr></hr>
                    </div>

                </div>
                {/* <div className='w-full  md:w-7/12 flex flex-col items-start gap-5 '>

                    <div className='flex gap-5 items-center'>
                        <span><del>Rs{product?.oldPrice}</del></span>
                        <span className='ml-4 text-red-800 font-bold'>Rs{product?.price}</span>
                        <Button
                            sx={{
                                backgroundColor: '#90EE90',
                                color: 'black',
                                paddingX: {
                                    xs: '2px',
                                    sm: '10px',
                                    lg: '25px',
                                },
                                textTransform: 'none',
                                fontWeight: 'bold',
                                borderRadius: '20px'
                            }}

                        >{product?.discount}% off</Button>
                    </div>
                    <span className="bg-[#90EE90] text-green-600 font-bold flex justify-center items-center w-[200px] rounded-[20px] p-[5px]">
                        IN STOCK
                    </span>

                    <p>
                        {product?.description}
                    </p>


                    <div className='flex gap-3 flex-wrap lg:flex-nowrap items-center'>{
                        product?.RAM?.map((ram, index) => {

                            return (
                                <div onClick={() => AddRAM(index, ram)} key={index} className={`${index === ramSelected ? 'active' : ''} ${index !== ramSelected ? 'hover:bg-gray-200' : ''} hover:cursor-pointer  border-[1px] border-blue-800 px-2 py-[2px] font-semibold rounded-full`}>{ram}</div>
                            )
                        })}
                    </div>

                    <div className='flex gap-3 flex-wrap lg:flex-nowrap items-center'>{
                        product?.weight?.map((w, index) => {

                            return (
                                <div onClick={() => AddWeight(index, w)} key={index} className={`${index === weightSelected ? 'active' : ''} ${index !== weightSelected ? 'hover:bg-gray-200' : ''} hover:cursor-pointer  border-[1px] border-blue-800  px-2 py-[2px] font-semibold rounded-full`}>{w}</div>
                            )
                        })}
                    </div>

                    <div className='flex gap-3 flex-wrap lg:flex-nowrap items-center'>{
                        product?.size?.map((s, index) => {

                            return (
                                <div onClick={() => AddSize(index, s)} key={index} className={`${index === sizeSelected ? 'active' : ''} ${index !== sizeSelected ? 'hover:bg-gray-200' : ''} hover:cursor-pointer  border-[1px] border-blue-800 px-2 py-[2px] font-semibold rounded-full`}>{s}</div>
                            )
                        })}
                    </div>


                    <div className='flex gap-10 flex-wrap lg:flex-nowrap items-center'>
                        <div className='flex justify-center items-center gap-5'>
                            <button className='w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300'
                                onClick={() => {
                                    if (count > 1)
                                        handleCount(count - 1);
                                }}
                            ><FaMinus /></button>
                            <span>{count}</span>
                            <button
                                onClick={() => {
                                    handleCount(count + 1);
                                }}
                                className='w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300'>
                                <FaPlus /></button>
                        </div>
                        {
                            status === 'loading'
                                ?
                                <Button sx={{
                                    backgroundColor: 'blue',
                                    color: 'white',
                                    fontWeight: 'bold',
                                    borderRadius: '50px',
                                    px: {
                                        sm: '10px',
                                        md: '20px',
                                        lg: '40px'
                                    },
                                    py: {
                                        sm: '5px',
                                        md: '10px'
                                    }
                                }}>
                                    Add to cart <Box sx={{ display: 'flex' }}>
                                        <CircularProgress size={25} className='ml-4 text-white' />
                                    </Box></Button>
                                :
                                <Button onClick={(e) => {
                                    e.stopPropagation();
                                    AddToCart()
                                }}
                                    sx={{
                                        backgroundColor: 'blue',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        borderRadius: '50px',
                                        px: '40px',
                                        py: '10px'
                                    }}

                                >Add to cart</Button>
                        }

                    </div>
                    <div className='flex gap-5 flex-wrap lg:flex-nowrap items-center'>
                        <Button
                            onClick={handleAddWishList}
                            sx={{
                                border: '1px solid black',
                                color: 'black',
                                fontWeight: 'bold',
                                borderRadius: '50px',
                                px: '10px'
                            }}>
                            <IoIosHeart className='h-[15px] md:h-[30px] w-[15px] md:w-[30px] mr-[10px]'
                            />Add to Wishlist</Button>
                        <Button sx={{
                            border: '1px solid black',
                            color: 'black',
                            fontWeight: 'bold',
                            borderRadius: '50px',
                            px: '10px'
                        }}>
                            <MdCompareArrows className='h-[30px] w-[30px] mr-[10px]' />COMPARE
                        </Button>
                        <hr></hr>
                    </div>
                </div> */}
            </div>

            <div className='bg-[#f7f2ff] info mt-12 p-10 rounded-[20px] border-2'>
                <div className='flex items-center flex-wrap gap-5 mb-10'>
                    <Box >
                        <Button
                            onClick={() => {
                                setBtn1(0);
                            }}
                            className={`${Btn1 === 0 ? 'active' : ''} `}
                            style={{
                                color: 'black',
                                fontWeight: 'bold',
                                borderRadius: '50px',
                                paddingLeft: '40px',
                                paddingRight: '40px',
                                border: '1px solid black'
                            }}>Description</Button>
                    </Box>
                    <Box >
                        <Button
                            className={`${Btn1 === 1 ? 'active' : ''} hidden md:block`}
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
                    </Box>
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

            <RelatedProducts product={product} />
            <RecentlyViewed productId={id} />
        </div>
    )
}

export default ProductDetails;