import { createContext, useContext } from "react";

export type GlobalContextType = {
  name: string | null;
};

export const GlobalContext = createContext<GlobalContextType>({
  name: null,
});

export default function useGlobalContext() {
  return useContext(GlobalContext);
}
