import { useQuery } from "react-query";
import { getTopAlbums } from "../../queries/artist";
import Loader from "../../components/Loader";
import { Button, Table } from "antd";
import { FiHeart, FiPlay } from "react-icons/fi";
import { Link } from "react-router-dom";

const TopAlbums = (props: { id: string | undefined }) => {
  const { id } = props;

  const { data, isFetching } = useQuery(
    ["top-albums", id],
    () => getTopAlbums(id || ""),
    {
      enabled: !!id,
    }
  );

  const columns = [
    {
      dataIndex: "images",
      render: (images: any) => (
        <img
          src={images[images.length - 1].url}
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
      render: (_: string, row: any) => (
        <Link to={`/album/${row.id}`}>
          <div>
            <h2 className="font-semibold overflow-clip whitespace-nowrap">
              {row.name}
            </h2>
            <p></p>
          </div>
        </Link>
      ),
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
    <div className="p-4 w-1/3 grid gap-4">
      <h2 className="font-semibold">Top Albums</h2>
      <Table
        sticky
        loading={isFetching}
        size="small"
        columns={columns}
        dataSource={data.items || []}
        showHeader={false}
        pagination={false}
      />
    </div>
  );
};
export default TopAlbums;
