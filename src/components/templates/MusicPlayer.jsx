import React, { useState } from "react";
import { LocalMusics } from "../../const";
import MusicCard from "../organisms/MusicCard";
import MusicControls from "../organisms/MusicControls";

export default function MusicPlayer(props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [currentMusicIndex, setCurrentMusicIndex] = useState(0);

  const handlePlay = () => {
    setIsPlaying(true);
    setAutoPlay(true);
  };

  const handlePause = () => {
    setIsPlaying(false);
    setAutoPlay(false);
  };

  const handleNext = () => {
    if (currentMusicIndex === LocalMusics.length - 1) {
      setCurrentMusicIndex(0);
    } else {
      setCurrentMusicIndex((currentMusicIndex) => currentMusicIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentMusicIndex === 0) {
      setCurrentMusicIndex(LocalMusics.length - 1);
    } else {
      setCurrentMusicIndex((currentMusicIndex) => currentMusicIndex - 1);
    }
  };

  const handleEnd = () => {
    console.log("DEBUG Music End");
  };

  const currentMusic = LocalMusics[currentMusicIndex];

  return (
    <div className="row music_player">
      <MusicCard music={currentMusic} />

      <MusicControls
        autoPlay={autoPlay}
        onPlay={handlePlay}
        onPause={handlePause}
        onEnd={handleEnd}
        onPrev={handlePrev}
        onNext={handleNext}
        isPlaying={isPlaying}
        music={currentMusic}
      />
    </div>
  );
}
