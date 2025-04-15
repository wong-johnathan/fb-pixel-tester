import { createContext, useState, useEffect } from "react";
import axios from "axios";
import csvToJson from "csvtojson";

const MetaContext = createContext();

export const initialState = {
  pixelId: localStorage.getItem("pixelId") ?? "",
  testEventCode: localStorage.getItem("testEventCode") ?? "",
  accessToken: localStorage.getItem("accessToken") ?? "",
  catalogLink: localStorage.getItem("catalogLink") ?? "",
  catalogContent: [],
};

const MetaProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const updateState = (newState) => {
    Object.entries(state).forEach(([key, value]) => {
      localStorage.setItem(key, newState[key]);
    });
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  useEffect(() => {
    axios.get(state.catalogLink ?? "").then((response) => {
      if (response.data) {
        csvToJson()
          .fromString(String(response.data))
          .then((data) => {
            if (Array.isArray(data))
              setState({
                ...state,
                catalogContent: data,
              });
          });
      }
    });
  }, [state.catalogLink]);

  return (
    <MetaContext.Provider value={{ state, updateState }}>
      {children}
    </MetaContext.Provider>
  );
};

export { MetaProvider, MetaContext };
