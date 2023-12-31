'use client';

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { VipTaxiContextType, VipTaxiProviderProps, VipTaxiType } from "../../../types/types";
import { fetchAllData } from "../utils/utils";

const VipTaxiContext = createContext<VipTaxiContextType | null>(null);

export const fetchVipTaxis = async (): Promise<VipTaxiType[]> => {
  try {
    const fetchedVipTaxis = await fetchAllData("viptaxi");
    return fetchedVipTaxis;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const VipTaxiProvider: React.FC<VipTaxiProviderProps> = ({ children }) => {
  const [vipTaxis, setVipTaxis] = useState<VipTaxiType[]>([]);
  const [lastUpdated, setLastUpdated] = useState<number>(Date.now());
  
  useEffect(() => {
    const fetchData = async () => {
      const fetchVipTaxisData = await fetchVipTaxis();
      setVipTaxis(fetchVipTaxisData);
    }
    fetchData();
  }, []);

  return (
    <VipTaxiContext.Provider value={{ vipTaxis, setVipTaxis, lastUpdated, setLastUpdated }}>
      { children }
    </VipTaxiContext.Provider>
  );
};

export const useVipTaxi = () => {
  const context = useContext(VipTaxiContext);
  if (!context) {
    throw new Error("useVipTaxi must be used within a RoomsProvider");
  }
  return context;
};