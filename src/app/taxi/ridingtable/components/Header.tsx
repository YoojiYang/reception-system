import { indexFontCSS } from "@/app/utils/style";
import { ReserveTaxiListType } from "../../../../../types/types";
import { useTaxis } from "@/app/context/TaxiContext";

type HeaderProps = {
  reserveTaxiList: ReserveTaxiListType[];
};

// TODO: 列の幅を調整する　
const Header = () => {
  const { taxis } = useTaxis();

  return (
    <div>
      <div className="flex mx-8 my-4 justify-between">
        <h2 className="text-center text-2xl font-bold">未完了リスト</h2>
        <div className="mr-4">
          <h2 className="text-center text-2xl font-bold space-x-2">
            <span>残り</span> 
            <span className="text-4xl font-black">
            {taxis
              .filter(taxi => taxi.isCompleted === false && taxi.isCancel === false)
              .length}
            </span>
            <span>台</span>
          </h2>
        </div>
      </div>
      <div className='h-12 mt-4 grid grid-cols-7 gap-2 items-center'>
          <p className={ indexFontCSS }>部屋/タグ</p>
          <p className={ indexFontCSS }>予約時間</p>
          <p className={ `${indexFontCSS} col-span-2` }>担当者</p>
          <p className={ `${indexFontCSS} col-span-2` }>タクシー会社</p>
        </div>
    </div>
  );
}

export default Header;