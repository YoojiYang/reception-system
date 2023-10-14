'use client';

import { useEffect, useState } from "react"
import { handleSetIdModalOpen } from "../utils/utils";
import EditReserveCount from "./components/EditReserveCount";
import { fetchRooms, useRooms } from "../RoomsContext";
import { useArrival } from "../ArrivalContext";
import Modal from "../utils/components/Modal";
import VipTaxiReserve from "./components/VipTaxiReserve";
import EditArrivalInfo from "./components/EditArrivalInfo";
import { VipTaxiType } from "../../../types/types";

function InCharge() {
  const { rooms, setRooms,  } = useRooms();
  const { arrivals, setArrivals } = useArrival();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);
  const [arrivalCounts, setArrivalCounts] = useState<Record<number, { adultsTotal: number, childrenTotal: number }>>({});
  const [vipTaxis, setVipTaxis] = useState<VipTaxiType[]>([]);

  const currentRoom = rooms.find(room => room.id === currentRoomId) || rooms[0];

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRoomId(null);
  }

  useEffect(() => {
    const result: Record<number, { adultsTotal: number, childrenTotal: number }> = {};

    for (const arrival of arrivals) {
      if (!result[arrival.roomId]) {
        result[arrival.roomId] = { adultsTotal: 0, childrenTotal: 0 };
      }
      result[arrival.roomId].adultsTotal += arrival.adultsCount;
      result[arrival.roomId].childrenTotal += arrival.childrenCount;
    }

    setArrivalCounts(result);
  }, [arrivals]);

  useEffect(() => {
    fetchRooms(setRooms);
  }, [setRooms]);

    
  return (
    <div className='mx-8'>
      <div>
        <h1 className='mt-8 text-4xl'>個室担当用</h1>
      </div>
      <div className="grid grid-cols-2">
        <div>
          <div className="flex flex-col">
            {rooms
              .sort((a, b) => a.id - b.id)
              .map(room => (
                <button 
                  key={ room.id } 
                  onClick={() => { handleSetIdModalOpen(room.id, setCurrentRoomId, setIsModalOpen) }}
                  className="mt-4 h-12 text-2xl"
                >
                  { room.name }
                </button>
            ))}
          </div>
        </div>
      </div>

      { isModalOpen && (
        <Modal isVisible={ isModalOpen } onClose={ closeModal }>
          <div className="flex w-full h-24">
            <h3 className="w-1/8">前の部屋</h3>
            <div className="w-3/4">
              <h2 className="text-center text-3xl">{ currentRoom?.name }</h2>
              <h2 className="text-center text-3xl">{ currentRoom?.company }</h2>
            </div>
            <h3 className="w-1/8">次の部屋</h3>
            <button onClick={ closeModal }>閉じる</button>
          </div>
          <EditArrivalInfo currentRoom={ currentRoom } closeModal={ closeModal } arrivalCounts={ arrivalCounts } setModalOpen={ setIsModalOpen }/>
          <EditReserveCount currentRoom={ currentRoom } setModalOpen={ setIsModalOpen }/>
          <VipTaxiReserve currentRoom={ currentRoom } vipTaxis={ vipTaxis } setVipTaxis={ setVipTaxis} />
        </Modal>
      )}
    </div>
  );
}


export default InCharge