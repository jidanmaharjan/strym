import { Button } from "antd";
import { getRandomColorPair } from "../constants/helpers";
import {
  TbArrowsShuffle,
  TbPlayerPause,
  TbPlayerPlay,
  TbRepeat,
  TbRepeatOnce,
} from "react-icons/tb";
import { useState } from "react";
import { IoPause, IoPlay, IoRepeat } from "react-icons/io5";
import { MdOutlineSkipPrevious, MdOutlineSkipNext } from "react-icons/md";

const Player = () => {
  const color = getRandomColorPair();
  const [playerStates, setPlayerStates] = useState({
    isPlaying: false,
    isShuffled: false,
    isRepeat: false,
    repeatOne: false,
  });
  return (
    <div
      //gradient background
      style={{
        // background: `linear-gradient(to right, ${color.primaryColor}, ${color.secondaryColor})`,
        opacity: 0.9,
      }}
      className={`w-full fixed bottom-0 h-24 z-[100] flex justify-between p-4 border-t-2 border-t-primary backdrop-filter backdrop-blur-lg bg-opacity-90 filterbackdrop`}
    >
      <div>
        <h2>Player</h2>
        <p>Player 1</p>
      </div>
      <div>
        <div className="flex items-center gap-4">
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
        <div>visualizer</div>
      </div>
      <div>right icons</div>
    </div>
  );
};
export default Player;
