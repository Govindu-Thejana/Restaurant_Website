import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/api/orders/");
      console.log(response.data.data);
      setOrders(response.data.data);

    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch orders", error);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    const status = event.target.value;
    try {
      const response = await axios.post(url + "/api/order/status", {
        orderId,
        status,
      });

      if (response.data.success) {
        // Update local state directly for efficiency
        setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Status Update Error:", error);
      toast.error("Failed to update status", error);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="" />

              <p className='order-item-food'>
                {order.items?.map((item, idx) => (
                  <span key={idx}>
                    {item.name} X {item.quantity}
                    {idx !== order.items?.length - 1 && ", "}
                  </span>
                ))}
              </p>

              <p className="order-item-name">
                {order.name}
              </p>

              <div className="order-item-address">
                <p>{order.shippingAddress?.street},</p>
                <p>
                  {order.shippingAddress?.city}, {order.shippingAddress?.country}, {order.shippingAddress?.zipCode}
                </p>
              </div>

              <p>Items: {order.items?.length}</p>
              <p>Rs. {order.totalAmount}</p>

              <select
                onChange={(event) => statusHandler(event, order._id)}
                value={order.status}
              >
                <option value="Food Processing">Food Processing</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
