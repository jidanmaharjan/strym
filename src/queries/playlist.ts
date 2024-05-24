import { callAxios } from "../hooks/useAxios";

export const getPlaylistById = async (id: string) =>
  callAxios({
    url: `playlists/${id}`,
    method: "GET",
  });

export const getAllPlaylistTracks = async (id: string) =>
  callAxios({
    url: `playlists/${id}/tracks`,
    method: "GET",
    params: { limit: 50 },
  });
