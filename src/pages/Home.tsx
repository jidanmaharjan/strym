import axios from "axios";
import React, { useEffect, useState } from "react";
import { useMusicContext } from "../contexts/ContextProvider";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  HiChevronRight,
  HiChevronLeft,
  HiChevronDoubleLeft,
} from "react-icons/hi";

const Home = () => {
  const [items, setItems] = useState();
  const { search } = useMusicContext();
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("title");
  const [loading, setloading] = useState(false);
  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://genius-song-lyrics1.p.rapidapi.com/search/",
      params: { q: search, per_page: 20, page: page },
      headers: {
        "X-RapidAPI-Key": "1b9c31d152msh57380cfd320d6d0p1208b9jsn79fb66fdb9e6",
        "X-RapidAPI-Host": "genius-song-lyrics1.p.rapidapi.com",
      },
    };
    setloading(true);
    const timer = setTimeout(() => {
      axios
        .request(options)
        .then(function (response) {
          setItems(response.data.hits);
          setloading(false);
        })
        .catch(function (error) {
          console.error(error);
          setloading(false);
        });
    }, 500);

    return () => clearTimeout(timer);
  }, [page, search]);

  const changePage = (pageNumber) => {
    localStorage.setItem("page", pageNumber);
    setPage(pageNumber);
    window.scrollTo(0, 0);
  };

  return (
    <div className="p-4 bg-slate-200 dark:bg-gray-900 dark:text-gray-200 min-h-screen w-full">
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
            items.map((item) => (
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
