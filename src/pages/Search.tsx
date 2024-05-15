import { Input } from "antd";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchSpotfy } from "../queries/search";
import ArtistCards from "./components/ArtistCards";
import TrackCards from "./components/TrackCards";
import AlbumCards from "./components/AlbumCards";
import PlaylistCards from "./components/PlaylistCards";
import { TbDatabaseSearch } from "react-icons/tb";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const { data, isLoading, isFetching, refetch } = useQuery(
    ["searchSpotify"],
    () =>
      searchSpotfy({
        q: query,
        type: "track,artist,album,playlist",
        limit: 10,
        include_external: "audio",
      }),
    {
      enabled: false,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchParams({ q: query });
      if (query) {
        refetch();
      }
    }, 700);
    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="p-4">
      <form
        className="flex-grow flex justify-center sticky top-20 z-40"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input
          prefix={<FiSearch size={20} className="text-gray0" />}
          placeholder="Search"
          className="rounded-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      {query ? (
        <div className="mt-4 grid gap-2">
          <ArtistCards
            data={data?.artists?.items}
            loading={isLoading || isFetching}
          />
          <AlbumCards
            data={data?.albums?.items}
            loading={isLoading || isFetching}
          />
          <TrackCards
            data={data?.tracks?.items}
            loading={isLoading || isFetching}
          />
          <PlaylistCards
            data={data?.playlists?.items}
            loading={isLoading || isFetching}
          />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-4 p-8 w-full h-80 gap-4 text-grey">
          <TbDatabaseSearch size={40} />
          <h2>Search Strym.</h2>
        </div>
      )}
    </div>
  );
};
export default Search;
