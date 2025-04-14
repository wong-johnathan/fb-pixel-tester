import { createContext, useState, useEffect } from "react";
import axios from "axios";

const MetaContext = createContext();

export const initialState = {
  pixelId: localStorage.getItem("pixelId") ?? "",
  testEventCode: localStorage.getItem("testEventCode") ?? "",
  accessToken: localStorage.getItem("accessToken") ?? "",
  catalogLink: localStorage.getItem("catalogLink") ?? "",
  catalogContentIDs: []
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
    axios
      .get(
        "https://docs.google.com/spreadsheets/d/e/2PACX-1vSpRjt0z1aUeaFGcUiz5RTx3mnc57pGCCCUnIAV0oLPKlf68knWu62L7EUcwXqgf_9DjIdEdPVuIaj8/pub?gid=0&single=true&output=csv"
      )
      .then((response) => console.log(response.data));
  }, []);

  return (
    <MetaContext.Provider value={{ state, updateState }}>
      {children}
    </MetaContext.Provider>
  );
};

export { MetaProvider, MetaContext };
