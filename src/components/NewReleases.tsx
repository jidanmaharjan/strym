import { useQuery } from "react-query";
import { getNewReleases } from "../queries/songs";
import Loader from "./Loader";
import { Card, Avatar, Divider, Tooltip } from "antd";
import Meta from "antd/es/card/Meta";
import { IoHeartOutline } from "react-icons/io5";
import { LiaMicrophoneAltSolid } from "react-icons/lia";
import { TbMusicSearch } from "react-icons/tb";
import {
  generatePrimaryAndSecondaryColors,
  getRandomColorPair,
} from "../constants/helpers";

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
    <div className="flex gap-4">
      {newReleases?.albums?.items?.map((item: any) => (
        <Card
          key={item.id}
          style={{ width: 300 }}
          cover={
            <img
              alt="example"
              src={item.images.filter((x: any) => x.height === 300)[0].url}
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
