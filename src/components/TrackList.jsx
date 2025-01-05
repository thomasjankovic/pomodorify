import React from "react";
import './TrackList.css';

const TrackList = ({ tracks, onRemove }) => {
  return (
    <div className="track-list-container">
      <div className="track-list-header">
        <div>#</div>
        <div></div>
        <div>Title</div>
        <div>Artist</div>
        <div>Album</div>
        <div>Duration</div>
        <div>Actions</div>
      </div>
      {tracks.map((track, index) => (
        <div className="track-list-item" key={index}>
          <div>{index + 1}</div>
          <div>
            <a target="_blank" rel="noopener" href={track.link}>
              <img src={track.album_art_url} alt={track.album}/>
            </a>
          </div>
          <div>{track.title}</div>
          <div>{track.artist}</div>
          <div>{track.album}</div>
          <div>{track.duration}</div>
          <div>
            <button className="remove-button" onClick={() => onRemove(track.id)}>
              Remove Track
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;