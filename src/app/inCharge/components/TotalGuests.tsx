import { CurrentCountProps } from "@/app/types";

export function TotalGuests({ currentRoom, roomArrivalData }: CurrentCountProps) {
  return (
    <div>
      <div>
        <p className="h-12 text-2xl text-center">利用者合計</p>
        <p className="h-24 text-6xl text-center">
          { currentRoom && (currentRoom.reserveAdultsCount + currentRoom.reserveChildrenCount + currentRoom.changedAdultsCount + currentRoom.changedChildrenCount) }
        </p>
      </div>
      <div className="mt-4 flex">
        <p className="w-1/2 text-xl text-center">予約人数</p>
        <p className="w-1/2 text-xl text-center">当日増減</p>
      </div>
      <div className="flex">
        <p className="w-1/2 text-4xl text-center">
          { currentRoom && (currentRoom.reserveAdultsCount + currentRoom.reserveChildrenCount) }
        </p>
        <p className="w-1/2 text-4xl text-center">
          { currentRoom && (currentRoom.changedAdultsCount + currentRoom.changedChildrenCount) }
        </p>
      </div>
      <div className="flex">
        <div className="w-1/2 flex justify-center">
          <button className="rounded-lg background-color: #fb923c; text-5xl p-3">
            +
          </button>
        </div>
        <div className="w-1/2 flex justify-center">
          <button className="rounded-lg background-color: #fb923c; text-5xl p-3">
            -
          </button>
        </div>
      </div>
    </div>
  )
}

export default TotalGuests;