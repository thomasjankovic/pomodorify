import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TrackList from './TrackList';
import './Playlist.css';

const Playlist = () => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [minutes, setMinutes] = useState(25);
  const [removedTracks, setRemovedTracks] = useState([]);
  const navigate = useNavigate();

  async function fetchPlaylist() {
    if (!loading) {
      setLoading(true);
    }
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const code_verifier = localStorage.getItem('code_verifier');
    try {
      const response = await fetch('http://localhost:8080', { // Uncomment to run locally
      // const response = await fetch('https://us-central1-direct-landing-293315.cloudfunctions.net/display_playlist', { // Uncomment to run in production
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 'code':code, 'code_verifier':code_verifier, 'minutes':minutes, 'removed_tracks':removedTracks, 'export':false }),
      });
      if (response.status === 500) {
        const errorMessage = await response.text();
        if (errorMessage == "Unable to create a playlist of selected duration based on your Spotify library.") {
          setLoading(false);
          alert(errorMessage);
          setMinutes(25);
        } else {
          console.log('Unknown code 500 server error.')
        }
      } else {
        const data = await response.json();
        setTracks(data);
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      // alert('Session timed out.')
      alert(`
        Error type: ${error.name}
        Error code: ${error.code}
        Error message: ${error.message}
      `);
      handleLogout();
    }
  }  

  useEffect(() => {
      fetchPlaylist();
  }, [minutes, removedTracks]);

  const handleDurationChange = () => {
    const newDuration = prompt('Enter new playlist duration in minutes:');
    if (newDuration !== null && !isNaN(newDuration)) {
      const durationInMinutes = parseInt(newDuration);
      if (durationInMinutes <= 900) {
        setMinutes(durationInMinutes);
      } else {
        alert('Maximum allowed duration is 900 minutes. Please enter a valid duration.');
      }
    }
  };

  const handleRemoveTrack = (track_id) => {
    setRemovedTracks((prev) => [...prev, track_id]);
  };

  const exportPlaylist = (title) => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const code_verifier = localStorage.getItem('code_verifier');
    fetch('http://localhost:8080', {
    // fetch('https://us-central1-direct-landing-293315.cloudfunctions.net/display_playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 'code':code, 'code_verifier':code_verifier, 'minutes':minutes, 'export':true, 'title':title })
    })
      .then((response) => response.text())
      .then((url) => {
        window.open(url, '_blank', 'noopener,noreferrer');
        alert('Your playlist has been successfully exported to Spotify.')
      })
      .catch((error) => {
        alert(`
          Error type: ${error.name}
          Error code: ${error.code}
          Error message: ${error.message}
        `);
        handleLogout();
      });
  }

  const handleExportRequest = () => {
    const title = prompt('Enter a title for your new playlist:');
    const max_title_length = 100;
    if (title.length === 0) {
      alert("Title cannot be empty. Please enter a title.");
      handleExportRequest();
    } else if (title.length > max_title_length) {
      alert(`Title is too long (max ${max_title_length} characters). Please enter a shorter title.`);
      handleExportRequest();
    } else if (title != null) {
      exportPlaylist(title);
    }
  };

  const handleLogout = () => {
    const logoutUrl = 'https://accounts.spotify.com/en/logout';
    const popup = window.open(logoutUrl, '_blank', 'width=400,height=500');
    
    setTimeout(() => {
      popup.close();
      navigate('/');
    }, 1000);

    fetch('http://localhost:8080', {
    // fetch('https://us-central1-direct-landing-293315.cloudfunctions.net/display_playlist', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({'log_out':true})
    })
      .then((response) => response.text())
      .then((result) => {
        // console.log(result);
      })
      .catch((error) => {
        alert(`
          Error type: ${error.name}
          Error code: ${error.code}
          Error message: ${error.message}
        `);
      });
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
          <TrackList tracks={tracks} onRemove={handleRemoveTrack} />
          <div className="playlist-duration">
            Playlist Duration: {minutes} minutes
          </div>
          <div className="playlist-buttons">
            <button onClick={handleDurationChange}>Change Duration</button>
            <button onClick={handleExportRequest}>Export to Spotify</button>
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