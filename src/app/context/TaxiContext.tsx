'use client';

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { TaxiContextType, TaxiType } from "../../../types/types";
import { fetchAllData } from "../utils/utils";

const TaxiContext = createContext<TaxiContextType | null>(null);

export const fetchTaxis = async (setTaxis: Dispatch<SetStateAction<TaxiType[]>>) => {
  try {
    const fetchedTaxis = await fetchAllData("taxi");
    setTaxis(fetchedTaxis);
  } catch (error) {
    console.error(error);
    return [];
  }
};

interface Props {
  children: React.ReactNode;
}

export const TaxiProvider: React.FC<Props> = ({ children }) => {
  const [taxis, setTaxis] = useState<TaxiType[]>([]);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  
  useEffect(() => {
      fetchTaxis(setTaxis);
  }, []);

  return (
    <TaxiContext.Provider value={{ taxis, setTaxis, lastUpdated, setLastUpdated }}>
      { children }
    </TaxiContext.Provider>
  );
};

export const useTaxis = () => {
  const context = useContext(TaxiContext);
  if (!context) {
    throw new Error("useVipTaxi must be used within a RoomsProvider");
  }
  return context;
};