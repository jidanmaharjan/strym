import { TbDatabaseSearch, TbHeartSearch } from "react-icons/tb";
import { useQuery } from "react-query";
import {
  getMultipleAlbums,
  getMultipleArtists,
  getMultipleTracks,
} from "../queries/multidata";
import AlbumCards from "./components/AlbumCards";
import ArtistCards from "./components/ArtistCards";
import TrackCards from "./components/TrackCards";
import { FloatButton } from "antd";
import { RiRefreshLine } from "react-icons/ri";

const Library = () => {
  const favouriteArtists = JSON.parse(
    localStorage.getItem("favouriteArtists") || "[]"
  );
  const favouriteAlbums = JSON.parse(
    localStorage.getItem("favouriteAlbums") || "[]"
  );
  const favouriteTracks = JSON.parse(
    localStorage.getItem("favouriteTracks") || "[]"
  );
  // const favouritePlaylists = JSON.parse(
  //   localStorage.getItem("favouritePlaylists") || "[]"
  // );

  const hasArtists = favouriteArtists.length > 0;
  const hasAlbums = favouriteAlbums.length > 0;
  const hasTracks = favouriteTracks.length > 0;
  // const hasPlaylists = favouritePlaylists.length > 0;

  const atLeastOneFavourite = hasArtists || hasAlbums || hasTracks;

  const {
    data: artistData,
    isFetching: artistFetching,
    ...artistResult
  } = useQuery(
    ["selectedArtists"],
    () => getMultipleArtists(favouriteArtists.join(",")),
    {
      enabled: hasArtists,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const {
    data: albumData,
    isFetching: albumFetching,
    ...albumResult
  } = useQuery(
    ["selectedAlbums"],
    () => getMultipleAlbums(favouriteAlbums.join(",")),
    {
      enabled: hasAlbums,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );
  const {
    data: trackData,
    isFetching: trackFetching,
    ...tracksResult
  } = useQuery(
    ["selectedTracks"],
    () => getMultipleTracks(favouriteTracks.join(",")),
    {
      enabled: hasTracks,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    }
  );

  const refreshData = () => {
    if (hasArtists) {
      artistResult.refetch();
    }
    if (hasAlbums) {
      albumResult.refetch();
    }
    if (hasTracks) {
      tracksResult.refetch();
    }
  };
  // const { data: playlistData, isFetching: playlistFetching } = useQuery(
  //   ["selectedPlaylists"],
  //   () => getMultiplePlaylists(favouritePlaylists.join(",")),
  //   {
  //     enabled: hasPlaylists,
  //     refetchOnWindowFocus: false,
  //     refetchOnMount: false,
  //   }
  // );
  return (
    <div className="p-4">
      <FloatButton
        onClick={refreshData}
        className="mb-16"
        icon={<RiRefreshLine />}
      />
      {atLeastOneFavourite ? (
        <div className="mt-4 grid gap-2">
          {hasArtists && (
            <ArtistCards data={artistData?.artists} loading={artistFetching} />
          )}
          {hasAlbums && (
            <AlbumCards data={albumData?.albums} loading={albumFetching} />
          )}
          {hasTracks && (
            <TrackCards data={trackData?.tracks} loading={trackFetching} />
          )}
          {/* {hasPlaylists && (
            <PlaylistCards data={playlistData} loading={playlistFetching} />
          )} */}
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-4 p-8 w-full h-[calc(100vh-20rem)] gap-4 text-grey">
          <TbHeartSearch size={40} />
          <h2>Couldn't find your data. Try adding some.</h2>
        </div>
      )}
    </div>
  );
};
export default Library;
