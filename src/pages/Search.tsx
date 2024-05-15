import { Input } from "antd";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useQuery } from "react-query";
import { useNavigate, useSearchParams } from "react-router-dom";
import { searchSpotfy } from "../queries/search";
import ArtistCards from "./components/ArtistCards";

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

  console.log(data);

  return (
    <div className="p-4">
      <form
        className="flex-grow flex justify-center"
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
      {query && (
        <div className="mt-4">
          <ArtistCards
            data={data?.artists?.items}
            loading={isLoading || isFetching}
          />
        </div>
      )}
    </div>
  );
};
export default Search;
