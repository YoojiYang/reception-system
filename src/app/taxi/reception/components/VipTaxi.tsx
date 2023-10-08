import { TaxiType, VipTaxiType } from "../../../../../types/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { API_URL } from "@/app/utils/config";
import { formatTime } from "@/app/utils/utils";

async function fetchAllVipTaxis() {
  const res = await fetch(`${API_URL}/viptaxi`, {
    cache: 'no-store',
  });

  const json = await res.json()
  
  return json.vipTaxis;
}

const VipTaxi = () => {
  const [vipTaxis, setVipTaxis] = useState<VipTaxiType[]>([]);

  const fetchVipTaxis = async (setVipTaxis: Dispatch<SetStateAction<VipTaxiType[]>>) => {
    try {
      const fetchedVipTaxis = await fetchAllVipTaxis();
      setVipTaxis(fetchedVipTaxis);
    } catch (error) {
      console.error(error);
    }
  };

  const totalCarCount = vipTaxis.reduce((acc: number, vipTaxi: VipTaxiType) => {
    return acc + (vipTaxi.taxi?.carCount || 0);
  }, 0);


  useEffect(() => {
    fetchVipTaxis(setVipTaxis);
  }, []);

  return (
    <div>
      <div>
        <div>
          <h2>VIPタクシー</h2>
          <p>予約合計{ totalCarCount }</p>
        </div>
        <div className='h-8 mt-4 grid grid-cols-6 gap-2 items-center'>
          <p className='text-center h-full flex items-center justify-center'>部屋番号</p>
          <p className='text-center h-full flex items-center justify-center'>会社名</p>
          <p className='text-center h-full flex items-center justify-center'>人数</p>
          <p className='text-center h-full flex items-center justify-center'>台数</p>
          <p className='text-center h-full flex items-center justify-center'>予約時間</p>
        </div>
      </div>
      <div>
        <div className=''>
          {vipTaxis
            .sort((a: VipTaxiType, b: VipTaxiType) => a.id - b.id)
            .map((taxi: VipTaxiType, index: number) => (
              <div
                  key={taxi.id}
                  className='h-12 mt-4 grid grid-cols-6 gap-2 items-center'
              >
                <p className='text-center h-full flex items-center justify-center'>{ taxi.room?.name }</p>
                <p className='text-center h-full flex items-center justify-center'>{ taxi.room?.company }</p>
                <p className='text-center h-full flex items-center justify-center'>{ taxi.taxi?.peopleCount}</p>
                <p className='text-center h-full flex items-center justify-center'>{ taxi.taxi?.carCount}</p>
                <p className='text-center h-full flex items-center justify-center'>{
                  taxi.taxi?.reservationTime  instanceof Date
                  ? formatTime(taxi.taxi?.reservationTime)
                  : taxi.taxi?.reservationTime
                }</p>
              </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VipTaxi;