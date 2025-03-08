import React, { useState, useContext } from 'react';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import './PlaceOrder.css';

const PlaceOrder = () => {
  const { cartItems, getTotalCartAmount, clearCart } = useContext(StoreContext);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    street: '',
    city: '',
    zipCode: '',
    country: '',
    paymentMethod: 'credit_card',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const subtotal = getTotalCartAmount();
    const deliveryFee = 2;
    const total = subtotal + deliveryFee;

    const orderData = {
      name: formData.name,
      email: formData.email,
      street: formData.street,
      city: formData.city,
      country: formData.country,
      zipCode: formData.zipCode,
      paymentMethod: formData.paymentMethod,
      items: Object.values(cartItems).map(item => ({
        productId: item.id,  // Assuming your cart items have an `id`
        name: item.name,
        price: item.price,
        quantity: item.quantity
      })),
      totalAmount: total,
    };

    try {
      const response = await axios.post('http://localhost:3000/api/orders/new', orderData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 201) {
        console.log('Order placed successfully:', response.data);

        // Clear cart after order is successfully placed

        // Optionally, redirect to a confirmation page or show success message
        alert('Order placed successfully!');
      } else {
        console.error('Error placing order:', response.data);
        alert('Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error.response?.data || error.message);
      alert('An error occurred while placing the order. Please try again.');
    }
  };

  const subtotal = getTotalCartAmount();
  const deliveryFee = 2;
  const total = subtotal + deliveryFee;

  return (
    <div className="place-order-container">
      <h1>Place Your Order</h1>
      <div className="place-order-content">
        <form onSubmit={handleSubmit} className="order-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="street">Street Address</label>
            <input type="text" id="street" name="street" value={formData.street} onChange={handleInputChange} required />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="city">City</label>
              <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="zipCode">ZIP Code</label>
              <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleInputChange} required />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" name="country" value={formData.country} onChange={handleInputChange} required />
          </div>
          <div className="form-group">
            <label>Payment Method</label>
            <div className="payment-options">
              <label>
                <input type="radio" name="paymentMethod" value="credit_card" checked={formData.paymentMethod === 'credit_card'} onChange={handleInputChange} />
                Credit Card
              </label>
              <label>
                <input type="radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleInputChange} />
                PayPal
              </label>
            </div>
          </div>
          <button type="submit" className="place-order-button">Place Order</button>
        </form>
        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="summary-row"><span>Subtotal:</span><span>₹{subtotal.toFixed(2)}</span></div>
          <div className="summary-row"><span>Delivery Fee:</span><span>₹{deliveryFee.toFixed(2)}</span></div>
          <div className="summary-row total"><span>Total:</span><span>₹{total.toFixed(2)}</span></div>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
