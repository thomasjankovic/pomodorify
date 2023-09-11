import React, { useState, useEffect } from 'react';
import './Home.css'

const Home = () => {
  const handleLogin = () => {
    const spotifyClientId = '99a9dbf0e4c44cca8f6218283681116a';
    const redirectUri = 'http://localhost:3000/playlist';
    // const redirectUri = 'https://pomodorify.thomasjankovic.com/playlist';
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}`;

    window.open(authUrl, '_self');
  };  

  return (
    <div className="section">
      <h2>Pomodoro Method Playlist Generator</h2>
      <button className="login-button" onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Home;