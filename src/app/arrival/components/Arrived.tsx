import RoomCard from "./RoomCard";

export function Arrived() {

  return (
    <div>
      <div className="h-full w-full flex space-x-4 lg:space-x-8">
        <div>
          <RoomCard startRoomId={ 101 } endRoomId={ 107 } />
        </div>
        <div>
          <RoomCard startRoomId={ 108 } endRoomId={ 114 } />
        </div>
        <div>
          <RoomCard startRoomId={ 201 } endRoomId={ 208 } />
        </div>
      </div>
    </div>
  )
}

export default Arrived;