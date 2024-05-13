import { Button, Carousel } from "antd";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { IoHeartOutline } from "react-icons/io5";
import { getRandomColorPair } from "../constants/helpers";

const Featured = () => {
  return (
    <Carousel
      autoplay
      touchMove
      draggable
      vertical
      verticalSwiping
      autoplaySpeed={5000}
      dots={false}
      fade
      className="mb-4 rounded-lg overflow-clip"
    >
      {[1, 2, 3, 4].map((item) => {
        const randomColor = getRandomColorPair();

        return (
          <div key={item}>
            <div
              style={{ background: randomColor.primaryColor }}
              className="w-full h-80 flex justify-between rounded-lg overflow-clip"
            >
              <div className="p-12 flex flex-col justify-center">
                <p className="text-gray-100 mb-6">Personally Selected</p>
                <h2 className="text-white text-6xl font-bold mb-2">Title</h2>
                <h3 className="text-white text-lg font-semibold">Artist</h3>
                <div className="mt-4 flex items-center gap-4">
                  <Button
                    icon={<FaHeadphonesSimple />}
                    type="primary"
                    className="rounded-full"
                  >
                    Listen Now
                  </Button>
                  <Button
                    className=" bg-background/30 text-white"
                    shape="circle"
                    icon={<IoHeartOutline />}
                  ></Button>
                </div>
              </div>
              <div>
                <img
                  src="https://source.unsplash.com/random/800x600"
                  alt="cover"
                  className="h-full w-full object-cover "
                />
              </div>
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};
export default Featured;
