import axios from "axios";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { TrackSingleType } from "../modules/library/components/TrackCards";

type playerStatesType = {
  seek: number | undefined;
  played: number | undefined;
  playedSeconds: number | undefined;
  loaded: number | undefined;
  isPlaying: boolean;
  isShuffled: boolean;
  isRepeat: boolean;
  repeatOne: boolean;
  fullscreen: boolean;
  voulume: number;
  mute: boolean;
  current: number;
  openQueue: boolean;
};

type ContextType = {
  isAuthenticated: boolean;
  queue: TrackSingleType[];
  setQueue: React.Dispatch<React.SetStateAction<TrackSingleType[]>>;
  playerStates?: playerStatesType;
  setPlayerStates?: React.Dispatch<React.SetStateAction<playerStatesType>>;
  isLoading: boolean;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("ACCESS_TOKEN")
  );
  const [queue, setQueue] = useState<TrackSingleType[]>([]);
  const [playerStates, setPlayerStates] = useState<playerStatesType>({
    seek: undefined,
    played: undefined,
    playedSeconds: undefined,
    loaded: undefined,
    isPlaying: false,
    isShuffled: false,
    isRepeat: false,
    repeatOne: false,
    fullscreen: false,
    voulume: 100,
    mute: false,
    current: 0,
    openQueue: false,
  });
  const navigate = useNavigate();

  const fetchToken = useMutation(
    () =>
      axios({
        url: "https://accounts.spotify.com/api/token",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          grant_type: "client_credentials",
          client_id: import.meta.env.VITE_SPOTIFY_CLIENT_KEY,
          client_secret: import.meta.env.VITE_SPOTIFY_SECRET_KEY,
        },
      }),
    {
      onSuccess: (res) => {
        localStorage.setItem("ACCESS_TOKEN", res.data?.access_token);
        setIsAuthenticated(true);
      },
      onError: () => {
        navigate("/connection-error");
      },
    }
  );

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (
        error.response?.data?.error?.message === "The access token expired" ||
        error.response?.data?.error?.message === "Invalid access token"
      ) {
        console.log("Token expired");

        localStorage.removeItem("ACCESS_TOKEN");
        fetchToken.mutate();
      }
      throw new Error(error);
    }
  );

  useEffect(() => {
    if (!isAuthenticated) {
      fetchToken.mutate();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        queue,
        setQueue,
        playerStates,
        setPlayerStates,
        isLoading: fetchToken.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const auth = useContext(AuthContext);
  if (auth === undefined) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return auth;
};
