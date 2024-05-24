import { Button, Table } from "antd";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import { getAllAlbums } from "../../../queries/artist";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

const AllAlbums = (props: { id: string | undefined }) => {
  const { id } = props;

  const [favouriteAlbums, setFavouriteAlbums] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteAlbums") || "[]")
  );

  const { data, isFetching } = useQuery(
    ["top-albums", id],
    () => getAllAlbums(id || ""),
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
    {
      dataIndex: "id",
      key: "actions",
      width: "fit-content",
      render: (_id: string, item: any) => (
        <div className="flex">
          <Button
            className="text-primary cursor-pointer text-lg ml-auto"
            type="text"
            key="favourite"
            onClick={() => {
              let newFav = null;
              if (favouriteAlbums.includes(item.id)) {
                newFav = favouriteAlbums.filter((id) => id !== item.id);
              } else {
                newFav = [...favouriteAlbums, item.id];
              }
              setFavouriteAlbums(newFav);
              localStorage.setItem("favouriteAlbums", JSON.stringify(newFav));
            }}
          >
            {favouriteAlbums.includes(item.id) ? (
              <IoHeart />
            ) : (
              <IoHeartOutline />
            )}
          </Button>
        </div>
      ),
    },
  ];
  if (isFetching) {
    return (
      <div className="p-4 w-1/2">
        <Loader />
      </div>
    );
  }
  return (
    <div className="p-4 flex flex-col gap-4 w-1/2">
      <h2 className="font-semibold">Albums</h2>
      <Table
        sticky
        loading={isFetching}
        rowKey={(record) => record.id}
        size="small"
        columns={columns}
        dataSource={data.items || []}
        showHeader={false}
        pagination={false}
      />
    </div>
  );
};
export default AllAlbums;
