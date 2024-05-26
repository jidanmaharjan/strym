import { Button, Checkbox, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { TbDatabaseSearch, TbFilter } from "react-icons/tb";
import { useQuery } from "react-query";
import { useSearchParams } from "react-router-dom";
import { searchSpotify } from "../queries/search";
import AlbumCards from "./library/components/AlbumCards";
import ArtistCards from "./library/components/ArtistCards";
import PlaylistCards from "./library/components/PlaylistCards";
import TrackCards from "./library/components/TrackCards";

const filterOptions = [
  { label: "Track", value: "track" },
  { label: "Artist", value: "artist" },
  { label: "Album", value: "album" },
  // { label: "Playlist", value: "playlist" },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filters, setFilters] = useState([
    "track",
    "artist",
    "album",
    "playlist",
  ]);

  const { data, isLoading, isFetching, refetch } = useQuery(
    ["searchSpotify"],
    () =>
      searchSpotify({
        q: query,
        type: filters.join(","),
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
  }, [query, filters]);

  return (
    <div className="p-4">
      <form
        className="flex-grow flex justify-center items-center gap-4 sticky top-20 z-20"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <Input
          size="large"
          prefix={<FiSearch size={20} className="text-gray0" />}
          placeholder="Search"
          className="rounded-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button
          type="primary"
          shape="circle"
          size="large"
          onClick={() => setIsModalOpen(true)}
          icon={<TbFilter size={20} />}
        ></Button>
        <Modal
          title="Filter"
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          footer={null}
        >
          <Checkbox.Group
            options={filterOptions}
            defaultValue={filters}
            onChange={(values) => setFilters(values as string[])}
          />
        </Modal>
      </form>
      {query ? (
        <div className="mt-4 grid gap-2">
          {filters.includes("artist") && (
            <ArtistCards
              data={data?.artists?.items}
              loading={isLoading || isFetching}
            />
          )}
          {filters.includes("album") && (
            <AlbumCards
              data={data?.albums?.items}
              loading={isLoading || isFetching}
            />
          )}
          {filters.includes("track") && (
            <TrackCards
              data={data?.tracks?.items}
              loading={isLoading || isFetching}
            />
          )}
          {filters.includes("playlist") && (
            <PlaylistCards
              data={data?.playlists?.items}
              loading={isLoading || isFetching}
            />
          )}
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
