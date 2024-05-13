import { getRandomColorPair } from "../constants/helpers";

const Player = () => {
  const color = getRandomColorPair();
  return (
    <div
      className={`w-full fixed bottom-0 h-20 z-[100] flex justify-between p-4 border-t-2 border-t-primary bg-gradient-to-r from-fade to-background`}
    >
      <div>
        <h2>Player</h2>
        <p>Player 1</p>
      </div>
      <div>
        <div>icons</div>
        <div>visualizer</div>
      </div>
      <div>right icons</div>
    </div>
  );
};
export default Player;
