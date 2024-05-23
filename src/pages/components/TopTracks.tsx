import { useQuery } from "react-query";
import { getTopTracks } from "../../queries/artist";
import Loader from "../../components/Loader";
import { Button, Table } from "antd";
import { FiHeart, FiPlay } from "react-icons/fi";
import { TrackSingleType } from "./TrackCards";

type TopTracksProps = {
  id: string | undefined;
  setPlayableTracks: React.Dispatch<React.SetStateAction<TrackSingleType[]>>;
};

const TopTracks = (props: TopTracksProps) => {
  const { id, setPlayableTracks } = props;

  const { data, isFetching } = useQuery(
    ["top-tracks", id],
    () => getTopTracks(id || ""),
    {
      enabled: !!id,
      onSuccess: (res) => {
        setPlayableTracks(
          res.tracks?.filter(
            (item: TrackSingleType) => item.preview_url !== null
          )
        );
      },
    }
  );

  const columns = [
    {
      render: (_: any, __: any, i: number) => i + 1,
      dataIndex: "id",
      key: "index",
      width: 60,
    },
    {
      dataIndex: "album",
      render: (album: any) => (
        <img
          src={album.images[album.images.length - 1].url}
          alt="track"
          className="w-10 h-10"
        />
      ),
      width: 60,
      key: "album",
    },
    {
      dataIndex: "name",
      key: "name",
    },
    {
      dataIndex: "album",
      render: (album: any) => album.name,
      key: "album_name",
    },
    {
      dataIndex: "id",
      key: "actions",
      render: () => (
        <div>
          <Button type="text" icon={<FiHeart size={20} />} />
          <Button type="text" icon={<FiPlay size={20} />} />
        </div>
      ),
      width: 100,
    },
  ];
  if (isFetching) {
    return (
      <div>
        <Loader />
      </div>
    );
  }
  return (
    <Table
      sticky
      className="p-4 w-2/3"
      bordered
      loading={isFetching}
      size="small"
      columns={columns}
      dataSource={data.tracks || []}
      showHeader={false}
      pagination={false}
    />
  );
};
export default TopTracks;
