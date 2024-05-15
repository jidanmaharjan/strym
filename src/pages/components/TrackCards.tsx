import { Avatar, Card, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { BiAlbum } from "react-icons/bi";
import { IoHeartOutline } from "react-icons/io5";
import { TbMusicSearch } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import { getRandomColorPair } from "../../constants/helpers";

type TrackSingleType = {
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
              <TbMusicSearch
                key="tracks"
                onClick={() => navigate(`/track/${item.id}`)}
              />,
              // <LiaMicrophoneAltSolid key="tracks" />,
              <IoHeartOutline key="favourite" />,
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
