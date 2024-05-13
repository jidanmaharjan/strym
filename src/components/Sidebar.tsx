import { Menu, MenuProps } from "antd";
import { BiVolumeFull } from "react-icons/bi";
import { FiMusic } from "react-icons/fi";
import { IoHeartOutline } from "react-icons/io5";
import { LuLibrary } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    { key: "", icon: <FiMusic />, label: "Home" },
    { key: "genre", icon: <BiVolumeFull />, label: "Genre" },
    { key: "library", icon: <LuLibrary />, label: "Library" },
    { type: "divider" },
    { key: "library/add", icon: <MdOutlineAddBox />, label: "Add Library" },
    { key: "liked_songs", icon: <IoHeartOutline />, label: "Liked Songs" },
  ];
  return (
    <div className="fixed left-0 min-h-screen z-50 bg-white w-60">
      <div className="flex items-center gap-2 py-4 px-6">
        <img src={logo} alt="logo" className="h-8 w-8" />
        <h3 className="">Strym.</h3>
      </div>
      <Menu
        defaultSelectedKeys={[""]}
        mode="inline"
        theme="light"
        items={items}
        className="h-screen w-60 mt-4"
        onClick={(e) => navigate(e.key)}
      />
    </div>
  );
};

export default Sidebar;
