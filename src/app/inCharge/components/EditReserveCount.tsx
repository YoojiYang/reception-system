import { handleReserveCountChangeUpdate, setRoomsMap } from "@/app/utils/utils";
import { EditReserveCountProps } from "../../../../types/types"
import { fetchRooms, useRooms } from "@/app/RoomsContext";
import { useEffect, useState } from "react";
import CustomButton from "@/app/utils/components/CustomButton";
import IncrementButton from "@/app/utils/components/IncrementButton";
import DecrementButton from "@/app/utils/components/DecrementButton";
import { bgGrayCSS, indexFontCSS } from "@/app/utils/style";

const EditReserveCount = ({ currentRoom, setModalOpen }: EditReserveCountProps) => {
  const [localChangeAdultsCount, setLocalChangeAdultsCount] = useState<number>(0);
  const [localChangechildrenCount, setLocalChangechildrenCount] = useState<number>(0);
  
  const { rooms, setRooms, lastUpdated , setLastUpdated } = useRooms();
  const roomsMap = setRoomsMap(rooms);
  const reserveCount = roomsMap[currentRoom.id]?.reserveAdultsCount + roomsMap[currentRoom.id]?.reserveChildrenCount || 0;
  const changedAdultsCount = roomsMap[currentRoom.id]?.changedAdultsCount || 0;
  const changedChildrenCount = roomsMap[currentRoom.id]?.changedChildrenCount || 0;
  const changedCount = changedAdultsCount + changedChildrenCount;

  const handleRegister = () => {
    handleReserveCountChangeUpdate(
      currentRoom, 
      localChangeAdultsCount, 
      localChangechildrenCount,
      (response) => {
        fetchRooms(setRooms);
        setLastUpdated(Date.now());
        setLocalChangeAdultsCount(0);
        setLocalChangechildrenCount(0);
      }, 
      (error) => {
        console.error(error);
      }
      );
    setModalOpen(false);
  };

  useEffect(() => {
    fetchRooms(setRooms);
  }, [setRooms, lastUpdated]);
  
  return (
    <div>
      <div className={`${bgGrayCSS} m-4`}>
        <form>
          <div className="m-2 flex justify-between items-center">
            <h3 className={ indexFontCSS }>[ 予約人数変更 ]</h3>
            <CustomButton text={ "登録" } onClick={ handleRegister } className={ "py-3 px-6 text-lg" }/>
          </div>
          <div className="mt-4 flex items-center justify-center space-x-8">
            <div className="space-y-2">
              <p className="text-2xl text-center">予約人数</p>
              <p className="text-4xl text-center">
                { reserveCount }
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-2xl text-center">当日増減</p>
              <p className="text-4xl text-center">
                { changedCount + localChangeAdultsCount + localChangechildrenCount }
              </p>
            </div>
          </div>
          <div className="h-auto mt-4">
            <div className="h-full py-6 mx-40 flex flex-col justify-center bg-white rounded-2xl space-y-4">
              <p className="text-2xl text-center">利用者合計</p>
              <p className="text-6xl text-center">
                { reserveCount + changedCount + localChangeAdultsCount + localChangechildrenCount }
              </p>
            </div>
            <div className="h-auto p-4 mt-4 mx-12 grid grid-cols-2 items-center bg-white rounded-2xl">
              <div className="space-y-4">
              <p className="text-2xl text-center">大人</p>
              <p className="text-4xl text-center font-bold">
                { changedAdultsCount + localChangeAdultsCount }
              </p>
              <div className="flex justify-center space-x-4">
                <IncrementButton count={ localChangeAdultsCount } setCount={ setLocalChangeAdultsCount }/>
                <DecrementButton count={ localChangeAdultsCount } setCount={ setLocalChangeAdultsCount }/>
              </div>
              </div>
              <div className="space-y-4">
                <p className="text-2xl text-center">子ども</p>
                <p className="text-4xl text-center font-bold">
                  { changedChildrenCount + localChangechildrenCount }
                </p>
                <div className="flex justify-center space-x-4">
                  <IncrementButton count={ localChangechildrenCount } setCount={ setLocalChangechildrenCount }/>
                  <DecrementButton count={ localChangechildrenCount } setCount={ setLocalChangechildrenCount }/>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditReserveCount