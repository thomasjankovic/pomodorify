import React from 'react';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Playlist from './Playlist';
import About from './About';
import Privacy from './Privacy';
import Contact from './Contact';
import Navbar from './Navbar';
import Footer from './Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/playlist" element={<Playlist />} />
          <Route exact path="/about" element={<About />} />
          <Route exact path="/privacy" element={<Privacy />} />
          <Route exact path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}


export default App;