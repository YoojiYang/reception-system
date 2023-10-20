'use client';

import { useRooms } from "@/app/RoomsContext";
import { ArrivalRecordCounts, ArrivalType, RoomCardProps, RoomType } from "../../../../types/types";
import { fetchArrival, useArrival } from "@/app/ArrivalContext";
import { useEffect, useMemo } from "react";
import RoomsInfo from "./RoomsInfo";



const RoomCard = ({ startRoomId, endRoomId }: RoomCardProps) => {
  const { rooms, setRooms } = useRooms();
  const { arrivals, setArrivals, arrivalCounts } = useArrival();

  const getCurrentArrivalCount = (roomId: number): number => {
    const currentAdultsCount = arrivalCounts[roomId]?.adultsTotal || 0;
    const currentChildrenCount = arrivalCounts[roomId]?.childrenTotal || 0;
    const currentArrivalCount = currentAdultsCount + currentChildrenCount;
    return currentArrivalCount;
  }

  const calculateArrivalCounts = (arrivals: ArrivalType[]) => {
    const arrivalRecordCounts: ArrivalRecordCounts = {};
  
    for (const arrival of arrivals) {
      if (!arrivalRecordCounts[arrival.roomId]) {
        arrivalRecordCounts[arrival.roomId] = 0;
      }
      arrivalRecordCounts[arrival.roomId]++;
    }
  
    return arrivalRecordCounts;
  };
  
  const arrivalRecordCounts = calculateArrivalCounts(arrivals);

  const sortedRooms = useMemo(() => {
    const filterdRoom = rooms.filter((room: RoomType) => room.id >= startRoomId && room.id <= endRoomId);
    const sortedRoom = filterdRoom.sort((a: RoomType, b: RoomType) => a.id - b.id);
    return sortedRoom;
  }, [rooms, startRoomId, endRoomId]);



  useEffect(() => {
    fetchArrival(setArrivals);
  }, []);

  return (
    <div>
      {sortedRooms
        .map((room: RoomType) => {
          const totalReserveCount = room.reserveAdultsCount + room.changedAdultsCount + room.reserveChildrenCount + room.changedChildrenCount;
          const currentCount = getCurrentArrivalCount(room.id);
          let colorClass = 'bg-blue-100 border-blue-500 border-4';

          if (totalReserveCount === currentCount && currentCount > 0) {
            colorClass = 'bg-blue-500 text-gray-100';
          } else if (currentCount > totalReserveCount) {
            colorClass = 'bg-red-50 border-red-300 border-4';
          } else if (currentCount === 0 && arrivalRecordCounts[room.id] > 0) {
            colorClass = 'bg-gray-500 text-gray-300 border-gray-500 border-4';
          } else if (currentCount === 0 && totalReserveCount === 0) {
            colorClass = 'bg-gray-100 text-gray-300 border-gray-300 border-4';
          }

          return (
            <div key={room.id} className="">
              <div
              style={{ width:'230px' }}
              className={`h-32 mt-4 py-2 pl-4 flex flex-col justify-center items-left border ${colorClass} rounded-lg drop-shadow-xl`}
              >
                <p className='text-2xl drop-shadow font-bold'>
                  { room.name }
                </p>
                <RoomsInfo totalReserveCount={ totalReserveCount } currentCount={ currentCount } arrivalRecordCounts={ arrivalRecordCounts} room={ room } />
              </div>
            </div>
          );
      })}
  </div>
  );
}

export default RoomCard;