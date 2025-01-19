


import { Button, Dialog } from '@mui/material';
import productImg from '../../assets/product.jpg';
import StarIcon from "@mui/icons-material/Star";
import { AiOutlineFullscreen } from "react-icons/ai";
import { FaRegHeart } from "react-icons/fa";
import { useState } from 'react';
import Product from '../Product';
import { Rating } from '@mui/material';
import StarBorderIcon from "@mui/icons-material/StarBorder";


const Cart = ({ productview }) => {

    const [isopen, setisopen] = useState(false);
    function handleOpen() {
        console.log("Button clicked! Handling open action...");
        setisopen(false);
    }
    return (
        <div className={`${productview} relative cart h-auto w-[270px] flex flex-col shadow items-center justify-center gap-5 p-5`}>
          <img className='h-40 w-32 mt-10 product_img' src={productImg} />
            <div className='flex flex-col gap-2'>
                <p className='font-medium'>amkeen, a crispy, adds flavor it's a treat loved by all!</p>
                <span className='font-bold text-green-800'>IN STOKE</span>
                <Rating
                    value={5}
                    precision={0.5}
                />
                <div className='flex gap-2'>
                    <span className='opacity-50'><del>$20.00</del></span>
                    <span className='text-red-700 font-semibold'>$14.35</span>
                </div>
                <Button
                    style={{
                        backgroundColor: ' #00BFFF',
                        color: 'white',
                        position: 'absolute',
                        top: '10px',
                        left: '10px'
                    }}
                >28%</Button>

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
                <Product isopen={isopen} handleOpen={handleOpen}></Product>

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
                        onClick={() => setisopen(true)}
                    />
                </Button>

            </div>
        </div>
    )
}

export default Cart;