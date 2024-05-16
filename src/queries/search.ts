import { callAxios } from "../hooks/useAxios";

export const searchSpotify = (params: any) =>
  callAxios({
    method: "GET",
    url: `search`,
    params,
  });
