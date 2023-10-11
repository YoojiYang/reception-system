import CustomButton from "@/app/utils/components/CustomButton";
import { EditArrivalInfoProps } from "../../../../types/types";
import { fetchAllData, postArrival, setRoomsMap } from "@/app/utils/utils";
import { useRooms } from "@/app/RoomsContext";
import { useState } from "react";
import IncrementButton from "@/app/utils/components/IncrementButton";
import DecrementButton from "@/app/utils/components/DecrementButton";
import { useArrival } from "@/app/ArrivalContext";

function EditArrivalInfo({ currentRoom, arrivalCounts, setModalOpen }: EditArrivalInfoProps) {
  const { rooms, setRooms } = useRooms();
  const { arrivals, setArrivals } = useArrival();
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
      <div className="m-12 items-center">
        <div className="ml-16 mr-16">
          <form>
            <div className="flex justify-between">
              <h3 className="text-3xl">[ 到着情報 ]</h3>
              <CustomButton text={ "登録" } onClick={ handleRegister } className={ "py-4 px-8 text-xl" }/>
            </div>
            <div className="h-92 mt-8">
              <div>
                <p className="h-12 text-2xl text-center">現在の人数</p>
                <p className="h-24 text-6xl text-center">
                  { currentArrivalCount + localArrivalAdultsCount + localArrivalChildrenCount }
                </p>
              </div>
              <div className="mt-4 flex">
                <p className="w-1/2 text-2xl text-center">大人</p>
                <p className="w-1/2 text-2xl text-center">子ども</p>
              </div>
              <div className="flex">
                <p className="w-1/2 text-4xl text-center">
                  { currentAdultsCount + localArrivalAdultsCount }
                </p>
                <p className="w-1/2 text-4xl text-center">
                  { currentChildrenCount + localArrivalChildrenCount }
                </p>
              </div>
              <div className="flex">
                <div className="w-1/2 flex justify-center">
                  <IncrementButton count={ localArrivalAdultsCount } setCount={ setLocalArrivalAdultsCount }/>
                  <DecrementButton count={ localArrivalAdultsCount } setCount={ setLocalArrivalAdultsCount }/>
                </div>
                <div className="w-1/2 flex justify-center">
                  <IncrementButton count={ localArrivalChildrenCount } setCount={ setLocalArrivalChildrenCount }/>
                  <DecrementButton count={ localArrivalChildrenCount } setCount={ setLocalArrivalChildrenCount }/>
                </div>
              </div>
              <div className="mt-24">
                <div className="flex justify-center">
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
    </div>
  )
}

export default EditArrivalInfo