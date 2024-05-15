import React from "react";

const Playlist = ({ songs, handleChangeMusic, audioRefs }) => {
  return (
    <ul className="music-player__playlist list">
      {songs.map(({ songName, artist, files: { cover } }, index) => (
        <li
          key={index}
          className="music-player__song"
          onClick={() => handleChangeMusic(index)}
        >
          <div className="flex-row _align_center">
            <img
              src={cover}
              className="img music-player__song-img"
              alt={songName}
            />
            <div className="music-player__playlist-info text_trsf-cap">
              <b className="text_overflow">{songName}</b>
              <span className="music-player__subtitle">{artist}</span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default Playlist;
