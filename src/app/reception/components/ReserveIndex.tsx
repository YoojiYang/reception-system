import { deskIndexCSS } from "@/app/utils/style";

const ReserveIndex = () => {
  return (
    <div>
      <div className={ `${deskIndexCSS.outside1} font-bold` }>
        <div className={ deskIndexCSS.outside21 }>
          <p className={deskIndexCSS.roomName}>部屋名</p>
          <p className={ deskIndexCSS.companyName }>会社名</p>
        </div>
        <div className={ deskIndexCSS.outside22 }>
          <div className={ deskIndexCSS.outside3 }>
            <p className={ deskIndexCSS.adults }>大人</p>
            <p className={ deskIndexCSS.children }>小人</p>
            <p className={ deskIndexCSS.arrivalTime }>到着時刻</p>
          </div>
          <p className={ deskIndexCSS.staff }>担当者</p>
        </div>
      </div>
    </div>
  );
}

export default ReserveIndex;