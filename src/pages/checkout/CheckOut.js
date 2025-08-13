

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { LiaRupeeSignSolid } from 'react-icons/lia';
import { Button } from '@mui/material';
import { MdShoppingCartCheckout } from 'react-icons/md';
import TextField from '@mui/material/TextField';
import { showAlert } from '../../features/alert/alertSlice';
import { addOrder } from '../../features/order/orderAPI';
import CircularProgress from '@mui/material/CircularProgress';
import { emptyCart } from '../../features/user/userSlice';


const CheckOut = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const products = useSelector((state) => state?.user?.item?.cart);
    const orders = useSelector((state) => state?.orders);
    const user = useSelector((state)=>state?.user)
    const [total, setTotal] = useState(0);

    const [order, setOrder] = useState({
        name: '',
        phone: '',
        email: '',
        country: '',
        landmark: '',
        street: '',
        town: '',
        state: '',
        pincode: '',
        products: [],       // Array of product ObjectIds
        totalamount: 0,
        orderStatus: 'pending', // default value
    })

    const handleChange = async (e) => {
        e.stopPropagation();
        setOrder({
            ...order,
            [e.target.name]: e.target.value
        })
    }

    const handleClick = async (e) => {

        if (!order?.name || !order?.phone || !order?.email || !order?.country || !order?.landmark || !order?.street
            || !order?.town || !order?.state || !order?.pincode || order?.orderStatus === '') {
            dispatch(showAlert({
                color: 'error',
                msg: 'Please fill all details'
            }));
            return;
        }

        try {
            await dispatch(addOrder(order)).unwrap();
            dispatch(emptyCart())
            navigate('/order/confirm');
            setOrder({
                name: '',
                phone: '',
                email: '',
                country: '',
                landmark: '',
                street: '',
                town: '',
                state: '',
                pincode: '',
                products: [],       // Array of product ObjectIds
                totalamount: 0,
                orderStatus: 'pending', // default value
            })

        } catch (error) {
            dispatch(showAlert({
                color: 'error',
                msg: error
            }))
        }
    }

    const getCart = async () => {
        try {
            const sum = products?.reduce((acc, curr) => acc + curr?.product?.price * curr?.quantity, 0);
            setTotal(sum);
            setOrder({
                ...order,
                products: products.map((item) => ({
                    product: item?.product?._id,
                    RAM: item?.RAM,
                    quantity: item?.quantity,
                    size: item?.size,
                    weight: item?.weight
                })),
                totalamount : sum
            })
            // setOrder({ ...order, totalamount: sum })

        } catch (error) {
            console.log('Error in getting cart', error);
        }
    }

    useEffect(() => {
        getCart();
    }, [products])

    return (
        <div className="space">

            <div >
                <div className="flex justify-between items-center md:items-start flex-col md:flex-row">
                    <div className="w-full md:w-8/12 p-5">
                        <h1 className='font-bold text-[15px] md:text-[25px]'>Billing Details</h1>

                        <form className='flex mt-2 justify-between flex-wrap gap-3 '>
                            <div className='w-full md:w-[48%]'>
                                <TextField onChange={handleChange} value={order?.name} className='w-full' id="outlined-basic" name='name' label="Full Name" variant="outlined" required />
                            </div>
                            <div className='w-full md:w-[48%]'>
                                <TextField onChange={handleChange} value={order?.phone} className='w-full' id="outlined-basic" name='phone' label="Phone no" type='tel' variant="outlined" required />
                            </div>
                            <div className='w-full md:w-[48%]'>
                                <TextField onChange={handleChange} value={order?.email} className='w-full' id="outlined-basic" name='email' label="email" type='email' variant="outlined" required />
                            </div>
                            <div className='w-full md:w-[48%]'>
                                <TextField onChange={handleChange} value={order?.country} className='w-full' id="outlined-basic" name='country' label="Country" variant="outlined" required />
                            </div>
                            <div className='w-full'>
                                <TextField onChange={handleChange} value={order?.landmark} className='w-full' id="outlined-basic" name='landmark' label="Landmark" variant="outlined" required />
                            </div>
                            <div className='w-full'>
                                <TextField onChange={handleChange} value={order?.street} className='w-full' id="outlined-basic" name='street' label="Street/Village address" variant="outlined" required />
                            </div>
                            <div className='w-full'>
                                <TextField onChange={handleChange} value={order?.town} className='w-full' id="outlined-basic" name='town' label="Town/City" variant="outlined" required />
                            </div>
                            <div className='w-full'>
                                <TextField onChange={handleChange} value={order?.state} className='w-full' id="outlined-basic" name='state' label="State" variant="outlined" required />
                            </div>
                            <div className='w-full'>
                                <TextField onChange={handleChange} value={order?.pincode} className='w-full' id="outlined-basic" name='pincode' label="Pin Code" variant="outlined" required />
                            </div>
                        </form>

                    </div>
                    <div className="w-full md:w-4/12 p-5">
                        <div className='w-full p-2 md:p-5 flex flex-col gap-5 border-2 '>
                            <h1 className='font-semibold text-start'>CART TOTALS</h1>
                            <hr />
                            <table >
                                <thead>
                                    <tr >
                                        <th className='border-2 border-solid p-2 text-start'>Product</th>
                                        <th className='border-2 border-solid p-2 text-start'>subtotals</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        products?.map((item, index) => {

                                            return (
                                                <tr key={index}>
                                                    <td className='border-2 border-solid p-2'>{item?.product?.name?.length > 10 ? item?.product?.name?.substr(0, 10) : item?.product?.name}*{item?.quantity}</td>
                                                    <td className='border-2 border-solid p-2 flex items-center'><LiaRupeeSignSolid /><span>{item?.product?.price * item?.quantity}</span></td>
                                                </tr>

                                            )
                                        })
                                    }
                                    <tr >
                                        <td className='border-2 border-solid p-2'>Total</td>
                                        <td className='border-2 border-solid p-2 flex items-center'><LiaRupeeSignSolid /><span>{total}</span></td>
                                    </tr>
                                </tbody>
                            </table>

                            <Button onClick={handleClick} style={{ width: '100%', backgroundColor: 'green', color: 'white', fontWeight: 'bold' }}><MdShoppingCartCheckout style={{ fontSize: '20px', marginRight: '5px' }} />
                                {orders?.status === 'loading' ? <span className='flex justify-center items-center'>Placed Order<CircularProgress size={20} style={{ color: 'white', marginLeft: '5px' }} /></span> : 'Placed Order'}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default CheckOut;