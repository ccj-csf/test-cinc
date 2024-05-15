"use client";

import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import { fetchEnhanced } from "@/utils/request";
import MusicPlayer from "@/components/MusicPlayer/MusicPlayer";
import Loading from "@/components/loading";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function () {
  // 获取音乐列表
  const { run, data, loading } = useRequest(
    async () => {
      const { code, data } = await fetchEnhanced("/api/music/token");

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
      try {
        // 加载每首歌的音频数据
        const audioData = await Promise.all(
          resp.data.map(async (song: any) => {
            const audio = new Audio(song.audio_url);
            return new Promise((resolve, reject) => {
              audio.onloadedmetadata = () => {
                resolve({
                  ...song,
                  duration: audio.duration,
                  artist: song.display_name,
                  img: song.image_url,
                  url: song.audio_url,
                });
              };
              audio.onerror = () =>
                reject(new Error(`Failed to load audio: ${song.url}`));
            });
          })
        );

        return audioData;
      } catch (error) {
        console.error("Error loading audio data:", error);
        return [];
      }
    },
    {
      cacheKey: "cacheKey-demo",
      manual: true,
      retryCount: 2,
      retryInterval: 1000,
    }
  );

  useEffect(() => {
    run();
  }, []);
  const [currentSongId, setCurrentSongId] = useState("1");
  const handleSwitchSong = (id: string) => {
    setCurrentSongId(id);
    console.log("Switched to song with ID:", id);
  };
  const router = useRouter();
  const handleGenerate = () => {
    router.push("/create");
  };

  return (
    <section className="flex justify-center items-center">
      {loading ? (
        <Loading></Loading>
      ) : (
        data &&
        data?.length > 0 && (
          <div className="flex flex-col ">
            <h2 className="  text-[24px] text-center text-black font-bold px-4 mb-8 md:hidden">
              Explore new styles of music with WAV
            </h2>
            <MusicPlayer
              songs={data as any}
              onSwitchSong={handleSwitchSong}
              currentSongId={currentSongId}
            />
            <Button
              onClick={handleGenerate}
              className=" !h-[44px] mt-[50px] md:hidden"
            >
              Generate
            </Button>
          </div>
        )
      )}
    </section>
  );
}
