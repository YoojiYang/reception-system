import { RoomType, RoomsInfoProps } from "../../../../types/types";


const RoomsInfo = ({ totalReserveCount, currentCount, arrivalRecordCounts, room}: RoomsInfoProps) => {

  const currentReserveCount = (room: RoomType) => {
    return room.reserveAdultsCount + room.changedAdultsCount + room.reserveChildrenCount + room.changedChildrenCount
  };

  // 全員到着の場合
  if (totalReserveCount === currentCount && currentReserveCount(room) > 0) {
    return (
      <div className='flex mt-2'>
        <p className="font-bold text-2xl">
          <span className="text-4xl">{ totalReserveCount }</span> 名  全着
        </p>
      </div>
    );
  }
  // 予約なしの場合
  if (currentCount === 0 && currentReserveCount(room) === 0) {
    return (
      <div className="mt-2">
        <p className="font-bold text-xl">No Reservations</p>
      </div>
    );
  }
  
  // 全員が退室済の場合
  if (currentCount === 0 && arrivalRecordCounts[room.id] > 0) {
    return (
      <div className="mt-2">
        <p className="font-bold text-2xl">ALL OUT!</p>
      </div>
    );
  }

  // 予約があり、ゲストが1名以上いる場合
  return (
    <div className="flex mt-2 space-x-4">
      <p>予約
        <span className="mx-2 text-2xl drop-shadow">
          { totalReserveCount}
        </span>名</p>
      <p>
        到着
        <span className="mx-2 text-2xl drop-shadow">
          { currentCount }
        </span>
        名
      </p>
    </div>
  );
}

export default RoomsInfo;