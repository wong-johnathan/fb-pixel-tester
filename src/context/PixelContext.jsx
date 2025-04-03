import { createContext, useState } from "react";

const MetaContext = createContext();

export const initialState = {
  accessToken: localStorage.getItem("accessToken") ?? null,
  pixelId: localStorage.getItem("pixelId") ?? null,
  testEventCode: localStorage.getItem("testEventCode") ?? null,
  capiURL: localStorage.getItem("capiURL") ?? null,
};

const MetaProvider = ({ children }) => {
  const [state, setState] = useState(initialState);
  const updateState = (newState) => {
    Object.entries(state).forEach(([key, value]) => {
      localStorage.setItem(key, newState[key]);
    });
    setState((prevState) => ({ ...prevState, ...newState }));
  };

  return (
    <MetaContext.Provider value={{ state, updateState }}>
      {children}
    </MetaContext.Provider>
  );
};

export { MetaProvider, MetaContext };
