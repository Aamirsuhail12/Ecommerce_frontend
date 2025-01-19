

import productImg from '../../assets/product.jpg';
import * as React from 'react';
import Rating from '@mui/material/Rating';
import CountHandle from '../CountHandle';
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from '@mui/material';
import { BsCartFill } from "react-icons/bs";



const YourCarts = () => {

    return (
        <div className="w-full body_">
            <h2 className='font-bold text-[50px]'>Your Cart</h2>
            <p>There are 3 products in your cart.</p>
            <div className="flex items-start">
                <div className="md:w-8/12 p-5">
                    <table>
                        <thead>
                            <tr className='bg-gray-200 h-10'>
                                <th className='text-left w-[40%]'>Product</th>
                                <th className='text-center w-[15%]'>Unit Price</th>
                                <th className='text-center w-[20%]'>Quantiy</th>
                                <th className='text-center w-[12%]'>Subtotal</th>
                                <th className='text-center w-[13%]'>Remove</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className='border'>
                                <td className='text-left w-[40%]'>
                                    <div className='flex items-center gap-5'>
                                        <div className="w-[120px] h-[120px] p-5">
                                            <img src={productImg} className="w-full h-full" alt="Image not found">
                                            </img>
                                        </div>
                                        <div>
                                            <span className='font-semibold hover:text-red-800'>Field  Roast Chao Cheese Creamy Original</span>
                                            <Rating defaultValue={2.5} precision={0.5} readOnly />
                                        </div>
                                    </div>
                                </td>
                                <td className=' w-[15%] text-center'><span>$3.4</span></td>
                                <td className=' w-[20%] text-center'><CountHandle /></td>
                                <td className=' w-[12%] text-center'><span>$3.4</span></td>
                                <td className=' w-[13%] '><div className=' flex justify-center'><RiDeleteBinLine /></div></td>
                            </tr>
                            <tr className='border'>
                                <td className='text-left w-[40%]'>
                                    <div className='flex items-center gap-5'>
                                        <div className="w-[120px] h-[120px] p-5">
                                            <img src={productImg} className="w-full h-full" alt="Image not found">
                                            </img>
                                        </div>
                                        <div>
                                            <span className='font-semibold hover:text-red-800'>Field  Roast Chao Cheese Creamy Original</span>
                                            <Rating defaultValue={2.5} precision={0.5} readOnly />
                                        </div>
                                    </div>
                                </td>
                                <td className=' w-[15%] text-center'><span>$3.4</span></td>
                                <td className=' w-[20%] text-center'><CountHandle /></td>
                                <td className=' w-[12%] text-center'><span>$3.4</span></td>
                                <td className=' w-[13%] '><div className=' flex justify-center'><RiDeleteBinLine /></div></td>
                            </tr> <tr className='border'>
                                <td className='text-left w-[40%]'>
                                    <div className='flex items-center gap-5'>
                                        <div className="w-[120px] h-[120px] p-5">
                                            <img src={productImg} className="w-full h-full" alt="Image not found">
                                            </img>
                                        </div>
                                        <div>
                                            <span className='font-semibold hover:text-red-800'>Field  Roast Chao Cheese Creamy Original</span>
                                            <Rating defaultValue={2.5} precision={0.5} readOnly />
                                        </div>
                                    </div>
                                </td>
                                <td className=' w-[15%] text-center'><span>$3.4</span></td>
                                <td className=' w-[20%] text-center'><CountHandle /></td>
                                <td className=' w-[12%] text-center'><span>$3.4</span></td>
                                <td className=' w-[13%] '><div className=' flex justify-center'><RiDeleteBinLine /></div></td>
                            </tr> <tr className='border'>
                                <td className='text-left w-[40%]'>
                                    <div className='flex items-center gap-5'>
                                        <div className="w-[120px] h-[120px] p-5">
                                            <img src={productImg} className="w-full h-full" alt="Image not found">
                                            </img>
                                        </div>
                                        <div>
                                            <span className='font-semibold hover:text-red-800'>Field  Roast Chao Cheese Creamy Original</span>
                                            <Rating defaultValue={2.5} precision={0.5} readOnly />
                                        </div>
                                    </div>
                                </td>
                                <td className=' w-[15%] text-center'><span>$3.4</span></td>
                                <td className=' w-[20%] text-center'><CountHandle /></td>
                                <td className=' w-[12%] text-center'><span>$3.4</span></td>
                                <td className=' w-[13%] '><div className=' flex justify-center'><RiDeleteBinLine /></div></td>
                            </tr> <tr className='border'>
                                <td className='text-left w-[40%]'>
                                    <div className='flex items-center gap-5'>
                                        <div className="w-[120px] h-[120px] p-5">
                                            <img src={productImg} className="w-full h-full" alt="Image not found">
                                            </img>
                                        </div>
                                        <div>
                                            <span className='font-semibold hover:text-red-800'>Field  Roast Chao Cheese Creamy Original</span>
                                            <Rating defaultValue={2.5} precision={0.5} readOnly />
                                        </div>
                                    </div>
                                </td>
                                <td className=' w-[15%] text-center'><span>$3.4</span></td>
                                <td className=' w-[20%] text-center'><CountHandle /></td>
                                <td className=' w-[12%] text-center'><span>$3.4</span></td>
                                <td className=' w-[13%] '><div className=' flex justify-center'><RiDeleteBinLine /></div></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="md:w-4/12 p-5">
                    <div className=' p-5 flex flex-col gap-5 border-2'>
                        <h1 className='font-semibold'>CART TOTALS</h1>
                        <hr />
                        <div className='flex justify-between items-center'>
                            <span>Subtotal</span>
                            <span className='text-red-600 font-semibold'>$12.2</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Shipping</span>
                            <span className='font-semibold'>free</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Estimate for</span>
                            <span className='font-semibold'>India</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Total</span>
                            <span className='text-red-600 font-semibold'>$12.2</span>
                        </div>

                        <Button style={{ width: '100%', backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}><BsCartFill style={{ fontSize: '20px', marginRight: '5px' }} />
                            Add to Cart</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default YourCarts;