import { Button, Input } from "antd";
import { FiSearch } from "react-icons/fi";
import { MdDarkMode, MdLightMode } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";

const Navbar = () => {
  const { search, setSearch, theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <div className={`w-full flex gap-4 items-center p-4 shadow-sm`}>
      <Link to={"/"} className="w-fit">
        <div className="flex items-center gap-2 ">
          <img src={logo} alt="logo" className="h-8 w-8" />
          <h3 className="">MusicRepo.</h3>
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
      <Button type="link" onClick={() => toggleTheme()}>
        {theme === "light" ? (
          <MdLightMode size={20} />
        ) : (
          <MdDarkMode size={20} />
        )}
      </Button>
    </div>
  );
};

export default Navbar;
