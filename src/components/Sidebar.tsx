import { Menu, MenuProps } from "antd";
import { BiVolumeFull } from "react-icons/bi";
import { FiMusic, FiSearch } from "react-icons/fi";
import { IoHeartOutline } from "react-icons/io5";
import { LuLibrary } from "react-icons/lu";
import { MdOutlineAddBox } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const favouritePlaylists = JSON.parse(
    localStorage.getItem("favouritePlaylists") || "[]"
  );
  type MenuItem = Required<MenuProps>["items"][number];

  const items: MenuItem[] = [
    { key: "/", icon: <FiMusic />, label: "Home" },
    { key: "/search", icon: <FiSearch />, label: "Search" },
    { key: "/genre", icon: <BiVolumeFull />, label: "Genre" },
    { key: "/library", icon: <LuLibrary />, label: "Library" },
    { type: "divider" },
    {
      key: "/recommendations",
      icon: <MdOutlineAddBox />,
      label: "Recommendations",
    },
    { key: "/favourites", icon: <IoHeartOutline />, label: "Favourites" },
  ];
  if (favouritePlaylists.length > 0) {
    items.push({
      type: "divider",
    });
  }
  favouritePlaylists?.forEach((fav: any) =>
    items.push({
      key: `playlist/${fav.id}`,
      icon: (
        <img
          className="w-8 h-8 rounded-md"
          src={fav.images?.[fav?.images.length - 1].url}
          alt={fav.name}
        />
      ),
      label: fav.name,
    })
  );
  return (
    <div className="fixed left-0 min-h-screen z-30 w-60 pt-16">
      <Menu
        defaultSelectedKeys={[pathname]}
        mode="inline"
        theme={theme}
        items={items}
        className="h-screen w-60 pt-4"
        onClick={(e) => navigate(e.key)}
      />
    </div>
  );
};

export default Sidebar;
