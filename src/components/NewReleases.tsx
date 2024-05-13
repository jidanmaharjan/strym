import { Avatar, Card, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { IoHeartOutline } from "react-icons/io5";
import { TbMusicSearch } from "react-icons/tb";
import { useQuery } from "react-query";
import { getRandomColorPair } from "../constants/helpers";
import { getNewReleases } from "../queries/songs";
import Loader from "./Loader";

const NewReleases = () => {
  const {
    data: newReleases,
    isLoading: newReleasesLoading,
    isFetching: newReleasesFetching,
  } = useQuery(["new_releases"], () => getNewReleases());

  if (newReleasesLoading) {
    return <Loader />;
  }

  return (
    <div className="flex gap-4 w-full overflow-x-scroll hide-scrollbar snap-x snap-mandatory">
      {newReleases?.albums?.items?.map((item: any) => (
        <Card
          key={item.id}
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src={item.images.filter((x: any) => x.height === 300)[0].url}
              className="min-w-60 h-40 object-cover"
            />
          }
          actions={[
            <TbMusicSearch key="tracks" />,
            // <LiaMicrophoneAltSolid key="artists" />,
            <IoHeartOutline key="favourite" />,
          ]}
        >
          <Meta
            title={item.name}
            description={
              <div className="flex gap-2">
                {item.artists.map((artist: any) => {
                  const color = getRandomColorPair();
                  return (
                    <Tooltip key={artist.id} title={artist.name}>
                      <Avatar
                        key={artist.id}
                        style={{
                          backgroundColor: color.secondaryColor,
                          color: color.primaryColor,
                        }}
                      >
                        {artist.name[0]}
                      </Avatar>
                    </Tooltip>
                  );
                })}
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
