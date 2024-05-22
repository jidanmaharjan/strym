import { Avatar } from "antd";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`w-full flex justify-between gap-4 p-4 shadow-sm bg-white dark:bg-background_dark dark:text-white sticky top-0 z-40`}
    >
      <div className="flex items-center gap-2 pl-4">
        <img src={logo} alt="logo" className="h-8 w-8" />
        <h3 className="">Strym.</h3>
      </div>
      <div className="flex gap-4 items-center w-fit">
        <button
          className="w-fit p-0 hover:text-primary"
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? (
            <MdDarkMode size={20} />
          ) : (
            <MdLightMode size={20} />
          )}
        </button>
        <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
          U
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
