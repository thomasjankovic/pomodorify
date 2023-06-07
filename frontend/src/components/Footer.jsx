import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-line"></div>
        <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
        <p className="footer-text">&copy; {new Date().getFullYear()} Thomas Jankovic</p>
    </footer>
  );
};

export default Footer;