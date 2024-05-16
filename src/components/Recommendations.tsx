import { useQuery } from "react-query";
import { callAxios } from "../hooks/useAxios";
import Featured from "./Featured";
import { random } from "lodash";

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
        seed_artists: [
          ...defaultSeedArtists,
          ...storedSeedArtists.slice(
            random(
              0,
              storedSeedArtists.length > 2 ? storedSeedArtists.length - 2 : 0
            ),
            2
          ),
        ].join(","),
        seed_genres: [
          ...defaultSeedGenres,
          ...storedSeedGenres.slice(
            random(
              0,
              storedSeedGenres.length > 1 ? storedSeedGenres.length - 1 : 0
            ),
            1
          ),
        ].join(","),
        include_external: "audio",
      },
    })
  );
  console.log(
    [
      ...defaultSeedArtists,
      ...storedSeedArtists.slice(
        random(
          0,
          storedSeedArtists.length > 2 ? storedSeedArtists.length - 2 : 0
        ),
        2
      ),
    ].join(",")
  );

  return <Featured data={data?.tracks} loading={isFetching} />;
};

export default Recommendations;
