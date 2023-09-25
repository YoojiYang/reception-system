'use client';

import { useEffect, useState } from "react";
import Accept from "./components/Accept";
import CountChange from "./components/CountChange";
import { fetchAllArrivals, formatTimeToJTV } from "../utils/utils";
import { ArrivalType, RoomType } from "../../../types/types";
import ReserveIndex from "../reception/components/ReserveIndex";
import CustomButton from "../utils/components/CustomButton";

function Desk() {
  const [arrivals, setArrivals] = useState<ArrivalType[]>([]);
  const [accepting, setAccepting] = useState<boolean>(false);
  const [countChange, setCountChange] = useState<boolean>(false);

  const handleModalBackgroundClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      setAccepting(false);
      setCountChange(false);
    }
  };

  useEffect(() => {
    async function loadArrivals() {
      try {
        const fetchedArrivals = await fetchAllArrivals();
        setArrivals(fetchedArrivals);
      } catch (error) {
        console.error(error);
      }
    }
    loadArrivals();
  }, [arrivals]);

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
        <div
          onClick={ handleModalBackgroundClick }
          className="fixed top-60 left-40 bg-blue-300/50 w-4/5 rounded-xl items-center justify-center z-10"
        >
          <div className="bg-blue-50/90 p-10 m-12 h-auto rounded-xl overflow-y-auto">
            <Accept setAccepting={ setAccepting } setArrivals={ setArrivals }/>
          </div>
        </div>
        )}
      { countChange && <CountChange />}
      </div>
      {arrivals
        .sort((a: ArrivalType, b: ArrivalType) => a.id - b.id)
        .map((arrival: ArrivalType) => (
          <div
              key={arrival.id}
              className='h-12 mt-4 grid grid-cols-9 gap-2 items-center'
          >
            <p className='text-center h-full flex items-center justify-center'>{ arrival.room.name }</p>
            <p className='col-span-3 text-center h-full flex items-center justify-center'>{ arrival.room.company }</p>
            <p className='text-center h-full flex items-center justify-center'>{ arrival.adultsCount}</p>
            <p className='text-center h-full flex items-center justify-center'>{ arrival.childrenCount}</p>
            {/* <p className='text-center h-full flex items-center justify-center'>{ formatTimeToJTV(arrival.arrivalTime) }</p> */}
            <p className='col-span-3 text-center h-full flex items-center justify-center'></p>
          </div>
      ))}
    </div>
  )
}

export default Desk