"use strict";

import { useMemo } from 'react';
import { RoomType, ReserveListProps } from '../../../../types/types';
import { formatTime } from '../../utils/utils';
import CustomButton from '@/app/utils/components/CustomButton';
import { useRooms } from '@/app/RoomsContext';
import ReserveIndex from './ReserveIndex';
import { receptionIndexCSS } from '@/app/utils/style';

export function ReserveList({ setEditing }: ReserveListProps) {
  const { rooms, setRooms } = useRooms();

  const sortedRooms = useMemo(() => {
    return [...rooms].sort((a: RoomType, b: RoomType) => a.id - b.id);
  }, [rooms]);

  return (
    <div>
      <div className='h-auto mr-8 flex items-center justify-end'>
        <CustomButton text={ "編集" } onClick={ () => { setEditing(true) } } className={ "py-4 px-8 text-xl" } />
      </div>  
      <ReserveIndex />
      {sortedRooms.map((room: RoomType) => (
        <div key={room.id} className={ receptionIndexCSS.outside1 }>
          <div className={ receptionIndexCSS.outside21 }>
            <p className={ receptionIndexCSS.roomName }>{ room.name }</p>
            <p className={ receptionIndexCSS.companyName }>{ room.company }</p>
          </div>
          <div className={ receptionIndexCSS.outside22 }>
            <div className={ receptionIndexCSS.outside3 }>
              <p className={ receptionIndexCSS.adults }>{ room.reserveAdultsCount }</p>
              <p className={ receptionIndexCSS.children }>{ room.reserveChildrenCount }</p>
              <p className={ receptionIndexCSS.arrivalTime }>{ formatTime(room.scheduledArrival) }</p>
            </div>
            <p className={ receptionIndexCSS.staff }></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReserveList;