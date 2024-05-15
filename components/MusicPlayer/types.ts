// types.ts
export interface Song {
  id: string;
  title: string;
  artist: string;
  url: string; // 歌曲文件的 URL 地址
  img: string; // 歌曲封面图片的 URL 地址
  duration?: any;
}

// MusicPlayerProps interface
export interface MusicPlayerProps {
  songs: Song[];
  onSwitchSong: (id: string) => void;
  currentSongId?: number; // 可选的当前歌曲 ID，从外部控制
}
