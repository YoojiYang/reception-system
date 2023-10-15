'use client';

import { useEffect, useState } from "react";
import { fetchArrivalsForRoom } from "../../utils/utils";
import NotArrived from "./NotArrived";
import Arrived from "./Arrived";
import { useRooms } from "../../RoomsContext";
import { useArrival } from "@/app/ArrivalContext";
import { TotalCountsType } from "../../../../types/types";

function ArrivalComponent() {
  // const { rooms, setRooms } = useRooms();
  const [roomArrivalCounts, setRoomArrivalCounts] = useState<Record<number, number>>({});
  const { arrivals } = useArrival();
  const [ arrivalCounts, setArrivalCounts ] = useState<TotalCountsType>({});

  useEffect(() => {
    const totalCounts: TotalCountsType = {};

    for (const arrival of arrivals) {
      if (!totalCounts[arrival.roomId]) {
        totalCounts[arrival.roomId] = 0;
      }
      totalCounts[arrival.roomId] += arrival.adultsCount + arrival.childrenCount;
      console.log(totalCounts);
    }

    setArrivalCounts(totalCounts);
  }, [arrivals]);


  // // 部屋ごとの到着数を取得し、ローカルのstateに保存する
  // useEffect(() => {
  //   async function fetchAndSetArrivalCounts() {

  //     // 部屋ごとの到着数を取得する
  //     const countsPromises = rooms.map(async (room) => {
  //       const data = await fetchArrivalsForRoom(room.id);
  //       return { id: room.id, count: data.totalCount };
  //     });
      
  //     // 部屋ごとの到着数をローカルのstateに保存する
  //     const results = await Promise.all(countsPromises);
  //     const counts: Record<number, number> = {};
  //     results.forEach(res => counts[res.id] = res.count);

  //     setRoomArrivalCounts(counts);
  //   }
  //   // 部屋情報が更新されたら、部屋ごとの到着数を取得する
  //   fetchAndSetArrivalCounts();
  // }, [rooms]);
  console.log(arrivalCounts);

  return (
    <div className='mx-8'>
      <div>
        <h1 className='mt-8 mb-8 text-4xl'>来場状況</h1>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <h2 className="m-4 text-center text-5xl">受付中...</h2>  
          <div className="mx-4 bg-blue-50 border-solid border-2 border-gray-500 rounded-2xl">
            <NotArrived arrivalCounts={ arrivalCounts } />
          </div>
        </div>
        <div>
          <h2 className="m-4 text-center text-5xl">みんな揃ったよ！</h2>
          <div className="mx-4 bg-blue-50 border-solid border-2 border-gray-500 rounded-2xl">
            <Arrived arrivalCounts={ arrivalCounts } />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ArrivalComponent;