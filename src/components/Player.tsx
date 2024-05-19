import { Button, Slider } from "antd";
import { useEffect, useRef, useState } from "react";
import { BsFullscreen } from "react-icons/bs";
import { CgToolbarBottom } from "react-icons/cg";
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";
import { PiDevices } from "react-icons/pi";
import {
  TbArrowsShuffle,
  TbPlayerPause,
  TbPlayerPlay,
  TbPlaylist,
  TbRepeat,
  TbRepeatOnce,
  TbVolume,
  TbVolume2,
  TbVolume3,
} from "react-icons/tb";
import { getRandomColorPair } from "../constants/helpers";

import ReactPlayer from "react-player";
import { useAuth } from "../context/AuthContext";

const Player = () => {
  const color = getRandomColorPair();

  const { queue, playerStates, setPlayerStates } = useAuth();

  const playerRef = useRef<any>();
  const sliderRef = useRef<any>();
  const playPauseRef = useRef<any>();
  const volumeRef = useRef<any>();

  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        sliderRef.current.focus();
        sliderRef.current.focus();
      }
    });
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.key === " ") {
          console.log(playPauseRef.current !== document.activeElement);

          if (playPauseRef.current !== document.activeElement) {
            playPauseRef.current.click();
          }
          playPauseRef.current.focus();
        }
      },
      { once: true }
    );
    return () => {
      window.removeEventListener("keydown", (e) => {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          sliderRef.current.focus();
          sliderRef.current.focus();
        }
      });
    };
  }, []);

  useEffect(() => {
    if (queue.length > 0) {
      console.log(queue);
    }
  }, [queue]);

  if (queue.length === 0 || !playerStates || !setPlayerStates) return null;

  const currentTrack = queue[playerStates.current];

  const seekPlayer = (seek: string, type: string) => {
    playerRef?.current?.seekTo(parseFloat(seek), type);
  };

  const getTimeStringFromSeconds = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    seconds = Math.floor(seconds) - minutes * 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  return (
    <div
      //gradient background
      style={{
        // background: `linear-gradient(to right, ${color.primaryColor}, ${color.secondaryColor})`,
        opacity: 0.9,
      }}
      className={`w-full fixed bottom-0 h-24 z-[100] flex justify-between p-4 border-t-2 border-t-primary backdrop-filter backdrop-blur-lg bg-opacity-90 filterbackdrop`}
    >
      <div className="absolute">
        <ReactPlayer
          playing={playerStates.isPlaying}
          url={currentTrack.preview_url}
          width={"100%"}
          height={"100%"}
          playsinline
          controls={playerStates.fullscreen}
          volume={playerStates.voulume / 100}
          suppressHydrationWarning
          stopOnUnmount={false}
          onProgress={(progress: any) => {
            setPlayerStates((prev) => ({
              ...prev,
              played: progress.played,
              loaded: progress.loaded,
              playedSeconds: progress.playedSeconds,
            }));
          }}
          onEnded={() => {
            if (playerStates.repeatOne) {
              playerRef.current.seekTo(0);
            } else {
              if (playerStates.isShuffled) {
                setPlayerStates((prev) => ({
                  ...prev,
                  current: Math.floor(Math.random() * queue.length),
                }));
              } else {
                if (playerStates.isRepeat) {
                  if (playerStates.current === queue.length - 1) {
                    setPlayerStates((prev) => ({
                      ...prev,
                      current: 0,
                    }));
                  } else {
                    setPlayerStates((prev) => ({
                      ...prev,
                      current: prev.current + 1,
                    }));
                  }
                } else {
                  if (playerStates.current === queue.length - 1) {
                    setPlayerStates((prev) => ({
                      ...prev,
                      isPlaying: false,
                    }));
                  } else {
                    setPlayerStates((prev) => ({
                      ...prev,
                      current: prev.current + 1,
                    }));
                  }
                }
              }
            }
          }}
          config={{
            youtube: {
              playerVars: {
                disablekb: 1,
              },
            },
          }}
          ref={playerRef}
        ></ReactPlayer>
      </div>
      <div className="ml-4 w-80">
        <img
          className="w-20 h-20 rounded-lg absolute top-0 -translate-y-4 shadow-md"
          src={currentTrack.album.images[1].url}
          alt={currentTrack.name}
        />
        <div className="pl-24">
          <h2 className="font-semibold">{currentTrack.name}</h2>
          <p className="text-sm text-fade">
            {currentTrack.artists.map((a) => a.name)?.join(", ")}
          </p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4 w-[24rem] justify-center">
          <Button
            className=""
            onClick={() => {
              setPlayerStates({
                ...playerStates,
                isShuffled: !playerStates.isShuffled,
              });
            }}
            icon={
              <TbArrowsShuffle
                className={`${playerStates.isShuffled && "text-light"}`}
                size={20}
              />
            }
            type="text"
          />
          <Button
            className=""
            icon={<MdOutlineSkipPrevious size={20} />}
            type="text"
          />
          <Button
            className=""
            shape="circle"
            onClick={() => {
              setPlayerStates({
                ...playerStates,
                isPlaying: !playerStates.isPlaying,
              });
            }}
            ref={playPauseRef}
            icon={playerStates.isPlaying ? <TbPlayerPause /> : <TbPlayerPlay />}
            type="default"
          />
          <Button
            className=""
            onClick={() => {
              if (playerStates.isShuffled) {
                setPlayerStates((prev) => ({
                  ...prev,
                  current: Math.floor(Math.random() * queue.length),
                }));
              } else {
                if (playerStates.isRepeat) {
                  if (playerStates.current === 0) {
                    setPlayerStates((prev) => ({
                      ...prev,
                      current: queue.length - 1,
                    }));
                  } else {
                    setPlayerStates((prev) => ({
                      ...prev,
                      current: prev.current - 1,
                    }));
                  }
                } else {
                  if (playerStates.current === 0) {
                    setPlayerStates((prev) => ({
                      ...prev,
                      current: queue.length - 1,
                    }));
                  } else {
                    setPlayerStates((prev) => ({
                      ...prev,
                      current: prev.current - 1,
                    }));
                  }
                }
              }
            }}
            icon={<MdOutlineSkipNext size={20} />}
            type="text"
          />
          <Button
            className=""
            icon={
              playerStates.repeatOne ? (
                <TbRepeatOnce className="text-light" size={20} />
              ) : (
                <TbRepeat
                  className={`${playerStates.isRepeat && "text-light"}`}
                  size={20}
                />
              )
            }
            onClick={() => {
              if (playerStates.repeatOne) {
                setPlayerStates((prev) => ({
                  ...prev,
                  repeatOne: false,
                  isRepeat: false,
                }));
              } else {
                if (playerStates.isRepeat) {
                  setPlayerStates((prev) => ({
                    ...prev,
                    repeatOne: true,
                  }));
                } else {
                  setPlayerStates((prev) => ({
                    ...prev,
                    repeatOne: false,
                    isRepeat: true,
                  }));
                }
              }
            }}
            type="text"
          />
        </div>
        <div className="flex items-center gap-4 ">
          <p className="text-sm font-semibold text-fade">
            {getTimeStringFromSeconds(playerStates?.playedSeconds || 0)}
          </p>
          <Slider
            styles={{
              track: {
                backgroundColor: import.meta.env.VITE_LIGHT_COLOR,
              },
            }}
            className="w-full"
            tooltip={{ open: false }}
            autoFocus
            ref={sliderRef}
            min={0}
            max={playerRef.current?.getDuration()}
            value={playerStates.playedSeconds}
            onChange={(e) => {
              seekPlayer(String(e), "seconds");
            }}
          />
          <p className="text-sm font-semibold text-fade">
            {getTimeStringFromSeconds(playerRef.current?.getDuration() || 0)}
          </p>
        </div>
      </div>
      <div className="flex items-center h-fit gap-2">
        <Button className="" icon={<TbPlaylist size={20} />} type="text" />
        <Button
          className=""
          onClick={() => {
            setPlayerStates({
              ...playerStates,
              fullscreen: !playerStates.fullscreen,
            });
          }}
          icon={
            playerStates.fullscreen ? (
              <BsFullscreen />
            ) : (
              <CgToolbarBottom size={20} />
            )
          }
          type="text"
        />
        <Button className="" icon={<PiDevices size={20} />} type="text" />
        <Button
          className=""
          onClick={() => {
            if (playerStates.voulume === 0) {
              setPlayerStates((prev) => ({
                ...prev,
                mute: false,
                voulume: 5,
              }));
            } else {
              setPlayerStates((prev) => ({
                ...prev,
                mute: !prev.mute,
              }));
            }
          }}
          icon={
            playerStates.mute ? (
              <TbVolume3 size={20} />
            ) : playerStates.voulume < 50 ? (
              <TbVolume2 size={20} />
            ) : (
              <TbVolume size={20} />
            )
          }
          type="text"
        />

        <Slider
          styles={{
            track: {
              backgroundColor: import.meta.env.VITE_LIGHT_COLOR,
            },
          }}
          value={playerStates.voulume}
          onChange={(v) => {
            if (v === 0) {
              setPlayerStates((prev) => ({
                ...prev,
                mute: true,
                voulume: v,
              }));
            } else {
              setPlayerStates((prev) => ({
                ...prev,
                mute: false,
                voulume: v,
              }));
            }
          }}
          className="w-20"
          tooltip={{ open: false }}
          ref={volumeRef}
        />
      </div>
    </div>
  );
};
export default Player;
