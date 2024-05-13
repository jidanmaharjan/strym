import { Button, Carousel } from "antd";
import { IoHeartCircleOutline } from "react-icons/io5";
import { getRandomColorPair } from "../constants/helpers";

const Featured = () => {
  const contentStyle: React.CSSProperties = {
    color: "#fff",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };
  const randomColor = getRandomColorPair();
  return (
    <Carousel className="mb-4 h-48 rounded-lg">
      <div>
        <div
          style={{ background: randomColor.secondaryColor }}
          className="w-full h-48 flex justify-between rounded-lg"
        >
          <div>
            <p>Personally Selected</p>
            <h2>Title</h2>
            <h3>Artist</h3>
            <div>
              <Button>Listen Now</Button>
              <Button>
                <IoHeartCircleOutline />
              </Button>
            </div>
          </div>
          <div>
            <img
              src="https://source.unsplash.com/random/800x600"
              alt="cover"
              className="h-full w-full object-cover rounded-lg"
            />
          </div>
        </div>
      </div>
      <div>
        <h3 style={contentStyle}>2</h3>
      </div>
      <div>
        <h3 style={contentStyle}>3</h3>
      </div>
      <div>
        <h3 style={contentStyle}>4</h3>
      </div>
    </Carousel>
  );
};
export default Featured;
