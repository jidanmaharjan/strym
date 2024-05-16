import { Card, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { TbMusic, TbMusicSearch } from "react-icons/tb";
import Loader from "../../components/Loader";
import { getRandomColorPair } from "../../constants/helpers";
import { LuUser, LuUsers2 } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

type PlaylistSingleType = {
  collaborative: boolean;
  description: string;
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
  owner: {
    display_name: string;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color: any;
  public: any;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
  type: string;
  uri: string;
};

interface PlaylistCardsProps {
  data: PlaylistSingleType[];
  loading: boolean;
}
const PlaylistCards = (props: PlaylistCardsProps) => {
  const { data, loading } = props;
  const [favouritePlaylists, setFavouritePlaylists] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouritePlaylists") || "[]")
  );
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h3 className="font-semibold">Playlists</h3>
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
                onClick={() => navigate(`/playlist/${item.id}`)}
              />,
              // <LiaMicrophoneAltSolid key="playlists" />,
              <div
                className="text-primary cursor-pointer text-lg"
                key="favourite"
                onClick={() => {
                  if (favouritePlaylists.includes(item.id)) {
                    setFavouritePlaylists(
                      favouritePlaylists.filter((id) => id !== item.id)
                    );
                  } else {
                    setFavouritePlaylists([...favouritePlaylists, item.id]);
                  }
                  localStorage.setItem(
                    "favouritePlaylists",
                    JSON.stringify([...favouritePlaylists, item.id])
                  );
                }}
              >
                {favouritePlaylists.includes(item.id) ? (
                  <IoHeart />
                ) : (
                  <IoHeartOutline />
                )}
              </div>,
            ]}
          >
            <Meta
              title={<Link to={`/playlist/${item.id}`}>{item.name}</Link>}
              description={
                <div className="flex flex-col gap-2 flex-grow">
                  <div className="flex gap-2 items-center">
                    <LuUser />
                    <p className="overflow-x-scroll whitespace-nowrap hide-scrollbar">
                      {item.owner?.display_name}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <TbMusic />
                    <p>{item.tracks?.total}</p>
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

export default PlaylistCards;
