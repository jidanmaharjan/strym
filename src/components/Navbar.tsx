import { Avatar, Button, Input, Switch } from "antd";
import { FiMoon, FiSearch, FiSun } from "react-icons/fi";
import { MdDarkMode, MdLightMode, MdOutlineWbSunny } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";
import { IoIosNotificationsOutline } from "react-icons/io";
import { CiSettings } from "react-icons/ci";

const Navbar = () => {
  const { search, setSearch, theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`w-full flex gap-4 items-center p-4 shadow-sm bg-white fixed top-0 z-50`}>
      <Link to={"/"} className="w-fit">
        <div className="flex items-center gap-2 ">
          <img src={logo} alt="logo" className="h-8 w-8" />
          <h3 className="">Strym.</h3>
        </div>
      </Link>
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
          className="w-full md:w-[50%]"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <div>
      {/* <Switch
      checkedChildren={<FiMoon size={20} />}
      unCheckedChildren={<FiSun size={20} />}
      defaultChecked
    /> */}
      <Button type="link" onClick={() => toggleTheme()}>
        {theme === "light" ? (
          <MdLightMode size={20} />
        ) : (
          <MdDarkMode size={20} />
        )}
      </Button>
      <Button type="link" onClick={() => toggleTheme()}>
      <IoIosNotificationsOutline size={20} />
      </Button>
      <Button type="link" onClick={() => toggleTheme()}>
      <CiSettings size={20} />
  
      </Button>
      <Avatar style={{ backgroundColor: '#fde3cf', color: '#f56a00' }}>U</Avatar>
      </div>
    </div>
  );
};

export default Navbar;
