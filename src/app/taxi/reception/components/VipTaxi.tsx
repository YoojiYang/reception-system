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
        <div className="m-4 py-4 flex space-x-12 items-end">
          <p className="text-2xl font-bold">VIPタクシー</p>
          <p className="text-xl">
              予約合計
            <span className="mx-2 text-3xl font-bold">
              { totalCarCount }
            </span>
            台
          </p>
        </div>
        <div className='p-2'>
          <AddVipTaxi setTaxis={ setTaxis }/>
        </div>
        <div className="py-2 grid grid-cols-8">
          <p className={ `${indexFontCSS} col-span-2` }>部屋番号</p>
          <p className={ `${indexFontCSS} col-span-2` }>会社名</p>
          <p className={ indexFontCSS }>予約時間</p>
          <p className={ indexFontCSS }>memo</p>
        </div>
      </div>
      <div>
        <div className='p-2 bg-white rounded-2xl'>
          {taxis
            .filter((taxi: TaxiType) => !taxi.isGeneralTaxi)
            .sort((a: TaxiType, b: TaxiType) => a.id - b.id)
            .map((taxi: TaxiType) => (
            <div key={taxi.id} className='p-2'>
              { editingTaxiId === taxi.id ? (
                // 編集モード
                <div className="grid grid-cols-8 bg-blue-100 rounded-xl">
                  {roomId !== undefined && (
                  <CustomSelect
                    options={ roomNameOptions(rooms) }
                    name="roomName"
                    value={ roomId }
                    onChange={ setRoomId }
                    className="text-xl p-4 col-span-2"
                    styles={ deskSelectStyles }
                  />
                  )}
                  <div className="col-span-2 p-4 flex items-center justify-center">
                    <p className={ `${recordFontLgCSS}` }>{ company }</p>
                  </div>
                  <div className="p-4 h-full">
                    <div className={`flex items-center justify-center ${ checked ? "h-full" : ""}`}>
                      <IsAfterEventCheckBox checked={ checked } setChecked={ setChecked } setIsAfterEvent={ setIsAfterEvent }/>
                      <p>試合終了後</p>
                    </div>
                    {!isAfterEvent &&
                    <div className="bg-white">
                      <SelectDigitalClock setReservationTime={ setReservationTime }/>
                    </div>
                    }
                  </div>
                  <div className="h-full p-4 flex justify-center items-center">
                    <input
                      type="text"
                      value={ memo }
                      onChange={ (e) => setMemo(e.target.value) }
                      className="w-full h-20 text-center text-2xl rounded-2xl"
                      placeholder="memo"
                    />
                  </div>
                  <div className="w-fit px-4 flex gap-2" >
                  <CustomButton
                    text={ "完了" }
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
                        } 
                      }}
                    className={ "w-24 my-auto py-2 px-6 text-lg" }
                  />
                  <CustomButton
                    text={ "削除" }
                    onClick={ () => {
                      deleteData("taxi", taxi.id)
                      setTaxis(prevTaxis => prevTaxis.filter(t => t.id !== taxi.id));
                    }}
                    className={ "w-24 my-auto py-2 px-6 text-lg"}
                  />
                  </div>
                </div>
              ) : (
                // 非編集モード
                <div className="grid grid-cols-8">
                  <p className={ `${recordFontCSS} col-span-2` }>{ taxi.room?.name}</p>
                  <p className={ `${recordFontCSS} col-span-2` }>{ taxi.room?.company}</p>
                  <p className={ recordFontCSS }>
                    { taxi.afterEvent ? "試合終了後" : formatTime(taxi.reservationTime) }</p>
                  <p className={ recordFontCSS }>{ taxi.memo }</p>
                  <div className="w-fit px-4 flex gap-2">
                    <CustomButton
                      text={ "編集" }
                      className={ "w-24 my-auto py-2 px-6 text-lg" }
                      onClick={ async () => {
                        setRoomId(taxi.roomId)
                        setReservationTime(reservationTime);
                        setEditingTaxiId(taxi.id);
                        setMemo(taxi.memo);
                      }}
                      />
                    <CustomButton
                      text={ "削除" }
                      onClick={ () => {
                        deleteData("taxi", taxi.id)
                        setTaxis(prevTaxis => prevTaxis.filter(t => t.id !== taxi.id));
                      }}
                      className={ "w-24 my-auto py-2 px-6 text-lg"}
                      />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default VipTaxi;