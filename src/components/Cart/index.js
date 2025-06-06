


import { Button, Dialog } from '@mui/material';
import StarIcon from "@mui/icons-material/Star";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useState } from 'react';
import Product from '../Product';
import { Rating } from '@mui/material';
import StarBorderIcon from "@mui/icons-material/StarBorder";


const Cart = ({ productview, product }) => {

    // console.log('product', product)
    const [isopen, setisopen] = useState(false);
    function handleOpen() {
        console.log("Button clicked! Handling open action...");
        setisopen(false);
    }
    return (
        <div className={`${productview} relative border-[0.5px] cart h-auto w-[270px] flex flex-col shadow items-start justify-start gap-5 p-5`}>
            <img className='h-40 w-32 mt-10 product_img m-auto' src={product?.images[0]} />
            <div className='flex flex-col gap-2'>
                <p className='font-medium'>{product?.name?.length < 10 ? product?.name + '(' + product?.brand + ')' : product?.name?.substr(0, 10) + '...' + '(' +( product?.brand.length < 10 ? product.brand : product.brand.substr(0, 10) + '...' )+ ')'} </p>
                <p className='font-medium'>{product?.description.length < 10 ? product?.description : product?.description.substr(0, 15) + '...'}</p>
                <span className='font-bold text-green-800'>IN STOCK</span>
                <Rating
                    value={product?.rating}
                    precision={0.5}
                />
                <div className='flex gap-2 items-center'>
                    <span className='text-black font-bold'>Rs{product?.price}</span>
                    <span className='opacity-50 text-[12px]'><del>Rs{product?.oldPrice}</del></span>
                    <span className='bg-green-200 text-green-500 py-[1px] px-[10px] rounded-full'>{product.discount}% off</span>
                </div>
                <Button
                    style={{
                        backgroundColor: ' #00BFFF',
                        color: 'white',
                        position: 'absolute',
                        top: '10px',
                        left: '10px'
                    }}
                >{product?.discount + '%'}</Button>

                <Button
                    className='cart1_'
                    style={{
                        borderRadius: '100%',
                        color: 'black',
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                    }}
                >
                    <AiOutlineFullscreen
                        className='fullscr-icon'
                        style={{
                            fontSize: '25px',
                            fontWeight: 'bold',
                            color: 'black',
                        }}
                        onClick={() => setisopen(true)}
                    />
                </Button>
                <Product isopen={isopen} handleOpen={handleOpen} product={product}></Product>

                <Button
                    className='cart1_'
                    style={{
                        borderRadius: '100%',
                        color: 'white',
                        position: 'absolute',
                        top: '20%',
                        right: '10px',
                    }}
                >
                    <FaRegHeart className='heart-icon'
                        style={{
                            fontSize: '25px',
                            fontWeight: 'bold',
                            color: 'black',
                        }}
                    />
                </Button>

            </div>
        </div>
    )
}

export default Cart;