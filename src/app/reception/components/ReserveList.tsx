"use strict";

import { useEffect, useState } from 'react';
import { RoomType, ReserveListProps } from '../../types';
import ReserveIndex from './ReserveIndex';
import { formatTime } from '../../utils/utils';

async function fetchAllRooms() {
  const res = await fetch('http://localhost:3000/api/room', {
    cache: 'no-store',
  });

  const json = await res.json()
  
  return json.rooms;
}


export function ReserveList({ setEditing }: ReserveListProps) {
  const [rooms, setRooms] = useState<RoomType[]>([]);

  useEffect(() => {
    async function loadRooms() {
      try {
        const fetchedRooms = await fetchAllRooms();
        setRooms(fetchedRooms);
      } catch (error) {
        console.error(error);
      }
    }
    loadRooms();
  }, []);

    return (
      <div>
        <div className='h-32 flex items-center justify-end'>

          <button
            onClick={() => {
              setEditing(true);
            }}
            className='w-24 py-4 mr-8 rounded-md shadow-md bg-[#fb923c] text-xl'
            >
            編集
          </button>
        </div>  
        <ReserveIndex />
        {rooms
          .sort((a: RoomType, b: RoomType) => a.id - b.id)
          .map((room: RoomType) => (
        <div
          key={room.id}
          className='h-12 mt-4 grid grid-cols-9 gap-2 items-center'
        >
          <p className='text-center h-full flex items-center justify-center'>{ room.name }</p>
          <p className='col-span-3 text-center h-full flex items-center justify-center'>{ room.company }</p>
          <p className='text-center h-full flex items-center justify-center'>{ room.reserveAdultsCount + room.reserveChildrenCount}</p>
          <p className='text-center h-full flex items-center justify-center'>{ formatTime(room.scheduledArrival) }</p>
          <p className='col-span-3 text-center h-full flex items-center justify-center'></p>
        </div>
        ))}
    </div>
    );
};

export default ReserveList;