import { Button, Table, TableColumnsType } from "antd";
import Search from "antd/es/input/Search";
import { useState } from "react";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import useFuse from "../hooks/useFuse";
import { getGenres } from "../queries/genre";
interface DataType {
  key: React.Key;
  name: string;
}

const Genre = () => {
  const {
    data: genres,
    isLoading: genresLoading,
    isFetching: genresFetching,
  } = useQuery(["genres"], () => getGenres());

  const [favouriteGenres, setFavouriteGenres] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteGenres") || "[]")
  );

  const { query, setQuery, results } = useFuse({
    data: genres?.genres?.map((genre: string) => ({ item: genre })) || [],
    keys: ["item"],
  });

  const columns: TableColumnsType<DataType> = [
    {
      title: "Genre",
      dataIndex: "",
      render: (text) => text,
    },
    {
      title: "Action",
      dataIndex: "",
      render: (item: string) => (
        <div>
          <Button
            type="text"
            className="text-light"
            onClick={() => {
              let newFav = null;
              if (favouriteGenres.includes(item)) {
                newFav = favouriteGenres.filter(
                  (genre: string) => genre !== item
                );
              } else {
                newFav = [...favouriteGenres, item];
              }
              setFavouriteGenres(newFav);
              localStorage.setItem("favouriteGenres", JSON.stringify(newFav));
            }}
            icon={
              favouriteGenres.includes(item) ? (
                <IoHeart size={20} />
              ) : (
                <IoHeartOutline size={20} />
              )
            }
          />
          {/* <Button type="text" icon={<FiMusic size={20} />} /> */}
        </div>
      ),
    },
  ];
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DataType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

  return (
    <div className="p-4 grid gap-4">
      <Search
        placeholder="Search for genre"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <Table
        sticky
        bordered
        loading={genresLoading || genresFetching}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        size="small"
        columns={columns}
        dataSource={results.map((a: { item: string }) => a.item)}
      />
    </div>
  );
};
export default Genre;
