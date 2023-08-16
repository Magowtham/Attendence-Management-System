import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const Dataprovider = ({ child }) => {
  const [data, setData] = useState(null);
  return (
    <DataContext.Provider value={{ data, setData }}>
      {child}
    </DataContext.Provider>
  );
};

export const useData = () => {
  return useContext(DataContext);
};
