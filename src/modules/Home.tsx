import NewReleases from "../components/NewReleases";
import Recommendations from "../components/Recommendations";

const Home = () => {
  return (
    <div className="p-4  w-full ">
      {/* <Tabs defaultActiveKey="1" items={tabItems} />
       */}
      <Recommendations />
      <div className="mb-4">
        <h3 className="font-semibold ">New Releases</h3>
        <p className="text-sm text-gray-400">
          Discover some fresh albums out of the box.
        </p>
      </div>
      <NewReleases />
    </div>
  );
};

export default Home;
