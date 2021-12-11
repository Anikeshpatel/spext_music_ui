import React, { useReducer, useState } from "react";
import { LocalMusics } from "../../const";
import MusicCard from "../organisms/MusicCard";
import MusicControls from "../organisms/MusicControls";
import musicReducer from "../../store/musicReducer";

export default function MusicPlayer(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(1);
  const [musics, dispatch] = useReducer(musicReducer, props.musics || LocalMusics);

  const handlePlay = () => {
    setIsPlaying(true);
    setAutoPlay(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setAutoPlay(false);
  };

  const handleNext = () => {
    if (currentMusicIndex === musics.length - 1) {
      setCurrentMusicIndex(0);
    } else {
      setCurrentMusicIndex((lastMusicIndex) => lastMusicIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentMusicIndex === 0) {
      setCurrentMusicIndex(musics.length - 1);
    } else {
      setCurrentMusicIndex((lastMusicIndex) => lastMusicIndex - 1);
    }
  };

  const handleShuffle = () => {
    if (musics.length === 0) {
      return
    }
    if (musics.length === 1) {
      setCurrentMusicIndex(0);
      setIsPlaying(false);
      setIsPlaying(true);
      return
    }
    let index = parseInt(Math.random() * musics.length);
    while(currentMusicIndex === index) {
      index = parseInt(Math.random() * musics.length);
    }
    setCurrentMusicIndex(index);
  }

  const handleEnd = () => {
    console.log("DEBUG Music End");
  };

  const currentMusic = musics[currentMusicIndex];

  const handleMusicToggleLike = () => {
    dispatch({
      type: 'TOGGLE_LIKE',
      id: currentMusic.id
    })
  }

  return (
    <div className="row music_player">
      <MusicCard music={currentMusic} toggleLike={handleMusicToggleLike} />

      <MusicControls
        autoPlay={autoPlay}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnd={handleEnd}
        onPrev={handlePrev}
        onNext={handleNext}
        onShuffle={handleShuffle}
        isPlaying={isPlaying}
        music={currentMusic}
      />
    </div>
  );
}
