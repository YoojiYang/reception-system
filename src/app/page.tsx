'use client'

import Sidebar from "./utils/components/Sidebar";
import Arrival from "./arrival/page";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default function Home() {

  const resetRoomFields = async () => {
    await prisma.room.updateMany({
      data: {
        scheduledArrival: null, // DateTime型の場合、nullを設定することで初期化できます
        reserveAdultsCount: 0,
        reserveChildrenCount: 0,
        changedAdultsCount: 0,
        changedChildrenCount: 0
      }
    });
  }

  const resetDatabase = async () => {
    // 1. テーブルのデータを削除
    await prisma.generalTaxi.deleteMany();
    await prisma.vipTaxi.deleteMany();
    await prisma.taxi.deleteMany();
    await prisma.arrival.deleteMany();

    // 2. 連番のIDをリセット (PostgreSQLの場合)
    // 他のデータベースを使用している場合、適切なクエリを実行する必要があります。
    await prisma.$executeRaw`ALTER SEQUENCE "GeneralTaxi_id_seq" RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE "VipTaxi_id_seq" RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE "Taxi_id_seq" RESTART WITH 1;`;
    await prisma.$executeRaw`ALTER SEQUENCE "Arrival_id_seq" RESTART WITH 1;`;
  }

  const handleResetClick = async () => {
    const isConfirmed = window.confirm("今日のデータを初期化します。よろしいですか？");
    if (isConfirmed) {
      await resetRoomFields();
      await resetDatabase();
      alert("データを初期化しました。お疲れ様でした！"); // オプション: 処理が完了したことをユーザーに知らせる
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
