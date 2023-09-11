import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
        <div className="footer-line"></div>
        <ul className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <Link to="/contact">Contact</Link>
        </ul>
        <p className="footer-text">&copy; {new Date().getFullYear()} Thomas Jankovic</p>
    </footer>
  );
};

export default Footer;