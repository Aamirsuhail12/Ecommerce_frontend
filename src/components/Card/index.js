
import { Button } from '@mui/material';
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useState } from 'react';
import ProductDialog from '../ProductDialog';
import { Rating } from '@mui/material';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { addWishList } from '../../features/user/userAPI';
import { showAlert } from '../../features/alert/alertSlice';
import { FaRupeeSign } from "react-icons/fa";


const Card = ({ productview, product }) => {

    const dispatch = useDispatch();
    const [isopen, setisopen] = useState(false);
    const navigate = useNavigate();

    function handleOpen() {

        setisopen(false);
    }

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
    const ProductDetails = (id) => {
        navigate(`/product/${id}`)
    }

    return (


        <div style={{ backgroundColor: product?.category?.color }} className={`${productview}  group relative flex flex-col  h-[250px] w-[160px] sm:h-[280px] sm:w-[180px]  md:h-[300px] md:w-[210px]  lg:w-[230px] p-2 pt-8 rounded-3xl -translate-y-1 shadow-lg `}>
            <div onClick={(e) => {
                e.stopPropagation();
                ProductDetails(product._id)
            }} className='img-container h-[70px] w-[70px] sm:h-[110px] sm:w-[110px]  md:h-[130px] md:w-[130px] lg:h-[150px] lg:w-[150px] m-auto mb-2 '>
                <img className='h-full w-full z-10 hover:scale-110 transition-all duration-200 ease-in-out' src={product?.images[0]} alt='Image Not Found' />
            </div>

            <div onClick={(e) => {
                e.stopPropagation();
                ProductDetails(product._id)
            }} className='flex flex-col items-start gap-2'>
                <div className='flex justify-between items-center w-full'>
                    <p className='font-small md:font-medium '>{product?.name?.length < 10 ? product?.name : product?.name?.substr(0, 10) + '...'} </p>
                    <span className='font-bold hidden lg:block text-green-800'>IN STOCK</span>
                </div>
                <div className='flex justify-start items-center'>
                    <Rating
                        className='text-align-start'
                        value={product?.rating}
                        precision={0.5}
                    />
                </div>
                <div className='discount flex gap-2 items-center'>
                    <div className='flex justity-start gap-2 items-center'>
                        <span className='text-black font-small md:font-medium md:font-bold flex items-center'><FaRupeeSign/><span>{product?.price}</span></span>
                        <span className='opacity-50 text-[6px] md:text-[12px] flex items-center'><FaRupeeSign/><span><del>{product?.oldPrice}</del></span></span>
                    </div>
                    <span className='bg-green-200 text-green-500 py-[1px] hidden lg:block px-[10px] rounded-full'>{product?.discount}% off</span>
                </div>
                <div>
                    <span className='bg-green-200 text-green-500  block lg:hidden px-[10px] mb-4  rounded-full'>{product?.discount}% off</span>
                </div>
            </div>
            <div className='hidden group-hover:flex flex-col absolute top-2 right-0 gap-2 z-20'>
                <Button
                    sx={{
                        minHeight: {
                            xs: '20px',
                            sm: '25px',
                            md: '30px',
                            lg: '35px',
                            xl: '35px'
                        },
                        minWidth: {
                            xs: '20px',
                            sm: '25px',
                            md: '30px',
                            lg: '35px',
                            xl: '35px'
                        },
                        height: {
                            xs: '20px',
                            sm: '25px',
                            md: '30px',
                            lg: '35px',
                            xl: '35px'
                        },
                        width: {
                            xs: '20px',
                            sm: '25px',
                            md: '30px',
                            lg: '35px',
                            xl: '35px'
                        },
                        '&:hover': {
                            backgroundColor: '#38bdf8'
                        },
                        backgroundColor: '	#7dd3fc',
                        color: 'white',
                        zIndex: '10',
                        borderRadius: '50%'
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        setisopen(true)
                    }}
                >
                    <AiOutlineFullscreen
                        className='text-20px sm:text-[25px] md:text-[25px] lg:text-[30px] xl:text-[30px] font-bold'
                    />
                </Button>
                <Button
                    sx={{
                        minHeight: {
                            xs: '20px',
                            sm: '25px',
                            md: '30px',
                            lg: '35px',
                            xl: '35px'
                        },
                        minWidth: {
                            xs: '20px',
                            sm: '25px',
                            md: '30px',
                            lg: '35px',
                            xl: '35px'
                        },
                        height: {
                            xs: '20px',
                            sm: '25px',
                            md: '30px',
                            lg: '35px',
                            xl: '35px'
                        },
                        width: {
                            xs: '20px',
                            sm: '25px',
                            md: '30px',
                            lg: '35px',
                            xl: '35px'
                        },
                        '&:hover': {
                            backgroundColor: '#38bdf8'
                        },
                        backgroundColor: '	#7dd3fc',
                        color: 'white',
                        zIndex: '10',
                        borderRadius: '50%'
                    }}>
                    <FaRegHeart onClick={handleAddWishList} className='text-15px sm:text-[20px] md:text-[20px] lg:text-[25px] xl:text-[25px] font-bold' />
                </Button>
            </div>

            <ProductDialog isopen={isopen} handleOpen={handleOpen} product={product}></ProductDialog>
        </div>

    )
}

export default Card;