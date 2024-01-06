import { useState, useEffect, useCallback, useMemo } from "react";
import { RoomType, EditReserveListProps, InChargeType, RoomInChargeType } from '../../../../types/types';
import ReserveIndex from './ReserveIndex';
import { deleteAllData, fetchInCharge, handleEditReserveList, postData } from '../../utils/utils';
import CustomButton from "@/app/utils/components/CustomButton";
import { fetchRooms, useRooms } from "@/app/context/RoomsContext";
import { borderBlueCSS, receptionEditCSS } from "@/app/utils/style";
import SelectInCharge from "./SelectInCharge";
import SelectReserveTime from "./SelectedReserveTime";

const EditReserveList = ({ setEditing }: EditReserveListProps) => {
  const { rooms, setRooms } = useRooms();
  const[editedRooms, setEditedRooms] = useState<Record<number, RoomType>>({});
  const [inCharges, setInCharges] = useState<InChargeType[]>([]);
  const [updateInChargesList, setUpdateInChargesList] = useState<RoomInChargeType[]>([]);

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
  
  // async function updateInCharge(updateInChargesList: RoomInChargeType[]) {
  //   try {
  //     // トランザクションを開始
  //     await prisma.$transaction(async (prisma) => {
  //       // 全てのレコードを削除
  //       await prisma.roomInCharge.deleteMany();
        
  //       // 新しいレコードを登録
  //       await postData("roomInCharge", updateInChargesList);
  //     });
  //   } catch (error) {
  //     console.error("An error occurred during the update process:", error);
  //   }
  // }
  

  const handleRegister = async () => {
    // roomテーブルの更新
    handleEditReserveList(
      editedRooms, 
      rooms, 
      () => {
        fetchRooms(setRooms);
      }, 
      (error) => {
        console.error(error);
      }
    );
    
    // roomInChargeテーブルの更新
    await deleteAllData("roomInCharge");
    await postData("roomInCharge", updateInChargesList);

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
    
    useEffect(() => {
      fetchInCharge(setInCharges);
      }, [setInCharges]);

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
                  <div className="h-16">
                    <SelectReserveTime
                      roomId={ room.id }
                      handleInputChange={ handleInputChange }
                      defaultTime={ room.scheduledArrival }
                    />
                  </div>
                </div>
                {/* 担当者 */}
                <SelectInCharge updateInChargesList={ updateInChargesList } setUpdateInChargesList={ setUpdateInChargesList } roomId={ room.id }/>
              </div>
            </div>
          </form>
        ))}
      </div>
    </div>
  );
}

export default EditReserveList;