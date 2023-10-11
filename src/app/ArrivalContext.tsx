'use client';

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { ArrivalContextType, ArrivalProviderProps, ArrivalType } from "../../types/types";
import { fetchAllData } from "./utils/utils";

const ArrivalContext = createContext<ArrivalContextType | null>(null);

export const fetchArrival = async (setArrival: Dispatch<SetStateAction<ArrivalType[]>>) => {
  try {
    const fetchedArrival = await fetchAllData("arrival");
    setArrival(fetchedArrival);
  } catch (error) {
    console.error(error);
  }
};

export const ArrivalProvider: React.FC<ArrivalProviderProps> = ({ children }) => {
  const [arrivals, setArrivals] = useState<ArrivalType[]>([]);

  useEffect(() => {
    fetchArrival(setArrivals);
  }, []);

  return (
    <ArrivalContext.Provider value={{ arrivals, setArrivals }}>
      { children }
    </ArrivalContext.Provider>
  );
};

export const useArrival = () => {
  const context = useContext(ArrivalContext);
  if (!context) {
    throw new Error("useArrival must be used within a ArrivalProvider");
  }
  return context;
};