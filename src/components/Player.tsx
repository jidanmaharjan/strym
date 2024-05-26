import { Button, Drawer, Dropdown, Slider } from "antd";
import { useEffect, useRef } from "react";
import { BsFullscreen } from "react-icons/bs";
import { CgToolbarBottom } from "react-icons/cg";
import { MdOutlineSkipNext, MdOutlineSkipPrevious } from "react-icons/md";
import { PiDevices, PiWaveform } from "react-icons/pi";
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

import { IoBluetoothOutline } from "react-icons/io5";
import { RiComputerLine } from "react-icons/ri";
import ReactPlayer from "react-player";
import { useAuth } from "../context/AuthContext";
import { getTimeStringFromSeconds } from "../constants/helpers";

const Player = () => {
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

  if (queue.length === 0 || !playerStates || !setPlayerStates) return null;

  const currentTrack = queue[playerStates.current];

  const seekPlayer = (seek: string, type: string) => {
    playerRef?.current?.seekTo(parseFloat(seek), type);
  };

  return (
    <div
      style={{
        opacity: 0.9,
      }}
      className={`w-full fixed bottom-0 ${
        playerStates.fullscreen
          ? "h-screen items-end"
          : "h-24 items-center md:items-start"
      } z-[100] flex justify-between  gap-2 p-4 border-t-2 border-t-primary transition-all duration-300 backdrop-filter backdrop-blur-lg bg-opacity-90 filterbackdrop`}
    >
      <div className="absolute">
        <ReactPlayer
          playing={playerStates.isPlaying}
          url={currentTrack.preview_url}
          width={"0"}
          height={"0"}
          playsinline
          muted={playerStates.mute}
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
      <div
        className={`${
          playerStates.fullscreen
            ? "absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col text-center"
            : "ml-4 min-w-12 md:w-80"
        }`}
      >
        <img
          className={`${
            playerStates.fullscreen
              ? "w-40 h-40 rounded-lg shadow-md mx-auto"
              : "w-12 h-12 md:w-20 md:h-20 rounded-lg md:absolute top-0 md:-translate-y-4 shadow-md"
          }`}
          src={currentTrack.album.images?.[1]?.url}
          alt={currentTrack.name}
        />
        <div
          className={`${
            !playerStates.fullscreen ? "pl-24 hidden xl:block" : ""
          } `}
        >
          <h2 className="font-semibold">{currentTrack.name}</h2>
          <p className="text-sm text-fade">
            {currentTrack.artists.map((a) => a.name)?.join(", ")}
          </p>
        </div>
      </div>
      <div className="flex md:flex-col gap-2 md:gap-0 w-full md:w-auto">
        <div className="flex items-center gap-4  md:w-[24rem] justify-center">
          <div className="hidden md:block">
            <Button
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
          </div>
          <div className="hidden md:block">
            <Button
              className=""
              icon={<MdOutlineSkipPrevious size={20} />}
              type="text"
              onClick={() => {
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
                        current: 0,
                      }));
                    } else {
                      setPlayerStates((prev) => ({
                        ...prev,
                        current: prev.current + 1,
                      }));
                    }
                  }
                }
              }}
            />
          </div>

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
          <div className="hidden md:block">
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
          </div>
          <div className="hidden md:block">
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
        </div>
        <div className="flex items-center gap-4 w-full">
          <p className="text-sm font-semibold text-fade hidden md:block">
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
          <p className="text-sm font-semibold text-fade hidden md:block">
            {getTimeStringFromSeconds(playerRef.current?.getDuration() || 0)}
          </p>
        </div>
      </div>
      <div className="flex items-center h-fit gap-2 ">
        <Button
          className=""
          onClick={() =>
            setPlayerStates((prev) => ({
              ...prev,
              openQueue: true,
            }))
          }
          icon={<TbPlaylist size={20} />}
          type="text"
        />
        <div className="hidden md:block">
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
                <CgToolbarBottom size={20} />
              ) : (
                <BsFullscreen />
              )
            }
            type="text"
          />
        </div>
        <div className="hidden md:block">
          <Dropdown
            menu={{
              items: [
                {
                  label: "Speakers",
                  key: "speakers",
                  icon: <RiComputerLine size={20} />,
                },
                {
                  label: "Bluetooth",
                  key: "bluetooth",
                  icon: <IoBluetoothOutline size={20} />,
                },
              ],
              selectable: true,
              selectedKeys: ["speakers"],
            }}
            placement="top"
            arrow={{ pointAtCenter: true }}
            trigger={["click"]}
          >
            <Button className="" icon={<PiDevices size={20} />} type="text" />
          </Dropdown>
        </div>
        <div className="hidden md:block">
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
        </div>
        <div className="hidden md:block">
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
      <Drawer
        title="Queue"
        onClose={() =>
          setPlayerStates((prev) => ({
            ...prev,
            openQueue: false,
          }))
        }
        open={playerStates.openQueue}
      >
        <div className="grid">
          {queue.map((track, i) => (
            <div
              key={i}
              className={`flex items-center gap-4 p-2 ${
                playerStates.current === i && "border border-primary rounded-sm"
              }`}
            >
              <img
                className="w-10 h-10 rounded-md"
                src={track.album.images[1].url}
                alt={track.name}
              />
              <div>
                <h2 className="font-semibold">{track.name}</h2>
                <p className="text-sm text-fade">
                  {track.artists.map((a) => a.name)?.join(", ")}
                </p>
              </div>
              {playerStates.current !== i ? (
                <Button
                  className="ml-auto"
                  type="text"
                  shape="circle"
                  onClick={() =>
                    setPlayerStates((prev) => ({
                      ...prev,
                      current: i,
                      isPlaying: true,
                    }))
                  }
                >
                  <TbPlayerPlay />
                </Button>
              ) : (
                <PiWaveform size={20} className="ml-auto mr-2 animate-pulse" />
              )}
            </div>
          ))}
        </div>
      </Drawer>
    </div>
  );
};
export default Player;
