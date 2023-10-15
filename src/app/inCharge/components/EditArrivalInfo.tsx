import CustomButton from "@/app/utils/components/CustomButton";
import { EditArrivalInfoProps } from "../../../../types/types";
import { fetchAllData, postArrival, setRoomsMap } from "@/app/utils/utils";
import { useRooms } from "@/app/RoomsContext";
import { useState } from "react";
import IncrementButton from "@/app/utils/components/IncrementButton";
import DecrementButton from "@/app/utils/components/DecrementButton";
import { useArrival } from "@/app/ArrivalContext";
import { bgGrayCSS, indexFontCSS } from "@/app/utils/style";

function EditArrivalInfo({ currentRoom, setModalOpen }: EditArrivalInfoProps) {
  const { rooms, setRooms } = useRooms();
  const { arrivals, setArrivals, arrivalCounts } = useArrival();
  const [localArrivalAdultsCount, setLocalArrivalAdultsCount] = useState<number>(0);
  const [localArrivalChildrenCount, setLocalArrivalChildrenCount] = useState<number>(0);

  const currentAdultsCount = arrivalCounts[currentRoom.id]?.adultsTotal || 0;
  const currentChildrenCount = arrivalCounts[currentRoom.id]?.childrenTotal || 0;
  const currentArrivalCount = currentAdultsCount + currentChildrenCount;

  const roomsMap = setRoomsMap(rooms);
  const remainingAdultsCount = roomsMap[currentRoom.id].reserveAdultsCount + roomsMap[currentRoom.id].changedAdultsCount - currentAdultsCount || 0;
  const remainingChildrenCount = roomsMap[currentRoom.id].reserveChildrenCount + roomsMap[currentRoom.id].changedChildrenCount - currentChildrenCount || 0;

  const isAllIn = () => {
    setLocalArrivalAdultsCount(remainingAdultsCount);
    setLocalArrivalChildrenCount(remainingChildrenCount);
  };
  
  const isAllout = () => {
    setLocalArrivalAdultsCount(-(currentAdultsCount));
    setLocalArrivalChildrenCount(-(currentChildrenCount));
  }

  const handleRegister = async () => {
    try {
      await postArrival(currentRoom.id, localArrivalAdultsCount, localArrivalChildrenCount);

      const fetchedArrivals = await fetchAllData("arrival");
      setArrivals(fetchedArrivals);
      setLocalArrivalAdultsCount(0);
      setLocalArrivalChildrenCount(0);
    } catch (error) {
      console.error(error);
      return;
    }
    setModalOpen(false);
  };


  return (
    <div>
      <div className={`${bgGrayCSS} m-4`}>
        <form>
          <div className="m-2 flex justify-between items-center">
            <h3 className={ indexFontCSS }>[ 到着情報 ]</h3>
            <CustomButton text={ "登録" } onClick={ handleRegister } className={ "py-3 px-6 text-lg" }/>
          </div>
          <div className="h-auto mt-8">
            <div className="h-full py-6 mx-40 flex flex-col justify-center bg-white rounded-2xl space-y-4">
              <p className="text-2xl text-center">現在の人数</p>
              <p className="text-6xl text-center font-bold">
                { currentArrivalCount + localArrivalAdultsCount + localArrivalChildrenCount }
              </p>
            </div>
            <div className="h-auto p-4 mt-4 mx-12 grid grid-cols-2 items-center bg-white rounded-2xl">
              <div className="space-y-4">
                <p className="text-2xl text-center">大人</p>
                <p className="text-4xl text-center font-bold">
                  { currentAdultsCount + localArrivalAdultsCount }
                </p>
                <div className="flex justify-center space-x-4">
                  <IncrementButton count={ localArrivalAdultsCount } setCount={ setLocalArrivalAdultsCount }/>
                  <DecrementButton count={ localArrivalAdultsCount } setCount={ setLocalArrivalAdultsCount }/>
                </div>
              </div>
              <div className="space-y-4">
                <p className="text-2xl text-center">子ども</p>
                <p className="text-4xl text-center font-bold">
                  { currentChildrenCount + localArrivalChildrenCount }
                </p>
                <div className="flex justify-center space-x-4">
                  <IncrementButton count={ localArrivalChildrenCount } setCount={ setLocalArrivalChildrenCount }/>
                  <DecrementButton count={ localArrivalChildrenCount } setCount={ setLocalArrivalChildrenCount }/>
                </div>
              </div>
            </div>
            <div className="h-auto">
              <div className="py-12 flex justify-center">
                <div className="space-x-16">
                  <CustomButton text={ "全員到着" } onClick={ isAllIn } className={ "py-4 px-8 text-xl" }/>
                  <CustomButton text={ "全員退室" } onClick={ isAllout } className={ "py-4 px-8 text-xl" }/>
                </div>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditArrivalInfo