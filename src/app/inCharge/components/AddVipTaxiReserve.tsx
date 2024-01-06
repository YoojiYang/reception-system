import CustomButton from "@/app/utils/components/CustomButton";
import { useEffect, useState } from "react";
import CustomSelect from "@/app/utils/components/CustomSelect";
import { carCountOptions, roomNameOptions, taxiReceptoinSelectStyles } from "@/app/utils/selectOptions";
import CustomSmallSelect from "@/app/utils/components/CustomSmallSelect";
import { indexFontCSS, recordFontLgCSS } from "@/app/utils/style";
import { convertUTCToJST, postData } from "@/app/utils/utils";
import { useRooms } from "@/app/context/RoomsContext";
import SelectDigitalClock from "@/app/utils/components/SelectDigitalClock";
import { Dayjs } from "dayjs";
import { AddTaxiProps, TaxiType, VipTaxiData } from "../../../../types/types";
import { IsAfterEventCheckBox } from "@/app/taxi/reception/components/IsAfterEventCheckBox";

interface Props {
  setTaxis: React.Dispatch<React.SetStateAction<TaxiType[]>>;
  currentRoomId: number;
}


const AddVipTaxiReserve = ({ setTaxis, currentRoomId }: Props) => {
  const { rooms } = useRooms();
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
          roomId: currentRoomId,
          reservationTime: jstTime,
          memo: memo,
          afterEvent: isAfterEvent,
        };
        const addedTaxi = await postData("taxi", data);

        const relatedRoom = rooms.find(room => room.id === currentRoomId);
        setTaxis(prevTaxis => [...prevTaxis, { ...addedTaxi, room: relatedRoom }]);
      }
    } catch (error) {
      console.error(error);
      return;
    }
  };

  useEffect(() => {
    const selectedRoom = rooms.find(room => room.id === currentRoomId);
    if (selectedRoom && selectedRoom.company) {
      setCompany(selectedRoom.company);
    } else {
      setCompany("No company");
    }
  }, [currentRoomId, rooms]);

  return (
    <div>
      <div className="p-2 h-auto w-full">
        <form onSubmit={ handleSubmit }>
          <div className="flex">
            <div className="w-full">
              <p className={ indexFontCSS }>予約時間</p>
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
            </div>
            <div className="w-full">
              <p className={ indexFontCSS }>台数</p>
              <div className="h-full w-full text-center">
                <div className="p-4 w-full">
                  <CustomSmallSelect
                    options={ carCountOptions }
                    name="carCount"
                    value={ carCount }
                    onChange={ setCarCount }
                    className="text-3xl w-full"
                    styles={ taxiReceptoinSelectStyles }
                    />
                </div>
              </div>
            </div>
            <div className="w-full">
              <p className={ indexFontCSS }>memo</p>
              <div className="h-full w-full text-center">
                <div className="p-4 w-full">
                  <input
                    type="text"
                    value={ memo }
                    onChange={ (e) => setMemo(e.target.value) }
                    className="text-3xl w-full"
                    placeholder="memo"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 h-auto flex items-center justify-center">
            <CustomButton text={ "登録" } type={ "submit" } className={ "py-6 px-10 text-4xl" }/>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVipTaxiReserve;