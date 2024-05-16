import Fuse from "fuse.js";
import { useState } from "react";

interface useFuseProps {
  data: any;
  keys: string[];
}

const useFuse = (props: useFuseProps) => {
  const { data, keys } = props;
  const [query, setQuery] = useState("");

  const fuse = new Fuse(data || [], {
    keys: keys || [],
    includeScore: false,
  });

  const results = fuse.search(query);
  const formattedResults = results.map((result) => result.item);

  return { query, setQuery, results: query ? formattedResults : data };
};
export default useFuse;
