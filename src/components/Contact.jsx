import React from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa'
import './Contact.css'

const Contact = () => {
  return (
    <div className="section">
      <h1>Contact Me</h1>
      <div className="contact-links">
        <a href="mailto:thomas@thomasjankovic.com"><FaEnvelope /> Email</a>
        <span className="contact-separator"></span>
        <a href="https://github.com/thomasjankovic" target="_blank" rel="noopener noreferrer"><FaGithub /> GitHub</a>
        <span className="contact-separator"></span>
        <a href="https://www.linkedin.com/in/thomas-jankovic/" target="_blank" rel="noopener noreferrer"><FaLinkedin /> LinkedIn</a>
      </div>
    </div>
  );
};

export default Contact;