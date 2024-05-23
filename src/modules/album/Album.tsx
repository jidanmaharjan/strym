import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/AuthContext";
import { getAlbumById } from "../../queries/album";
import Error from "../Error";
import AlbumInfo from "./components/AlbumInfo";
import AllTracks, { AlbumTrackType } from "./components/AllTracks";
import { omit } from "lodash";
import { TrackSingleType } from "../library/components/TrackCards";

const Album = () => {
  const { albumId } = useParams();
  const { setQueue, setPlayerStates } = useAuth();
  const { data, isFetching, isError } = useQuery(["album", albumId], () =>
    getAlbumById(String(albumId))
  );

  const [playableTracks, setPlayableTracks] = useState<AlbumTrackType[]>([]);

  const playableTracksHandler = () => {
    if (setQueue && setPlayerStates) {
      setQueue(
        playableTracks.map(
          (item) =>
            ({
              ...item,
              album: omit(data, ["tracks"]),
            } as TrackSingleType)
        )
      );
      setPlayerStates((prev) => ({
        ...prev,
        current: 0,
        isPlaying: true,
      }));
    }
  };

  if (isFetching) {
    return (
      <div className="p-4">
        <Loader />
      </div>
    );
  }
  if (isError) {
    return <Error />;
  }
  return (
    <div className="">
      <AlbumInfo data={data} playTracks={playableTracksHandler} />
      <AllTracks
        id={albumId}
        setPlayableTracks={setPlayableTracks}
        albumData={data}
      />
    </div>
  );
};

export default Album;
