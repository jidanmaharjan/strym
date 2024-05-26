import { Avatar, Button } from "antd";
import { MdClose, MdDarkMode, MdLightMode, MdMenu } from "react-icons/md";
import logo from "../assets/logo.png";
import { useTheme } from "../context/ThemeContext";

interface NavbarProps {
  sidebarOpen: boolean;
  setSideBarOpen: (open: boolean) => void;
}

const Navbar = (props: NavbarProps) => {
  const { sidebarOpen, setSideBarOpen } = props;
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className={`w-full flex justify-between gap-4 p-4 border-b shadow-sm bg-white dark:bg-background_dark dark:text-white sticky top-0 z-40`}
    >
      <div className="flex items-center gap-2 pl-4">
        <div className="md:hidden">
          <Button
            icon={sidebarOpen ? <MdClose size={20} /> : <MdMenu size={20} />}
            onClick={() => setSideBarOpen(!sidebarOpen)}
          ></Button>
        </div>
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
