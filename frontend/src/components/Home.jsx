import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css'

const Home = () => {
  const navigate = useNavigate();

  const oldHandleLogin = () => {
    navigate('/playlist');
  };

  const handleLogin = () => {
    const loginUrl = 'https://accounts.spotify.com/en/login';
    const popup = window.open(loginUrl, '_blank', 'width=400,height=500');

    const intervalId = setInterval(() => {
      if (popup.closed) {
        clearInterval(intervalId);
        navigate('/playlist');
      }
    }, 500);
  };

  return (
    <div className="section">
      <h1>Pomodoro Method Playlist Generator</h1>
      <button className="login-button" onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Home;