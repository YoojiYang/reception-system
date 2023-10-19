import CustomButton from "@/app/utils/components/CustomButton";
import { deleteVipTaxi, formatTime, handleEditData, postData, updateTaxi } from "@/app/utils/utils";
import { useEffect, useState } from "react";
import { VipTaxiReservationProps, VipTaxiType } from "../../../../types/types";
import CustomStringSelect from "@/app/utils/components/CustomStringSelect";
import { carCountOptions, inChargeTaxiSelectStyles, inChargeTaxiStringSelectStyles, needOrNotOptions, peopleCountOptions, reservationTimeOptions } from "@/app/utils/selectOptions";
import { fetchVipTaxis, useVipTaxi } from "@/app/VipTaxiContext";
import { bgGrayCSS, indexFontCSS, recordFontCSS } from "@/app/utils/style";
import CustomSmallSelect from "@/app/utils/components/CustomSmallSelect";
import { fetchRooms, useRooms } from "@/app/RoomsContext";
import Select from 'react-select';


const VipTaxiReserve = ({ currentRoom }: VipTaxiReservationProps) => {
  const { rooms, setRooms } = useRooms();
  const { vipTaxis, setVipTaxis, lastUpdated, setLastUpdated } = useVipTaxi();
  const [needOrNot, setNeedOrNot] = useState<string>("Unconfirmed");
  const [peopleCount, setPeopleCount] = useState<number>(0);
  const [carCount, setCarCount] = useState<number>(0);
  const [reservationTime, setReservationTime] = useState<string>("試合終了後");
  const [editingTaxiId, setEditingTaxiId] = useState<number | null>(null);
  const [editPeopleCount, setEditPeopleCount] = useState<number>(0);
  const [editCarCount, setEditCarCount] = useState<number>(0);
  const [editReservationTime, setEditReservationTime] = useState<string>("試合終了後");

  // タクシーの予約情報をデータベースに登録する
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      await postData(
        "viptaxi",
        {
          roomId: currentRoom.id,
          peopleCount: peopleCount,
          carCount: carCount,
          reservationTime: reservationTime,
        },
      );
      fetchVipTaxis(setVipTaxis);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const submitTaxiStatus = (selectedOption: any) => {
    setNeedOrNot(selectedOption.value);

    handleEditData({
      route: "rooms",
      data: { taxiReservation: selectedOption.value },
      editingId: currentRoom.id,
      onSuccess: () => {
        fetchRooms(setRooms);
      },
      onError: (error) => {
        console.error(error);
      },
    });
  };


  // タクシーの削除処理
  const handleDelete = async (taxiId: number) => {
    try {
      await deleteVipTaxi("viptaxi", taxiId);
      fetchVipTaxis(setVipTaxis);
      setLastUpdated(Date.now());
    } catch (error) {
      console.error("Failed to delete taxi:", error);
    }
  };

  // タクシーの予約状況を最新に更新する
  useEffect(() => {
    fetchVipTaxis(setVipTaxis);
  }, [setVipTaxis, lastUpdated]);

  console.log(currentRoom.taxiReservation)
    
  return (
    <div>
      <div className={` ${bgGrayCSS} m-4`}>
          <div className="m-2 flex justify-between items-center">
            <h3 className={ indexFontCSS }>[ タクシー予約 ]</h3>
          </div>
          <div className="my-8 p-4 flex items-center bg-white rounded-2xl">
            <p className="text-xl w-full text-center font-bold">必要 or 不要</p>
            <div className="h-full w-full text-center">
              <div className="w-full">
                <Select
                  options={ needOrNotOptions }
                  isClearable={ false }
                  name="needOrNot"
                  value={ needOrNotOptions.find((option) => option.value === currentRoom.taxiReservation) }
                  onChange={ submitTaxiStatus }
                  className={ `text-center h-full w-full flex items-center justify-center text-xl bg-inherit z-30` }
                  styles={ inChargeTaxiStringSelectStyles }
                />
              </div>
            </div>
          </div>
        { needOrNot === "Need" && (
          <form onSubmit={ handleSubmit }>
            <div className="h-auto">
              <div className="pt-2 grid grid-cols-6 items-center justify-center">
                  <p className={ indexFontCSS }>人数</p>
                  <p className={ indexFontCSS }>台数</p>
                  <p className={ `${indexFontCSS} col-span-3` }>予約時間</p>
              </div>
              <div className="pt-1 grid grid-cols-6 items-center justify-center">
                <div className="">
                  <div className="h-full w-full text-center">
                    <div className="">
                      <CustomSmallSelect
                        options={ peopleCountOptions }
                        name="peopleCount"
                        value={ peopleCount }
                        onChange={ setPeopleCount }
                        styles={ inChargeTaxiSelectStyles }
                        />
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="h-full w-full text-center">
                    <div className="">
                      <CustomSmallSelect
                        options={ carCountOptions }
                        name="carCount"
                        value={ carCount }
                        onChange={ setCarCount }
                        styles={ inChargeTaxiSelectStyles }
                        />
                    </div>
                  </div>
                </div>
                <div className="col-span-3">
                  <div className="h-full w-full text-center">
                    <div className="">
                      <CustomStringSelect
                        options={ reservationTimeOptions }
                        name="reservationTimevationTime"
                        value={ reservationTime }
                        onChange={ setReservationTime }
                        styles={ inChargeTaxiStringSelectStyles }
                        />
                    </div>
                  </div>
                </div>
                <div className="">
                  <CustomButton text={ "登録" } type="submit" className={ "py-3 px-6 text-lg" }/>
                </div>
              </div>
            </div>
            <div className="h-auto mt-8 py-4 bg-white rounded-2xl">
              <div className="grid grid-cols-6 items-center">
                <div className="col-span-4 grid grid-cols-6">
                  <p className='text-center h-full flex items-center justify-center text-xl font-bold'>台数</p>
                  <p className='text-center h-full flex items-center justify-center text-xl font-bold'>人数</p>
                  <p className='text-center h-full flex items-center justify-center text-xl font-bold col-span-4'>予約時間</p>
                </div>
              </div>
              {vipTaxis
                .filter((taxi: VipTaxiType) => taxi.roomId === currentRoom.id)
                .sort((a: VipTaxiType, b: VipTaxiType) => a.id - b.id)
                .map((taxi: VipTaxiType, index: number) => (
                  <div key={taxi.id} className='h-12 mt-4 grid grid-cols-6'>
                    { editingTaxiId === taxi.id ? (
                      <div className="col-span-4 grid grid-cols-4">
                        <CustomSmallSelect
                          options={ peopleCountOptions }
                          name="peopleCount"
                          value={ editPeopleCount }
                          onChange={ setEditPeopleCount }
                          className="h-full w-full"
                          styles={ inChargeTaxiSelectStyles }
                          />
                        <CustomSmallSelect
                          options={ carCountOptions }
                          name="carCount"
                          value={ editCarCount }
                          onChange={ setEditCarCount }
                          className="h-full w-full"
                          styles={ inChargeTaxiSelectStyles }
                          />
                        <CustomStringSelect
                          options={ reservationTimeOptions }
                          name="reservationTime"
                          value={ editReservationTime }
                          onChange={ setEditReservationTime }
                          className="col-span-2 h-full w-full"
                          styles={ inChargeTaxiStringSelectStyles }
                          />
                      </div>
                    ) : (
                      <div className="col-span-4 grid grid-cols-6">
                        <p className='text-center h-full flex items-center justify-center text-2xl'>{ taxi.taxi?.peopleCount}</p>
                        <p className='text-center h-full flex items-center justify-center text-2xl'>{ taxi.taxi?.carCount}</p>
                        <p className='text-center h-full flex items-center justify-center text-2xl col-span-4'>{
                          taxi.taxi?.reservationTime  instanceof Date
                          ? formatTime(taxi.taxi?.reservationTime)
                          : taxi.taxi?.reservationTime
                        }
                        </p>
                      </div>
                    )}
                    <div className="col-span-2 flex space-x-2 justify-center">
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
                            setEditingTaxiId(null);
                          } else {
                            setEditPeopleCount(taxi.taxi?.peopleCount || 0);
                            setEditCarCount(taxi.taxi?.carCount || 0);
                            setEditReservationTime("試合終了後");
                            setEditingTaxiId(taxi.id);
                          }
                        }}
                        className={ "py-3 px-6 text-md" }
                      />
                      <CustomButton
                        text={ "削除" }
                        onClick={ () => handleDelete(taxi.id) }
                        className={ "py-3 px-6 text-md"}
                      />
                    </div>
                  </div>
              ))}
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default VipTaxiReserve