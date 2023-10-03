import { useState, useEffect, useCallback, useMemo, use } from "react";
import { RoomType, EditReserveListProps, InChargeType } from '../../../../types/types';
import ReserveIndex from './ReserveIndex';
import { formatTime } from '../../utils/utils';
import CustomButton from "@/app/utils/components/CustomButton";
import { fetchRooms, useRooms } from "@/app/RoomsContext";
import { API_URL } from "@/app/utils/config";
import e from "express";


const EditReserveList = ({ setEditing }: EditReserveListProps) => {
  const { rooms, setRooms } = useRooms();
  const[editedRooms, setEditedRooms] = useState<Record<number, RoomType>>({});

  // roomsが更新されるたびに、editedRoomsを更新する
  useEffect(() => {
    setEditedRooms(rooms.reduce((acc, room) => {
      acc[room.id] = room;
      return acc;
    }, {} as Record<number, RoomType>));
  }, [rooms]);
  
  // 編集内容をローカルのstateに保存する
  const handleInputChange = useCallback((roomId: number, key: keyof RoomType, value: any) => {
    setEditedRooms(prevRooms => ({
      ...prevRooms,
      [roomId]: {
        ...prevRooms[roomId],
        [key]: value
      }
    }));
  }, []);

  // 
  const handleRegister = async () => {
    try {
      const res = await fetch(`${API_URL}/room`, {
        method: 'PUT',
        body: JSON.stringify(editedRooms),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const responseData = await res.json();
      if (!res.ok) {
        throw new Error(responseData.message || "Failed to update rooms.");
      }
      setEditing(false);
      fetchRooms(setRooms);
    } catch (error) {
      console.error(error);
    }
  };

  const sortedRooms = useMemo(() => {
    return [...rooms].sort((a: RoomType, b: RoomType) => a.id - b.id);
  }, [rooms]);

  return (
    <div>
      <div className='h-32 mr-8 flex items-center justify-end'>
        <CustomButton text={ "登録" } onClick={ handleRegister } className={ "py-4 px-8 text-xl" } />
      </div>
        
      <ReserveIndex />

      {sortedRooms.map((room: RoomType) => (
        <form key={room.id} className='col-span-7 text-center h-full flex items-center justify-center'>
          <div className='h-12 mt-4 grid grid-cols-10 gap-2 items-center'>
            <p className='text-center h-full flex items-center justify-center'>{ room.name }</p>
              {/* 会社名 */}
              <input
                type='text'
                name='company'
                defaultValue={ room.company }
                onChange={ (e) => handleInputChange(room.id, 'company', e.target.value) }
                className='col-span-3 text-center h-full flex items-center justify-center'
              />
              {/* 大人の人数 */}
              <input
                type='number'
                name='adultsCount'
                defaultValue={ room.reserveAdultsCount }
                onChange={ (e) => handleInputChange(room.id, 'reserveAdultsCount', parseInt(e.target.value)) }
                className='text-center h-full flex items-center justify-center'
              />
              {/* 子供の予約人数 */}
              <input
                type='number'
                name='childrenCount'
                defaultValue={ room.reserveChildrenCount }
                onChange={ (e) => handleInputChange(room.id, 'reserveChildrenCount', parseInt(e.target.value)) }
                className='text-center h-full flex items-center justify-center'
              />
              {/* 到着予定時刻 */}
              <input
                type='text'
                name='scheduledArrival'
                defaultValue={ formatTime(room.scheduledArrival) }
                onChange={ (e) => {
                  const timeValue = e.target.value;
                  const [hours, minutes] = timeValue.split(':').map(Number);

                  const currentDate = new Date();
                  currentDate.setUTCHours(hours, minutes, 0, 0);
                  const isoString = currentDate.toISOString();

                  handleInputChange(room.id, 'scheduledArrival', isoString);
                }}
                className='text-center h-full flex items-center justify-center'
              />
              {/* 担当者 */}
              <select
                name="inCharge"
                className='col-span-3 text-center h-full flex items-center justify-center'
                multiple
              >
                {/* TODO */}
                {/* {inCharges.map((inCharge: InChargeType) => (
                  <option key={ inCharge.id } value={ inCharge.id }>{ inCharge.name }</option>
                ))} */}
              </select>
          </div>
        </form>
      ))}
    </div>
  );
}

export default EditReserveList;