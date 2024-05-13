import { Avatar, Input } from "antd";
import { CiSettings } from "react-icons/ci";
import { FiSearch } from "react-icons/fi";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { search, setSearch, theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div
      className={`w-full flex gap-4 items-center p-4 shadow-sm bg-white fixed top-0 z-40`}
    >
      <form
        className="flex-grow flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <Input
          prefix={<FiSearch size={20} className="text-gray0" />}
          placeholder="Search"
          className="rounded-full w-fit"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div className="flex gap-2 items-center">
        {/* <Switch
      checkedChildren={<FiMoon size={20} />}
      unCheckedChildren={<FiSun size={20} />}
      defaultChecked
    /> */}
        <button
          className="w-fit p-0 hover:text-primary"
          onClick={() => toggleTheme()}
        >
          {theme === "light" ? (
            <MdLightMode size={20} />
          ) : (
            <MdDarkMode size={20} />
          )}
        </button>
        <button
          className="w-fit p-0 hover:text-primary"
          onClick={() => toggleTheme()}
        >
          <IoIosNotificationsOutline size={20} />
        </button>
        <button
          className="w-fit p-0 hover:text-primary"
          onClick={() => toggleTheme()}
        >
          <CiSettings size={20} />
        </button>
        <Avatar style={{ backgroundColor: "#fde3cf", color: "#f56a00" }}>
          U
        </Avatar>
      </div>
    </div>
  );
};

export default Navbar;
