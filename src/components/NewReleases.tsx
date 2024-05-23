import { useQuery } from "react-query";
import AlbumCards from "../modules/library/components/AlbumCards";
import { getNewReleases } from "../queries/songs";
import Loader from "./Loader";

const NewReleases = () => {
  const { data: newReleases, isFetching: newReleasesFetching } = useQuery(
    ["new_releases"],
    () => getNewReleases()
  );

  if (newReleasesFetching) {
    return <Loader />;
  }

  return (
    <div className="grid gap-4 w-full overflow-x-scroll hide-scrollbar snap-x snap-mandatory">
      <AlbumCards
        data={newReleases?.albums?.items}
        loading={newReleasesFetching}
        hideLabel
      />
    </div>
  );
};

export default NewReleases;
