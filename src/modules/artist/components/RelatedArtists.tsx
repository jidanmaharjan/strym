import { Button, Table } from "antd";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import Loader from "../../../components/Loader";
import { getRelatedArtists } from "../../../queries/artist";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { render } from "react-dom";

const RelatedArtists = (props: { id: string | undefined }) => {
  const { id } = props;

  const [favouriteArtists, setFavouriteArtists] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteArtists") || "[]")
  );

  const { data, isFetching } = useQuery(
    ["Related-artists", id],
    () => getRelatedArtists(id || ""),
    {
      enabled: !!id,
    }
  );

  const columns: any = [
    {
      dataIndex: "images",
      render: (images: any) => (
        <img src={images[images.length - 1].url} alt="track" />
      ),
      width: 60,
      key: "album",
    },
    {
      dataIndex: "name",
      key: "name",
      render: (_: string, row: any) => (
        <Link to={`/artist/${row.id}`}>
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
      fixed: "right",
      width: 100,
      render: (_id: string, item: any) => (
        <div className="flex">
          <Button
            className="text-primary cursor-pointer text-lg ml-auto"
            type="text"
            key="favourite"
            onClick={() => {
              let newFav = null;
              if (favouriteArtists.includes(item.id)) {
                newFav = favouriteArtists.filter((id) => id !== item.id);
              } else {
                newFav = [...favouriteArtists, item.id];
              }
              setFavouriteArtists(newFav);
              localStorage.setItem("favouriteArtists", JSON.stringify(newFav));
            }}
          >
            {favouriteArtists.includes(item.id) ? (
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
      <div className="p-4 md:w-1/2">
        <Loader />
      </div>
    );
  }
  return (
    <div className="p-4 flex flex-col gap-4 md:w-1/2">
      <h2 className="font-semibold">Related Artists</h2>
      <Table
        sticky
        scroll={{ x: 500 }}
        loading={isFetching}
        rowKey={(record) => record.id}
        size="small"
        columns={columns}
        dataSource={data.artists || []}
        showHeader={false}
        pagination={false}
      />
    </div>
  );
};
export default RelatedArtists;
