import { useParams } from "react-router-dom";
import { getArtistById } from "../queries/artist";
import ArtistInfo from "./components/ArtistInfo";
import Loader from "../components/Loader";
import { useQuery } from "react-query";
import TopTracks from "./components/TopTracks";
import TopAlbums from "./components/TopAlbums";
import Error from "./Error";
import { useState } from "react";
import { TrackSingleType } from "./components/TrackCards";
import { useAuth } from "../context/AuthContext";

const Artist = () => {
  const { artistId } = useParams();
  const { setQueue, setPlayerStates } = useAuth();
  const { data, isFetching, isError } = useQuery(["artist", artistId], () =>
    getArtistById(String(artistId))
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
      <ArtistInfo data={data} playTracks={playableTracksHandler} />
      <div className="flex gap-4">
        <TopTracks id={artistId} setPlayableTracks={setPlayableTracks} />
        <TopAlbums id={artistId} />
      </div>
    </div>
  );
};

export default Artist;
