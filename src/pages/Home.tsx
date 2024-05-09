import { useState } from "react";
import {
  HiChevronDoubleLeft,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import ErrorPage from "../components/Error";
import { useTheme } from "../context/ThemeContext";
import { getNewReleases, searchSongs } from "../queries/songs";

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

  const {
    data: newReleases,
    isLoading: newReleasesLoading,
    isFetching: newReleasesFetching,
  } = useQuery(["new_releases"], () => getNewReleases());

  const changePage = (pageNumber: number) => {
    localStorage.setItem("page", String(pageNumber));
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  if (isError) {
    <ErrorPage />;
  }

  if (isLoading || isFetching || newReleasesLoading || newReleasesFetching) {
    return (
      <div className="flex justify-center items-center h-screen">
        <ClipLoader size={40} color="#f97316" />
      </div>
    );
  }

  return (
    <div className="p-4 bg-slate-200 dark:bg-gray-900 dark:text-gray-200 min-h-screen w-full">
      {newReleases?.albums?.items?.map((item: any) => (
        <div>
          {item.name} - {item.artists[0].name}
        </div>
      ))}
      {search.length < 1 && (
        <div className="fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] ">
          Search for any song
        </div>
      )}
      {search && search.length > 0 && (
        <h1 className="font-bold text-orange-500 py-2 text-lg mb-4">
          SEARCH RESULT FOR:{" "}
          <span className="text-black dark:text-white">{search}</span>{" "}
        </h1>
      )}
      {loading ? (
        search &&
        search.length > 0 && (
          <div className="absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            <ClipLoader size={40} color="#f97316" />
          </div>
        )
      ) : (
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-14">
          {items &&
            items?.map((item) => (
              <div
                key={item.result.id}
                className="flex bg-gray-100 dark:bg-gray-800 sm:hover:scale-105"
              >
                <img
                  src={item.result.song_art_image_thumbnail_url}
                  alt={item.result.song_art_image_thumbnail_url}
                  className="aspect-square cover w-28 h-28"
                />
                <div className="flex flex-col m-2">
                  <Link
                    to={`/song/${item.result.id}/${item.result.title}`}
                    className="font-bold leading-none"
                  >
                    {item.result.title.slice(0, 30)}
                  </Link>
                  <p className="text-xs text-gray-400">
                    {item.result.release_date_for_display}
                  </p>
                  <Link
                    to={`/artist/${item.result.primary_artist.id}/${item.result.primary_artist.name}`}
                    className="flex items-center gap-1 text-orange-500 mt-1"
                  >
                    {item.result.primary_artist.name.slice(0, 20)}{" "}
                    {item.result.primary_artist.is_verified && (
                      <MdVerified className="text-blue-500" size={15} />
                    )}
                  </Link>
                </div>
              </div>
            ))}
        </div>
      )}

      {search && search.length > 0 && (
        <div className="flex justify-center mt-8 text-white dark:text-gray-200 fixed bottom-0 left-0 w-full bg-orange-500 dark:bg-orange-700 p-2 z-50">
          <button
            onClick={() => {
              setPage(1);
              window.scrollTo(0, 0);
            }}
            className="flex items-center bg-orange-500 dark:bg-orange-700 p-2 mx-2 hover:bg-orange-600 dark:hover:bg-orange-800"
          >
            <HiChevronDoubleLeft size={20} />{" "}
          </button>
          <button
            onClick={() => {
              setPage(page < 2 ? 1 : page - 1);
              window.scrollTo(0, 0);
            }}
            className="flex items-center bg-orange-500 dark:bg-orange-700 p-2 mx-2 hover:bg-orange-600 dark:hover:bg-orange-800"
          >
            <HiChevronLeft size={20} /> Previous{" "}
          </button>
          <p className="flex items-center">{page}</p>
          <button
            onClick={() => {
              setPage(page + 1);
              window.scrollTo(0, 0);
            }}
            className="flex items-center bg-orange-500 dark:bg-orange-700 p-2 mx-2 hover:bg-orange-600 dark:hover:bg-orange-800"
          >
            Next <HiChevronRight size={20} />
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
