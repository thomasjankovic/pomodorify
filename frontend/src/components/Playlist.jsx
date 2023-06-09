import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import SongList from './SongList';
import './Playlist.css';

const Playlist = () => {
  const [songs, setSongs] = useState([]);
  const navigate = useNavigate();

  const fetchPlaylist = () => {
      axios.get('http://localhost:5000/playlist')
          .then(response => {
              console.log(response.data);
              setSongs(response.data);
          })
          .catch(error => {
              console.log(error);
          });
  };

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