'use client';

import { useEffect, useState } from "react";
import { fetchAllRooms, fetchArrivalsForRoom } from "../utils/utils";
import { RoomType } from "../types";
import NotArrived from "./components/NotArrived";
import Arrived from "./components/Arrived";

function Arrival() {
  const [rooms, setRooms] = useState<RoomType[]>([])
  const [roomArrivalCounts, setRoomArrivalCounts] = useState<Record<number, number>>({});

  useEffect(() => {
    async function loadRooms() {
      try {
        const fetchedRooms = await fetchAllRooms();
        setRooms(fetchedRooms);
      } catch (error) {
        console.error(error);
      }
    }
    loadRooms();
  }, []);

  useEffect(() => {
    async function fetchAndSetArrivalCounts() {
      const counts: Record<number, number> = {};
      for (const room of rooms) {
        const data = await fetchArrivalsForRoom(room.id);
        counts[room.id] = data.totalCount;
      }
      setRoomArrivalCounts(counts);
    }
    fetchAndSetArrivalCounts();
  }, [rooms]);

  return (
    <div className='mx-8'>
      <div>
        <h1 className='mt-8 mb-8 text-4xl'>来場状況確認</h1>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <h2 className="m-4 text-center text-5xl">受付中...</h2>  
          <div className="mx-4 bg-blue-50 border-solid border-2 border-glay-500 rounded-2xl">
            <NotArrived rooms={ rooms } roomArrivalCounts={ roomArrivalCounts }/>
          </div>
        </div>
        <div>
          <h2 className="m-4 text-center text-5xl">みんな揃ったよ！</h2>
          <div className="mx-4 bg-blue-50 border-solid border-2 border-glay-500 rounded-2xl">
            <Arrived rooms={ rooms } roomArrivalCounts={ roomArrivalCounts }/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Arrival;