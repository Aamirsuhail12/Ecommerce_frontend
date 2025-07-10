
import { Rating } from '@mui/material';
import { useContext, useMemo, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { Button } from '@mui/material';
import { IoIosHeart } from "react-icons/io";
import { MdCompareArrows } from "react-icons/md";
import RelatedProducts from '../../components/RelatedProducts';
import { useLocation, useParams } from 'react-router';
import { useEffect } from 'react';
import { getAll, update } from '../../RestApi';
import RecentlyViewed from '../../components/RecentlyViewed';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { Mycontext } from '../../App';
import _Swiper from '../../components/Swiper';

const ProductDetails = () => {

    console.log('pro')

    const context = useContext(Mycontext)
    const [ramSelected, setRamSelected] = useState(null);
    const [weightSelected, setWeightSelected] = useState(null);
    const [sizeSelected, setSizeSelected] = useState(null);
    const [Btn1, setBtn1] = useState(null);
    const [product, setProduct] = useState({});
    const sectionRef = useRef(null);
    const [count, setCount] = useState(1);

    const [isloading, setIsloading] = useState(false);
    const { id } = useParams();

    const [cart, setCart] = useState({
        product: id,
        quantity: 1,
        size: '',
        weight: '',
        RAM: ''
    })

    const location = useLocation();
    const data = useMemo(() => {
        const queryParams = new URLSearchParams(location.search);
        const rawData = queryParams.get('data');
        return rawData ? JSON.parse(decodeURIComponent(rawData)) : null;
    }, [location.search])

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
        try {
            const response = await getAll(`http://localhost:5000/products/${id}`);
            setProduct(response?.data);
        } catch (error) {
            console.log('Error in getting product', error)
        }
    }

    const AddToCart = async () => {

        if (!cart?.product) {
            context.setalertBox({
                open: true,
                color: 'error',
                msg: 'Product id is required'
            })
            return;
        }
        if (!cart?.quantity) {
            context.setalertBox({
                open: true,
                color: 'error',
                msg: 'Quantity is required'
            })
            return;
        }
        if (product?.RAM?.length > 0 && cart?.RAM === '') {
            context.setalertBox({
                open: true,
                color: 'error',
                msg: 'Product RAM is required'
            })
            return;
        }
        if (product?.weight?.length > 0 && cart?.weight === '') {
            context.setalertBox({
                open: true,
                color: 'error',
                msg: 'Product Weight is required'
            })
            return;
        }
        if (product?.size?.length > 0 && cart?.size === '') {
            context.setalertBox({
                open: true,
                color: 'error',
                msg: 'Product size is required'
            })
            return;
        }
        try {
            setIsloading(true)
            const response = await update('http://localhost:5000/users/cart/add', cart);
            context.setalertBox({
                open: true,
                color: 'success',
                msg: response?.data?.msg
            })
            setIsloading(false)
            context.setTotalCart(response?.data?.cart?.length)
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
            console.log('Error in adding product to cart', error?.response?.data?.msg);
            context.setalertBox({
                open: true,
                color: 'error',
                msg: error?.response?.data?.msg
            })
            setIsloading(false)
        }
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

    }, [id])

    useEffect(() => {
        console.log('use1')
        if (data) {
            setCart({
                product: id,
                quantity: data?.quantity,
                size: data?.size,
                weight: data?.weight,
                RAM: data?.RAM
            })
            setCount(data?.quantity)
        }
    }, [id, data])

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
            return <div className='w-[100%%] flex flex-col justify-start items-start gap-5'>

                <h3 className='font-semibold text-[20px]'>Customer questions & answers</h3>
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
                    width: '180px',
                    backgroundColor: 'blue',
                    color: 'white',
                    borderRadius: '30px',
                    fontWeight: 'bold',
                    padding: '10px 0px',
                    marginTop: '20px',
                    marginBottom: '20px'
                }}>Submit Review</Button>
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
                            isloading === true ?
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

            <div className='bg-[#f7f2ff] info mt-12 p-10 rounded-[20px] border-2'>
                <div className='flex items-center gap-5 mb-10'>
                    <Box className="hidden md:block">
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
                    <Box className='hidden md:block'>
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