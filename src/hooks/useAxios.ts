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
      if(error.response.data.error.message === 'The access token expired'){
        localStorage.removeItem('ACCESS_TOKEN')
      }
      throw new Error(error);
    });
};
