import CustomButton from "@/app/utils/components/CustomButton"
import DecrementButton from "@/app/utils/components/DecrementButton"
import IncrementButton from "@/app/utils/components/IncrementButton"
import { ReserveCountChangeProps, RoomType } from "../../../../types/types"
import { useEffect, useState } from "react";
import { fetchRooms, useRooms } from "@/app/context/RoomsContext";
import { handleEditData } from "@/app/utils/utils";
import { deskSelectStyles, roomNameOptions } from "@/app/utils/selectOptions";
import CustomSelect from "@/app/utils/components/CustomSelect";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { bigNumberFontCSS, indexFontCSS, numberFontCSS } from "@/app/utils/style";

export function ReserveCountChange({ setCountChange }: ReserveCountChangeProps) {
  const { rooms, setRooms, lastUpdated, setLastUpdated } = useRooms();
  const [selectedRoomId, setSelectedRoomId] = useState<number>(0);
  const [localAdultsCount, setLocalAdultsCount] = useState<number>(0);
  const [localChildrenCount, setLocalChildrenCount] = useState<number>(0);
  
  const handleRoomChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roomId = parseInt(e.target.value);
    setSelectedRoomId(roomId);
  };
  
  // 選択された部屋のデータを取得
  const selectedRoom = rooms.find(room => room.id === selectedRoomId);
  const adultsCount = selectedRoom ? selectedRoom.reserveAdultsCount + selectedRoom.changedAdultsCount: 0;
  const childrenCount = selectedRoom ? selectedRoom.reserveChildrenCount + selectedRoom.changedChildrenCount: 0;

  const handleRegister = () => {
    if (!selectedRoom) {
      console.error("Room not found.");
      return;
    }

    const data = {
      changedAdultsCount: selectedRoom?.changedAdultsCount + localAdultsCount,
      changedChildrenCount: selectedRoom?.changedChildrenCount + localChildrenCount,
    };

    handleEditData({
      route: "rooms",
      data: data,
      editingId: selectedRoom?.id,
      onSuccess: (response) => {
        fetchRooms(setRooms);
        setLastUpdated(Date.now());
      }, 
      onError: (error) => {
        console.error(error);
      },
    });
    setCountChange(false);
  };

  useEffect(() => {
    fetchRooms(setRooms);
  }, [setRooms, lastUpdated]);


  return(
    <div>
      <div className="p-2 h-auto w-full">
        <form onSubmit={ handleRegister }>
          <div className="flex h-auto">
            <div className="w-1/2">
              <p className={ indexFontCSS }>部屋名</p>
              <div className="p-4">
                <CustomSelect
                  options={ roomNameOptions(rooms) }
                  name="roomName"
                  value={ selectedRoomId }
                  onChange={ setSelectedRoomId }
                  className="text-2xl"
                  styles={ deskSelectStyles }
                />
              </div>
            </div>
            <div className="w-1/4">
              <p className={ indexFontCSS }>大人</p>
              <div className="h-full text-center">
                <div className="p-4">
                  <input 
                    type="text"
                    inputMode="numeric"
                    name="adultsCount"
                    value={ localAdultsCount }
                    onChange={ (e) => { setLocalAdultsCount(parseInt(e.target.value)) } }
                    className={ `${bigNumberFontCSS} h-full w-full bg-inherit` }
                    />
                </div>
                <div className="w-full flex items-center justify-center space-x-4">
                  <IncrementButton count={ localAdultsCount } setCount={ setLocalAdultsCount }/>
                  <DecrementButton count={ localAdultsCount } setCount={ setLocalAdultsCount }/>
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <p className={ indexFontCSS }>子ども</p>
              <div className="h-full text-center">
                <div className="p-4">
                  <input 
                    type="text"
                    inputMode="numeric"
                    value={ localChildrenCount }
                    onChange={ (e) => { setLocalChildrenCount(parseInt(e.target.value)) } }
                    // className="text-center h-full w-full flex items-center justify-center text-5xl bg-inherit"
                    className={ `${bigNumberFontCSS} h-full w-full bg-inherit` }
                    />
                </div>
                <div className="w-full flex items-center justify-center space-x-4">
                  <IncrementButton count={ localChildrenCount } setCount={ setLocalChildrenCount }/>
                  <DecrementButton count={ localChildrenCount } setCount={ setLocalChildrenCount }/>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 grid grid-cols-9 flex">
            <h2 className={` ${indexFontCSS} col-span-4`}>変更前人数</h2>
            <div></div>
            <h2 className={` ${indexFontCSS} col-span-4`}>変更後人数</h2>
          </div>
          <div className="p-2 h-auto grid grid-cols-9">
            <div className="p-2 col-span-4">
              <div className="mx-8 p-4 flex justify-center content-center space-x-12  bg-white rounded-2xl">
                <div className="">
                  <p className={ indexFontCSS }>大人</p>
                  <p className={ numberFontCSS }>{ adultsCount }</p>
                </div>
                <div className="">
                  <p className={ indexFontCSS }>子ども</p>
                  <p className={ numberFontCSS }>{ childrenCount }</p>
                </div>
              </div>
            </div>
            <div className="flex justify-center items-center">
              <ArrowForwardIcon className="text-6xl"/>
            </div>
            <div className="p-2 col-span-4">
              <div className="mx-8 p-4 flex justify-center content-center space-x-12  bg-white rounded-2xl">
                <div>
                  <p className={ indexFontCSS }>大人</p>
                  <p className={ numberFontCSS }>{ adultsCount + localAdultsCount }</p>
                </div>
                <div>
                  <p className={ indexFontCSS }>子ども</p>
                  <p className={ numberFontCSS }>{ childrenCount + localChildrenCount }</p>
                </div>
              </div>
            </div>
          </div>
          <div className="m-4 h-auto flex items-center justify-center">
            <CustomButton text={ "登録" } type={ "submit" } className={ "py-8 px-16 text-4xl" }/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReserveCountChange