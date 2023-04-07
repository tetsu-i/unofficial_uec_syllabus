import { useState } from "react";

const useSort = (initialData) => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState(null);

  const onSort = (key) => {
    let direction = "ascending";
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) {
        return direction === "ascending" ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === "ascending" ? 1 : -1;
      }
      return 0;
    });

    setData(sortedData);
  };

  return { data, onSort };
};

export default useSort;