"use client";

import DecrementButton from "@/app/utils/components/DecrementButton";
import { fetchAllData, postArrival } from "../../utils/utils"
import { AcceptProps, RoomType } from "../../../../types/types";
import IncrementButton from "@/app/utils/components/IncrementButton";
import { useState } from "react";
import CustomButton from "@/app/utils/components/CustomButton";
import { useRooms } from "@/app/RoomsContext";

export function Accept({ setAccepting, setArrivals }: AcceptProps) {
  const { rooms, setRooms } = useRooms();
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);
  const [localAdultsCount, setLocalAdultsCount] = useState<number>(0);
  const [localChildrenCount, setLocalChildrenCount] = useState<number>(0);

  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roomId = parseInt(e.target.value);
    setSelectedRoomId(roomId);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedRoomId === -1) {
      alert('部屋を選択してください');
      return;
    }

    try {
      await postArrival(selectedRoomId, localAdultsCount, localChildrenCount);

      const fetchedArrivals = await fetchAllData("arrival");
      setArrivals(fetchedArrivals);
    } catch (error) {
      console.error(error);
      return;
    }

    setAccepting(false);
  };
  
  return(
    <div>
    <div className="p-2 h-auto">
      <form onSubmit={ handleSubmit }>
        <div className="flex h-56">
          <div className="w-1/2">
            <p className="text-3xl text-center">部屋名</p>
            <div className="p-4 h-2/3">
              <select 
                name="roomName"
                onChange={ handleRoomChange }
                className='text-center cols-span-5 flex h-full w-full items-center justify-center text-4xl border-solid border-2 border-blue-500 rounded-xl'
                >
                <option value="-1">▼部屋名を選択▼</option>
                {rooms
                  .sort((a: RoomType, b: RoomType) => a.id - b.id)
                  .map((room: RoomType) => (
                    <option key={ room.id } value={ room.id }>{ room.name }</option>
                    ))}
              </select>
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