import React from 'react';
import './Footer.css'; // Add your custom styles here

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* Company Info */}
        <div className="footer-section">
          <h4>About Us</h4>
          <p>
            We are dedicated to providing you with the best online shopping experience. 
            Shop the latest trends at unbeatable prices!
          </p>
        </div>

        {/* Links */}
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/shop">Shop</a></li>
            <li><a href="/about">About Us</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/faq">FAQs</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          </div>
        </div>

        {/* Newsletter */}
        <div className="footer-section">
          <h4>Subscribe to our Newsletter</h4>
          <form className="newsletter-form">
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
            />
            <button type="submit" className="newsletter-button">Subscribe</button>
          </form>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} YourStoreName. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
