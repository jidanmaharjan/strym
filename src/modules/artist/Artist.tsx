import { useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import { useAuth } from "../../context/AuthContext";
import { getArtistById } from "../../queries/artist";
import Error from "../Error";
import { TrackSingleType } from "../library/components/TrackCards";
import ArtistInfo from "./components/ArtistInfo";
import RelatedArtists from "./components/RelatedArtists";
import AllAlbums from "./components/AllAlbums";
import TopTracks from "./components/TopTracks";

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
      <TopTracks id={artistId} setPlayableTracks={setPlayableTracks} />
      <div className="flex gap-4">
        <AllAlbums id={artistId} />
        <RelatedArtists id={artistId} />
      </div>
    </div>
  );
};

export default Artist;
