import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount } = useContext(StoreContext);

  const deliveryFee = 2;
  const subtotal = getTotalCartAmount();
  const total = subtotal + deliveryFee;

  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/order');
  };

  return (
    <div className='cart-container'>
      <h1 className='cart-title'>Your Cart</h1>
      <div className='cart-content'>
        <div className='cart-items'>
          <div className='cart-items-header'>
            <p>Item</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Action</p>
          </div>
          {food_list.map((item) => {
            if (cartItems[item._id] > 0) {
              return (
                <div key={item._id} className='cart-item'>
                  <div className='cart-item-details'>
                    <img src={item.image} alt={item.name} className='cart-item-image' />
                    <p className='cart-item-name'>{item.name}</p>
                  </div>
                  <p className='cart-item-price'>₹{item.price.toFixed(2)}</p>
                  <p className='cart-item-quantity'>{cartItems[item._id]}</p>
                  <p className='cart-item-total'>₹{(item.price * cartItems[item._id]).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item._id)} className='cart-item-remove'>
                    <FaTrash />
                  </button>
                </div>
              );
            }
            return null;
          })}
        </div>

        <div className="cart-summary">
          <h2>Order Summary</h2>
          <div className="cart-summary-details">
            <div className="cart-summary-row">
              <p>Subtotal</p>
              <p>₹{subtotal.toFixed(2)}</p>
            </div>
            <div className="cart-summary-row">
              <p>Delivery Fee</p>
              <p>₹{deliveryFee.toFixed(2)}</p>
            </div>
            <div className="cart-summary-row total">
              <p>Total</p>
              <p>₹{total.toFixed(2)}</p>
            </div>
          </div>
          <button className="checkout-button" onClick={handleCheckout}>Proceed to Checkout</button>

          <div className="cart-promocode">
            <h3>Promo Code</h3>
            <div className="cart-promocode-input">
              <input type="text" placeholder="Enter promo code" />
              <button>Apply</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
