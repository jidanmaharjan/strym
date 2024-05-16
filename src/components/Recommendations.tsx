import { useQuery } from "react-query";
import { callAxios } from "../hooks/useAxios";
import Featured from "./Featured";

const defaultSeedArtists = ["41MozSoPIsD1dJM0CLPjZF"];
const defaultSeedGenres = ["k-pop"];
const Recommendations = () => {
  const storedSeedArtists = JSON.parse(
    localStorage.getItem("favouriteArtists") || "[]"
  );
  const storedSeedGenres = JSON.parse(
    localStorage.getItem("favouriteGenres") || "[]"
  );

  const { data, isFetching } = useQuery(["recommendation-tracks"], () =>
    callAxios({
      url: "recommendations",
      params: {
        limit: 10,
        seed_artists:
          storedSeedArtists.length > 0
            ? storedSeedArtists?.slice(3).join(",")
            : defaultSeedArtists.join(","),
        seed_genres:
          storedSeedGenres.length > 0
            ? storedSeedGenres?.slice(2).join(",")
            : defaultSeedGenres.join(","),
      },
    })
  );
  return <Featured data={data?.tracks} loading={isFetching} />;
};

export default Recommendations;
