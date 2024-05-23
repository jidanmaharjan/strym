import { Avatar, Button, Card, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { useState } from "react";
import { BiAlbum } from "react-icons/bi";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { RiMenuAddFill } from "react-icons/ri";
import { TbPlayerPlay } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { getRandomColorPair } from "../../constants/helpers";
import { useAuth } from "../../context/AuthContext";

export type TrackSingleType = {
  album: {
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
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: {
    isrc: string;
  };
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

interface TrackCardsProps {
  data: TrackSingleType[];
  loading: boolean;
}
const TrackCards = (props: TrackCardsProps) => {
  const { data, loading } = props;
  const [favouriteTracks, setFavouriteTracks] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteTracks") || "[]")
  );

  const { queue, setQueue, setPlayerStates } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <h3 className="font-semibold">Tracks</h3>
      <div className="flex gap-4 w-full overflow-x-scroll hide-scrollbar snap-x snap-mandatory">
        {data?.map((item) => (
          <Card
            key={item.id}
            className="w-60"
            cover={
              <img
                alt={item.name}
                src={item.album.images?.[1]?.url || item.album.images?.[0]?.url}
                className="min-w-60 max-w-60 h-40 object-cover"
              />
            }
            actions={[
              <Button
                key="play"
                disabled={!item.preview_url}
                onClick={() => {
                  if (item.preview_url) {
                    setQueue([item]);
                    setPlayerStates &&
                      setPlayerStates((prev) => ({
                        ...prev,
                        current: 0,
                        isPlaying: true,
                        seek: 0,
                        played: 0,
                        playedSeconds: 0,
                      }));
                  }
                }}
                type="text"
              >
                <TbPlayerPlay />
              </Button>,
              <Button
                key="queue"
                disabled={!item.preview_url}
                onClick={() =>
                  item.preview_url &&
                  !queue.find((x) => x.id === item.id) &&
                  setQueue((prev) => [...prev, item])
                }
                type="text"
              >
                <RiMenuAddFill />
              </Button>,
              <Button
                className="text-primary cursor-pointer text-lg"
                type="text"
                key="favourite"
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
              >
                {favouriteTracks.includes(item.id) ? (
                  <IoHeart />
                ) : (
                  <IoHeartOutline />
                )}
              </Button>,
            ]}
          >
            <div className="absolute top-0 left-2 font-semibold bg-primary p-2 w-8 h-8 grid place-content-center text-white rounded-b-md">
              {item.popularity}
            </div>
            <Meta
              title={<Link to={`/track/${item.id}`}>{item.name}</Link>}
              description={
                <div className="flex flex-col gap-2 flex-grow">
                  <Link
                    to={`/album/${item.album.id}`}
                    className="flex gap-2 items-center"
                  >
                    <BiAlbum />
                    <p className="overflow-x-scroll whitespace-nowrap hide-scrollbar">
                      {item.album?.name}
                    </p>
                  </Link>
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
        ))}
      </div>
    </>
  );
};

export default TrackCards;
