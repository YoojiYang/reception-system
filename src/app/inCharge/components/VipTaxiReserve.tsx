import CustomButton from "@/app/utils/components/CustomButton";
import CustomSelect from "@/app/utils/components/CustomSelect";
import { deleteVipTaxi, fetchAllData, formatTime, postData, updateTaxi } from "@/app/utils/utils";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { VipTaxiReservationProps, VipTaxiType } from "../../../../types/types";
import CustomStringSelect from "@/app/utils/components/CustomStringSelect";
import { carCountOptions, needOrNotOptions, peopleCountOptions, reservationTimeOptions } from "@/app/utils/selectOptions";

const VipTaxiReserve = ({ currentRoom, vipTaxis, setVipTaxis }: VipTaxiReservationProps) => {
  const [needOrNot, setNeedOrNot] = useState<string>("Unconfirmed");
  const [peopleCount, setPeopleCount] = useState<number>(0);
  const [carCount, setCarCount] = useState<number>(0);
  const [reservationTime, setReservationTime] = useState<string>("試合終了後");
  const [editingTaxiId, setEditingTaxiId] = useState<number | null>(null);
  const [editPeopleCount, setEditPeopleCount] = useState<number>(0);
  const [editCarCount, setEditCarCount] = useState<number>(0);
  const [editReservationTime, setEditReservationTime] = useState<string>("試合終了後");



  const fetchVipTaxis = async (setVipTaxis: Dispatch<SetStateAction<VipTaxiType[]>>) => {
    try {
      const fetchedVipTaxis = await fetchAllData("viptaxis");
      setVipTaxis(fetchedVipTaxis);
    } catch (error) {
      console.error(error);
    }
  };
  
  // タクシーの予約情報をデータベースに登録する
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await postData(
        "viptaxis",
        {
          needOrNot: needOrNot,
          roomId: currentRoom.id,
          peopleCount: peopleCount,
          carCount: carCount,
          reservationTime: reservationTime,
        },
      );

      fetchVipTaxis(setVipTaxis);
    } catch (error) {
      console.error(error);
      return;
    }
  };

  // タクシーの削除処理
  const handleDelete = async (taxiId: number) => {
    try {
      await deleteVipTaxi("viptaxis", taxiId);
      fetchVipTaxis(setVipTaxis);
    } catch (error) {
      console.error("Failed to delete taxi:", error);
    }
  };
  
  // タクシーの予約状況を最新に更新する
  useEffect(() => {
    fetchVipTaxis(setVipTaxis);
  }, [setVipTaxis]);
    
  return (
    <div>
      <div className="p-2 h-auto w-full">
        <form onSubmit={ handleSubmit }>
          <div className="flex justify-between">
            <h3 className="text-3xl">[ タクシー予約 ]</h3>
            <CustomButton text={ "登録" } type="submit" className={ "py-4 px-8 text-xl" }/>
          </div>
          <div className="h-auto">
            <div className="h-24">
              <p className="text-3xl w-full text-center">必要/不要</p>
              <div className="h-full w-full text-center">
                <div className="p-4 h-2/3 w-full">
                  <CustomStringSelect
                    options={ needOrNotOptions }
                    name="needOrNot"
                    value={ needOrNot }
                    onChange={ setNeedOrNot }
                  />
                </div>
              </div>
          </div>
            <div className="flex">
              <div className="w-1/3">
                <p className="text-3xl w-full text-center">人数</p>
                <div className="h-full w-full text-center">
                  <div className="p-4 h-2/3 w-full">
                    <CustomSelect
                      options={ peopleCountOptions }
                      name="peopleCount"
                      value={ peopleCount }
                      onChange={ setPeopleCount }
                      />
                  </div>
                </div>
              </div>
              <div className="w-1/3">
                <p className="text-3xl w-full text-center">台数</p>
                <div className="h-full w-full text-center">
                  <div className="p-4 h-2/3 w-full">
                    <CustomSelect
                      options={ carCountOptions }
                      name="carCount"
                      value={ carCount }
                      onChange={ setCarCount }
                      />
                  </div>
                </div>
              </div>
              <div className="w-1/3">
                <p className="text-3xl w-full text-center">予約時間</p>
                <div className="h-full w-full text-center">
                  <div className="p-4 h-2/3 w-full">
                    <CustomStringSelect
                      options={ reservationTimeOptions }
                      name="reservationTimevationTime"
                      value={ reservationTime }
                      onChange={ setReservationTime }
                      />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className=''>
            {vipTaxis
              .filter((taxi: VipTaxiType) => taxi.roomId === currentRoom.id)
              .sort((a: VipTaxiType, b: VipTaxiType) => a.id - b.id)
              .map((taxi: VipTaxiType, index: number) => (
                <div key={taxi.id} className='h-12 mt-4 grid grid-cols-5 gap-2 items-center'>
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
        </form>
      </div>
    </div>
  );
}

export default VipTaxiReserve