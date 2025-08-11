
import { Dialog, Rating } from '@mui/material';
import { Button } from '@mui/material';
import { IoIosHeart } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import { IoClose } from "react-icons/io5";
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { FaMinus } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';
import _Swiper from '../Swiper';
import { showAlert } from '../../features/alert/alertSlice';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../../features/user/userAPI';
import { addWishList } from '../../features/user/userAPI';

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

const ProductDialog = ({ isopen, handleOpen, product }) => {

    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    const [count, setCount] = useState(1);
    const [ramSelected, setRamSelected] = useState(null);
    const [weightSelected, setWeightSelected] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(null);

    const [cart, setCart] = useState({
        product: '',
        quantity: 1,
        size: '',
        weight: '',
        RAM: ''
    })

    const handleAddWishList = async () => {
        try {
            await dispatch(addWishList(product._id)).unwrap();
            dispatch(showAlert({
                color: 'success',
                msg: 'Product added to wishlist successfully!'
            }))

        } catch (error) {
            dispatch(showAlert({
                color: 'error',
                msg: error === 'Request failed with status code 409' ? 'product already added to list' : error === 'Request failed with status code 401' ? 'Please login to continue' : error

            }))
        }
    }

    const handleCountChange = async (count) => {
        setCount(count)
        setCart({ ...cart, quantity: count })
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
                msg: 'Product added to cart successfully!'
            }))

            setCart({
                product: product._id,
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

    useEffect(() => {
        setCart({
            product: product._id,
            quantity: 1,
            size: '',
            weight: '',
            RAM: ''
        })
    }, [isopen, product])

    return (
        <Dialog
            maxWidth={false}
            open={isopen}
            PaperProps={
                {
                    className: 'p-8 w-4/5 max-w-4/5 relative'
                }
            }
            onClose={() => {
                handleOpen()
                setSizeSelected(null);
                setWeightSelected(null);
                setRamSelected(null);
                setCount(1)
            }}>
            <Button
                sx={{
                    minHeight: '40px',
                    minWidth: '40px',
                    height: '40px',
                    width: '40px',
                    position: 'absolute',
                    top: '10px',
                    right: '5px',
                    backgroundColor: '#6b7280',
                    color: 'white',
                    fontSize: '30px',
                    borderRadius: '50%',
                    zIndex: '100',
                    '&:hover': {
                        backgroundColor: '#4b5563',
                    }
                }}

                onClick={() => {
                    handleOpen();
                    setSizeSelected(null);
                    setWeightSelected(null);
                    setRamSelected(null);
                    setCount(1)
                }}
            ><IoClose />
            </Button>

            <div className='w-full'>
                <div>
                    <h1 className='font-semibold md:font-bold text-[18px] md:text-[20px] lg:text-[25px]'>{product?.name}</h1>
                    <div className='flex gap-5  md:text-[20px] lg:text-[25px] flex-wrap sm:flex-nowrap items-center'>
                        <span>Brands: {product?.brand}</span>
                        <Rating
                            value={product?.rating}
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
                                            handleCountChange(count - 1);
                                    }}
                                ><FaMinus /></button>
                                <span>{count}</span>
                                <button
                                    onClick={() => {
                                        handleCountChange(count + 1);
                                    }}
                                    className='w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300'>
                                    <FaPlus /></button>
                            </div>
                            {
                                user.status === 'loading' ?
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
                                            <CircularProgress size={25} style={{ color: 'white' }} className='ml-4 text-white' />
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
                                            handleCountChange(count - 1);
                                    }}
                                ><FaMinus /></button>
                                <span>{count}</span>
                                <button
                                    onClick={() => {
                                        handleCountChange(count + 1);
                                    }}
                                    className='w-12 h-12 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300'>
                                    <FaPlus /></button>
                            </div>
                            {
                                user.status === 'loading' ?
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
                                            <CircularProgress size={25} style={{ color: 'white' }} className='ml-4 text-white' />
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
            </div>
        </Dialog>
    )
}

export default ProductDialog;