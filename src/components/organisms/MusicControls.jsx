import React, { useCallback, useEffect, useRef, useState } from "react";
import { MdRepeat, MdShuffle } from "react-icons/md";
import { HiAdjustments } from "react-icons/hi";
import {
  TiMediaPause,
  TiChevronLeft,
  TiChevronRight,
  TiMediaPlay,
} from "react-icons/ti";
import Card from "../atoms/Card";
import Typography from "../atoms/Typography";
import Button from "../molecules/Button";
import UISlider from "../atoms/UISlider";
import { formatSecondsToHHMMSS } from "../../utils";

export default function MusicControls(props) {
  const { isPlaying, onPlay, onPause, onNext, onPrev, music, onEnd, autoPlay } =
    props;
  const [duration, setDuration] = useState("00:00");
  const [currentTime, setCurrentTime] = useState("00:00");
  const [maxSeconds, setMaxSeconds] = useState(0);
  const [currentSeconds, setCurrentSeconds] = useState(0);

  const audioPlayer = useRef(new Audio());
  const seekAnimationRef = useRef();

  useEffect(() => {
    handlePause();
    audioPlayer.current = new Audio(music.music);
    setCurrentTime("00:00");
    setCurrentSeconds(0);
    audioPlayer.current?.addEventListener("loadeddata", onReady);
    audioPlayer.current?.addEventListener("ended", handleEnd);
    audioPlayer.current?.addEventListener("canplay", canPlay);
    return () => {
      audioPlayer.current?.removeEventListener("loadeddata", onReady);
      audioPlayer.current?.removeEventListener("ended", handleEnd);
      audioPlayer.current?.removeEventListener("canplay", canPlay);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [music]);

  useEffect(() => {
    window.addEventListener("keyup", handleKeyEvent);
    return () => {
      window.removeEventListener("keyup", handleKeyEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [music, isPlaying]);

  const handleKeyEvent = (e) => {
    if (e.code === "Space") {
      handlePlayPause();
    } else if (e.code === "ArrowRight") {
      handleNext();
    } else if (e.code === "ArrowLeft") {
      handlePrev();
    }
  };

  const canPlay = () => {
    if (autoPlay) {
      handlePlay();
    }
  };

  const onReady = () => {
    setMaxSeconds(audioPlayer.current.duration);
    setDuration(getDuration());
  };

  const handlePlayPause = () => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  };

  const handlePlay = () => {
    audioPlayer.current.play();
    seekAnimationRef.current = requestAnimationFrame(onTick);
    onPlay();
  };

  const handlePause = () => {
    audioPlayer.current.pause();
    if (seekAnimationRef.current) {
      cancelAnimationFrame(seekAnimationRef.current);
    }
    onPause();
  };

  const handleEnd = () => {
    handlePause();
    onEnd();
  };

  const handleNext = () => {
    onNext();
  };

  const handlePrev = () => {
    onPrev();
  };

  const handleProgressChange = (progress) => {
    if (audioPlayer.current) {
      audioPlayer.current.currentTime = progress;
      setCurrentSeconds(progress);
      setCurrentTime(formatSecondsToHHMMSS(progress));
    }
  };

  const onTick = () => {
    if (audioPlayer.current) {
      setCurrentSeconds(audioPlayer.current.currentTime);
      setCurrentTime(formatSecondsToHHMMSS(audioPlayer.current.currentTime));
      seekAnimationRef.current = requestAnimationFrame(onTick);
    }
  };

  const getDuration = () => {
    if (!audioPlayer.current || !audioPlayer.current.duration) {
      return "00:00:00";
    }
    return formatSecondsToHHMMSS(audioPlayer.current.duration);
  };

  return (
    <Card className="music_control">
      <div className="empty" />

      <div className="row controls_container">
        <div className="column justify_between flex-1">
          <div className="row justify_between y_center music_control_action_container">
            <Button flat icon={<MdShuffle size="25" />} />
            <Button flat icon={<MdRepeat size="25" />} />

            <div className="row y_center justify_around flex-1">
              <Button
                rounded
                icon={<TiChevronLeft size="25" />}
                onClick={handlePrev}
              />
              <Button
                rounded
                onClick={handlePlayPause}
                icon={
                  isPlaying ? (
                    <TiMediaPause size="55" />
                  ) : (
                    <TiMediaPlay size="55" />
                  )
                }
              />
              <Button
                rounded
                icon={<TiChevronRight size="25" />}
                onClick={handleNext}
              />
            </div>

            <Button flat icon={<MdRepeat size="25" />} />
            <Button flat icon={<HiAdjustments size="25" />} />
          </div>

          <div className="column slider_container">
            <UISlider
              progress={currentSeconds}
              min={0}
              max={maxSeconds}
              onProgressChange={handleProgressChange}
            />

            <div className="row justify_between">
              <Typography size="sm">{currentTime}</Typography>

              <Typography size="sm">{duration}</Typography>
            </div>
          </div>
        </div>
        <div className="divider" />
      </div>
    </Card>
  );
}
