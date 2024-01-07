import { receptionCSS } from "@/app/utils/style";

const ReserveIndex = () => {
  return (
    <div>
      <div className={ `${receptionCSS.receptionBox} h-16 font-bold` }>
        <div className={ receptionCSS.roomCompanyBox }>
          <p className={ `${ receptionCSS.font }` }>部屋名</p>
          <p className={ `${ receptionCSS.font } col-span-2` }>会社名</p>
        </div>
        <div className={ receptionCSS.dataBox }>
          <div className={ `${ receptionCSS.adultChirdrenBox }` }>
            <p className={ `${ receptionCSS.font}` }>大人</p>
            <p className={ `${ receptionCSS.font}` }>小人</p>
          </div>
          <div className={ `${ receptionCSS.timeStaffBox } ` }>
            <p className={ `${ receptionCSS.font}` }>到着時刻</p>
            <p className={ `${ receptionCSS.font} col-span-2` }>担当者</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReserveIndex;