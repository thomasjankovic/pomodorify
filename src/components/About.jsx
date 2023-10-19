import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="section">
      <h1>About Pomodorify</h1>
      <p>Here's a bit of background – I like to have two things when studying: good music and a timer. I love the <a href="https://en.wikipedia.org/wiki/Pomodoro_Technique" target="_blank" rel="noopener noreferrer">Pomodoro Method</a>, but I wanted a Pomodoro timer that didn't ring, ding, or take me away from my music.</p>
      <p>That gave me an idea: what if my Pomodoro timer <i>was</i> music?</p>
      <p>Pomodorify is an app that makes custom-duration playlists. With Pomodorify, you can login to your Spotify account and receive a playlist made from your liked songs that is of a custom duration. At the press of a button, the you can export the playlist from Pomodorify to your Spotify account. When the music ends, so does your study session.</p> 
      <p>25 minutes is the default duration, since that is the length of a work session when using the Pomodoro Method, but you can change that. Give <Link to="/">Pomodorify</Link> a try!</p>
    </div>
  );
};

export default About;