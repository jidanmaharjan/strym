import { useQuery } from "react-query";
import { getGenres } from "../queries/genre";
import { Button, Table, TableColumnsType } from "antd";
import { IoHeart, IoHeartOutline } from "react-icons/io5";
import { FiMusic } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import Search from "antd/es/input/Search";
interface DataType {
  key: React.Key;
  name: string;
}

const Genre = () => {
  const [query, setQuery] = useState<string>("");
  const {
    data: genres,
    isLoading: genresLoading,
    isFetching: genresFetching,
  } = useQuery(["genres"], () => getGenres());

  const [favouriteGenres, setFavouriteGenres] = useState<string[]>(
    JSON.parse(localStorage.getItem("favouriteGenres") || "[]")
  );

  const columns: TableColumnsType<DataType> = [
    {
      title: "Genre",
      dataIndex: "",
      render: (text: string) => <Link to={text}>{text}</Link>,
    },
    {
      title: "Action",
      dataIndex: "",
      render: (item: string) => (
        <div>
          <Button
            type="text"
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
        dataSource={genres?.genres}
      />
    </div>
  );
};
export default Genre;
