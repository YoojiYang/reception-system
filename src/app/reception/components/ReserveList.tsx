"use client";

import { useMemo } from 'react';
import { RoomType, ReserveListProps } from '../../../../types/types';
import { formatTime } from '../../utils/utils';
import CustomButton from '@/app/utils/components/CustomButton';
import { useRooms } from '@/app/context/RoomsContext';
import ReserveIndex from './ReserveIndex';
import { receptionListCSS } from '@/app/utils/style';

export function ReserveList({ setEditing }: ReserveListProps) {
  const { rooms } = useRooms();

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
        <div key={room.id} className={ receptionListCSS.outside1 }>
          <div className={ receptionListCSS.outside21 }>
            <p className={ receptionListCSS.roomName }>{ room.name }</p>
            <p className={ receptionListCSS.companyName }>{ room.company }</p>
          </div>
          <div className={ receptionListCSS.outside22 }>
            <div className={ receptionListCSS.outside3 }>
              <p className={ receptionListCSS.number }>{ room.reserveAdultsCount }</p>
              <p className={ receptionListCSS.number }>{ room.reserveChildrenCount }</p>
              <p className={ receptionListCSS.arrivalTime }>{ room.scheduledArrival ? formatTime(room.scheduledArrival) : "" }</p>
            </div>
            <p className={ receptionListCSS.staff }>
              <ul className='flex'>
                {room.inCharges.map((inCharge) => (
                  <li key={ inCharge.inChargeId }>{ inCharge.inCharge ? inCharge.inCharge.name : "" }</li>
                ))}
              </ul>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReserveList;