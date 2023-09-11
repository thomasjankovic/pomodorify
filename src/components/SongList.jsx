import React from "react";
import './SongList.css';

const SongList = ({ songs }) => {
  return (
    <div className="song-list-container">
      <div className="song-list-header">
        <div>#</div>
        <div></div>
        <div>Title</div>
        <div>Artist</div>
        <div>Album</div>
        <div>Duration</div>
      </div>
      {songs.map((song, index) => (
        <div className="song-list-item" key={index}>
          <div>{index + 1}</div>
          <div>
            <img src={song.album_art_url} alt={song.album} />
          </div>
          <div>{song.title}</div>
          <div>{song.artist}</div>
          <div>{song.album}</div>
          <div>{song.duration}</div>
        </div>
      ))}
    </div>
  );
};

export default SongList;