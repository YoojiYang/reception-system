import { handleReserveCountChangeUpdate, setRoomsMap } from "@/app/utils/utils";
import { EditReserveCountProps } from "../../../../types/types"
import { fetchRooms, useRooms } from "@/app/RoomsContext";
import { useEffect, useState } from "react";
import CustomButton from "@/app/utils/components/CustomButton";
import IncrementButton from "@/app/utils/components/IncrementButton";
import DecrementButton from "@/app/utils/components/DecrementButton";

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
      <form>
        <div className="flex justify-between">
          <h3 className="text-3xl">[ 予約人数変更 ]</h3>
          <CustomButton text={ "登録" } onClick={ handleRegister } className={ "py-4 px-8 text-xl" }/>
        </div>
        <div className="h-92 mt-8">
          <div>
          <p className="h-12 text-2xl text-center">利用者合計</p>
          <p className="h-24 text-6xl text-center">
            { reserveCount + changedCount + localChangeAdultsCount + localChangechildrenCount }
          </p>
          </div>
          <div className="mt-4 flex">
            <p className="w-1/2 text-xl text-center">予約人数</p>
            <p className="w-1/2 text-xl text-center">当日増減</p>
          </div>
          <div className="flex">
            <p className="w-1/2 text-4xl text-center">
              { reserveCount }
            </p>
            <p className="w-1/2 text-4xl text-center">
              { changedCount + localChangeAdultsCount + localChangechildrenCount }
            </p>
          </div>
          <div className="mt-4 flex">
            <p className="w-1/2 text-2xl text-center">大人</p>
            <p className="w-1/2 text-2xl text-center">子ども</p>
          </div>
          <div className="flex">
            <p className="w-1/2 text-4xl text-center">
              { changedAdultsCount + localChangeAdultsCount }
            </p>
            <p className="w-1/2 text-4xl text-center">
              { changedChildrenCount + localChangechildrenCount }
            </p>
          </div>
          <div>
            <div className="flex">
              <div className="w-1/2 flex justify-center">
                <IncrementButton count={ localChangeAdultsCount } setCount={ setLocalChangeAdultsCount }/>
                <DecrementButton count={ localChangeAdultsCount } setCount={ setLocalChangeAdultsCount }/>
              </div>
              <div className="w-1/2 flex justify-center">
                <IncrementButton count={ localChangechildrenCount } setCount={ setLocalChangechildrenCount }/>
                <DecrementButton count={ localChangechildrenCount } setCount={ setLocalChangechildrenCount }/>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditReserveCount