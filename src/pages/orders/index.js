
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder, updateOrder } from '../../features/order/orderAPI';
import { Link } from "react-router-dom";
import { MdPendingActions } from "react-icons/md";
import { MdCancel } from "react-icons/md";
import { GiConfirmed } from "react-icons/gi";
import { Button } from '@mui/material';
import { showAlert } from '../../features/alert/alertSlice';
import CircularProgress from '@mui/material/CircularProgress';

const Orders = () => {

    const dispatch = useDispatch();
    const orders = useSelector((state) => state?.orders?.item);
    const status = useSelector((state) => state?.orders?.status);
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const cancelOrder = async (id) => {

        try {
            await dispatch(updateOrder({ id, orderStatus: 'cancelled' })).unwrap();
            dispatch(showAlert({
                color: 'success',
                msg: 'Your order cancelled successfully!'
            }))
        } catch (error) {
            dispatch(showAlert({
                color: 'error',
                msg: error
            }))
        }
    }

    const handleOrder = async () => {
        dispatch(getOrder());
    }
    useEffect(() => {
        handleOrder();
    }, [])

    return (
        <div className="bg-gray-100 space p-3">
            <h1 className="font-bold text-[25px] mb-3">All Orders</h1>
            <div className='flex flex-col gap-5'>
                {
                    [...orders]?.reverse()?.map((item, index) => {
                        return <div className="flex flex-col gap-5 bg-white p-3">
                            <div className="flex items-center gap-3">
                                {item?.orderStatus === 'pending' ? <div><MdPendingActions style={{ color: 'black', fontSize: '30px' }} /></div> : ''}
                                {item?.orderStatus === 'cancelled' ? <div><MdCancel style={{ color: 'black', fontSize: '30px' }} /></div> : ''}
                                {item?.orderStatus === 'delivered' ? <div><GiConfirmed style={{ color: 'green', fontSize: '30px' }} /></div> : ''}
                                {
                                    item?.orderStatus === 'delivered' ?
                                        <div className='font-bold text-[20px] text-green-600'>{item?.orderStatus}</div> :
                                        <div className='font-bold text-[20px]'>{item?.orderStatus}</div>
                                }
                                <div>on {days[new Date(item?.date).getDay()]},</div>
                                <div>{new Date(item?.date).toLocaleDateString('en-GB', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric'
                                })}</div>
                            </div>
                            <div className="flex flex-wrap gap-5  p-3 rounded-[10px]">
                                {
                                    item?.products?.map((pro, index) => {
                                        return (<div className='w-full flex flex-wrap gap-10 bg-gray-100 p-3 rounded-[10px]'>
                                            <Link to={`/product/${pro?.product?._id}`}><div><img className="w-[100px] m-auto md:h-[100px] md:w-[100px] rounded-[10px]" src={pro?.product?.images?.[0]} /></div></Link>
                                            <div className="flex flex-col gap-3">
                                                <div className='font-semibold'>{pro?.product?.name}</div>
                                                <div >{pro?.product?.description?.length > 120 ? pro?.product?.description?.substr(0, 120) + '...' : pro?.product?.description}</div>
                                                <div>brand : {pro?.product?.brand}</div>
                                            </div>
                                        </div>)
                                    })
                                }
                            </div>
                            <div >
                                <div className="font-bold">{item?.orderStatus === 'delivered' ? 'delivered to' : 'delivering to'}</div>
                                <div className="font-bold">{item?.name} | {item?.phone}</div>
                                <div>{item?.landmark},{item?.street},{item?.town},{item?.state}-{item?.pincode}</div>
                            </div>
                            {
                                item?.orderStatus === 'pending' && <span><Button
                                    onClick={() => cancelOrder(item?._id)}
                                    sx={{
                                        backgroundColor: '#f3f4f6',
                                        color: 'black',
                                        fontWeight: 'bold'
                                    }}>
                                    {
                                        status === 'loading' ? (
                                            <>
                                                'cancel'
                                                <CircularProgress size={20} style={{ color: 'black', marginLeft: '3px' }} />
                                            </>
                                        ) :
                                            'Cancel'
                                    }
                                </Button>
                                </span>
                            }

                        </div>
                    })
                }
            </div>

        </div>
    )
}

export default Orders;