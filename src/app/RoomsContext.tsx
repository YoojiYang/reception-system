'use client'

import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from "react";
import { RoomType, RoomsContextType, RoomsProviderProps } from "../../types/types";
import { fetchAllRooms } from "./utils/utils";

const RoomsContext = createContext<RoomsContextType | null>(null);

export const fetchRooms = async (setRooms: Dispatch<SetStateAction<RoomType[]>>) => {
  try {
    const fetchedRooms = await fetchAllRooms();
    setRooms(fetchedRooms);
  } catch (error) {
    console.error(error);
  }
};

export const RoomsProvider: React.FC<RoomsProviderProps> = ({ children }) => {
  const [rooms, setRooms] = useState<RoomType[]>([]);
  
  
  useEffect(() => {
    fetchRooms(setRooms);
  }, []);

  return (
    <RoomsContext.Provider value={{ rooms, setRooms }}>
      { children }
    </RoomsContext.Provider>
  );
};

export const useRooms = () => {
  const context = useContext(RoomsContext);
  if (!context) {
    throw new Error("useRooms must be used within a RoomsProvider");
  }
  return context;
};