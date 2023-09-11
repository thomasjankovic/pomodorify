import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="section">
      <h1>About Pomodorify</h1>
      <p>Have you ever wanted to listen to your favorite music <i>and</i> keep track of the amount of time you've been working?</p>
      <p>Pomodorify is an app that makes custom-duration playlists. With Pomodorify, a user can login to their Spotify account and receive a playlist made from their liked songs that is of a custom duration. 25 minutes is the default duration, since that is the length of a work session when using the <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noopener noreferrer">Pomodoro Method</a>. Give <Link to="/">Pomodorify</Link> a try!</p>
    </div>
  );
};

export default About;