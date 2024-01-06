import { receptionIndexCSS } from "@/app/utils/style";

const ReserveIndex = () => {
  return (
    <div>
      <div className={ `${receptionIndexCSS.outside1} font-bold` }>
        <div className={ receptionIndexCSS.outside21 }>
          <p className={receptionIndexCSS.roomName}>部屋名</p>
          <p className={ receptionIndexCSS.companyName }>会社名</p>
        </div>
        <div className={ receptionIndexCSS.outside22 }>
          <div className={ receptionIndexCSS.outside3 }>
            <p className={ receptionIndexCSS.adults }>大人</p>
            <p className={ receptionIndexCSS.children }>小人</p>
            <p className={ receptionIndexCSS.arrivalTime }>到着時刻</p>
          </div>
          <p className={ receptionIndexCSS.staff }>担当者</p>
        </div>
      </div>
    </div>
  );
}

export default ReserveIndex;