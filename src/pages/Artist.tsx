import { useParams } from "react-router-dom";
import { getArtistById } from "../queries/artist";
import ArtistInfo from "./components/ArtistInfo";
import Loader from "../components/Loader";
import { useQuery } from "react-query";

const Artist = () => {
  const { artistId } = useParams();
  const { data, isFetching } = useQuery(["artist", artistId], () =>
    getArtistById(String(artistId))
  );

  console.log(data);

  if (isFetching) {
    return (
      <div className="p-4">
        <Loader />
      </div>
    );
  }
  return (
    <div className="p-4">
      <ArtistInfo data={data} />
    </div>
  );
};

export default Artist;
