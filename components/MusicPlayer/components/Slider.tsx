import React from "react";

function Slider({ slides, handleChangeMusic }) {
  function handleResizeSlider({ target }) {
    if (isLocked) {
      return;
    } else if (target.classList.contains("music-player__info")) {
      this.classList.add("resize");
      setProperty(this, "--controls-animate", "down running");
      return;
    } else if (target.classList.contains("music-player__playlist-button")) {
      this.classList.remove("resize");
      setProperty(this, "--controls-animate", "up running");
      return;
    }
  }
  function handlePlayMusic() {
    if (selectedSong.currentTime === selectedSong.duration) {
      handleChangeMusic({});
    }

    this.classList.toggle("click");
    songIsPlayed = !songIsPlayed;
    selectedSong.paused ? selectedSong.play() : selectedSong.pause();
  }

  return (
    <div className="slider center" onClick={handleResizeSlider}>
      <div className="slider__content center">
        <button className="music-player__playlist-button center button">
          <i className="icon-playlist" />
        </button>
        <button
          onClick={handlePlayMusic}
          className="music-player__broadcast-guarantor center button"
        >
          <i className="icon-play" />
          <i className="icon-pause" />
        </button>
        <div className="slider__imgs flex-row">
          {slides.map(({ songName, files: { cover } }) => (
            <img src={cover} className="img" alt={songName} />
          ))}
        </div>
      </div>
      <div className="slider__controls center">
        <button
          className="slider__switch-button flex-row button"
          onClick={() => handleChangeMusic({ isPrev: true })}
        >
          <i className="icon-back" />
        </button>
        <div className="music-player__info text_trsf-cap">
          <div>
            <div className="music-player__singer-name">
              <div>{slides[0].artist}</div>
            </div>
          </div>
          <div>
            <div className="music-player__subtitle">
              <div>{slides[0].songName}</div>
            </div>
          </div>
        </div>
        <button
          className="slider__switch-button flex-row button"
          onClick={() => handleChangeMusic({ isPrev: false })}
        >
          <i className="icon-next" />
        </button>
        <div
          className="progress center"
          onPointerdown={(e) => {
            handleScrub(e);
            progressBarIsUpdating = true;
          }}
        >
          <div className="progress__wrapper">
            <div className="progress__bar center" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Slider;
