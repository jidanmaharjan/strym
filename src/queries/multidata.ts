import { callAxios } from "../hooks/useAxios";

export const getMultipleArtists = (payload: string) =>
  callAxios({
    method: "GET",
    url: `artists`,
    params: { ids: payload },
  });

export const getMultipleAlbums = (payload: string) =>
  callAxios({
    method: "GET",
    url: `albums`,
    params: { ids: payload },
  });
export const getMultipleTracks = (payload: string) =>
  callAxios({
    method: "GET",
    url: `tracks`,
    params: { ids: payload },
  });
export const getMultiplePlaylists = (payload: string) =>
  callAxios({
    method: "GET",
    url: `playlists`,
    params: { ids: payload },
  });
