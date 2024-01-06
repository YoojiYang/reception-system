import { use, useEffect, useState } from "react";
import { convertUTCToJST, deleteData, formatTime, updateData } from "@/app/utils/utils";
import CustomButton from "@/app/utils/components/CustomButton";
import { deskSelectStyles, roomNameOptions } from "@/app/utils/selectOptions";
import CustomSelect from "@/app/utils/components/CustomSelect";
import { indexFontCSS, recordFontCSS, recordFontLgCSS } from "@/app/utils/style";
import { useTaxis } from "@/app/context/TaxiContext";
import { TaxiType } from "../../../../../types/types";
import { useRooms } from "@/app/context/RoomsContext";
import AddVipTaxi from "./AddVipTaxi";
import { IsAfterEventCheckBox } from "./IsAfterEventCheckBox";
import SelectDigitalClock from "@/app/utils/components/SelectDigitalClock";
import { Dayjs } from "dayjs";

const VipTaxi = () => {
  const { taxis, setTaxis } = useTaxis();
  const { rooms } = useRooms();
  const [editingTaxiId, setEditingTaxiId] = useState<number | null>(null);
  const [reservationTime, setReservationTime] = useState<Dayjs>();
  const [roomId, setRoomId] = useState<number>();
  const [company, setCompany] = useState<string>("");
  const [memo, setMemo] = useState<string>("");
  const [isAfterEvent, setIsAfterEvent] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);
  const [updatedTaxi, setUpdatedTaxi] = useState<TaxiType>();

  const totalCarCount = taxis.reduce((acc: number, taxi: TaxiType) => {
    return !taxi.isGeneralTaxi ? acc + 1 : acc;
  }, 0);

  useEffect(() => {
    const selectedRoom = rooms.find(room => room.id === roomId);
    if (selectedRoom && selectedRoom.company) {
      setCompany(selectedRoom.company);
    } else {
      setCompany("No company");
    }
  }, [roomId, rooms]);

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
        <div className='h-full p-2 bg-white rounded-2xl'>
          <AddVipTaxi setTaxis={ setTaxis }/>
        </div>
        <div className="py-2 grid grid-cols-8">
          <p className={ indexFontCSS }>部屋番号</p>
          <p className={ `${indexFontCSS} col-span-2` }>会社名</p>
          <p className={ indexFontCSS }>予約時間</p>
          <p className={ indexFontCSS }>memo</p>
        </div>
      </div>
      <div>
        <div className='h-full p-2 bg-white rounded-2xl'>
          {taxis
            .filter((taxi: TaxiType) => !taxi.isGeneralTaxi)
            .sort((a: TaxiType, b: TaxiType) => a.id - b.id)
            .map((taxi: TaxiType) => (
            <div
              key={taxi.id}
              className='h-12 mt-4 grid grid-cols-8 gap-2 items-center'
            >
              { editingTaxiId === taxi.id ? (
                // 編集モード
                <div className="col-span-6 grid grid-cols-5">
                  {roomId !== undefined && (
                  <CustomSelect
                    options={ roomNameOptions(rooms) }
                    name="roomName"
                    value={ roomId }
                    onChange={ setRoomId }
                    className="text-2xl"
                    styles={ deskSelectStyles }
                  />
                  )}
                  <p className={ `${recordFontLgCSS} col-span-2` }>{ company }</p>
                  <div className="h-40 p-4 w-full">
                    <div className="flex">
                      <IsAfterEventCheckBox checked={ checked } setChecked={ setChecked } setIsAfterEvent={ setIsAfterEvent }/>
                      <p>試合終了後</p>
                    </div>
                    {!isAfterEvent &&
                    <div className="h-40">
                      <SelectDigitalClock setReservationTime={ setReservationTime }/>
                    </div>
                    }
                  </div>
                  <input
                    type="text"
                    value={ memo }
                    onChange={ (e) => setMemo(e.target.value) }
                    className="text-3xl w-full"
                    placeholder="memo"
                  />
                </div>
              ) : (
                // 
                <div className="col-span-6 grid grid-cols-5">
                  <p className={ recordFontCSS }>{ taxi.room?.name}</p>
                  <p className={ recordFontCSS }>{ taxi.room?.company}</p>
                  <p className={ recordFontCSS }>
                    { taxi.afterEvent ? "試合終了後" : formatTime(taxi.reservationTime) }</p>
                  <p className={ recordFontCSS }>{ taxi.memo }</p>  
                </div>
              )}
              <CustomButton
                text={ editingTaxiId === taxi.id ? "完了" : "編集" }
                onClick={ async () => {
                  if (editingTaxiId === taxi.id) {
                    let jstTime: Date | undefined = undefined;
                    if (reservationTime) {
                      jstTime = convertUTCToJST(reservationTime);
                    }
                    const data = {
                      roomId: roomId,
                      reservationTime: jstTime,
                      afterEvent: isAfterEvent,
                      memo: memo,
                    };

                    console.log("data", data);
                    try {
                      const updateTaxi = await updateData("taxi", data, taxi.id);

                      setTaxis(prevTaxis =>
                        prevTaxis.map(t => {
                          if (t.id === taxi.id) {
                            const relatedRoom = rooms.find(room => room.id === updateTaxi.roomId);
                            return { ...updateTaxi, room: relatedRoom || t.room};
                          }
                          return t;
                        })
                      );
                    } catch (error) {
                      console.error("Error updating taxi: ", error);
                    }

                    setEditingTaxiId(null);
                    } else {
                      setRoomId(taxi.roomId)
                      setReservationTime(reservationTime);
                      setEditingTaxiId(taxi.id);
                      setMemo(taxi.memo);
                    }
                  }}
                className={ "py-2 px-2 text-lg" }
              />
              <CustomButton
                text={ "削除" }
                onClick={ () => {
                  deleteData("taxi", taxi.id)
                  setTaxis(prevTaxis => prevTaxis.filter(t => t.id !== taxi.id));
                }}
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