import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SongList from './SongList';
import './Playlist.css';

const Playlist = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const fetchPlaylist = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const code_verifier = localStorage.getItem('code_verifier');
    // fetch('http://localhost:8080', {
    fetch('https://us-central1-direct-landing-293315.cloudfunctions.net/display_playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'code':code, 'code_verifier':code_verifier }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log('Received data:', data);
        setSongs(data);
      })
      .catch((error) => {
        // console.error('Error exchanging code:', error);
      });
  }

  useEffect(() => {
      fetchPlaylist();
  }, []);

  const handleLogout = () => {
    const logoutUrl = 'https://accounts.spotify.com/en/logout';
    const popup = window.open(logoutUrl, '_blank', 'width=400,height=500');
    
    setTimeout(() => {
      popup.close();
      navigate('/');
    }, 2000);
  };  
    
  return (
    <div>
      <h2>Pomodoro Playlist</h2>
      <div>
        <SongList songs={songs} />
      </div>
      <div className="playlist-buttons">
        <button>Change Duration</button>
        <button>New Playlist</button>
        <button>Download Playlist</button>
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Playlist;