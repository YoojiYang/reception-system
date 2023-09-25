import { CurrentCountProps } from "@/app/types";
import e from "express";
import { useState } from "react";

export function CurrentCount({ currentRoom, roomArrivalData }: CurrentCountProps) {
  const [localAdultsCount, setLocalAdultsCount] = useState<number>(0);

  return (
    <div>
      <div>
        <p className="h-12 text-2xl text-center">現在の人数</p>
        <p className="h-24 text-6xl text-center">
          {currentRoom && roomArrivalData[currentRoom.id]?.adultsTotal + roomArrivalData[currentRoom.id]?.childrenTotal || 0}
        </p>
      </div>
      <div className="mt-4 flex">
        <p className="w-1/2 text-2xl text-center">大人</p>
        <p className="w-1/2 text-2xl text-center">子ども</p>
      </div>
      <div className="flex">
        <p className="w-1/2 text-4xl text-center">
          {currentRoom && roomArrivalData[currentRoom.id]?.adultsTotal + localAdultsCount || 0 }
        </p>
        <p className="w-1/2 text-4xl text-center">
          {currentRoom && roomArrivalData[currentRoom.id]?.childrenTotal || 0}
        </p>
      </div>
      <div className="flex">
        <div className="w-1/2 flex justify-center">
          <button
            onClick={ (e:React.MouseEvent<HTMLButtonElement>) => {
              e.nativeEvent.stopPropagation();
              const newAdultCount = localAdultsCount + 1;
              setLocalAdultsCount(newAdultCount);
              }}
            className="rounded-lg background-color: #fb923c; text-5xl p-3"
          >
            +
          </button>
        </div>
        <div className="w-1/2 flex justify-center">
          <button className="rounded-lg background-color: #fb923c; text-5xl p-3">
            -
          </button>
        </div>
      </div>
    </div>
  )
}

export default CurrentCount;

