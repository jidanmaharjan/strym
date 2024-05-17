import { Button, Slider } from "antd";
import { useEffect, useRef, useState } from "react";
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";
import {
  TbArrowsShuffle,
  TbPlayerPause,
  TbPlayerPlay,
  TbPlaylist,
  TbRepeat,
  TbRepeatOnce,
  TbVolume,
} from "react-icons/tb";
import { getRandomColorPair } from "../constants/helpers";
import { BsFullscreen } from "react-icons/bs";
import { CgMiniPlayer, CgToolbarBottom } from "react-icons/cg";
import { PiDevices } from "react-icons/pi";

const Player = () => {
  const color = getRandomColorPair();
  const [playerStates, setPlayerStates] = useState({
    isPlaying: false,
    isShuffled: false,
    isRepeat: false,
    repeatOne: false,
    fullscreen: false,
    voulume: 100,
    mute: false,
  });
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
  return (
    <div
      //gradient background
      style={{
        // background: `linear-gradient(to right, ${color.primaryColor}, ${color.secondaryColor})`,
        opacity: 0.9,
      }}
      className={`w-full fixed bottom-0 h-24 z-[100] flex justify-between p-4 border-t-2 border-t-primary backdrop-filter backdrop-blur-lg bg-opacity-90 filterbackdrop`}
    >
      <div className="ml-4">
        <img
          className="w-20 h-20 rounded-lg absolute top-0 -translate-y-4 shadow-md"
          src="https://i.scdn.co/image/ab67616d0000b273acff57715feae966d794bb95"
          alt=""
        />
        <div className="pl-24">
          <h2 className="font-semibold">Maria</h2>
          <p className="text-sm text-fade">Hwasa</p>
        </div>
      </div>
      <div>
        <div className="flex items-center gap-4 w-80 justify-center">
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
        <div>
          <Slider tooltip={{ open: false }} autoFocus ref={sliderRef} />
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
        <Button className="" icon={<TbVolume size={20} />} type="text" />
        <Slider className="w-20" tooltip={{ open: false }} ref={volumeRef} />
      </div>
    </div>
  );
};
export default Player;
