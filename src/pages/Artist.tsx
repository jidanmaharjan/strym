import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Skeleton } from "antd";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import {
  HiChevronDoubleLeft,
  HiChevronLeft,
  HiChevronRight,
} from "react-icons/hi";
import { MdVerified } from "react-icons/md";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const Artist = () => {
  const { artistId } = useParams();
  const [items, setItems] = useState();
  const [page, setPage] = useState(1);
  const [loading, setloading] = useState(false);
  const [aloading, setAloading] = useState(false);
  const [nextpage, setnextpage] = useState(1);
  const [artist, setArtist] = useState();

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://genius.p.rapidapi.com/artists/${artistId}`,
      headers: {
        "X-RapidAPI-Key": "1b9c31d152msh57380cfd320d6d0p1208b9jsn79fb66fdb9e6",
        "X-RapidAPI-Host": "genius.p.rapidapi.com",
      },
    };
    setAloading(true);
    axios
      .request(options)
      .then(function (response) {
        setArtist(response.data.response.artist);
        setAloading(false);
      })
      .catch(function (error) {
        console.error(error);
        setAloading(false);
      });
  }, []);

  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://genius.p.rapidapi.com/artists/${artistId}/songs`,
      params: { per_page: 50, page: page, sort: "popularity" },
      headers: {
        "X-RapidAPI-Key": "1b9c31d152msh57380cfd320d6d0p1208b9jsn79fb66fdb9e6",
        "X-RapidAPI-Host": "genius.p.rapidapi.com",
      },
    };
    setloading(true);
    axios
      .request(options)
      .then(function (response) {
        setItems(response.data.response.songs);
        setnextpage(response.data.response.next_page);
        setloading(false);
      })
      .catch(function (error) {
        console.error(error);
        setloading(false);
      });
  }, [page]);

  return (
    <div className="p-4 bg-slate-200 dark:bg-gray-900 dark:text-gray-200  min-h-screen w-full">
      <div className="w-full flex flex-col sm:flex-row bg-gray-100 dark:bg-gray-800 p-4 mb-4">
        {aloading && (
          <SkeletonTheme baseColor="#78716c" highlightColor="#525252">
            <p>
              <Skeleton count={6} />
            </p>
          </SkeletonTheme>
        )}
        {artist && (
          <>
            <img
              className="sm:w-56 sm:h-56 aspect-square cover mb-4 sm:mb-0 sm:mr-4"
              src={artist.image_url}
              alt={artist && artist.name}
            />
            <div>
              <h1 className="text-3xl font-bold mb-4 flex items-center">
                <span className="mr-2">{artist.name}</span>
                {artist.is_verified && (
                  <MdVerified className="text-blue-500" size={20} />
                )}
              </h1>
              <div className="flex sm:flex-row flex-col">
                {artist.alternate_names.length > 0 && (
                  <div className="mb-4 sm:mb-0 sm:mr-8">
                    <p className="text-orange-500 font-semibold">
                      Alternate Names
                    </p>
                    {artist.alternate_names.map((aname) => (
                      <p key={aname}>{aname}</p>
                    ))}
                  </div>
                )}
                {(artist.facebook_name ||
                  artist.instagram_name ||
                  artist.twitter_name) && (
                  <div>
                    <p className="text-orange-500 font-semibold">
                      Social Names
                    </p>
                    <div>
                      {artist.facebook_name && (
                        <span className="flex items-center gap-1">
                          <FaFacebook /> {artist.facebook_name}
                        </span>
                      )}
                      {artist.instagram_name && (
                        <span className="flex items-center gap-1">
                          <FaInstagram /> {artist.instagram_name}
                        </span>
                      )}
                      {artist.twitter_name && (
                        <span className="flex items-center gap-1">
                          <FaTwitter /> {artist.twitter_name}
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div>
        <h1 className="font-bold mb-4" id="stitle">
          Songs
        </h1>
        {loading ? (
          <div className="w-full h-screen flex justify-center items-center">
            <ClipLoader size={40} color="#f97316" />
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 pb-14">
            {items &&
              items.map((item) => (
                <Link to={`/song/${item.id}/${item.title}`} key={item.id}>
                  <div className="flex bg-gray-100 dark:bg-gray-800 sm:hover:scale-105">
                    <img
                      src={item.song_art_image_thumbnail_url}
                      alt={item.song_art_image_thumbnail_url}
                      className="aspect-square cover w-16 h-16"
                    />
                    <div className="flex flex-col m-2">
                      <p className="font-bold leading-none">
                        {item.title.slice(0, 30)}
                      </p>
                      <p className="text-xs text-gray-400">
                        {item.release_date_for_display}
                      </p>
                    </div>
                  </div>
                </Link>
              ))}
          </div>
        )}

        {items && items.length > 0 && (
          <div className="flex justify-center mt-8 text-white  w-full  p-2 z-50">
            <button
              onClick={() => {
                setPage(1);
                setItems();
                window.scrollTo(document.getElementById("stitle"));
              }}
              className="flex items-center bg-orange-500 dark:bg-orange-700 p-2 mx-2 hover:bg-orange-600 dark:hover:bg-orange-800"
              disabled={page === 1 && true}
            >
              <HiChevronDoubleLeft size={20} />{" "}
            </button>
            <button
              onClick={() => {
                setPage(page < 2 ? 1 : page - 1);
                setItems();
                window.scrollTo(document.getElementById("stitle"));
              }}
              className="flex items-center bg-orange-500 dark:bg-orange-700 p-2 mx-2 hover:bg-orange-600 dark:hover:bg-orange-800"
              disabled={page === 1 && true}
            >
              <HiChevronLeft size={20} /> Previous{" "}
            </button>
            <p className="flex items-center text-black dark:text-gray-200">
              {page}
            </p>
            <button
              onClick={() => {
                setPage(page + 1);
                setItems();
                window.scrollTo(document.getElementById("stitle"));
              }}
              className="flex items-center bg-orange-500 dark:bg-orange-700 p-2 mx-2 hover:bg-orange-600 dark:hover:bg-orange-800"
              disabled={nextpage === null && true}
            >
              Next <HiChevronRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Artist;
