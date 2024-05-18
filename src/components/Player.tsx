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

import axios from "axios";
import { useAuth } from "../context/AuthContext";

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

  const { playUri } = useAuth();
  const sliderRef = useRef<any>();
  const playPauseRef = useRef<any>();
  const volumeRef = useRef<any>();

  const [accessToken, setAccessToken] = useState<string | null>(
    import.meta.env.VITE_SPOTIFY_ACCESS_TOKEN
  );
  const [player, setPlayer] = useState<any>(null);
  const [deviceId, setDeviceId] = useState(null);

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
    if (accessToken) {
      const script = document.createElement("script");
      script.src = "https://sdk.scdn.co/spotify-player.js";
      script.async = true;

      document.body.appendChild(script);

      (window as any).onSpotifyWebPlaybackSDKReady = () => {
        const token = accessToken;
        const player = new (window as any).Spotify.Player({
          name: "Web Playback SDK",
          getOAuthToken: (cb: any) => {
            cb(token);
          },
          volume: 0.5,
        });

        setPlayer(player);

        player.addListener("ready", ({ device_id }: any) => {
          setDeviceId(device_id);
          console.log("Ready with Device ID", device_id);
        });

        player.addListener("not_ready", ({ device_id }: any) => {
          console.log("Device ID has gone offline", device_id);
        });

        player.addListener("initialization_error", ({ message }: any) => {
          console.error(message);
        });

        player.addListener("authentication_error", ({ message }: any) => {
          console.error(message);
        });

        player.addListener("account_error", ({ message }: any) => {
          console.error(message);
        });

        player.connect().then((success: any) => {
          if (success) {
            console.log(
              "The Web Playback SDK successfully connected to Spotify!"
            );
          }
        });
      };
    }
  }, [accessToken]);

  const playMusic = async () => {
    if (!accessToken || !deviceId || !player) return;

    const playUrl = `https://api.spotify.com/v1/me/player/play`;

    const data = {
      device_id: deviceId,
      context_uri: playUri, // Example album URI
      offset: { position: 5 },
      position_ms: 0,
    };

    await axios
      .put(playUrl, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 204) {
          console.log("Playback started successfully");
          player
            .togglePlay()
            .catch((error: { message: string }) =>
              console.error("Error toggling play", error)
            );
        }
      })
      .catch((error) => {
        console.error("Failed to start playback", error);
      });
  };

  useEffect(() => {
    if (playUri) {
      playMusic();
    }
  }, [playUri]);

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
            onClick={() => player.nextTrack()}
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
          <p className="text-sm font-semibold text-fade">00:00</p>
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
          />
          <p className="text-sm font-semibold text-fade">03:32</p>
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
