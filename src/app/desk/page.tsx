'use client';

import { useState } from "react";
import Accept from "./components/Accept";
import ReserveCountChange from "./components/ReserveCountChange";
import { formatTimeToJTV } from "../utils/utils";
import { ArrivalType } from "../../../types/types";
import ReserveIndex from "../reception/components/ReserveIndex";
import CustomButton from "../utils/components/CustomButton";
import { useArrival } from "../ArrivalContext";
import Modal from "../utils/components/Modal";
import Sidebar from "../utils/components/Sidebar";
import { deskIndexCSS, pageTitleCSS } from "../utils/style";

function Desk() {
  const { arrivals, setArrivals, lastUpdated, setLastUpdated } = useArrival();
  const [accepting, setAccepting] = useState<boolean>(false);
  const [countChange, setCountChange] = useState<boolean>(false);

  const closeModal = () => {
    setAccepting(false);
    setCountChange(false);
  }

  return (
    <div>
      <div className="m-8">
        <Sidebar />
      </div>
      <div className="m-8 pl-8">
        <div>
          <h1 className={ pageTitleCSS }>来場者登録</h1>
        </div>
        <div className='pb-4 h-auto flex items-center justify-end space-x-8'>
          <CustomButton text={ "新規登録" } onClick={ () => { setAccepting(true) }} className={ "py-4 px-8 text-xl" } />
          <CustomButton text={ "予約人数変更" } onClick={ () => { setCountChange(true) }} className={ "py-4 px-8 text-xl" } />
        </div>
        <div className="p-4 bg-gray-200 rounded-2xl">
          <div>
            <ReserveIndex />
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
                      <p className={ deskIndexCSS.staff }></p>
                    </div>
                  </div>
              ))}
          </div>
        </div>
        { accepting && (
          <Modal isVisible={ accepting } onClose={ closeModal }>
            <Accept setAccepting={ setAccepting } setArrivals={ setArrivals } lastUpdated={ lastUpdated } setLastUpdated={ setLastUpdated }/>
          </Modal>
        )}
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