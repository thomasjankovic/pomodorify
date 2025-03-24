import React from 'react';

const Privacy = () => {
  return (
    <div className="section">
      <h1>Privacy Policy</h1>
      <p>Pomodorify was developed as an open source app powered by the Spotify Web API. By choosing to use this app, you agree to the use of your Spotify account username and data for read access to your Spotify library.</p>
      <p>None of the data used by Pomodorify is stored or collected anywhere, and it is not shared with any third parties. All information is used solely for displaying your Playlist.</p>
      <p>If you would like to revoke Pomodorify's permissions, you can visit your <a href="https://www.spotify.com/us/account/apps/" target="_blank" rel="noopener noreferrer">apps page</a> and click "Remove Access" next to Pomodorify. <a href="https://support.spotify.com/us/article/spotify-on-other-apps/" target="_blank" rel="noopener noreferrer">Here</a> is more information about linking your Spotify account with other apps.</p>
    </div>
  );
};

export default Privacy;