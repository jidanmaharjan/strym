import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type Theme = "light" | "dark";

type ContextType = {
  theme: Theme;
  toggleTheme: () => void;
  search: string;
  setSearch: (search: string) => void;
};

const ThemeContext = createContext<ContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [search, setSearch] = useState<string>("");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
    localStorage.setItem("theme", theme);
  };

  useEffect(() => {
    const localTheme = localStorage.getItem("theme") as Theme;
    if (localTheme) {
      setTheme(localTheme);
    } else {
      setTheme("light");
    }
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, search, setSearch }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const theme = useContext(ThemeContext);
  if (theme === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return theme;
};
