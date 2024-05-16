import { Card, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { TbMusicSearch } from "react-icons/tb";
import Loader from "../../components/Loader";
import { getRandomColorPair } from "../../constants/helpers";
import { LuUsers2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type ArtistSingleType = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: any;
    total: number;
  };
  genres: Array<string>;
  href: string;
  id: string;
  images: Array<{
    height: number;
    url: string;
    width: number;
  }>;
  name: string;
  popularity: number;
  type: string;
  uri: string;
};

interface ArtistCardsProps {
  data: ArtistSingleType[];
  loading: boolean;
}
const ArtistCards = (props: ArtistCardsProps) => {
  const { data, loading } = props;
  const [favouriteArtists, setFavouriteArtists] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteArtists") || "[]")
  );
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h3 className="font-semibold">Artists</h3>
      <div className="flex gap-4 w-full overflow-x-scroll hide-scrollbar snap-x snap-mandatory">
        {data?.map((item) => (
          <Card
            key={item.id}
            className="w-60"
            cover={
              <img
                alt={item.name}
                src={item.images?.[1]?.url || item.images?.[0]?.url}
                className="min-w-60 max-w-60 h-40 object-cover"
              />
            }
            actions={[
              <TbMusicSearch
                key="tracks"
                onClick={() => navigate(`/artist/${item.id}`)}
              />,
              // <LiaMicrophoneAltSolid key="artists" />,
              <div
                className="text-primary cursor-pointer text-lg"
                key="favourite"
                onClick={() => {
                  let newFav = null;
                  if (favouriteArtists.includes(item.id)) {
                    newFav = favouriteArtists.filter((id) => id !== item.id);
                  } else {
                    newFav = [...favouriteArtists, item.id];
                  }
                  setFavouriteArtists(newFav);
                  localStorage.setItem(
                    "favouriteArtists",
                    JSON.stringify(newFav)
                  );
                }}
              >
                {favouriteArtists.includes(item.id) ? (
                  <IoHeart />
                ) : (
                  <IoHeartOutline />
                )}
              </div>,
            ]}
          >
            <div className="absolute top-0 left-2 font-semibold bg-primary p-2 w-8 h-8 grid place-content-center text-white rounded-b-md">
              {item.popularity}
            </div>
            <Meta
              title={<Link to={`/artist/${item.id}`}>{item.name}</Link>}
              description={
                <div className="flex flex-col gap-2 flex-grow">
                  <div className="flex gap-2 items-center">
                    <LuUsers2 />
                    <p>{item.followers?.total}</p>
                  </div>
                  <div className="flex gap-2 overflow-x-scroll hide-scrollbar">
                    {item.genres.map((genre) => {
                      const color = getRandomColorPair();
                      return (
                        <Tag key={genre} color={color.primaryColor}>
                          {genre}
                        </Tag>
                      );
                    })}
                    {item.genres.length === 0 && (
                      <Tag color="default">No genres</Tag>
                    )}
                  </div>
                </div>
              }
            />
          </Card>
        ))}
      </div>
    </>
  );
};

export default ArtistCards;
