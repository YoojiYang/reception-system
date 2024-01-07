"use client";

import { useMemo } from 'react';
import { RoomType, ReserveListProps } from '../../../../types/types';
import { formatTime } from '../../utils/utils';
import CustomButton from '@/app/utils/components/CustomButton';
import { useRooms } from '@/app/context/RoomsContext';
import ReserveIndex from './ReserveIndex';
import { receptionCSS } from '@/app/utils/style';
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
        <div key={room.id} className={ `${ receptionCSS.receptionBox } h-14 m-2 bg-white rounded-xl` }>
          <div className={ `${ receptionCSS.roomCompanyBox }` }>
            <p className={ `${ receptionCSS.font }` }>{ room.name }</p>
            <p className={ `${ receptionCSS.font } col-span-2` }>{ room.company }</p>
          </div>
          <div className={ `${ receptionCSS.dataBox }` }>
            <div className={ `${ receptionCSS.adultChirdrenBox }` }>
              <p className={ `${ receptionCSS.font }` }>{ room.reserveAdultsCount }</p>
              <p className={ `${ receptionCSS.font }` }>{ room.reserveChildrenCount }</p>
            </div>
            <div className={ `${ receptionCSS.timeStaffBox }` }>
              <p className={ `${ receptionCSS.font }` }>
                { room.scheduledArrival ? formatTime(room.scheduledArrival) : "" }
              </p>
              <p className={ `${ receptionCSS.font } col-span-2` }>
              <ul className='flex'>
                {room.inCharges.map((inCharge, index, array) => (
                  <li key={ inCharge.inChargeId }>
                    { inCharge.inCharge ? inCharge.inCharge.name : "" }
                    { index < array.length - 1 ? "・" : ""}
                  </li>
                ))}
              </ul>
            </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReserveList;