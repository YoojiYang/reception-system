'use client'

import Sidebar from "./utils/components/Sidebar";
import Arrival from "./arrival/page";
import { postData } from "./utils/utils";

export default function Home() {

  const handleResetClick = () => {
    const isConfirmed = window.confirm("今日のデータを初期化します。よろしいですか？");
    if (isConfirmed) {
      postData("resetdatabase", {});
      alert("データを初期化しました。お疲れ様でした！");
    }
  }

  return (
    <div>
      <div className="flex">
        <div className="w-60">
          <Sidebar alwaysOpen={ true } />
        </div>
        <div>
          <Arrival />
          <div className="my-20 flex items-center justify-center">
            <button
              onClick={ handleResetClick }
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-3xl z-2 px-12 py-16 text-4xl"
            >
              業務終了
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
