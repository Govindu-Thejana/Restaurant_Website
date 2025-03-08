import React, { useState, useEffect, useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { assets } from '../../assets/assets'; // Add this import for the icons

const Cart = () => {
  const { cartItems, addToCart, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const url = "http://localhost:3000";
  const navigate = useNavigate();

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${url}/api/products/`);
      setFoods(response.data.products);
    } catch (error) {
      console.error("Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  const deliveryFee = 2;
  const subtotal = getTotalCartAmount();
  const total = subtotal + deliveryFee;

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
          {loading ? (
            <p>Loading...</p>
          ) : (
            <>
              {foods.length === 0 ? (
                <p>Your cart is empty</p>
              ) : (
                foods.map((item) => {
                  if (cartItems[item._id] > 0) {
                    return (
                      <div key={item._id} className='cart-item'>
                        <div className='cart-item-details'>
                          <img src={`${url}/uploads/${item.image}`} alt={item.name} className='cart-item-image' />
                          <p className='cart-item-name'>{item.name}</p>
                        </div>
                        <p className='cart-item-price'>₹{item.price.toFixed(2)}</p>
                        <div className='cart-item-counter'>
                          <img 
                            onClick={() => removeFromCart(item._id)} 
                            src={assets.remove_icon_red} 
                            alt="Remove" 
                            className='cart-counter-icon'
                          />
                          <p>{cartItems[item._id]}</p>
                          <img 
                            onClick={() => addToCart(item._id)} 
                            src={assets.add_icon_green} 
                            alt="Add" 
                            className='cart-counter-icon'
                          />
                        </div>
                        <p className='cart-item-total'>₹{(item.price * cartItems[item._id]).toFixed(2)}</p>
                        <button 
                          onClick={() => removeFromCart(item._id)} 
                          className='cart-item-remove'
                        >
                          <FaTrash />
                        </button>
                      </div>
                    );
                  }
                  return null;
                })
              )}
            </>
          )}
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
          <button className="checkout-button" onClick={handleCheckout}>
            Proceed to Checkout
          </button>

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