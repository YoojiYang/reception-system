"use strict";

import { useEffect, useMemo, useState } from 'react';
import { RoomType, ReserveListProps } from '../../types';
import { fetchAllRooms, formatTime } from '../../utils/utils';
import CustomButton from '@/app/utils/components/CustomButton';

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


  const sortedRooms = useMemo(() => {
    return [...rooms].sort((a: RoomType, b: RoomType) => a.id - b.id);
  }, [rooms]);

  return (
    <div>
      <div className='h-32 mr-8 flex items-center justify-end'>
        <CustomButton text={ "編集" } onClick={ () => { setEditing(true) } } className={ "py-4 px-8 text-xl" } />
      </div>  
      <div>
        <div className='h-8 mt-4 grid grid-cols-8 gap-2 items-center'>
          <p className='text-center h-full flex items-center justify-center'>部屋名</p>
          <p className='col-span-3 text-center h-full flex items-center justify-center'>会社名</p>
          <p className='text-center h-full flex items-center justify-center'>人数</p>
          {/* <p className='text-center h-full flex items-center justify-center'>到着時刻</p> */}
          <p className='col-span-3 text-center h-full flex items-center justify-center'>担当者</p>
        </div>
      </div>
      {sortedRooms.map((room: RoomType) => (
        <div
          key={room.id}
          className='h-12 mt-4 grid grid-cols-8 gap-2 items-center'
        >
          <p className='text-center h-full flex items-center justify-center'>{ room.name }</p>
          <p className='col-span-3 text-center h-full flex items-center justify-center'>{ room.company }</p>
          <p className='text-center h-full flex items-center justify-center'>{ room.reserveAdultsCount + room.reserveChildrenCount}</p>
          {/* <p className='text-center h-full flex items-center justify-center'>{ formatTime(room.scheduledArrival) }</p> */}
          <p className='col-span-3 text-center h-full flex items-center justify-center'>

          </p>
        </div>
      ))}
    </div>
  );
};

export default ReserveList;