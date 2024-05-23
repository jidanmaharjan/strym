import { useQuery } from "react-query";
import { getTopTracks } from "../../queries/artist";
import Loader from "../../components/Loader";
import { Button, Table } from "antd";
import { FiHeart, FiPlay } from "react-icons/fi";
import { TrackSingleType } from "./TrackCards";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { getTimeStringFromMilliseconds } from "../../components/Player";
import { RiMenuAddFill } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { TbPlayerPlay } from "react-icons/tb";
import { PiWaveform } from "react-icons/pi";

type TopTracksProps = {
  id: string | undefined;
  setPlayableTracks: React.Dispatch<React.SetStateAction<TrackSingleType[]>>;
};

const TopTracks = (props: TopTracksProps) => {
  const { id, setPlayableTracks } = props;
  const { queue, setQueue, playerStates, setPlayerStates } = useAuth();

  const [favouriteTracks, setFavouriteTracks] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteTracks") || "[]")
  );

  const { data, isFetching } = useQuery(
    ["top-tracks", id],
    () => getTopTracks(id || ""),
    {
      enabled: !!id,
      onSuccess: (res) => {
        setPlayableTracks(
          res.tracks?.filter(
            (item: TrackSingleType) => item.preview_url !== null
          )
        );
      },
    }
  );

  const columns = [
    {
      render: (_: any, __: any, i: number) => i + 1,
      dataIndex: "id",
      key: "index",
      width: 60,
    },
    {
      dataIndex: "album",
      render: (album: any) => (
        <img
          src={album.images[album.images.length - 1].url}
          alt="track"
          className="w-10 h-10"
        />
      ),
      width: 60,
      key: "album",
    },
    {
      dataIndex: "name",
      key: "name",
    },
    {
      dataIndex: "album",
      render: (album: any) => album.name,
      key: "album_name",
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
      width: "fit-content",
      render: (id: string, item: any) => (
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
              setQueue((prev) => [...prev, item])
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
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <Table
      sticky
      className="p-4 w-2/3"
      bordered
      loading={isFetching}
      size="small"
      columns={columns}
      dataSource={data.tracks || []}
      showHeader={false}
      pagination={false}
    />
  );
};
export default TopTracks;
