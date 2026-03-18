import { createContext, useState, useEffect, ReactNode } from "react";
import axios from "axios";
import csvToJson from "csvtojson";
import type { MetaState, MetaContextType, CatalogItem } from "../types";

export const MetaContext = createContext<MetaContextType>({} as MetaContextType);

export const initialState: MetaState = {
  pixelId: localStorage.getItem("pixelId") ?? "",
  testEventCode: localStorage.getItem("testEventCode") ?? "",
  accessToken: localStorage.getItem("accessToken") ?? "",
  catalogLink: localStorage.getItem("catalogLink") ?? "",
  catalogContent: [],
};

export const MetaProvider = ({ children }: { children: ReactNode }) => {
  const [state, setState] = useState<MetaState>(initialState);

  const updateState = (newState: MetaState) => {
    (Object.keys(state) as (keyof MetaState)[]).forEach((key) => {
      const val = newState[key];
      if (typeof val === "string") localStorage.setItem(key, val);
    });
    setState((prev) => ({ ...prev, ...newState }));
  };

  useEffect(() => {
    if (!state.catalogLink) return;
    axios.get(state.catalogLink).then((response) => {
      if (response.data) {
        csvToJson()
          .fromString(String(response.data))
          .then((data) => {
            if (Array.isArray(data)) {
              setState((prev) => ({ ...prev, catalogContent: data as CatalogItem[] }));
            }
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
