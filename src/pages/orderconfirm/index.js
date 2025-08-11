
import { GiConfirmed } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getOrder } from "../../features/order/orderAPI";
const OrderConfirmed = () => {

  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.item);
  const order = orders[orders.length - 1];

  const handleOrder = async () => {
    dispatch(getOrder());
  }
  useEffect(() => {
    handleOrder();
  }, [])
  return (
    <div className="space">
      <div className="flex flex-col justify-center items-center">
        <div >
          <GiConfirmed
            style={{
              color: 'green',
              fontSize: '100px'
            }}
          />
        </div>
        <div className="text-green-600 font-bold text-[20px] md:text-[50px]">Your Order is Confirmed</div>
      </div>
      <div >
        <div className="font-bold">delivering to</div>
        <div className="font-bold">{order?.name} | {order?.phone}</div>
        <div>{order?.landmark},{order?.street},{order?.town},{order?.state}-{order?.pincode}</div>
      </div>
    </div>
  )
}

export default OrderConfirmed;