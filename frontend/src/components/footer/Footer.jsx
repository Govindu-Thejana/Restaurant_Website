import React from 'react'
import './footer.css'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
      <div className="footer-content">
        <div className="footer-content-left">
          <img src={assets.logo} alt="" />
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit atque vero eos provident sit molestiae aut in incidunt! Fuga nemo quisquam aliquam reprehenderit molestias quo debitis, asperiores ullam iusto velit.</p>
          <div className="footer-social-icons">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.linkedin_icon} alt="" />
          </div>
        </div>
        <div className="footer-content-center">
          <h2>COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="footer-content-right">
          <h2>GET IN TOUCH</h2>
          <ul>
            <li>+94713834401</li>
            <li>tomato@food.net</li>
          </ul>
        </div>
        
      </div>
      <hr/>
      <p className="footer-copyright">Copyright 2024 © Tomato.com - All Right Reserved.</p>
    </div>
  )
}

export default Footer
