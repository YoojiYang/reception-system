import CustomButton from "@/app/utils/components/CustomButton"
import DecrementButton from "@/app/utils/components/DecrementButton"
import IncrementButton from "@/app/utils/components/IncrementButton"
import { ReserveCountChangeProps, RoomType } from "../../../../types/types"
import { useEffect, useMemo, useState } from "react";
import { fetchRooms, useRooms } from "@/app/RoomsContext";
import { handleEditData } from "@/app/utils/utils";

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

  const sortedRooms = useMemo(() => {
    return [...rooms].sort((a: RoomType, b: RoomType) => a.id - b.id);
  }, [rooms]);

  useEffect(() => {
    fetchRooms(setRooms);
  }, [setRooms, lastUpdated]);


  return(
    <div>
      <div className="p-2 h-auto">
        <form onSubmit={ handleRegister }>
          <div className="flex h-56">
            <div className="w-1/2">
              <p className="text-3xl text-center">部屋名</p>
              <div className="p-4 h-2/3">
                <select 
                  name="roomName"
                  onChange={ handleRoomChange }
                  className='text-center cols-span-5 flex h-full w-full items-center justify-center text-4xl border-solid border-2 border-blue-500 rounded-xl'
                  >
                  <option value="-1">▼部屋名を選択▼</option>
                  {sortedRooms.map((room: RoomType) => (
                      <option key={ room.id } value={ room.id }>{ room.name }</option>
                      ))}
                </select>
              </div>
            </div>
            <div className="w-1/4">
              <p className="text-3xl text-center">大人</p>
              <div className="h-full text-center">
                <div className="p-4 h-2/3">
                  <input 
                    type="text"
                    inputMode="numeric"
                    name="adultsCount"
                    value={ localAdultsCount }
                    onChange={ (e) => { setLocalAdultsCount(parseInt(e.target.value)) } }
                    className="text-center h-full w-full flex items-center justify-center text-5xl bg-inherit"
                    />
                </div>
                <div className="h-1/3 w-full flex items-center justify-center space-x-8">
                  <IncrementButton count={ localAdultsCount } setCount={ setLocalAdultsCount }/>
                  <DecrementButton count={ localAdultsCount } setCount={ setLocalAdultsCount }/>
                </div>
              </div>
            </div>
            <div className="w-1/4">
              <p className="text-3xl text-center">子ども</p>
              <div className="h-full text-center">
                <div className="p-4 h-2/3">
                  <input 
                    type="text"
                    inputMode="numeric"
                    value={ localChildrenCount }
                    onChange={ (e) => { setLocalChildrenCount(parseInt(e.target.value)) } }
                    className="text-center h-full w-full flex items-center justify-center text-5xl bg-inherit"
                    />
                </div>
                <div className="h-1/3 w-full flex items-center justify-center space-x-8">
                  <IncrementButton count={ localChildrenCount } setCount={ setLocalChildrenCount }/>
                  <DecrementButton count={ localChildrenCount } setCount={ setLocalChildrenCount }/>
                </div>
              </div>
            </div>
          </div>
          <div className="h-32 grid grid-cols-9">
            <div className="col-span-4">
              <h2>変更前人数</h2>
              <div className="flex">
                <div>
                  <p className="text-2xl">大人</p>
                  <p className="text-4xl">{ adultsCount }</p>
                </div>
                <div>
                  <p className="text-2xl">子ども</p>
                  <p className="text-4xl">{ childrenCount }</p>
                </div>
              </div>
            </div>
            <div>
              →
            </div>
            <div className="col-span-4">
              <h2>変更後人数</h2>
              <div className="flex">
                <div>
                  <p>大人</p>
                  <p>{ adultsCount + localAdultsCount }</p>
                </div>
                <div>
                  <p>子ども</p>
                  <p>{ childrenCount + localChildrenCount }</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-20 h-40 flex items-center justify-center">
            <CustomButton text={ "登録" } type={ "submit" } className={ "py-8 px-16 text-4xl" }/>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ReserveCountChange