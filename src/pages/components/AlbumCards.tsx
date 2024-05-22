import { Avatar, Button, Card, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { IoAlbumsOutline, IoHeart, IoHeartOutline } from "react-icons/io5";
import { TbMusicSearch } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { getRandomColorPair } from "../../constants/helpers";

export type AlbumSingleType = {
  album_type: string;
  artists: Array<{
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
  }>;
  available_markets: Array<string>;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    height: number;
    url: string;
    width: number;
  }>;
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
};

interface AlbumCardsProps {
  data: AlbumSingleType[];
  loading: boolean;
  hideLabel?: boolean;
}
const AlbumCards = (props: AlbumCardsProps) => {
  const { data, loading, hideLabel = false } = props;
  const [favouriteAlbums, setFavouriteAlbums] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteAlbums") || "[]")
  );
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {hideLabel ? null : <h3 className="font-semibold">Albums</h3>}
      <div className="flex gap-4 w-full overflow-x-scroll hide-scrollbar snap-x snap-mandatory">
        {data?.map((item) => {
          const images = item?.images;
          const sortedImages = images?.sort((a, b) => b.height - a.height);
          if (item) {
            return (
              <Card
                key={item.id}
                className="w-60 "
                cover={
                  <img
                    alt={item.name}
                    src={sortedImages?.[1]?.url || sortedImages?.[0]?.url}
                    className="min-w-60 max-w-60 h-40 object-cover"
                  />
                }
                actions={[
                  <Button
                    type="text"
                    key="tracks"
                    onClick={() => navigate(`/album/${item.id}`)}
                  >
                    <TbMusicSearch />
                  </Button>,
                  <Button
                    type="text"
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
                      localStorage.setItem(
                        "favouriteAlbums",
                        JSON.stringify(newFav)
                      );
                    }}
                  >
                    {favouriteAlbums.includes(item.id) ? (
                      <IoHeart />
                    ) : (
                      <IoHeartOutline />
                    )}
                  </Button>,
                ]}
              >
                {/* <div className="absolute top-0 left-2 font-semibold bg-primary p-2 w-8 h-8 grid place-content-center text-white rounded-b-md">
                 {item.popularity}
               </div> */}
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
            );
          }
        })}
      </div>
    </>
  );
};

export default AlbumCards;
