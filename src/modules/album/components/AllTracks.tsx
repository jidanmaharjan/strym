import { Button, Table } from "antd";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { PiWaveform } from "react-icons/pi";
import { RiMenuAddFill } from "react-icons/ri";
import { TbPlayerPlay } from "react-icons/tb";
import { useQuery } from "react-query";
import Loader from "../../../components/Loader";
import { getTimeStringFromMilliseconds } from "../../../components/Player";
import { useAuth } from "../../../context/AuthContext";
import { getAllTracks } from "../../../queries/album";
import { AlbumSingleType } from "../../library/components/AlbumCards";
import { omit } from "lodash";
import { TrackSingleType } from "../../library/components/TrackCards";

export type AlbumTrackType = {
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
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
};

type AllTracksProps = {
  id: string | undefined;
  setPlayableTracks: React.Dispatch<React.SetStateAction<AlbumTrackType[]>>;
  albumData: AlbumSingleType;
};

const AllTracks = (props: AllTracksProps) => {
  const { id, setPlayableTracks, albumData } = props;
  const { queue, setQueue, playerStates, setPlayerStates } = useAuth();

  const [favouriteTracks, setFavouriteTracks] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteTracks") || "[]")
  );

  const { data, isFetching } = useQuery(
    ["all-tracks", id],
    () => getAllTracks(id || ""),
    {
      enabled: !!id,
      onSuccess: (res) => {
        setPlayableTracks(
          res.items?.filter((item: AlbumTrackType) => item.preview_url !== null)
        );
      },
    }
  );

  const columns: any = [
    {
      render: (_: any, __: any, i: number) => i + 1,
      dataIndex: "id",
      key: "index",
      width: 60,
    },
    {
      dataIndex: "name",
      key: "name",
    },
    {
      dataIndex: "duration_ms",
      key: "duration",
      render: (duration: any) => getTimeStringFromMilliseconds(duration),
      width: 100,
    },
    {
      dataIndex: "id",
      key: "actions",
      fixed: "right",
      width: 150,
      render: (_id: string, item: any) => (
        <div className="flex">
          <Button
            key="play"
            disabled={
              !item.preview_url ||
              (playerStates?.isPlaying &&
                queue[playerStates.current].id === item.id)
            }
            onClick={() => {
              if (item.preview_url) {
                setQueue([
                  {
                    ...item,
                    album: omit(albumData, ["tracks"]),
                  } as TrackSingleType,
                ]);
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
            {playerStates?.isPlaying &&
            queue[playerStates.current].id === item.id ? (
              <PiWaveform className="animate-pulse" />
            ) : (
              <TbPlayerPlay />
            )}
          </Button>

          <Button
            key="queue"
            disabled={!item.preview_url}
            onClick={() =>
              item.preview_url &&
              !queue.find((x) => x.id === item.id) &&
              setQueue((prev) => [
                ...prev,
                {
                  ...item,
                  album: omit(albumData, ["tracks"]),
                } as TrackSingleType,
              ])
            }
            type="text"
          >
            <RiMenuAddFill />
          </Button>
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
              localStorage.setItem("favouriteTracks", JSON.stringify(newFav));
            }}
          >
            {favouriteTracks.includes(item.id) ? (
              <IoHeart />
            ) : (
              <IoHeartOutline />
            )}
          </Button>
        </div>
      ),
    },
  ];
  if (isFetching) {
    return (
      <div className="p-4">
        <Loader />
      </div>
    );
  }
  return (
    <Table
      sticky
      scroll={{ x: 500 }}
      className="p-4"
      bordered
      rowKey={(record) => record.id}
      loading={isFetching}
      size="small"
      columns={columns}
      dataSource={data.items || []}
      showHeader={false}
      pagination={false}
    />
  );
};
export default AllTracks;
