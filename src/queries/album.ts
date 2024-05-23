import { callAxios } from "../hooks/useAxios";

export const getAlbumById = async (id: string) =>
  callAxios({
    url: `albums/${id}`,
    method: "GET",
  });

export const getAllTracks = async (id: string) =>
  callAxios({
    url: `albums/${id}/tracks`,
    method: "GET",
    params: { limit: 50 },
  });
