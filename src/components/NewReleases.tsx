import { Avatar, Card, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { IoAlbumsOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { TbMusicSearch } from "react-icons/tb";
import { useQuery } from "react-query";
import { getRandomColorPair } from "../constants/helpers";
import { getNewReleases } from "../queries/songs";
import Loader from "./Loader";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AlbumSingleType } from "../pages/components/AlbumCards";

const NewReleases = () => {
  const navigate = useNavigate();
  const [favouriteAlbums, setFavouriteAlbums] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteAlbums") || "[]")
  );
  const { data: newReleases, isFetching: newReleasesFetching } = useQuery(
    ["new_releases"],
    () => getNewReleases()
  );

  if (newReleasesFetching) {
    return <Loader />;
  }

  return (
    <div className="flex gap-4 w-full overflow-x-scroll hide-scrollbar snap-x snap-mandatory">
      {newReleases?.albums?.items?.map((item: AlbumSingleType) => (
        <Card
          key={item.id}
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src={item.images.filter((x) => x.height === 300)[0].url}
              className="min-w-60 h-40 object-cover"
            />
          }
          actions={[
            <TbMusicSearch
              key="albums"
              onClick={() => navigate(`/album/${item.id}`)}
            />,
            // <LiaMicrophoneAltSolid key="artists" />,
            <div
              className="text-primary cursor-pointer text-lg"
              key="favourite"
              onClick={() => {
                let newFav = null;
                if (favouriteAlbums.includes(item.id)) {
                  newFav = favouriteAlbums.filter((id) => id !== item.id);
                } else {
                  newFav = [...favouriteAlbums, item.id];
                }
                setFavouriteAlbums(newFav);
                localStorage.setItem("favouriteAlbums", JSON.stringify(newFav));
              }}
            >
              {favouriteAlbums.includes(item.id) ? (
                <IoHeart />
              ) : (
                <IoHeartOutline />
              )}
            </div>,
          ]}
        >
          <Meta
            title={<Link to={`/album/${item.id}`}>{item.name}</Link>}
            description={
              <div className="flex flex-col gap-2 flex-grow">
                <div className="flex gap-2 items-center">
                  <IoAlbumsOutline />
                  <p className="overflow-x-scroll whitespace-nowrap hide-scrollbar">
                    {item.album_type}
                  </p>
                </div>
                <div className="flex gap-2 overflow-x-scroll hide-scrollbar">
                  {item.artists.map((artist) => {
                    const color = getRandomColorPair();
                    return (
                      <Tooltip key={artist.id} title={artist.name}>
                        <Link to={`/artist/${artist.id}`}>
                          <Avatar
                            key={artist.id}
                            style={{
                              backgroundColor: color.secondaryColor,
                              color: color.primaryColor,
                            }}
                          >
                            {artist.name[0]}
                          </Avatar>
                        </Link>
                      </Tooltip>
                    );
                  })}
                </div>
              </div>
            }
          />
        </Card>
        // <div key={item.id}>
        //     <img src={item.images.filter((x: any)=>x.height === 300)[0].url} />
        //   {item.name} - {item.artists[0].name}
        // </div>
      ))}
    </div>
  );
};

export default NewReleases;
