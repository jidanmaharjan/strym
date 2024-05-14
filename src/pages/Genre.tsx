import { useQuery } from "react-query";
import { getGenres } from "../queries/genre";

const Genre = () => {
  const {
    data: genres,
    isLoading: genresLoading,
    isFetching: genresFetching,
  } = useQuery(["genres"], () => getGenres());
  console.log(genres);

  return <div>Genre</div>;
};
export default Genre;
