import { Avatar } from "antd";
import { CiSettings } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`w-full flex justify-end gap-4 p-4 shadow-sm bg-white sticky top-0 z-40`}
    >
      <div className="flex gap-4 items-center w-fit">
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
