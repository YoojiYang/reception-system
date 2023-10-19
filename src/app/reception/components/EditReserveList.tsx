import { useState, useEffect, useCallback, useMemo, use } from "react";
import { RoomType, EditReserveListProps } from '../../../../types/types';
import ReserveIndex from './ReserveIndex';
import { formatTime, handleEditReserveList } from '../../utils/utils';
import CustomButton from "@/app/utils/components/CustomButton";
import { fetchRooms, useRooms } from "@/app/RoomsContext";
import { borderBlueCSS, receptionEditCSS } from "@/app/utils/style";

const EditReserveList = ({ setEditing }: EditReserveListProps) => {
  const { rooms, setRooms } = useRooms();
  const[editedRooms, setEditedRooms] = useState<Record<number, RoomType>>({});

  // 変更内容を記録
  const handleInputChange = useCallback((roomId: number, key: keyof RoomType, value: any) => {
    setEditedRooms(prevRooms => ({
      ...prevRooms,
      [roomId]: {
        ...prevRooms[roomId],
        [key]: value
      }
    }));
  }, []);
  
  
  const handleRegister = () => {
    console.log("handleRegister");
    handleEditReserveList(
      editedRooms, 
      rooms, 
      (response) => {
        fetchRooms(setRooms);
      }, 
      (error) => {
        console.error(error);
      }
      );
      setEditing(false);
    };
  
    // roomsが更新されるたびに、editedRoomsを更新する
    useEffect(() => {
      setEditedRooms(rooms.reduce((acc, room) => {
        acc[room.id] = room;
        return acc;
      }, {} as Record<number, RoomType>));
    }, [rooms]);
    
    useEffect(() => {
      fetchRooms(setRooms);
    }, [setRooms]);
    
    const sortedRooms = useMemo(() => {
    return [...rooms].sort((a: RoomType, b: RoomType) => a.id - b.id);
  }, [rooms]);

  return (
    <div>
      <div className='h-auto mr-8 flex items-center justify-end'>
        <CustomButton text={ "登録" } onClick={ handleRegister } className={ "py-4 px-8 text-xl" } />
      </div>
        
      <ReserveIndex />
      <div>
        {sortedRooms.map((room: RoomType) => (
          <form key={room.id}>
            <div className={ receptionEditCSS.outside1 }>
              <div className={ receptionEditCSS.outside21 }>
                <p className={ receptionEditCSS.roomName }>{ room.name }</p>
                <input
                  type='text'
                  name='company'
                  defaultValue={ room.company }
                  onChange={ (e) => handleInputChange(room.id, 'company', e.target.value) }
                  className={ `${receptionEditCSS.companyName} ${borderBlueCSS}` }
                  />
              </div>
              <div className={ receptionEditCSS.outside22 }>
                <div className={ receptionEditCSS.outside3 }>
                  {/* 大人の人数 */}
                  <input
                    type='number'
                    name='adultsCount'
                    defaultValue={ room.reserveAdultsCount }
                    onChange={ (e) => handleInputChange(room.id, 'reserveAdultsCount', parseInt(e.target.value)) }
                    className={ `${receptionEditCSS.number} ${borderBlueCSS}` }
                    />
                  {/* 子供の予約人数 */}
                  <input
                    type='number'
                    name='childrenCount'
                    defaultValue={ room.reserveChildrenCount }
                    onChange={ (e) => handleInputChange(room.id, 'reserveChildrenCount', parseInt(e.target.value)) }
                    className={ `${receptionEditCSS.number} ${borderBlueCSS}` }
                    />
                  {/* 到着予定時刻 */}
                  <input
                    type='text'
                    name='scheduledArrival'
                    defaultValue={ room.scheduledArrival ? formatTime(room.scheduledArrival) : "" }
                    onChange={ (e) => {
                      const timeValue = e.target.value;
                      const [hours, minutes] = timeValue.split(':').map(Number);
                      
                      const currentDate = new Date();
                      currentDate.setUTCHours(hours, minutes, 0, 0);
                      const isoString = currentDate.toISOString();
                      
                      handleInputChange(room.id, 'scheduledArrival', isoString);
                    }}
                    className={ `${receptionEditCSS.arrivalTime} ${borderBlueCSS}` }
                    />
                </div>
                {/* 担当者 */}
                <select
                  name="inCharge"
                  className={ `${receptionEditCSS.staff} ${borderBlueCSS}` }
                  multiple
                  >
                  {/* TODO */}
                  {/* {inCharges.map((inCharge: InChargeType) => (
                    <option key={ inCharge.id } value={ inCharge.id }>{ inCharge.name }</option>
                  ))} */}
                </select>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}

export default EditReserveList;