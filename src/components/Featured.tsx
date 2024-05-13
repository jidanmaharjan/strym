import { Button, Carousel } from "antd";
import { IoHeartCircleOutline, IoHeartOutline } from "react-icons/io5";
import { getRandomColorPair } from "../constants/helpers";
import { FaHeadphonesSimple } from "react-icons/fa6";

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
          style={{ background: randomColor.primaryColor }}
          className="w-full h-48 flex justify-between rounded-lg"
        >
          <div className="p-4">
            <p className="text-gray-200 text-sm mb-6">Personally Selected</p>
            <h2 className="text-white text-3xl font-bold mb-2">Title</h2>
            <h3 className="text-white font-semibold">Artist</h3>
            <div className="mt-4 flex items-center gap-4">
              <Button
                icon={<FaHeadphonesSimple />}
                type="primary"
                className="rounded-full"
              >
                Listen Now
              </Button>
              <Button className="rounded-full w-8 h-8">
                <IoHeartOutline />
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
