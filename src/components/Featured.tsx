import { Button, Carousel } from "antd";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { getRandomColorPair } from "../constants/helpers";
import { TrackSingleType } from "../pages/components/TrackCards";
import Loader from "./Loader";
import { useState } from "react";
import { Link } from "react-router-dom";

interface FeaturedProps {
  data: TrackSingleType[];
  loading: boolean;
}

const Featured = (props: FeaturedProps) => {
  const { data, loading } = props;

  const [favouriteTracks, setFavouriteTracks] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteTracks") || "[]")
  );

  const playMusic = (url: string) => {
    if (!url) return;
    //stop any playing audio
    const audioElements = document.querySelectorAll("audio");
    audioElements.forEach((audio) => audio.pause());
    const audio = new Audio(url);
    audio.play();
  };

  if (loading) {
    return (
      <div className="h-80 flex rounded-lg mb-4 overflow-clip">
        <Loader type="lg" />
      </div>
    );
  }
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
      {data.map((item) => {
        const randomColor = getRandomColorPair();

        return (
          <div key={item.id} className="shadow-sm">
            <div
              style={{ background: randomColor.primaryColor }}
              className="w-full h-80 flex justify-between shadow-sm rounded-lg overflow-clip"
            >
              <div className="p-12 flex flex-col justify-center">
                <Link
                  to={`/album/${item.album.id}`}
                  className="text-gray-100 mb-6"
                >
                  {item.album.name} - {item.album.album_type}
                </Link>
                <Link
                  to={`/track/${item.id}`}
                  className="text-white text-6xl font-bold mb-2"
                >
                  {item.name}
                </Link>
                <h3 className="text-white text-lg font-semibold">
                  {item.artists.map((a) => a.name)?.join(", ")}
                </h3>
                <div className="mt-4 flex items-center gap-4">
                  <Button
                    disabled={!item.preview_url}
                    icon={<FaHeadphonesSimple />}
                    type="primary"
                    className="rounded-full"
                    onClick={() => playMusic(item?.preview_url)}
                  >
                    Listen Now
                  </Button>
                  <Button
                    className=" bg-background/30 text-white"
                    shape="circle"
                    icon={
                      favouriteTracks.includes(item.id) ? (
                        <IoHeart className="text-primary" />
                      ) : (
                        <IoHeartOutline />
                      )
                    }
                    onClick={() => {
                      let newFav = null;
                      if (favouriteTracks.includes(item.id)) {
                        newFav = favouriteTracks.filter((id) => id !== item.id);
                      } else {
                        newFav = [...favouriteTracks, item.id];
                      }
                      setFavouriteTracks(newFav);
                      localStorage.setItem(
                        "favouriteTracks",
                        JSON.stringify(newFav)
                      );
                    }}
                  ></Button>
                </div>
              </div>
              <div>
                <img
                  src={item.album.images?.[0]?.url}
                  alt={item.name}
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
