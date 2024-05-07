import axios from "axios";

export const searchSongs = async ({
  search,
  page,
}: {
  search: string;
  page: number;
}) => {
  const options = {
    method: "GET",
    url: "https://genius-song-lyrics1.p.rapidapi.com/search/",
    params: { q: search, per_page: 20, page: page },
    headers: {
      "X-RapidAPI-Key": import.meta.env.VITE_API_KEY,
      "X-RapidAPI-Host": import.meta.env.VITE_API_HOST,
    },
  };
  return axios.request(options);
};
