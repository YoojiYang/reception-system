'use client';

import { useEffect, useState } from "react"
import { handleSetIdModalOpen } from "../utils/utils";
import EditReserveCount from "./components/EditReserveCount";
import { fetchRooms, useRooms } from "../RoomsContext";
import { useArrival } from "../ArrivalContext";
import Modal from "../utils/components/Modal";
import VipTaxiReserve from "./components/VipTaxiReserve";
import EditArrivalInfo from "./components/EditArrivalInfo";
import { bgGrayCSS, indexFontCSS, pageTitleCSS, recordFontCSS } from "../utils/style";
import Sidebar from "../utils/components/Sidebar";

function InCharge() {
  const { rooms, setRooms,  } = useRooms();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentRoomId, setCurrentRoomId] = useState<number | null>(null);

  const currentRoom = rooms.find(room => room.id === currentRoomId) || rooms[0];

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentRoomId(null);
  }

  useEffect(() => {
    fetchRooms(setRooms);
  }, [setRooms]);
    
  return (
    <div>
      <div className="m-8">
        <Sidebar />
      </div>
      <div className="m-8 pl-8">
        <div>
          <h1 className={ pageTitleCSS }>個室担当用</h1>
        </div>
        <div className={ `${bgGrayCSS} mt-8`}>
          <div className="grid grid-cols-8">
            <p className={ `${indexFontCSS} col-span-2` }>部屋名</p>
            <p className={ `${indexFontCSS} col-span-3` }>会社名</p>
            <p className={ indexFontCSS }>合計</p>
            <p className={ indexFontCSS }>現在</p>
            <p className={ indexFontCSS }>タクシー</p>
          </div>
          <div className="flex flex-col">
            {rooms
              .sort((a, b) => a.id - b.id)
              .map(room => (
                <div key={room.id} className="h-12 my-1 grid grid-cols-8 items-center">
                  <button 
                    onClick={() => { handleSetIdModalOpen(room.id, setCurrentRoomId, setIsModalOpen) }}
                    className={ `${recordFontCSS} mx-4 p-2 col-span-2 bg-blue-500 hover:bg-blue-700 text-white rounded-full` }
                  >
                    { room.name }
                  </button>
                  <p className={ `${recordFontCSS} col-span-3` }>{ room.company }</p>
                  <p className={ recordFontCSS }>{ room.reserveAdultsCount + room.changedChildrenCount + room.changedAdultsCount + room.changedChildrenCount }</p>
                  <p className={ recordFontCSS }>{ room.id }</p>
                  <p className={ recordFontCSS }>{ room.id }</p>
                </div>
            ))}
          </div>
        </div>

        { isModalOpen && (
          <Modal isVisible={ isModalOpen } onClose={ closeModal }>
            <div className="w-full h-24 space-y-4">
              <h2 className="text-center text-5xl font-bold">{ currentRoom?.name }</h2>
              <h2 className="text-center text-3xl">{ currentRoom?.company }</h2>
            </div>
            <EditArrivalInfo currentRoom={ currentRoom } closeModal={ closeModal } setModalOpen={ setIsModalOpen }/>
            <EditReserveCount currentRoom={ currentRoom } setModalOpen={ setIsModalOpen }/>
            <VipTaxiReserve currentRoom={ currentRoom } />
          </Modal>
        )}
      </div>
    </div>
  );
}


export default InCharge