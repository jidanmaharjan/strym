import { Button, Tag } from "antd";
import { getRandomColorPair } from "../../../constants/helpers";
import { ArtistSingleType } from "../../library/components/ArtistCards";
import { useState } from "react";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { LuUsers2 } from "react-icons/lu";

type ArtistInfoProps = {
  data: ArtistSingleType;
  playTracks: () => void;
};

const ArtistInfo = (props: ArtistInfoProps) => {
  const { data, playTracks } = props;
  const [favouriteArtists, setFavouriteArtists] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteArtists") || "[]")
  );

  return (
    <div className="flex gap-4 md:items-end md:sticky  top-16 z-20 bg-white p-4">
      <div className="relative min-w-32 sm:min-w-60">
        <img
          src={data?.images?.[1]?.url}
          alt={data.name}
          className="w-32 h-32 sm:w-60 sm:h-60 object-cover border"
        />
        <div className="absolute bottom-0 right-2 font-semibold bg-primary p-2 w-8 h-8 grid place-content-center text-white rounded-t-md">
          {data.popularity}
        </div>
      </div>
      <div className="grid gap-4">
        <h1 className="text-2xl md:text-5xl font-bold whitespace-nowrap overflow-x-scroll hide-scrollbar">
          {data.name}
        </h1>
        <div className="flex gap-2 items-center">
          <LuUsers2 />
          <p>{data.followers?.total}</p>
        </div>
        <div className="flex gap-2 overflow-x-scroll hide-scrollbar h-fit">
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
              playTracks();
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
