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

type ContextType = {
  isAuthenticated: boolean;
  playUri: string;
  setPlayUri: (uri: string) => void;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("ACCESS_TOKEN")
  );
  const [playUri, setPlayUri] = useState("");
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
        window.location.reload();
      },
      onError: () => {
        navigate("/connection-error");
      },
    }
  );

  useEffect(() => {
    if (!isAuthenticated) {
      fetchToken.mutate();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, playUri, setPlayUri }}>
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
