// MusicPlayer.tsx
"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Song } from "./types";
import "./index.css";
import MarqueeText from "./components/MarqueeText";
import AudioProgressBar from "./components/AudioProgressBar";
import { IS_MOBILE } from "@/constants/global";
interface MusicPlayerProps {
  songs: Song[];
  onSwitchSong?: (id: string) => void;
  currentSongId?: string;
}

const colors = [
  "#c1cbd7",
  "#a2cba9",
  "#939391",
  "#bfbfbf",
  "#e0e5df",
  "#9ca9b6",
  "#c5b8a5",
  "#ececea",
  "#f4edd6",
  "#a7b49c",
  "#dfd6d7",
  "#d8caaf",
  "#b1c2d6",
  "#e9e0d6",
  "#ead0d1",
  "#c8d5d4",
  "#c2d2b5",
  "#a6a6a8",
  "#9d91a7",
];

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  songs,
  onSwitchSong,
  currentSongId,
}) => {
  // 用于从颜色数组中随机选择一个颜色
  const getRandomColor = (): string => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
  // 初始化 state，从 localStorage 读取或设置随机颜色
  const [bgColor, setBgColor] = useState<string>(() => {
    // 尝试从 localStorage 中获取颜色
    const storedColor = localStorage.getItem("bgColor");
    return storedColor ?? getRandomColor(); // 如果 localStorage 中没有颜色，则随机选择一个
  });

  // 当 bgColor 改变时，更新 localStorage 和 body 的背景色
  useEffect(() => {
    localStorage.setItem("bgColor", bgColor); // 存储颜色到 localStorage
    document.body.style.backgroundColor = bgColor; // 更新 body 背景色
  }, [bgColor]);

  // 提供一个方法来改变背景颜色
  const handleChangeColor = () => {
    const newColor = getRandomColor();
    setBgColor(newColor);
    document.body.style.backgroundColor = newColor;
  };

  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [hover, setHover] = useState(false);
  const [nextHover, setNextHover] = useState(false);

  useEffect(() => {
    const songIndex = songs.findIndex((song) => song.id === currentSongId);
    if (songIndex !== -1) setCurrentSongIndex(songIndex);
  }, [currentSongId, songs]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    } else {
      audioRef.current?.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0);
  };

  const handleTimeUpdate = () => {
    setCurrentTime(audioRef.current?.currentTime || 0);
  };

  const handleSeek = (time: number) => {
    const seekTime = time;
    audioRef.current!.currentTime = seekTime;
    setCurrentTime(seekTime);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    handleChangeColor();
    setCurrentSongIndex((currentSongIndex + 1) % songs.length);
  };

  const handlePrev = () => {
    handleChangeColor();
    setCurrentSongIndex((currentSongIndex - 1 + songs.length) % songs.length);
  };
  // 切换特定歌曲
  const handleSwitchSong = (songId: string) => {
    const songIndex = songs.findIndex((song) => song.id == songId);
    if (songIndex !== -1) {
      setCurrentSongIndex(songIndex);
    }
  };
  const formatDuration = (duration: number): string => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  // 状态控制是否使用网格布局
  const [isMobileLayout, setIsMobileLayout] = useState<boolean>(false);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const menuRef = useRef<HTMLImageElement | null>(null);

  const handleAnimationEnd = (event: any) => {
    console.log("Animation name:", event.animationName);
    console.log("Animation duration:", event.elapsedTime);
    if (event.animationName === "zoomOut") {
      setIsMobileLayout(false);
    }
  };

  const handleSwitchLayout = () => {
    setIsMobileLayout(true);
  };
  const handleSwitchLayoutOut = () => {
    replaceClass(imgRef, "animate-zoomIn", "animate-zoomOut");
    replaceClass(menuRef, "animate-scaleIn", "animate-scaleOut");
  };

  const replaceClass = (ref: any, oldClass: string, newClass: string): void => {
    const current = ref.current;
    if (current) {
      current.classList.replace(oldClass, newClass);
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={songs[currentSongIndex]?.url}
        onLoadedMetadata={handleLoadedMetadata}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
      />
      <main className="h-[430px] md:h-[546px] max-w-[470px] bg-white rounded-[32px] text-black  pb-6 overflow-auto">
        {!isMobileLayout ? (
          <section className=" grid grid-cols-12 gap-x-4 sticky top-0 bg-white z-[10] rounded-[32px] pt-[36px] pb-6 shadow-lg px-6">
            <aside className="relative  col-span-3">
              <Image
                src={songs[currentSongIndex]?.img}
                alt="Album Cover"
                className="rounded-[20px] h-full w-full object-cover"
                width={100}
                height={100}
              />

              {isPlaying ? (
                <Image
                  src="/icons/pause.svg"
                  alt="Description of the image"
                  onClick={togglePlayPause}
                  className="text-4xl cursor-pointer absolute top-1/2 left-1/2  -translate-x-1/2 -translate-y-1/2"
                  width={IS_MOBILE ? 46 : 56}
                  height={IS_MOBILE ? 46 : 56}
                />
              ) : (
                <Image
                  src="/icons/play.svg"
                  alt="Description of the image"
                  onClick={togglePlayPause}
                  className="text-4xl cursor-pointer absolute top-1/2 left-1/2   -translate-x-1/2 -translate-y-1/2"
                  width={IS_MOBILE ? 46 : 56}
                  height={IS_MOBILE ? 46 : 56}
                />
              )}
            </aside>
            <article className="flex flex-col justify-between col-span-9">
              <div className="flex items-center  justify-between">
                {hover && !IS_MOBILE ? (
                  <Image
                    onMouseLeave={() => setHover(false)}
                    src="/icons/prev-song-hover.svg"
                    alt="Description of the image"
                    onClick={handlePrev}
                    className=" cursor-pointer hover:scale-110 hover:duration-300"
                    width={IS_MOBILE ? 46 : 56}
                    height={IS_MOBILE ? 46 : 56}
                  />
                ) : (
                  <Image
                    onMouseEnter={() => setHover(true)}
                    src={
                      IS_MOBILE
                        ? "/icons/prev-song-hover.svg"
                        : "/icons/prev-song.svg"
                    }
                    alt="Description of the image"
                    onClick={handlePrev}
                    className=" cursor-pointer"
                    width={IS_MOBILE ? 46 : 56}
                    height={IS_MOBILE ? 46 : 56}
                  />
                )}
                <div className="flex flex-col items-center mx-4 truncate">
                  <div
                    className="text-[16px] font-bold md:text-[24px] cursor-pointer w-full text-center"
                    onClick={handleSwitchLayout}
                  >
                    <MarqueeText
                      text={songs[currentSongIndex]?.title}
                    ></MarqueeText>
                  </div>
                  <div className="text-[12px] md:text-[24px] w-full text-center text-gray-500">
                    <MarqueeText
                      text={songs[currentSongIndex]?.artist}
                    ></MarqueeText>
                  </div>
                </div>
                {nextHover && !IS_MOBILE ? (
                  <Image
                    src="/icons/next-song-hover.svg"
                    alt="Description of the image"
                    onMouseLeave={() => setNextHover(false)}
                    onClick={handleNext}
                    className=" cursor-pointer hover:scale-110 hover:duration-300"
                    width={IS_MOBILE ? 46 : 56}
                    height={IS_MOBILE ? 46 : 56}
                  />
                ) : (
                  <Image
                    onMouseEnter={() => setNextHover(true)}
                    src={
                      IS_MOBILE
                        ? "/icons/next-song-hover.svg"
                        : "/icons/next-song.svg"
                    }
                    alt="Description of the image"
                    onClick={handleNext}
                    className=" cursor-pointer"
                    width={IS_MOBILE ? 46 : 56}
                    height={IS_MOBILE ? 46 : 56}
                  />
                )}
              </div>
              <div className="mt-4 md:mt-0">
                <AudioProgressBar
                  duration={duration} // 总时长，比如300秒
                  currentTime={currentTime} // 当前时间，比如已播放50秒
                  onTimeUpdate={(time) => {
                    console.log("New time:", time);
                    handleSeek(time);
                  }}
                  barColor={bgColor} // 进度条颜色
                />
              </div>
            </article>
          </section>
        ) : (
          <section className={`max-w-[470px] w-full`}>
            <div className="relative">
              <Image
                src={songs[currentSongIndex]?.img}
                alt="Album Cover"
                ref={imgRef}
                width={100}
                height={100}
                onAnimationEnd={handleAnimationEnd}
                className={`rounded-[20px] w-full max-h-[290px] md:max-h-[400px] animate-zoomIn`}
              />
              <Image
                ref={menuRef}
                src="/icons/folding-button.svg"
                alt="Description of the image"
                className="text-4xl cursor-pointer absolute top-8 left-8  animate-scaleIn"
                width={IS_MOBILE ? 46 : 56}
                height={IS_MOBILE ? 46 : 56}
                onClick={handleSwitchLayoutOut}
              />
              {isPlaying ? (
                <Image
                  src="/icons/pause.svg"
                  alt="Description of the image"
                  onClick={togglePlayPause}
                  className="text-4xl cursor-pointer absolute top-1/2 left-1/2   -translate-x-1/2 -translate-y-1/2"
                  width={IS_MOBILE ? 46 : 56}
                  height={IS_MOBILE ? 46 : 56}
                />
              ) : (
                <Image
                  src="/icons/play.svg"
                  alt="Description of the image"
                  onClick={togglePlayPause}
                  className="text-4xl cursor-pointer absolute top-1/2 left-1/2   -translate-x-1/2 -translate-y-1/2"
                  width={IS_MOBILE ? 46 : 56}
                  height={IS_MOBILE ? 46 : 56}
                />
              )}
            </div>
            <article className="flex flex-col justify-between px-4 mt-6">
              <div className="flex items-center  justify-between px-6">
                {hover && !IS_MOBILE ? (
                  <Image
                    onMouseLeave={() => setHover(false)}
                    src="/icons/prev-song-hover.svg"
                    alt="Description of the image"
                    onClick={handlePrev}
                    className=" cursor-pointer hover:scale-110 hover:duration-300"
                    width={IS_MOBILE ? 46 : 56}
                    height={IS_MOBILE ? 46 : 56}
                  />
                ) : (
                  <Image
                    onMouseEnter={() => setHover(true)}
                    src={
                      IS_MOBILE
                        ? "/icons/prev-song-hover.svg"
                        : "/icons/prev-song.svg"
                    }
                    alt="Description of the image"
                    onClick={handlePrev}
                    className=" cursor-pointer"
                    width={IS_MOBILE ? 46 : 56}
                    height={IS_MOBILE ? 46 : 56}
                  />
                )}
                <div className="flex flex-col items-center mx-4 truncate">
                  <span
                    className="font-bold  cursor-pointer text-[16px] md:text-[24px]"
                    onClick={handleSwitchLayout}
                  >
                    {songs[currentSongIndex]?.artist}
                  </span>
                  <div className="w-full text-center text-[12px] md:text-[18px]">
                    <MarqueeText
                      text={songs[currentSongIndex]?.title}
                    ></MarqueeText>
                  </div>
                </div>
                {nextHover && !IS_MOBILE ? (
                  <Image
                    src="/icons/next-song-hover.svg"
                    alt="Description of the image"
                    onMouseLeave={() => setNextHover(false)}
                    onClick={handleNext}
                    className="cursor-pointer hover:scale-110 hover:duration-300"
                    width={IS_MOBILE ? 46 : 56}
                    height={IS_MOBILE ? 46 : 56}
                  />
                ) : (
                  <Image
                    onMouseEnter={() => setNextHover(true)}
                    src={
                      IS_MOBILE
                        ? "/icons/next-song-hover.svg"
                        : "/icons/next-song.svg"
                    }
                    alt="Description of the image"
                    onClick={handleNext}
                    className=" cursor-pointer"
                    width={IS_MOBILE ? 46 : 56}
                    height={IS_MOBILE ? 46 : 56}
                  />
                )}
              </div>
              <div className="mt-6 px-2 md:px-4">
                <AudioProgressBar
                  duration={duration} // 总时长，比如300秒
                  currentTime={currentTime} // 当前时间，比如已播放50秒
                  onTimeUpdate={(time) => {
                    console.log("New time:", time);
                    handleSeek(time);
                  }}
                  barColor={bgColor} // 进度条颜色
                />
              </div>
            </article>
          </section>
        )}
        {!isMobileLayout && (
          <section className="px-6 ">
            {songs.map((song) => {
              return (
                <div
                  className="grid grid-cols-12 gap-x-4 mt-4 border-b pb-4 border-[#f2f2f2] "
                  onClick={() => handleSwitchSong(song.id)}
                  key={song.id}
                >
                  <div className="col-span-3">
                    <Image
                      src={song.img}
                      alt="Album Cover"
                      className="rounded-[20px] w-full h-full"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div className="flex justify-between items-center col-span-9">
                    <div className="flex flex-col  max-w-[160px]">
                      <span className="text-[14px] md:text-[20px] font-bold truncate">
                        {song.title}
                      </span>
                      <span className="text-gray-500 text-[12px] md:text-[16px] mt-2 md:mt-3">
                        {song.artist}
                      </span>
                    </div>
                    <div className="flex flex-col text-[12px] md:text-[16px]">
                      <span className="opacity-0">占位</span>
                      <span className="text-gray-500 mt-2 md:mt-3">
                        {formatDuration(song.duration)}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </section>
        )}
      </main>
    </>
  );
};

export default MusicPlayer;
