import { Tabs, TabsProps } from "antd";
import { useState } from "react";
import { MdOutlineNewReleases } from "react-icons/md";
import { TbCategory } from "react-icons/tb";
import { useQuery } from "react-query";
import ErrorPage from "../components/Error";
import Loader from "../components/Loader";
import NewReleases from "../components/NewReleases";
import { useTheme } from "../context/ThemeContext";
import { searchSongs } from "../queries/songs";

const Home = () => {
  const [items, setItems] = useState();
  const { search } = useTheme();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("title");
  const [loading, setloading] = useState(false);

  const { data, isLoading, isFetching, isError } = useQuery(
    ["songs", page, search],
    () => searchSongs({ page, search }),
    {
      enabled: !!search,
    }
  );

  const changePage = (pageNumber: number) => {
    localStorage.setItem("page", String(pageNumber));
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "New Releases",
      children: <NewReleases />,
      icon: <MdOutlineNewReleases />,
    },
    {
      key: "2",
      label: "Genres",
      children: null,
      icon: <TbCategory />,
    },
  ];

  if (isError) {
    <ErrorPage />;
  }

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="p-4 min-h-screen w-full pt-20">
      {/* <Tabs defaultActiveKey="1" items={tabItems} />
       */}
      <h3 className="font-semibold mb-4">New Releases</h3>
      <NewReleases />
    </div>
  );
};

export default Home;
