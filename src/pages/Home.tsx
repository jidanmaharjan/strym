import { useState } from "react";
import {
  HiChevronDoubleLeft,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { MdOutlineNewReleases, MdVerified } from "react-icons/md";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ErrorPage from "../components/Error";
import { useTheme } from "../context/ThemeContext";
import { searchSongs } from "../queries/songs";
import NewReleases from "../components/NewReleases";
import { Tabs, TabsProps } from "antd";
import { TbCategory } from "react-icons/tb";

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

  const tabItems: TabsProps['items'] = [
    {
      key: '1',
      label: 'New Releases',
      children: <NewReleases />,
      icon: <MdOutlineNewReleases />
    },
    {
      key: '2',
      label: 'Genres',
      children: null,
      icon: <TbCategory />
    }
  ]

  if (isError) {
    <ErrorPage />;
  }

  if (isLoading || isFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={40} color="#f97316" />
      </div>
    );
  }

  return (
    <div className="p-4 min-h-screen w-full pt-20">

      <Tabs
        defaultActiveKey="1"
        items={tabItems}
      />



    </div>
  );
};

export default Home;
