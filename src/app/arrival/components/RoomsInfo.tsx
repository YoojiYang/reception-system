import { RoomType, RoomsInfoProps } from "../../../../types/types";


const RoomsInfo = ({ totalReserveCount, currentCount, arrivalRecordCounts, room}: RoomsInfoProps) => {

  const currentReserveCount = (room: RoomType) => {
    return room.reserveAdultsCount + room.changedAdultsCount + room.reserveChildrenCount + room.changedChildrenCount
  };

  if (totalReserveCount === currentCount && currentReserveCount(room) > 0) {

  console.log('room: ', room); 
  console.log('currentReserveCount(room): ', currentReserveCount(room));

    return (
      <div className='flex mt-2'>
        <p className="font-bold text-2xl">
          <span className="text-4xl">{ totalReserveCount }</span> 名  全着
        </p>
      </div>
    );
  } else if (currentCount === 0 && currentReserveCount(room) === 0) {

  console.log('room: ', room); 
  console.log('currentReserveCount(room): ', currentReserveCount(room));
  
    return (
      <div className="mt-2">
        <p className="font-bold text-xl">No Reservations</p>
      </div>
    );
  } else if (currentCount === 0 && arrivalRecordCounts[room.id] > 0) {

  console.log('room: ', room); 
  console.log('currentReserveCount(room): ', currentReserveCount(room));
  
    return (
      <div className="mt-2">
        <p className="font-bold text-2xl">ALL OUT!</p>
      </div>
    );
  } else {
    return (
      <div className="flex mt-2 space-x-4">
        <p>
          予約
          <span className="mx-2 text-2xl drop-shadow">
            { totalReserveCount}
          </span>
          名
        </p>
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
}

export default RoomsInfo;