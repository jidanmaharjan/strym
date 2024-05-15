import { callAxios } from "../hooks/useAxios";

export const searchSpotfy = (params: any) =>
  callAxios({
    method: "GET",
    url: `search`,
    params,
  });
