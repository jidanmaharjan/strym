import axios, { AxiosRequestConfig } from "axios";

interface AxiosConfig extends AxiosRequestConfig {
  isAuth?: boolean;
}

export const callAxios = async (props: AxiosConfig) => {
  const { isAuth } = props;
  const token = localStorage.getItem("ACCESS_TOKEN");
  return axios({
    ...props,
    headers: {
      Authorization: !isAuth ? `Bearer ${token}` : undefined,
      ...props.headers,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error);
    });
};
