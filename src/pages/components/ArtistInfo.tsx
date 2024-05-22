import { Button, Tag } from "antd";
import { getRandomColorPair } from "../../constants/helpers";
import { ArtistSingleType } from "./ArtistCards";
import { useState } from "react";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { LuUsers2 } from "react-icons/lu";

const ArtistInfo = (props: { data: ArtistSingleType }) => {
  const { data } = props;
  const [favouriteArtists, setFavouriteArtists] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteArtists") || "[]")
  );

  return (
    <div className="flex gap-4 items-end sticky top-16 z-50 bg-white p-4">
      <div className="relative">
        <img
          src={data?.images?.[1]?.url}
          alt={data.name}
          className="w-60 h-60"
        />
        <div className="absolute bottom-0 right-2 font-semibold bg-primary p-2 w-8 h-8 grid place-content-center text-white rounded-t-md">
          {data.popularity}
        </div>
      </div>
      <div className="grid gap-4">
        <h1 className="text-6xl font-bold">{data.name}</h1>
        <div className="flex gap-2 items-center">
          <LuUsers2 />
          <p>{data.followers?.total}</p>
        </div>
        <div className="flex gap-2 overflow-x-scroll hide-scrollbar">
          {data.genres.map((genre) => {
            const color = getRandomColorPair();
            return (
              <Tag key={genre} color={color.primaryColor}>
                {genre}
              </Tag>
            );
          })}
          {data.genres.length === 0 && <Tag color="default">No genres</Tag>}
        </div>
        <div className="mt-4 flex items-center gap-4">
          <Button
            size="large"
            icon={<FaHeadphonesSimple />}
            type="primary"
            className="rounded-full"
            onClick={() => {
              console.log("Listen Now");
            }}
          >
            Listen Now
          </Button>
          <Button
            size="large"
            shape="circle"
            icon={
              favouriteArtists.includes(data.id) ? (
                <IoHeart className="text-primary" />
              ) : (
                <IoHeartOutline />
              )
            }
            onClick={() => {
              let newFav = null;
              if (favouriteArtists.includes(data.id)) {
                newFav = favouriteArtists.filter((id) => id !== data.id);
              } else {
                newFav = [...favouriteArtists, data.id];
              }
              setFavouriteArtists(newFav);
              localStorage.setItem("favouriteArtists", JSON.stringify(newFav));
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};
export default ArtistInfo;
