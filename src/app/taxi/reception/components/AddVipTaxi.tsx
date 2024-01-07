import CustomButton from "@/app/utils/components/CustomButton";
import { useEffect, useState } from "react";
import { AddTaxiProps, VipTaxiData } from "../../../../../types/types";
import CustomSelect from "@/app/utils/components/CustomSelect";
import { carCountOptions, roomNameOptions, taxiReceptoinSelectStyles } from "@/app/utils/selectOptions";
import CustomSmallSelect from "@/app/utils/components/CustomSmallSelect";
import { indexFontCSS, recordFontLgCSS } from "@/app/utils/style";
import { convertUTCToJST, postData } from "@/app/utils/utils";
import { useRooms } from "@/app/context/RoomsContext";
import SelectDigitalClock from "@/app/utils/components/SelectDigitalClock";
import { IsAfterEventCheckBox } from "./IsAfterEventCheckBox";
import { Dayjs } from "dayjs";

const AddVipTaxi = ({ setTaxis }: AddTaxiProps) => {
  const { rooms } = useRooms();
  const [roomId, setRoomId] = useState<number>(101);
  const [company, setCompany] = useState<string>("");
  const [carCount, setCarCount] = useState<number>(1);
  const [reservationTime, setReservationTime] = useState<Dayjs>();
  const [checked, setChecked] = useState<boolean>(false);
  const [isAfterEvent, setIsAfterEvent] = useState<boolean>(false);
  const [memo, setMemo] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      for (let i = 0; i < carCount; i++) {

        let jstTime: Date | undefined = undefined;
        if (reservationTime) {
          jstTime = convertUTCToJST(reservationTime);
        }
        const data: VipTaxiData = {
          roomId: roomId,
          reservationTime: jstTime,
          memo: memo,
          afterEvent: isAfterEvent,
        };
        const addedTaxi = await postData("taxi", data);

        const relatedRoom = rooms.find(room => room.id === roomId);
        setTaxis(prevTaxis => [...prevTaxis, { ...addedTaxi, room: relatedRoom }]);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

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
      <div className="w-4/5 max-w-[600px] mx-auto py-4 justify-center bg-white rounded-2xl">
        <form onSubmit={ handleSubmit }>
          <div className="">
            <div className="mb-4 grid grid-cols-2">
              <div className="">
                <p className={` ${indexFontCSS} h-1/5 `}>部屋</p>
                <div className="text-center">
                  <div className="p-4 ">
                    {roomId !== undefined && (
                    <CustomSelect
                      options={ roomNameOptions(rooms) }
                      name="roomName"
                      value={ roomId }
                      onChange={ setRoomId }
                      className="text-2xl"
                    />
                    )}
                  </div>
                </div>
              </div>
              <div className="">
                <p className={` ${indexFontCSS} h-1/5 `}>会社名</p>
                <div className="h-4/5 flex justify-center items-center">
                  <p className={ `${indexFontCSS} ` }>{ company }</p>
                </div>
              </div>
            </div>
            <div className="h-36 grid grid-cols-3">
              <div className="">
                <p className={ ` ${indexFontCSS} h-1/5` }>台数</p>
                <div className="text-center">
                  <div className="p-4 ">
                    <CustomSmallSelect
                      options={ carCountOptions }
                      name="carCount"
                      value={ carCount }
                      onChange={ setCarCount }
                      className="text-3xl z-1"
                      styles={ taxiReceptoinSelectStyles }
                      />
                  </div>
                </div>
              </div>
              <div className="col-span-2">
                <p className={ ` ${indexFontCSS} h-1/5` }>memo</p>
                <div className="text-center">
                  <div className="p-4 ">
                    <input
                      type="text"
                      value={ memo }
                      onChange={ (e) => setMemo(e.target.value) }
                      className="w-full p-5 text-2xl border-2 border-gray-400 rounded-xl"
                      placeholder="memo"
                      />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <p className={ indexFontCSS }>予約時間</p>
              <div className="text-center">
                <div className="h-auto ">
                  <div className="flex items-center justify-center">
                    <IsAfterEventCheckBox checked={ checked } setChecked={ setChecked } setIsAfterEvent={ setIsAfterEvent }/>
                    <p className="text-2xl">試合終了後</p>
                  </div>
                  {!isAfterEvent &&
                  <div className="flex justify-center">
                    <SelectDigitalClock setReservationTime={ setReservationTime }/>
                  </div>
                  }
                </div>
              </div>
            </div>
          </div>
          <div className=" flex items-center justify-center">
            <CustomButton text={ "登録" } type={ "submit" } className={ "py-4 px-10 mt-5 text-3xl" }/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVipTaxi;