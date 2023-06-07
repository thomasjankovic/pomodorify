import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SongList from './components/SongList'
// import './App.css';

function App() {
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    // Make a GET request to the Flask server to get the user's liked songs from Spotify
    axios.get('http://localhost:5000/playlist')
      .then(response => {
        console.log(response.data);
        setSongs(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="App">
      <SongList songs={songs} />
    </div>
  );
}

export default App;