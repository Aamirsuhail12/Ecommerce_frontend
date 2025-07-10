
import Rating from '@mui/material/Rating';
import { RiDeleteBinLine } from "react-icons/ri";
import { Button } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { deletes, getAll, update } from '../../RestApi';
import { LiaRupeeSignSolid } from "react-icons/lia";
import { FaMinus } from 'react-icons/fa6';
import { FaPlus } from 'react-icons/fa6';
import { MdAddShoppingCart } from "react-icons/md";
import { Mycontext } from '../../App';
import { MdShoppingCartCheckout } from "react-icons/md";
import { useNavigate } from 'react-router';


const YourCarts = () => {

    const navigate = useNavigate()
    const context = useContext(Mycontext);
    const [products, setProducts] = useState([])
    const [subtotal, setSubtotal] = useState(0)
    const getCart = async () => {
        try {

            const response = await getAll('http://localhost:5000/users/cart');
            setProducts(response?.data?.cart)
            const sum = response?.data?.cart?.reduce((acc, curr) => acc + curr?.product?.price * curr?.quantity, 0)
            setSubtotal(sum)
            context.setTotalCart(response?.data?.cart?.length);
        } catch (error) {
            console.log('Error in getting cart', error?.response?.data?.msg);
        }
    }

    const updateQuantity = async (id, qnt) => {

        try {
            const response = await update(`http://localhost:5000/users/cart/${id}`, { quantity: qnt })
            if (response?.data?.success) {
                getCart();
            }
        } catch (error) {
            console.log('Error in updating quantity', error?.response?.data?.msg)
        }
    }

    const deleteCart = async (id) => {

        try {
            const response = await deletes(`http://localhost:5000/users/cart/${id}`);

            if (response?.data?.success) {
                context.setalertBox({
                    open: true,
                    color: 'success',
                    msg: response?.data?.msg
                });
                getCart()
            }

        } catch (error) {
            console.log('Error in deleting product from cart', error?.response?.data?.msg);
            context?.setalertBox({
                open: true,
                color: 'error',
                msg: error?.response?.data?.msg
            })
        }

    }

    const handleClick = async (id, data) => {
        navigate(`/product/${id}?data=${encodeURIComponent(JSON.stringify(data))}`)
    }

    useEffect(() => {
        getCart();
    }, [])
    return (
        <div className="space">
            <h2 className='font-bold text-[25px] md:text-[35] lg:text-[50px]'>Your Cart</h2>
            {
                products.length === 0 ? <div className='m-[20px] gap-5 flex justify-center items-center flex-col'>
                    <h1 className='text-[25px] md:text-[35] lg:text-[50px] font-bold text-red-700'>Your Cart is Empty</h1>
                    <MdAddShoppingCart className='text-[#b91c1c] text-[70px] md:text-[100px]'  />
                </div> :
                    <div >
                        <p>There are {products.length} products in your cart.</p>
                        <div className="flex justify-between items-center md:items-start flex-col md:flex-row">
                            <div className="w-full md:w-8/12 p-5">
                                <div className='overflow-x-auto w-full'>
                                <table >
                                    <thead>
                                        <tr className='bg-gray-200 h-10'>
                                            <th className='text-left w-[40%] p-2'>Product</th>
                                            <th className='text-center w-[15%] p-2'>Unit Price</th>
                                            <th className='text-center w-[20%] p-2'>Quantity</th>
                                            <th className='text-center w-[12%] p-2'>Subtotal</th>
                                            <th className='text-center w-[13%] p-2'>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            products?.map((p, index) => {
                                                return (
                                                    <tr key={index} className='border'>
                                                        <td className='text-left w-[40%]'>
                                                            <div onClick={() => handleClick(p?.product?._id, p)} className='flex items-center gap-3 p-2'>
                                                                <div className="hidden md:block w-[120px] h-[120px] p-5">
                                                                    <img src={p?.product?.images[0]} className="w-full h-full" alt="Image not found">
                                                                    </img>
                                                                </div>
                                                                <div>
                                                                    <span className='font-semibold hover:text-red-800'>{p?.product?.name.length > 10 ? p?.product?.name?.substr(0, 10) + '...' : p?.product?.name}</span>
                                                                </div>
                                                            </div>
                                                        </td> 
                                                        <td className=' w-[15%] text-center'><span className='flex justify-center items-center'><LiaRupeeSignSolid />{p?.product?.price}</span></td>
                                                        <td className=' w-[20%] text-center'> <div className='flex justify-center items-center gap-3'>
                                                            <button className='w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300'
                                                                onClick={() => {
                                                                    if (p?.quantity > 1)
                                                                        updateQuantity(p._id, p?.quantity - 1);
                                                                }}
                                                            ><FaMinus /></button>
                                                            <span>{p?.quantity}</span>
                                                            <button
                                                                onClick={() => {
                                                                    updateQuantity(p._id, p?.quantity + 1);
                                                                }}
                                                                className='w-4 h-4 md:w-8 md:h-8 lg:w-12 lg:h-12 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300'>
                                                                <FaPlus /></button>
                                                        </div></td>
                                                        <td className=' w-[12%] text-center'><span className='flex justify-center items-center'><LiaRupeeSignSolid />{p?.product?.price * p.quantity}</span></td>
                                                        <td className=' w-[13%]'><div className=' flex justify-center '><RiDeleteBinLine onClick={() => deleteCart(p._id)} /></div></td>
                                                    </tr>

                                                )
                                            })
                                        }


                                    </tbody>
                                </table>
                                </div>
                            </div>
                            <div className="w-full md:w-4/12 p-5">
                                <div className=' p-5 flex flex-col gap-5 border-2'>
                                    <h1 className='font-semibold'>CART TOTALS</h1>
                                    <hr />
                                    <div className='flex justify-between items-center'>
                                        <span>Subtotal</span>
                                        <span className='text-red-600 font-semibold flex items-center'><LiaRupeeSignSolid />{subtotal}</span>
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
                                        <span className='text-red-600 font-semibold flex items-center'><LiaRupeeSignSolid />{subtotal}</span>
                                    </div>

                                    <Button style={{ width: '100%', backgroundColor: 'red', color: 'white', fontWeight: 'bold' }}><MdShoppingCartCheckout style={{ fontSize: '20px', marginRight: '5px' }} />
                                        Checkout</Button>
                                </div>
                            </div>
                        </div>
                    </div>
            }

        </div>
    )
}

export default YourCarts;