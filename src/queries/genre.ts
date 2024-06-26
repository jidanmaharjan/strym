import { callAxios } from "../hooks/useAxios";

export const getGenres = () =>
  callAxios({
    method: "GET",
    url: `recommendations/available-genre-seeds`,
  });
