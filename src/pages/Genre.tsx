import { useQuery } from "react-query";
import { getGenres } from "../queries/genre";
import { Button, Table, TableColumnsType } from "antd";
import { IoHeartOutline } from "react-icons/io5";
import { FiMusic } from "react-icons/fi";
import { Link } from "react-router-dom";
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
  console.log(genres);

  const columns: TableColumnsType<DataType> = [
    {
      title: "Genre",
      dataIndex: "",
      render: (text: string) => <Link to={text}>{text}</Link>,
    },
    {
      title: "Action",
      dataIndex: "",
      render: (text: string) => (
        <div>
          <Button type="text" icon={<IoHeartOutline size={20} />} />
          <Button type="text" icon={<FiMusic size={20} />} />
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
      <h3 className="font-semibold ">Genres</h3>

      <Table
        sticky
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        size="small"
        columns={columns}
        dataSource={genres.genres}
      />
    </div>
  );
};
export default Genre;
