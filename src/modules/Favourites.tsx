import { Button, Table } from "antd";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { PiWaveform } from "react-icons/pi";
import { RiMenuAddFill } from "react-icons/ri";
import { TbPlayerPlay } from "react-icons/tb";
import { useQuery } from "react-query";
import Loader from "../components/Loader";
import { getTimeStringFromMilliseconds } from "../components/Player";
import { useAuth } from "../context/AuthContext";
import { getMultipleTracks } from "../queries/multidata";
import { TrackSingleType } from "./library/components/TrackCards";

const Favourites = () => {
  const [favouriteTracks, setFavouriteTracks] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteTracks") || "[]")
  );
  const hasTracks = favouriteTracks.length > 0;

  const { queue, setQueue, playerStates, setPlayerStates } = useAuth();

  const { data: trackData, isFetching: trackFetching } = useQuery(
    ["selectedTracks"],
    () => getMultipleTracks(favouriteTracks.join(",")),
    {
      enabled: hasTracks,
      refetchOnWindowFocus: false,
      refetchOnMount: hasTracks ? true : false,
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
      dataIndex: "duration_ms",
      key: "duration",
      render: (duration: any) => getTimeStringFromMilliseconds(duration),
      width: 100,
    },
    {
      dataIndex: "id",
      key: "actions",
      width: "fit-content",
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
  if (trackFetching) {
    return (
      <div className="p-4">
        <Loader />
      </div>
    );
  }
  return (
    <>
      <div className="p-4 flex justify-between items-center">
        <h2 className="text-lg font-semibold">Favourites</h2>
        <Button
          type="primary"
          onClick={() => {
            setQueue(
              trackData.tracks?.filter(
                (item: TrackSingleType) => item.preview_url !== null
              ) || []
            );
            setPlayerStates &&
              setPlayerStates((prev) => ({
                ...prev,
                current: 0,
                isPlaying: true,
              }));
          }}
        >
          Play All
        </Button>
      </div>
      <Table
        sticky
        className="px-4"
        bordered
        rowKey={(record) => record.id}
        loading={trackFetching}
        size="small"
        columns={columns}
        dataSource={trackData.tracks || []}
        showHeader={false}
      />
    </>
  );
};
export default Favourites;
