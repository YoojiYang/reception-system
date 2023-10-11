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

function Desk() {
  const { arrivals, setArrivals } = useArrival();
  const [accepting, setAccepting] = useState<boolean>(false);
  const [countChange, setCountChange] = useState<boolean>(false);

  const closeModal = () => {
    setAccepting(false);
    setCountChange(false);
  }

  return (
    <div className='mx-8'>
      <div>
        <h1 className='mt-8 text-4xl'>来場者登録</h1>
      </div>
      <div className='h-32 flex items-center justify-end space-x-8'>
        <CustomButton text={ "追加" } onClick={ () => { setAccepting(true) }} className={ "py-4 px-8 text-xl" } />
        <CustomButton text={ "人数変更" } onClick={ () => { setCountChange(true) }} className={ "py-4 px-8 text-xl" } />
      </div>
      <div>
        <ReserveIndex />
      { accepting && (
        <Modal isVisible={ accepting } onClose={ closeModal }>
          <Accept setAccepting={ setAccepting } setArrivals={ setArrivals }/>
        </Modal>
        )}
      { countChange && (
        <Modal isVisible={ countChange } onClose={ closeModal }>
          <ReserveCountChange setCountChange={ setCountChange }/>
        </Modal>
        )}
      </div>
      {arrivals
        .sort((a: ArrivalType, b: ArrivalType) => a.id - b.id)
        .map((arrival: ArrivalType) => (
          <div
              key={arrival.id}
              className='h-12 mt-4 grid grid-cols-10 gap-2 items-center'
          >
            <p className='text-center h-full flex items-center justify-center'>{ arrival.room.name }</p>
            <p className='col-span-3 text-center h-full flex items-center justify-center'>{ arrival.room.company }</p>
            <p className='text-center h-full flex items-center justify-center'>{ arrival.adultsCount}</p>
            <p className='text-center h-full flex items-center justify-center'>{ arrival.childrenCount}</p>
            <p className='text-center h-full flex items-center justify-center'>{ formatTimeToJTV(arrival.arrivalTime) }</p>
            <p className='col-span-3 text-center h-full flex items-center justify-center'></p>
          </div>
      ))}
    </div>
  )
}

export default Desk