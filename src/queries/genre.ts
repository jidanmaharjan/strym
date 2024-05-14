import { callAxios } from "../hooks/useAxios";

const baseUrl = import.meta.env.VITE_SPOTIFY_URL;

export const getGenres = () =>
  callAxios({
    method: "GET",
    url: `${baseUrl}/recommendations/available-genre-seeds`,
  });
