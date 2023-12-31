import { bgGrayCSS, pageTitleCSS } from "../utils/style";
import RoomCard from "./components/RoomCard";

export default function Arrival() {
    return (
        <div>
          <div className="mx-8">
            <div>
              <h1 className={ pageTitleCSS }>来場状況</h1>
            </div>
            <div className={`${bgGrayCSS} mt-8`}>
              <div className="h-full w-full flex space-x-4 lg:space-x-8">
                {/* BALCONYのみを表示 */}
                <div>
                  <RoomCard startRoomId={ 101 } endRoomId={ 114 } />
                </div>
                {/* BOXのみを表示 */}
                <div>
                  <RoomCard startRoomId={ 201 } endRoomId={ 208 } />
                </div>
              </div>
            </div>
          </div>
        </div>
    )
}