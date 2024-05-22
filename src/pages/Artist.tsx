import { useParams } from "react-router-dom";
import { getArtistById } from "../queries/artist";
import ArtistInfo from "./components/ArtistInfo";
import Loader from "../components/Loader";
import { useQuery } from "react-query";
import TopTracks from "./components/TopTracks";

const Artist = () => {
  const { artistId } = useParams();
  const { data, isFetching } = useQuery(["artist", artistId], () =>
    getArtistById(String(artistId))
  );

  if (isFetching) {
    return (
      <div className="p-4">
        <Loader />
      </div>
    );
  }
  return (
    <div className="">
      <ArtistInfo data={data} />
      <TopTracks id={artistId} />
    </div>
  );
};

export default Artist;
