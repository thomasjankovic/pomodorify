import React from 'react';
import './Home.css'

const Home = () => {
  function generateRandomString(length) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  async function generateCodeChallenge(codeVerifier) {
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
  }  

  const handleLogin = () => {
    const clientId = '99a9dbf0e4c44cca8f6218283681116a';
    const redirectUri = 'http://localhost:3000/playlist';
    // const redirectUri = 'https://pomodorify.thomasjankovic.com/playlist';
    let codeVerifier = generateRandomString(128);
    generateCodeChallenge(codeVerifier).then(codeChallenge => {
      let state = generateRandomString(16);
      let scope = 'user-library-read';
      localStorage.setItem('code_verifier', codeVerifier);
      let args = new URLSearchParams({
        response_type: 'code',
        client_id: clientId,
        scope: scope,
        redirect_uri: redirectUri,
        state: state,
        code_challenge_method: 'S256',
        code_challenge: codeChallenge
      });
      window.location = 'https://accounts.spotify.com/authorize?' + args;
    });
  }

  return (
    <div className="section">
      <h2>Pomodoro Method Playlist Generator</h2>
      <button className="login-button" onClick={handleLogin}>Login with Spotify</button>
    </div>
  );
};

export default Home;