import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { callAxios } from "../hooks/useAxios";

type ContextType = {
  isAuthenticated: boolean;
};

const AuthContext = createContext<ContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("ACCESS_TOKEN")
  );
  const navigate = useNavigate();

  const fetchToken = useMutation(
    () =>
      callAxios({
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
        isAuth: true
      }),
    {
      onSuccess: (res) => {
        localStorage.setItem("ACCESS_TOKEN", res.access_token);
        setIsAuthenticated(true);
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
    <AuthContext.Provider value={{ isAuthenticated }}>
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
