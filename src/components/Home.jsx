import React from 'react';
import './Home.css'

const Home = () => {
  const handleLogin = () => {
    const spotifyClientId = '99a9dbf0e4c44cca8f6218283681116a';
    // const redirectUri = 'http://localhost:3000/playlist';
    const redirectUri = 'https://pomodorify.thomasjankovic.com/playlist';
    const scopes = 'user-library-read';
    const state = generateRandomString(16);
    const authUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&response_type=token&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&state=${encodeURIComponent(state)}`;

    window.open(authUrl, '_self');
  };

  const generateRandomString = (length) => {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const generateCodeChallenge = async (codeVerifier) => {
    function base64encode(string) {
      return btoa(String.fromCharCode.apply(null, new Uint8Array(string)))
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=+$/, '');
    }
    const encoder = new TextEncoder();
    const data = encoder.encode(codeVerifier);
    const digest = await window.crypto.subtle.digest('SHA-256', data);
    return base64encode(digest);
  };

  const OLDhandleLogin = () => {
    const spotifyClientId = '99a9dbf0e4c44cca8f6218283681116a';
    const redirectUri = 'http://localhost:3000/playlist';
    // const redirectUri = 'https://pomodorify.thomasjankovic.com/playlist';
    const scopes = 'user-library-read';
    const codeVerifier = generateRandomString(128);
    generateCodeChallenge(codeVerifier).then((codeChallenge) => {
      localStorage.setItem('code_verifier', codeVerifier);
      const authUrl = `https://accounts.spotify.com/authorize?client_id=${spotifyClientId}&response_type=code&redirect_uri=${encodeURIComponent(redirectUri)}&scope=${encodeURIComponent(scopes)}&code_challenge_method=S256&code_challenge=${codeChallenge}`;
      window.location.href = authUrl;
    });
  };

  return (
    <div className="section">
      <h2>Pomodoro Method Playlist Generator</h2>
      <button className="login-button" onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Home;