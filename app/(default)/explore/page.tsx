"use client";

import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { fetchEnhanced } from "@/utils/request";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
// import "./../audioPlayer.css";
import { Spin } from "antd";
const dSongs = [
  {
    id: "1",
    title: "Song One customTrackInfo description",
    artist: "Artist One ",
    url: "https://cdn1.suno.ai/a032e7e8-6a1f-4119-bc35-bcb4834815e1.mp3",
    img: "https://cdn1.suno.ai/image_392f9a22-ae5f-4fb4-ab58-32b49ad6be1a.png",
  },
  {
    id: "2",
    title: "Song Two",
    artist: "Artist Two",
    url: "https://cdn1.suno.ai/392f9a22-ae5f-4fb4-ab58-32b49ad6be1a.mp3",
    img: "https://cdn1.suno.ai/image_large_a032e7e8-6a1f-4119-bc35-bcb4834815e1.png",
  },
  {
    id: "3",
    title: "Song Three",
    artist: "Artist Three",
    url: "https://cdn1.suno.ai/6a61205f-b65c-4acd-9463-58e8038714e4.mp3",
    img: "https://cdn1.suno.ai/image_large_6a61205f-b65c-4acd-9463-58e8038714e4.png",
  },
  {
    id: "4",
    title: "Song Four",
    artist: "Artist Four",
    url: "https://cdn1.suno.ai/0df58c4c-d466-4532-9f06-892f4874720f.mp3",
    img: "https://cdn1.suno.ai/image_large_0df58c4c-d466-4532-9f06-892f4874720f.png",
  },
];

export default function () {
  const {
    run,
    data: musicList,
    // loading,
  } = useRequest(
    async () => {
      const { code, data } = await fetchEnhanced("/api/music/token");
      console.log("code :>> ", code);
      console.log("data :>> ", data);

      if (code !== 0) {
        throw new Error("fetch token failed");
      }

      const resp = await fetchEnhanced("/api/music/explore", {
        headers: {
          Authorization: `Bearer ${data}`,
        },
      });

      if (resp.code !== 0) {
        throw new Error("fetch explore failed");
      }

      return resp?.data.map(
        (
          item: { title: string; image_url: string; audio_url: string },
          idx: number
        ) => {
          return {
            name: item.title,
            writer: "",
            img: item.image_url,
            src: item.audio_url,
            id: idx,
          };
        }
      );
    },
    {
      manual: true,
      retryCount: 3,
      retryInterval: 100,
    }
  );

  // Avoid executing the development environment twice, which may cause errors.
  useEffect(() => {
    const timeoutId = setTimeout(run, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, []);

  const [loading, setLoading] = useState(false);
  const [songs, setSongs] = useState([]);
  const [currentSongId, setCurrentSongId] = useState("1");
  const handleSwitchSong = (id: string) => {
    setCurrentSongId(id);
    console.log("Switched to song with ID:", id);
  };
  useEffect(() => {
    setLoading(true);
    const loadAudioData = async () => {
      const audioData = await Promise.all(
        dSongs.map(async (song) => {
          const audio = new Audio(song.url);
          return new Promise((resolve, reject) => {
            audio.onloadedmetadata = () => {
              resolve({ ...song, duration: audio.duration });
            };
            setLoading(false);
            audio.onerror = () => reject(new Error("Failed to load audio"));
          });
        })
      );
      // setSongs(audioData);
    };
  }, []);
  return (
    <section className="flex justify-center items-center">
      {loading ? (
        <Spin />
      ) : (
        <MusicPlayer
          songs={songs}
          onSwitchSong={handleSwitchSong}
          currentSongId={currentSongId}
        />
      )}
      {/* <div className="mx-auto max-w-7xl px-5 mb-16">
        {!!loading ? (
          <Loading />
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 md:grid-cols-4 lg:gap-12">
            {musicList && musicList.map((music:AudioData) => {
              return (
                <div className="rounded-xl overflow-hidden inline-block" key={music.id}>
                <div className="flex flex-col items-center justify-around h-full rounded-md bg-gradient-to-tr font-mono text-sm text-black bg-white">
                  <div className="cover flex flex-col items-center relative  w-full h-full">
                    <img src={music.img} alt={music.name} />
                    <div className="absolute top-1/2 max-w-full max-h-full m-auto">
                      <button onClick={() => setPlay(music.id)} >
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.7041 7.08392C12.8232 6.54225 11.716 6.52439 10.8172 7.03035C9.91841 7.5363 9.35889 8.48868 9.35889 9.52439V30.4768C9.35889 31.5125 9.91841 32.4649 10.8172 32.9708C11.716 33.4768 12.8232 33.453 13.7041 32.9173L30.847 22.4411C31.6982 21.9232 32.216 21.0006 32.216 20.0006C32.216 19.0006 31.6982 18.0839 30.847 17.5601L13.7041 7.08392Z" fill="white"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="w-full bg-white p-3 font-bold"><span>{music.name}</span></div>
                </div>
              </div>
              );
            })}
          </div>
        )}
      </div>
      <footer className="fixed inset-x-0 bottom-0" >
      {!loading && musicList && musicList.length > 0 &&
          <DynamicAudioPlayer playList={musicList} 
          audioInitialState={curPlayId}
          activeUI={{ all: true }}
          rootContainerProps={{ colorScheme: "dark" }} />}
      </footer>  */}
    </section>
  );
}
