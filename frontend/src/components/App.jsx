import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Callback from './Callback';
import Playlist from './Playlist';
import About from './About';
import Privacy from './Privacy';
import Contact from './Contact';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/playlist" element={<Playlist />} />
          <Route exact path="/callback" element={<Callback />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/privacy" element={<Privacy />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default App;