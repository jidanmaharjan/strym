import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import parse from "html-react-parser";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { MdVerified } from "react-icons/md";

import { ClipLoader } from "react-spinners";

const Song = () => {
  const { songId } = useParams();
  const [lyloading, setLyloading] = useState(false);
  const [loading, setloading] = useState(false);
  const [song, setSong] = useState();
  const [lyrics, setLyrics] = useState();
  useEffect(() => {
    const options = {
      method: "GET",
      url: `https://genius-song-lyrics1.p.rapidapi.com/song/details/`,
      params: {id: songId},
      headers: {
        'X-RapidAPI-Key': '1b9c31d152msh57380cfd320d6d0p1208b9jsn79fb66fdb9e6',
        'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
      }
    };
    setloading(true);
    axios
      .request(options)
      .then(function (response) {
        setSong(response.data.song);
        setloading(false);
      })
      .catch(function (error) {
        console.error(error);
        setloading(false);
      });
  }, []);

  useEffect(() => {
    setLyloading(true);
    if (song && song.id) {
      const options = {
        method: "GET",
        url: `https://genius-song-lyrics1.p.rapidapi.com/song/lyrics/`,
        // url:'http://localhost:5000/lyric',
        params: {
          id: song.id,
        },
        headers: {
          'X-RapidAPI-Key': '1b9c31d152msh57380cfd320d6d0p1208b9jsn79fb66fdb9e6',
          'X-RapidAPI-Host': 'genius-song-lyrics1.p.rapidapi.com'
        }
      };

      axios
        .request(options)
        .then(function (response) {
          setLyrics(response.data?.lyrics?.lyrics?.body?.html);
          setLyloading(false);
        })
        .catch(function (error) {
          console.error(error);
          setLyloading(false);
        });
    }
  }, [song]);

  return (
    <div className="p-4 bg-slate-200 dark:bg-gray-900 dark:text-gray-200  min-h-screen w-full">
      <div className="w-full flex flex-col sm:flex-row bg-gray-100 dark:bg-gray-800 p-4 mb-4">
        {loading && (
          <SkeletonTheme baseColor="#78716c" highlightColor="#525252">
            <p>
              <Skeleton count={6} />
            </p>
          </SkeletonTheme>
        )}
        {song && (
          <>
            <img
              className="sm:w-56 sm:h-56 aspect-square cover mb-4 sm:mb-0 sm:mr-4"
              src={song.song_art_image_url}
              alt={song.title}
            />
            <div>
              <h1 className="text-3xl font-bold mb-4 flex items-center">
                <span className="mr-2">{song.title}</span>
              </h1>
              <p className="font-bold">{song.album && song.album.name}</p>
              <div className="flex sm:flex-row flex-col">
                <div>{song.release_date_for_display}</div>
              </div>
              <Link
                to={`/artist/${song.primary_artist.id}/${song.primary_artist.name}`}
              >
                <h1 className=" font-bold mb-4 mt-2 flex items-center">
                  <span className="mr-2 text-orange-500">
                    {song.primary_artist.name}
                  </span>
                  {song.primary_artist.is_verified && (
                    <MdVerified className="text-blue-500" size={20} />
                  )}
                </h1>
              </Link>
            </div>
          </>
        )}
      </div>

      {song &&
        song.media.map((item) => (
          <div className="w-full mb-4" key={item.provider}>
            {item.provider === "youtube" && (
              <>
                <iframe
                  className="w-full h-80"
                  src={
                    "https://www.youtube.com/embed/" +
                    item.url.split("watch?v=")[1]
                  }
                  title={song.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </>
            )}
          </div>
        ))}

      {lyloading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <ClipLoader size={40} color="#f97316" />
        </div>
      ) : (
        <div className="pointer-events-none bg-gray-100 dark:bg-gray-800 p-4">
          <h1 className="text-orange-500 text-xl font-bold mb-4">Lyrics</h1>
          {lyrics && parse(lyrics)}
        </div>
      )}
    </div>
  );
};

export default Song;
