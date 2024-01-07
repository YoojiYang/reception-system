'use client';

import { useState } from "react";
import Accept from "./components/Accept";
import ReserveCountChange from "./components/ReserveCountChange";
import { ArrivalType } from "../../../types/types";
import CustomButton from "../utils/components/CustomButton";
import { useArrival } from "../context/ArrivalContext";
import Modal from "../utils/components/Modal";
import Sidebar from "../utils/components/Sidebar";
import { deskIndexCSS, pageTitleCSS } from "../utils/style";
import DeskIndex from "./components/DeskIndex";
import { formatTimeToJTV } from "../utils/utils";

function Desk() {
  const { arrivals, setArrivals, lastUpdated, setLastUpdated } = useArrival();
  const [countChange, setCountChange] = useState<boolean>(false);

  const closeModal = () => {
    setCountChange(false);
  }

  return (
    <div className="mx-8">
      <div className="m-8">
        <Sidebar />
      </div>
      <div className="">
        <div>
          <h1 className={ pageTitleCSS }>来場者登録</h1>
        </div>
        <Accept setArrivals={ setArrivals } lastUpdated={ lastUpdated } setLastUpdated={ setLastUpdated }/>
        <div className='pb-4 h-auto flex items-center justify-end space-x-8'>
          <CustomButton text={ "予約人数変更" } onClick={ () => { setCountChange(true) }} className={ "py-4 px-8 text-xl" } />
        </div>
        <div className="p-4 bg-gray-200 rounded-2xl">
          <div>
            <DeskIndex />
              {arrivals
                .sort((a: ArrivalType, b: ArrivalType) => a.id - b.id)
                .map((arrival: ArrivalType) => (
                  <div key={arrival.id} className={ deskIndexCSS.outside1 }>
                    <div className={ deskIndexCSS.outside21 }>
                      <p className={ deskIndexCSS.roomName }>{ arrival.room.name }</p>
                      <p className={ deskIndexCSS.companyName }>{ arrival.room.company }</p>
                    </div>
                    <div className={ deskIndexCSS.outside22 }>
                      <div className={ deskIndexCSS.outside3 }>
                        <p className={ deskIndexCSS.adults }>{ arrival.adultsCount}</p>
                        <p className={ deskIndexCSS.children }>{ arrival.childrenCount}</p>
                        <p className={ deskIndexCSS.arrivalTime }>{ formatTimeToJTV(arrival.arrivalTime) }</p>
                      </div>
                      <p className={ deskIndexCSS.staff }>
                        <ul className='flex'>
                          {arrival.room.inCharges.map((inCharge, index, array) => (
                            <li key={ inCharge.inChargeId }>
                              { inCharge.inCharge ? inCharge.inCharge.name : "" }
                              { index < array.length - 1 ? "・" : ""}
                            </li>
                          ))}
                        </ul>
                      </p>
                    </div>
                  </div>
              ))}
          </div>
        </div>
        { countChange && (
          <Modal isVisible={ countChange } onClose={ closeModal }>
            <ReserveCountChange setCountChange={ setCountChange }/>
          </Modal>
        )}
      </div>
    </div>
  )
}

export default Desk