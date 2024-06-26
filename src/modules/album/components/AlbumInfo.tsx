import { Button } from "antd";
import { useState } from "react";
import { FaHeadphonesSimple } from "react-icons/fa6";
import { IoAlbumsOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { AlbumSingleType } from "../../library/components/AlbumCards";

type AlbumInfoProps = {
  data: AlbumSingleType;
  playTracks: () => void;
};

const AlbumInfo = (props: AlbumInfoProps) => {
  const { data, playTracks } = props;
  const [favouriteAlbums, setFavouriteAlbums] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteAlbums") || "[]")
  );

  return (
    <div className="flex gap-4 md:items-end md:sticky top-16 z-20 bg-white p-4">
      <div className="relative min-w-32 sm:min-w-60">
        <img
          src={data?.images?.[1]?.url}
          alt={data.name}
          className="w-32 h-32 sm:w-60 sm:h-60 object-cover border"
        />
      </div>
      <div className="grid gap-4">
        <h1 className="text-2xl md:text-5xl font-bold whitespace-nowrap overflow-x-scroll hide-scrollbar">
          {data.name}
        </h1>
        <div className="flex gap-2 items-center">
          <IoAlbumsOutline />
          <p>{data.type}</p>
        </div>
        <div className="text-black text-lg font-semibold flex gap-4">
          {data.artists.map((a) => (
            <Link
              className="hover:text-blue-400"
              to={`/artist/${a.id}`}
              key={a.id}
            >
              {a.name}
            </Link>
          ))}
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
              favouriteAlbums.includes(data.id) ? (
                <IoHeart className="text-primary" />
              ) : (
                <IoHeartOutline />
              )
            }
            onClick={() => {
              let newFav = null;
              if (favouriteAlbums.includes(data.id)) {
                newFav = favouriteAlbums.filter((id) => id !== data.id);
              } else {
                newFav = [...favouriteAlbums, data.id];
              }
              setFavouriteAlbums(newFav);
              localStorage.setItem("favouriteAlbums", JSON.stringify(newFav));
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};
export default AlbumInfo;
