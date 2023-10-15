import { VipTaxiType } from "../../../../../types/types";
import { useEffect, useState } from "react";
import { deleteVipTaxi, formatTime, updateTaxi } from "@/app/utils/utils";
import CustomButton from "@/app/utils/components/CustomButton";
import { carCountOptions, peopleCountOptions, reservationTimeOptions } from "@/app/utils/selectOptions";
import CustomSelect from "@/app/utils/components/CustomSelect";
import CustomStringSelect from "@/app/utils/components/CustomStringSelect";
import { fetchVipTaxis, useVipTaxi } from "@/app/VipTaxiContext";
import { indexFontCSS, recordFontCSS, recordFontLgCSS } from "@/app/utils/style";

const VipTaxi = () => {
  const { vipTaxis, setVipTaxis, lastUpdated, setLastUpdated } = useVipTaxi();
  const [editingTaxiId, setEditingTaxiId] = useState<number | null>(null);
  const [editPeopleCount, setEditPeopleCount] = useState<number>(0);
  const [editCarCount, setEditCarCount] = useState<number>(0);
  const [editReservationTime, setEditReservationTime] = useState<string>("試合終了後");

  const totalCarCount = vipTaxis.reduce((acc: number, vipTaxi: VipTaxiType) => {
    return acc + (vipTaxi.taxi?.carCount || 0);
  }, 0);

  const handleDelete = async (taxiId: number) => {
    try {
      await deleteVipTaxi("viptaxi", taxiId);
      fetchVipTaxis(setVipTaxis);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error("Failed to delete taxi:", error);
    }  
  };  
  console.log('lastUpdated: ', lastUpdated);

  useEffect(() => {
    fetchVipTaxis(setVipTaxis);
  }, [setVipTaxis, lastUpdated]);

  return (
    <div>
      <div>
        <div className="h-auto m-4 py-4 flex space-x-12 items-end">
          <p className="text-2xl font-bold">VIPタクシー</p>
          <p className="text-xl">
              予約合計
            <span className="mx-2 text-3xl font-bold">
              { totalCarCount }
            </span>
            台
          </p>
        </div>
        <div className="py-2 flex grid grid-cols-8">
          <p className={ indexFontCSS }>部屋番号</p>
          <p className={ `${indexFontCSS} col-span-2` }>会社名</p>
          <p className={ indexFontCSS }>人数</p>
          <p className={ indexFontCSS }>台数</p>
          <p className={ indexFontCSS }>予約時間</p>
        </div>
      </div>
      <div>
        <div className='h-full p-2 bg-white rounded-2xl'>
          {vipTaxis
            .sort((a: VipTaxiType, b: VipTaxiType) => a.id - b.id)
            .map((taxi: VipTaxiType, index: number) => (
            <div
                  key={taxi.id}
                  className='h-12 mt-4 grid grid-cols-8 gap-2 items-center'
            >
              <p className={ recordFontLgCSS }>{ taxi.room?.name }</p>
              <p className={ `${recordFontLgCSS} col-span-2` }>{ taxi.room?.company }</p>
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
                  <p className={ recordFontCSS }>{ taxi.taxi?.peopleCount}</p>
                  <p className={ recordFontCSS }>{ taxi.taxi?.carCount}</p>
                  <p className={ recordFontCSS }>{
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
                    await updateTaxi("viptaxi", data, editingTaxiId);
                    await fetchVipTaxis(setVipTaxis);
                    setLastUpdated(Date.now());
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