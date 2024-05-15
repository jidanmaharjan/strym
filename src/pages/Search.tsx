import { Input } from "antd";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") || "");
  return (
    <div className="p-4">
      <form
        className="flex-grow flex justify-center"
        onSubmit={(e) => {
          e.preventDefault();
          navigate("/");
        }}
      >
        <Input
          prefix={<FiSearch size={20} className="text-gray0" />}
          placeholder="Search"
          className="rounded-full"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
    </div>
  );
};
export default Search;
