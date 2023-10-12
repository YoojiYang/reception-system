import { TaxiType, VipTaxiProps, VipTaxiType } from "../../../../../types/types";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { API_URL } from "@/app/utils/config";
import { deleteVipTaxi, fetchAllData, formatTime, updateTaxi } from "@/app/utils/utils";
import CustomButton from "@/app/utils/components/CustomButton";
import Modal from "@/app/utils/components/Modal";
import TaxiReservation from "./TaxiReservation";
import { carCountOptions, peopleCountOptions, reservationTimeOptions } from "@/app/utils/selectOptions";
import CustomSelect from "@/app/utils/components/CustomSelect";
import CustomStringSelect from "@/app/utils/components/CustomStringSelect";

async function fetchAllVipTaxis() {
  const res = await fetch(`${API_URL}/viptaxi`, {
    cache: 'no-store',
  });

  const json = await res.json()
  
  return json.vipTaxis;
}

const VipTaxi = ({ vipTaxis, setVipTaxis }: VipTaxiProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [editingTaxiId, setEditingTaxiId] = useState<number | null>(null);
  const [editPeopleCount, setEditPeopleCount] = useState<number>(0);
  const [editCarCount, setEditCarCount] = useState<number>(0);
  const [editReservationTime, setEditReservationTime] = useState<string>("試合終了後");

  const fetchVipTaxis = async (setVipTaxis: Dispatch<SetStateAction<VipTaxiType[]>>) => {
    try {
      const fetchedVipTaxis = await fetchAllData("viptaxi");
      setVipTaxis(fetchedVipTaxis);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (taxiId: number) => {
    try {
      await deleteVipTaxi("viptaxi", taxiId);
      fetchVipTaxis(setVipTaxis);
    } catch (error) {
      console.error("Failed to delete taxi:", error);
    }
  };

  const totalCarCount = vipTaxis.reduce((acc: number, vipTaxi: VipTaxiType) => {
    return acc + (vipTaxi.taxi?.carCount || 0);
  }, 0);


  useEffect(() => {
    fetchVipTaxis(setVipTaxis);
  }, [setVipTaxis]);

  return (
    <div>
      <div>
        <div>
          <h2>VIPタクシー</h2>
          <p>予約合計{ totalCarCount }</p>
        </div>
        <div className="flex grid grid-cols-8">
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
                  className='h-12 mt-4 grid grid-cols-8 gap-2 items-center'
            >
              <p className='text-center h-full flex items-center justify-center'>{ taxi.room?.name }</p>
              <p className='text-center h-full flex items-center justify-center'>{ taxi.room?.company }</p>
              { editingTaxiId === taxi.id ? (
                <div className="flex col-span-3 grid grid-cols-3">
                  <CustomSelect
                    options={ peopleCountOptions }
                    name="peopleCount"
                    value={ editPeopleCount }
                    onChange={ setEditPeopleCount }
                  />
                  <CustomSelect
                    options={ carCountOptions }
                    name="carCount"
                    value={ editCarCount }
                    onChange={ setEditCarCount }
                  />
                  <CustomStringSelect
                    options={ reservationTimeOptions }
                    name="reservationTime"
                    value={ editReservationTime }
                    onChange={ setEditReservationTime }
                  />
                </div>
              ) : (
                <div className="flex col-span-3 grid grid-cols-3">
                  <p className='text-center h-full flex items-center justify-center'>{ taxi.taxi?.peopleCount}</p>
                  <p className='text-center h-full flex items-center justify-center'>{ taxi.taxi?.carCount}</p>
                  <p className='text-center h-full flex items-center justify-center'>{
                    taxi.taxi?.reservationTime  instanceof Date
                    ? formatTime(taxi.taxi?.reservationTime)
                    : taxi.taxi?.reservationTime
                  }
                  </p>
                </div>
              )}
              <CustomButton
                text={ editingTaxiId === taxi.id ? "完了" : "編集" }
                onClick={ async () => {
                  if (editingTaxiId === taxi.id) {
                    const data = {
                      peopleCount: editPeopleCount,
                      carCount: editCarCount,
                      reservationTime: editReservationTime,
                    };
                    await updateTaxi("viptaxis", data, editingTaxiId);
                    await fetchVipTaxis(setVipTaxis);
                    setEditingTaxiId(null);
                  } else {
                    setEditPeopleCount(taxi.taxi?.peopleCount || 0);
                    setEditCarCount(taxi.taxi?.carCount || 0);
                    setEditReservationTime("試合終了後");
                    setEditingTaxiId(taxi.id);
                  }
                }}
                className={ "py-2 px-2 text-lg" }
              />
              <CustomButton
                text={ "削除" }
                onClick={ () => handleDelete(taxi.id) }
                className={ "py-2 px-2 text-lg"}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VipTaxi;