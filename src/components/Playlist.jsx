import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SongList from './SongList';
import './Playlist.css';

const Playlist = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [minutes, setMinutes] = useState(25);
  const navigate = useNavigate();

  const fetchPlaylist = () => {
    if (!loading) {
      setLoading(true);
    }
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const code_verifier = localStorage.getItem('code_verifier');
    // fetch('http://localhost:8080', {
    fetch('https://us-central1-direct-landing-293315.cloudfunctions.net/display_playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'code':code, 'code_verifier':code_verifier, 'minutes':minutes }),
    })
      .then((response) => response.json())
      .then((data) => {
        setSongs(data);
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred while fetching data.');
        setLoading(false);
      });
  }

  useEffect(() => {
      fetchPlaylist();
  }, [minutes]);

  const handleDurationChange = () => {
    const newDuration = prompt('Enter new playlist duration in minutes:');
    if (newDuration !== null && !isNaN(newDuration)) {
      const durationInMinutes = parseInt(newDuration);
      if (durationInMinutes <= 200) {
        setMinutes(durationInMinutes);
      } else {
        alert('Maximum allowed duration is 200 minutes. Please enter a valid duration.');
      }
    }
  };

  const handleLogout = () => {
    const logoutUrl = 'https://accounts.spotify.com/en/logout';
    const popup = window.open(logoutUrl, '_blank', 'width=400,height=500');
    
    setTimeout(() => {
      popup.close();
      navigate('/');
    }, 1000);
  };  
    
  return (
    <div>
      {loading ? (
        <div className="loading-container">
          <p>Loading... </p>
          <img src="images/spinner.svg" alt="Loading..." />
        </div>
      ) : (
        <div className="playlist-container">
          <SongList songs={songs} />
          <div className="playlist-duration">
            Playlist Duration: {minutes} minutes
          </div>
          <div className="playlist-buttons">
            <button onClick={handleDurationChange}>Change Duration</button>
            {/* <button>Regenerate Playlist</button> */}
            {/* <button>Export to Spotify</button> */}
            <button onClick={handleLogout}>Log Out</button>
          </div>
        </div>
      )}
      <div className="spotify-logo">
        <img style={{ width: "8rem" }} src="/images/Spotify_Logo_RGB_White.png" alt="Spotify Logo"/>
      </div>
    </div>
  );
};

export default Playlist;