
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
                msg: error
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
                                    <div  onClick={() => AddRAM(index, ram)} key={index} className={`${index === ramSelected ? 'active' : ''} ${index !== ramSelected ? 'hover:bg-gray-200' : ''} hover:cursor-pointer  border-[1px] border-blue-800 px-2 py-[2px] font-semibold rounded-full`}>{ram}</div>
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
                            <Button sx={{
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
                </div>
            </div>
        </Dialog>
    )
}

export default ProductDialog;