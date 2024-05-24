import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/AuthContext";
import { getPlaylistById } from "../../queries/playlist";
import Error from "../Error";
import { TrackSingleType } from "../library/components/TrackCards";
import AllTracks from "./components/AllPlaylistTracks";
import PlaylistInfo from "./components/PlaylistInfo";

const Playlist = () => {
  const { playlistId } = useParams();
  const { setQueue, setPlayerStates } = useAuth();
  const { data, isFetching, isError } = useQuery(["playlist", playlistId], () =>
    getPlaylistById(String(playlistId))
  );

  const [playableTracks, setPlayableTracks] = useState<TrackSingleType[]>([]);

  const playableTracksHandler = () => {
    if (setQueue && setPlayerStates) {
      setQueue(playableTracks);
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
      <PlaylistInfo data={data} playTracks={playableTracksHandler} />
      <AllTracks id={playlistId} setPlayableTracks={setPlayableTracks} />
    </div>
  );
};

export default Playlist;
