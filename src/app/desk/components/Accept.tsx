"use client";

import DecrementButton from "@/app/utils/components/DecrementButton";
import { postData } from "../../utils/utils"
import { AcceptProps } from "../../../../types/types";
import IncrementButton from "@/app/utils/components/IncrementButton";
import { useEffect, useState } from "react";
import CustomButton from "@/app/utils/components/CustomButton";
import { useRooms } from "@/app/context/RoomsContext";
import { fetchArrival } from "@/app/context/ArrivalContext";
import { deskSelectStyles, roomNameOptions } from "@/app/utils/selectOptions";
import CustomSelect from "@/app/utils/components/CustomSelect";

export function Accept({ setArrivals, lastUpdated, setLastUpdated }: AcceptProps) {
  const { rooms } = useRooms();
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);
  const [localAdultsCount, setLocalAdultsCount] = useState<number>(0);
  const [localChildrenCount, setLocalChildrenCount] = useState<number>(0);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedRoomId === -1) {
      alert('部屋を選択してください');
      return;
    }

    const data = {
      roomId: selectedRoomId,
      adultsCount: localAdultsCount,
      childrenCount: localChildrenCount,
    };

    try {
      await postData("arrival", data);
      fetchArrival(setArrivals);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error(error);
      return;
    }
  };


  useEffect(() => {
    fetchArrival(setArrivals);
  }, [setArrivals, lastUpdated]);
  
  return(
    <div>
    <div className="p-2 h-auto">
      <form onSubmit={ handleRegister }>
        <div className="flex h-56">
          <div className="w-1/2">
            <p className="text-3xl text-center">部屋名</p>
            <div className="p-4 h-2/3">
              <CustomSelect
                options={ roomNameOptions(rooms) }
                name="roomName"
                value={ selectedRoomId }
                onChange={ setSelectedRoomId }
                className="text-3xl"
                styles={ deskSelectStyles }
              />
            </div>
          </div>
          <div className="w-1/4">
            <p className="text-3xl text-center">大人</p>
            <div className="h-full text-center">
              <div className="p-4 h-2/3">
                <input 
                  type="text"
                  inputMode="numeric"
                  name="adultsCount"
                  value={ localAdultsCount }
                  onChange={ (e) => { setLocalAdultsCount(parseInt(e.target.value)) } }
                  className="text-center h-full w-full flex items-center justify-center text-5xl bg-inherit"
                  />
              </div>
              <div className="h-1/3 w-full flex items-center justify-center space-x-8">
                <IncrementButton count={ localAdultsCount } setCount={ setLocalAdultsCount }/>
                <DecrementButton count={ localAdultsCount } setCount={ setLocalAdultsCount }/>
              </div>
            </div>
          </div>
          <div className="w-1/4">
            <p className="text-3xl text-center">子ども</p>
            <div className="h-full text-center">
              <div className="p-4 h-2/3">
                <input 
                  type="text"
                  inputMode="numeric"
                  value={ localChildrenCount }
                  onChange={ (e) => { setLocalChildrenCount(parseInt(e.target.value)) } }
                  className="text-center h-full w-full flex items-center justify-center text-5xl bg-inherit"
                  />
              </div>
              <div className="h-1/3 w-full flex items-center justify-center space-x-8">
                <IncrementButton count={ localChildrenCount } setCount={ setLocalChildrenCount }/>
                <DecrementButton count={ localChildrenCount } setCount={ setLocalChildrenCount }/>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-20 h-40 flex items-center justify-center">
          <CustomButton text={ "登録" } type={ "submit" } className={ "py-8 px-16 text-4xl" }/>
        </div>
      </form>
    </div>
  </div>
  )
}

export default Accept