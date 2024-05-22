import { callAxios } from "../hooks/useAxios";

export const getArtistById = async (id: string) =>
  callAxios({
    url: `artists/${id}`,
    method: "GET",
  });
