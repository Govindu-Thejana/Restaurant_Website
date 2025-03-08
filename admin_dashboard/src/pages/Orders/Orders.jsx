import React, { useState, useEffect } from 'react';
import './Orders.css';
import { toast } from 'react-toastify';
import axios from 'axios';
import { assets } from '../../assets/assets';

const Orders = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchAllOrders = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/orders/`);
      console.log(response.data.data);
      setOrders(response.data.data);
      setFilteredOrders(response.data.data);
    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to fetch orders: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const statusHandler = async (event, orderId) => {
    const status = event.target.value;
    try {
      const response = await axios.patch(`${url}/api/orders/${orderId}/status`, { status });

      if (response.data.success) {
        setOrders(orders.map(order => order._id === orderId ? { ...order, status } : order));
        setFilteredOrders(filteredOrders.map(order => order._id === orderId ? { ...order, status } : order));
        toast.success(response.data.message);
      } else {
        toast.error("Failed to update status");
      }
    } catch (error) {
      console.error("Status Update Error:", error);
      toast.error("Failed to update status: " + error.message);
    }
  };

  const deleteOrderHandler = async (orderId) => {
    try {
      const response = await axios.delete(`${url}/api/orders/${orderId}`);
      if (response.data.success) {
        setOrders(orders.filter(order => order._id !== orderId));
        setFilteredOrders(filteredOrders.filter(order => order._id !== orderId));
        toast.success(response.data.message);
      } else {
        toast.error("Failed to delete order");
      }
    } catch (error) {
      console.error("Delete Order Error:", error);
      toast.error("Failed to delete order: " + error.message);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    if (term === '') {
      setFilteredOrders(orders);
    } else {
      const filtered = orders.filter(order =>
        order.name.toLowerCase().includes(term) ||
        order.email.toLowerCase().includes(term) ||
        (order.shippingAddress?.street && order.shippingAddress.street.toLowerCase().includes(term)) ||
        order.items.some(item => item.name.toLowerCase().includes(term))
      );
      setFilteredOrders(filtered);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <input
        type="search"
        placeholder="Search by name, email, address, or item"
        value={searchTerm}
        onChange={handleSearch}
        className="search-bar"
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="order-list">
          {filteredOrders.map((order, index) => (
            <div key={index} className='order-item'>
              <img src={assets.parcel_icon} alt="Parcel" />

              <p className='order-item-name'><strong>Customer Name:</strong> {order.name}</p>
              <p className='order-item-email'><strong>Email:</strong> {order.email}</p>
              {order.phoneNumber && (
                <p className='order-item-phone'><strong>Phone Number:</strong> {order.phoneNumber}</p>
              )}

              {order.shippingAddress && (
                <div className="order-item-address">
                  <p><strong>Shipping Address:</strong> {order.shippingAddress.street}, {order.shippingAddress.city}, {order.shippingAddress.country}, {order.shippingAddress.zipCode}</p>
                </div>
              )}

              <p className='order-item-payment'><strong>Payment Method:</strong> {order.paymentMethod}</p>

              <h4><strong>Order Items:</strong></h4>
              <ul className="order-item-list">
                {order.items?.map((item, idx) => (
                  <li key={idx}>
                    <strong>Item Name:</strong> {item.name} <br />
                    <strong>Quantity:</strong> {item.quantity} <br />
                    <strong>Price:</strong> Rs. {item.price} <br />
                    <strong>Total:</strong> Rs. {item.quantity * item.price}
                  </li>
                ))}
              </ul>

              <p><strong>Total Amount:</strong> Rs. {order.totalAmount}</p>

              <select
                name="status"
                value={order.status}
                onChange={(e) => statusHandler(e, order._id)}
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>

              <button className="delete-btn" onClick={() => deleteOrderHandler(order._id)}>
                Delete Order
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
