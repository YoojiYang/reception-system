import { NotArrivedProps, RoomType } from "../../../../types/types";

export function Arrived({ rooms, roomArrivalCounts }: NotArrivedProps) {

  return (
<div className="flex justify-center">
      <div className="w-1/2 m-4 pt-4 pb-4 rounded-2xl bg-blue-100">
        <div className="flex justify-center">
          <p
            style={{ width:'240px' }}
            className="items-center rounded-lg drop-shadow-md text-center text-2xl"
          >
            BALCONY
          </p>
        </div>
        {rooms
          .filter((room: RoomType) => room.reserveAdultsCount + room.changedAdultsCount === roomArrivalCounts[room.id] && room.id <= 114)
          .sort((a: RoomType, b: RoomType) => a.id - b.id)
          .map((room: RoomType) => (
            
            <div key={room.id} className="flex justify-center">
              <div
              style={{ width:'240px' }}
              className='h-30 mt-4 items-center p-4 border bg-blue-50 rounded-lg drop-shadow-md'
              >
              <p className='text-2xl drop-shadow'>
                { room.name }
              </p>
              <div className="flex mt-2 space-x-4">
                <p>
                  予約
                  <span className="ml-2 mr-2 text-2xl drop-shadow">
                    {room.reserveAdultsCount + room.changedAdultsCount}
                  </span>
                  名
                </p>
                <p>
                  到着
                  <span className="ml-2 mr-2 text-2xl drop-shadow">
                    {  roomArrivalCounts[room.id] || 0 }
                  </span>
                  名
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="w-1/2 m-4 pt-4 pb-4 rounded-2xl bg-blue-100">
        <div className="flex justify-center">
          <p
            style={{ width:'240px' }}
            className="items-center rounded-lg drop-shadow-md text-center text-2xl"
          >
            BOX
          </p>
        </div>
        {rooms
          .filter((room: RoomType) => room.reserveAdultsCount + room.changedAdultsCount === roomArrivalCounts[room.id] && room.id >= 201)
          .sort((a: RoomType, b: RoomType) => a.id - b.id)
          .map((room: RoomType) => (
            
            <div key={room.id} className="flex justify-center">
              <div
              style={{ width:'240px' }}
              className='h-30 mt-4 items-center p-4 border bg-blue-50 rounded-lg drop-shadow-md'
              >
              <p className='text-2xl drop-shadow'>
                { room.name }
              </p>
              <div className="flex mt-2 space-x-4">
                <p>
                  予約
                  <span className="ml-2 mr-2 text-2xl drop-shadow">
                    {room.reserveAdultsCount + room.changedAdultsCount}
                  </span>
                  名
                </p>
                <p>
                  到着
                  <span className="ml-2 mr-2 text-2xl drop-shadow">
                    {  roomArrivalCounts[room.id] || 0 }
                  </span>
                  名
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Arrived;