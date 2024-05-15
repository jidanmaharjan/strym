import { Card, Tag } from "antd";
import Meta from "antd/es/card/Meta";
import { IoHeartOutline } from "react-icons/io5";
import { TbMusicSearch } from "react-icons/tb";
import Loader from "../../components/Loader";
import { getRandomColorPair } from "../../constants/helpers";
import { LuUsers2 } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

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
              <IoHeartOutline key="favourite" />,
            ]}
          >
            <div className="absolute top-0 left-2 font-semibold bg-primary p-2 w-8 h-8 grid place-content-center text-white rounded-b-md">
              {item.popularity}
            </div>
            <Meta
              title={item.name}
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
