'use client';

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { ArrivalContextType, ArrivalProviderProps, ArrivalType } from "../../../types/types";
import { fetchAllData } from "../utils/utils";

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
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  const [arrivalCounts, setArrivalCounts] = useState<Record<number, { adultsTotal: number, childrenTotal: number }>>({});

  useEffect(() => {
    const result: Record<number, { adultsTotal: number, childrenTotal: number }> = {};

    for (const arrival of arrivals) {
        if (!result[arrival.roomId]) {
            result[arrival.roomId] = { adultsTotal: 0, childrenTotal: 0 };
        }
        result[arrival.roomId].adultsTotal += arrival.adultsCount;
        result[arrival.roomId].childrenTotal += arrival.childrenCount;
    }
    setArrivalCounts(result);
}, [arrivals]);


  useEffect(() => {
    fetchArrival(setArrivals);
  }, []);

  return (
    <ArrivalContext.Provider value={{ arrivals, setArrivals, lastUpdated, setLastUpdated, arrivalCounts }}>
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