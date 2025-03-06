import React, { useState } from 'react';
import './LoginPopup.css';
import { assets } from '../../assets/assets';

const LoginPopup = ({ setShowLogin }) => {
  const [currState, setCurrState] = useState("Login");

  return (
    <div className="login-popup">
      <form className="login-popup-container">
        <div className="login-popup-title">
          <h2>{currState}</h2>
          <img onClick={() => setShowLogin(false)} src={assets.cross_icon} alt="Close" />
        </div>

        <div className="login-popup-input">
          {currState === "Login" ? null : <input type="text" placeholder="Your Name" required />}
          <input type="email" placeholder="Your Email" required />
          <input type="password" placeholder="Your Password" required />
        </div>

        <button>{currState === "Sign Up" ? "Create account" : "Login"}</button>

        <div className="login-popup-condition">
          <input type="checkbox" required />
          <p>I agree to the Terms and Conditions</p>
        </div>

        {currState === "Login" ? (
          <p>
            Create a new account? <span onClick={() => setCurrState("Sign Up")}>Click Here</span>
          </p>
        ) : (
          <p>
            Already have an account? <span onClick={() => setCurrState("Login")}>Login Here</span>
          </p>
        )}
      </form>
    </div>
  );
};

// Ensure this line is correctly placed at the end of the file
export default LoginPopup;
